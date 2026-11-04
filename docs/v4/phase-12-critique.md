# Phase 12 — Literary Critique

**Scope:** 20 committed events: 16 from `docs/v4/playtest.json` `excerpts` (three lives, 45 available events) and 4 composed events from `docs/v4/phase-12-experiment-a.json` and `docs/v4/phase-12-person-branches.json`. This is a purposive sample, not a random sample: it deliberately includes both strong candidates and texts with observable anomalies. The pass rate below is therefore **not** an estimate of library-wide quality; it is a stress test of the committed prose.

**Method:** Each event is scored 0–10 on four dimensions, total 40, pass at **≥34**.

- **Specificity:** concrete object, place, institution, body, money, procedure. Generic summary scores low.
- **Drama:** stakes, turn, tension, reversal, decisive change.
- **Character/period:** plausible motive, social texture, period institutions, distinct persons.
- **Causality:** stated action/response/consequence matches the recorded effect types and the event mechanism.

When the prose and the trace disagree about who acted, or when the prose omits/contradicts a committed effect, the causality and character scores are reduced. Scores are critic judgments, not machine metrics.

---

## 1. Sample and scores

The two person-branch probes carry no event date or event id in the artifact. I record that as `n.d.` rather than invent one. The two experiment-A events use experiment-local ids (`evt:world-vienna-1912:000001` appears in both scenario runs); they are not global playtest event ids.

| # | Date | Event / action | Composed | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|:---:|---:|---:|---:|---:|---:|:---:|
| 1 | 1926-01 | `vienna-life-apprenticeship/printshop-apprentice` (`evt:world-vienna-1912:001474`) | No | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 2 | 1935-04 | `vienna-family-childbirth/difficult-birth` (`evt:world-vienna-1912:002730`) | No | 8 | 8 | 7 | 7 | 30 | Fail |
| 3 | 1929-02 | `vienna-adolescence.stolen-roll/caught-and-returned` (`evt:world-vienna-1912:001839`) | No | 8 | 7 | 8 | 8 | 31 | Fail |
| 4 | 1943-06 | `vienna-medical-treatment.toothache/barber-pull` (`evt:world-vienna-1912:004949`) | No | 9 | 8 | 8 | 7 | 32 | Fail |
| 5 | 1954-05 | `p9-gap-adult-ordinary-day.wash-day/wash-day.wring-blanket` (`evt:world-vienna-1912:008069`) | No | 9 | 6 | 9 | 8 | 32 | Fail |
| 6 | 1958-01 | `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` (`evt:world-vienna-1912:009570`) | No | 9 | 5 | 8 | 6 | 28 | Fail |
| 7 | 1963-12 | `vienna-market-debt.pawn-watch/pawn-chain-only` (`evt:world-vienna-1912:011174`) | No | 9 | 7 | 8 | 7 | 31 | Fail |
| 8 | 1968-01 | `vienna-historical-social-movement.relief-network/allocate-by-need` (`evt:world-vienna-1912:012906`) | No | 9 | 7 | 9 | 6 | 31 | Fail |
| 9 | 1918-12 | `vienna-childhood-street.washhouse-fever/fever-recover` (`evt:world-vienna-1912:000461`) | No | 8 | 6 | 7 | 7 | 28 | Fail |
| 10 | 1920-01 | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` (`evt:world-vienna-1912:000732`) | No | 9 | 5 | 7 | 5 | 26 | Fail |
| 11 | 1919-01 | `p9-gap-childhood-chores.market-line/line-both-families` (`evt:world-vienna-1912:000607`) | No | 7 | 5 | 5 | 4 | 21 | Fail |
| 12 | 1923-06 | `vienna-childhood-friends.hidden-book/book-confiscated` (`evt:world-vienna-1912:001128`) | No | 8 | 7 | 6 | 4 | 25 | Fail |
| 13 | 1939-01 | `p9-history-medical-daily.suspicious-death/ask-pharmacy` (`evt:world-vienna-1912:003839`) | No | 9 | 8 | 7 | 6 | 30 | Fail |
| 14 | 1950-02 | `vienna-market-household.soup-kitchen/soup-kitchen.keep` (`evt:world-vienna-1912:006906`) | No | 9 | 7 | 8 | 5 | 29 | Fail |
| 15 | 1968-06 | `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` (`evt:world-vienna-1912:012949`) | No | 9 | 8 | 7 | 3 | 27 | Fail |
| 16 | 1945-01 | `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` (`evt:world-vienna-1912:005555`) | No | 7 | 4 | 4 | 3 | 18 | Fail |
| 17 | 1913-06 | `kernel-civic.leaflet-night::ctx-vienna-1912::milieu-printshop/civic-leaflet-police` | **Yes** | 9 | 8 | 8 | 6 | 31 | Fail |
| 18 | 1916-12 | `kernel-civic.leaflet-night::ctx-vienna-war-1915::milieu-factory::civic-leaflet-war/civic-leaflet-war-ration` | **Yes** | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 19 | n.d. | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` | **Yes** | 8 | 4 | 6 | 6 | 24 | Fail |
| 20 | n.d. | `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/bought-the-middle-place` | **Yes** | 9 | 8 | 8 | 8 | 33 | Fail |

Composed #17 and #18 are both experiment-local `evt:world-vienna-1912:000001` in their respective runs (peace and war), not global playtest ids. #19 and #20 have no event id in the branch-probe artifact.

**Aggregate**

- Sample: **20**
- Pass (≥34): **2** — #1 apprenticeship, #18 war-ration leaflet.
- Mean: **28.75/40**; median: **30**.
- Dimension means: specificity **8.55**, drama **6.70**, character/period **7.35**, causality **6.15**.
- Best: 34. Worst: 18. Near misses: #20 market bribe (33), #4 toothache (32), #5 wash day (32).
- Pass rate: **10%**. **The sampled library is not at the 34/40 threshold.**

The low mean is driven mainly by causality, not by sentence-level competence. Several texts are vividly written but attached to the wrong person or to effects they never show.

---

## 2. What actually works

The two passes show the target.

**#1, apprenticeship.** “Buchdruckerei Winter & Söhne让Mitzi下周一到排字房报到，先搬铅字和扫地，月薪十八克朗。家里用第一笔预付工资买了双结实的鞋。” The institution, the start day, the work, the wage, and the family use of the advance are all present. The recorded `education`, `employment`, `cash`, and `role` effects are visible in the same paragraph. This is how a life event becomes inspectable.

**#18, war-ration leaflet.** “配给办公室把面包分量又减了一成，Friedrich Hofer在告示上盖了章。他连夜排了一版号外，只印配给表和一句‘先问为什么’，Josef Bauer把机器踩得比平时慢，怕声音传到街上。他把号外折成四折，塞进装面包票的铁盒。” The ration cut, the stamp, the press, the slowed machine, and the hiding place are concrete; the `flag`, two `relation`s, `cash`, and `knowledge` effects are all motivated by visible actions. It is not “a leaflet was printed”; it is a specific illegal print run with a cost and a hiding place.

**#4, toothache** is the best prose in the sample at the sentence level: “钳子第一次滑脱，第二次才夹稳，牙出来时带着一小块肉，他用明矾水按住了。” Barber dentistry, no anesthetic, a physical procedure. It still fails because the text is about Marie Huber while the trace subject is Matthias, and the 1.2-kronen fee never appears.

**#5, wash day** has the best physical object: “毯子吸饱了水，沉得像一条死狗……水从毯缝里挤出来，在脚边汇成一小片温热。” It fails on drama (ordinary chore, no turn) and on focal attribution: the excerpt serves Matthias, the text serves Luise Kral.

**#8, relief network** has the best moral image: “轮到放空碗那家时，Grete Weiss 2把面包掰成两半，一半放进碗里，一半留在自己手中，谁也没说话。” It fails because the event’s trace subject is Matthias; the text never returns to him.

---

## 3. Failure patterns

**Top three, in order: (1) person/pronoun/subject instability; (2) effects invisible or contradicted; (3) template repetition and numeric-name clutter.** The remaining four patterns are real but less pervasive in this sample.

### 3.1 Person, pronoun, and subject instability — the dominant failure

At least **11 of 20** sampled events show one of: a gendered pronoun the casting does not support, a second-person slip, or prose about a different participant than the trace subject. This is not a line-edit problem; it is a casting/composition problem.

| Event | Evidence | Why it fails |
|---|---|---|
| `evt:world-vienna-1912:000732` / `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | “绳上的床单比Emil还高，**她**踮脚把木夹子一个个卡上去……” | Trace subject is **Emil**, focal-04, male, age 8. `她` is wrong. The excerpt is Anton’s life; the text is Emil’s. |
| `evt:world-vienna-1912:009202` / `p9-work-career.night-course/p9-work-career.night-course.certificate` | “最后一晚，Maria Lechner把用剩的墨水推给**他**……” | Trace subject is **Mitzi**, female. The pronoun is wrong. |
| `evt:world-vienna-1912:014429` / `vienna-elder-care.winter-stairs/stay-indoors` | “Katharina Hofer 2把窗帘拉开一条缝看院子……**他**刮着吃了一半。” | Katharina is female; `他` is wrong. The trace subject is Mitzi, while the text follows Katharina. |
| `evt:world-vienna-1912:011174` / `vienna-market-debt.pawn-watch/pawn-chain-only` | “链子从**你**指缝里滑下去，落在绒布上几乎没有声音。” | A second-person event inside a third-person life. No name, no “I”; the POV breaks. |
| `evt:world-vienna-1912:012949` / `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` | “医院的走廊比家里亮，**Anton Stein**把三克朗押金数了两遍。” | The trace subject is **Mitzi Kral**; the text follows Anton Stein. The excerpt is Mitzi’s life. |
| `evt:world-vienna-1912:000607` / `p9-gap-childhood-chores.market-line/line-both-families` | “Friedrich Hofer塞给**她**几枚零钱……” | Trace subject is **Anton**, male. There is no female antecedent in the sentence. |
| `evt:world-vienna-1912:001128` / `vienna-childhood-friends.hidden-book/book-confiscated` | “**Emil Lechner**用两根手指把书从算术本底下抽出来。放学后**Emil**站在黑板前……” | Two different people are both “Emil”: the teacher Emil Lechner and the pupil Emil. The reader cannot tell who is who. |
| `evt:world-vienna-1912:000697` / `vienna-childhood-friends.courtyard-race/fell-on-wet-stones` | “**Emil**趴在地上，听见**Emil Weiss**的拖鞋声……**Emil**咬住嘴唇，**Emil Weiss**把赢来的弹珠全收进围裙口袋……” | Name collision plus an `围裙` on a male character; the scene reads as four people rather than two. |

`evt:world-vienna-1912:009202`, `evt:world-vienna-1912:014429`, and `evt:world-vienna-1912:000697` are additional excerpt events outside the 20-score sample; they are included because they make the same failure unambiguous. The other person/subject mismatches inside the 20 are:

- `evt:world-vienna-1912:004949` / `vienna-medical-treatment.toothache/barber-pull`: the text follows **Marie Huber** (“弗朗茨把围布往Marie Huber胸前一系”), while the trace subject is **Matthias**.
- `evt:world-vienna-1912:008069` / `p9-gap-adult-ordinary-day.wash-day/wash-day.wring-blanket`: the text follows **Luise Kral** (“Luise Kral咬着牙拧到最后一圈”), while the excerpt and trace subject are **Matthias**.
- `evt:world-vienna-1912:000461` / `vienna-childhood-street.washhouse-fever/fever-recover`: the excerpt is **Anton’s** life, but the text is about **Matthias** (“洗衣房的蒸汽让Matthias昏昏沉沉”); the trace subject is Anton and the participant list casts Matthias as `subject`.
- `evt:world-vienna-1912:003839` / `p9-history-medical-daily.suspicious-death/ask-pharmacy`: the text follows **Emil** (“Emil把药包拍在柜台上”), while the trace subject is **Mitzi**.
- `evt:world-vienna-1912:006906` / `vienna-market-household.soup-kitchen/soup-kitchen.keep`: the text follows **Alois Moser 4** (“Alois Moser 4掀开锅盖又盖上”), while the trace subject is **Mitzi Lechner**.
- `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` (branch probe): “Emil Weiss路过，问要不要借**她**家门廊摆一上午。” The `neighbor` role is unrestricted; the pronoun is hardcoded.

That is **11 of the 20 scored events** with a person/pronoun/subject failure, plus three more in the same 45-event set.

The prose audit counted **268 hardcoded `她`** and **727 hardcoded `他`** across the library. That is the systemic signature: recipe text is often written as if the subject’s sex were fixed, while casting allows either. `{subjectPronoun}` exists but is not used consistently. A fix at the composer level (never emit a gendered pronoun from an unrestricted role; always use the token) would remove a large fraction of these failures.

### 3.2 Effects invisible, contradicted, or replaced by a different event

The engine commits specific effects; the prose often does not show them, or shows something else. At least **9 of 20** sampled events have this problem.

| Event | Evidence | Recorded effect / conflict |
|---|---|---|
| `evt:world-vienna-1912:012949` / `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` | “**Anton Stein把三克朗押金数了两遍**……” | Effects: `cash -8` “住院押金和住院用品”. The text’s 3 kronen contradicts the committed 8. |
| `evt:world-vienna-1912:005555` / `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` | “**有人**把话讲得慢，一句是一句……最后伸手接了那束花。” | Effects: `cash -0.4`, `relation friend`, `mood +0.08`. No named actor, no purchase, no account settled, no relation shown. |
| `evt:world-vienna-1912:001128` / `vienna-childhood-friends.hidden-book/book-confiscated` | “书就搁在讲台上，**谁也没碰**。” | Effect: `mood -0.05` “书被没收并罚擦黑板”. The text says the opposite of the recorded consequence. |
| `evt:world-vienna-1912:004127` / `p9-social-tenement-neighbors.gramophone-wall/gramophone-wall.cotton-in-ears` | “Luise Kral扫自己门前时把它们拢到墙角，没多看一眼。” | Effect: `cash -0.05` “在药房买棉花塞耳朵”. No cotton, no pharmacy, no Matthias. |
| `evt:world-vienna-1912:005627` / `vienna-parish-aid.rent-box/rent-box.refuse` | “Franz Lechner才去看煤箱……肥皂的气味很淡，却把整个厨房压住了。” | Flag: `parish_refused_aid` “当面推回了圣文森特会的篮子”. The refusal never happens in the text. |
| `evt:world-vienna-1912:009570` / `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` | “侍者把**第三把椅子**搬过来时……两杯咖啡的价钱” (effect) | Effects: `cash -0.4` for two cups. The title says “第三杯 Melange”; the text mentions a third chair, not a third cup. |
| `evt:world-vienna-1912:000732` / `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | “Helene Winter在盆边拧干下一条，抬头说再挂三条就完了。” | Effects: `cash +0.03`, `health -0.03`, `relation`. The three heller and cracked hand are not in the text; the `health` effect is stripped from the excerpt’s effect list. |
| `kernel-civic.leaflet-night` / `civic-leaflet-police` (experiment A) | “第二天，印刷所的门口多了一把**新锁**。” | Effects: condition, flag, relation, reputation, knowledge. There is no lock/security/organization effect. The new lock is an institutional consequence with no recorded state. |
| `r1-work.seamstress-fingers` / `reported-the-injury-to-the-union` | “第二天，车间装了新的**护指板**。” | Effects: flag, role, rival relation, union membership. No organization change, no safety equipment. This is a collective outcome asserted without a mechanism. |

This is the second-most damaging pattern because the product promise is inspectable causality. A beautiful paragraph that hides the committed cash, flag, or institutional change makes the simulator less legible, not more literary.

### 3.3 Template repetition, numeric-name clutter, and repeated scene families

Individually these are texture problems; together they make the world feel generated rather than inhabited.

- **Birth template** repeats across all three excerpt lives: “Anton在Hofer-Wohnung, Leopoldstadt出生……这间住处现在住了3口人。” Then the same frame for Mitzi and Matthias. It is a census line, not a scene.
- **Café template** uses the same title “咖啡馆窗边的第三杯 Melange” for two different outcomes (`talk-tram` and `read-all`). One text has “第三把椅子”, the other “三杯 Melange”; the effect for `talk-tram` is two cups. The template is visible through the fiction.
- **Numeric name suffixes** break period texture: “Mitzi Weiss 2”, “Ferdinand Winter 3”, “Katharina Hofer 2”, “Alois Moser 4”, “Grete Weiss 2”. These read as database keys, not people.
- **Name collisions**: “Emil”, “Emil Lechner”, “Emil Weiss” in the same event; “Mitzi” and “Mitzi Kral” as mother and daughter in `evt:world-vienna-1912:002730`.
- **Audit numbers**: `textAudit` reports 18,193 distinct texts for 25,551 events (reuse ratio 0.288); the top repeated text appears **160** times (“湿床单对折……晾衣绳上的争执”); `vienna-social-movement.recruitment/join-and-carry` appears **510** times, `meeting/speak-and-organize` **395**, `read-and-decline` **321**. `anomalies` reports **382** scene-prefix repeat offenders; Alois Huber 2 alone has **86** `recruitment` scenes, **75** `meeting`, **61** `night-fever`. `integrity.json` finds no exact duplicate texts, but exact-duplicate detection cannot see this template repetition.

### 3.4 Collective/institutional outcomes claimed without effects

Beyond the new lock and the new finger guards above:

- `evt:world-vienna-1912:005627` / `vienna-parish-aid.rent-box/rent-box.refuse` claims a parish refusal in the title and flag, but the text only shows coal scraping and soap smell.
- `evt:world-vienna-1912:002730` / `vienna-family-childbirth/difficult-birth` says “医院又收了一笔钱” but gives no amount and no payment procedure; the effect is `cash -20`.
- `evt:world-vienna-1912:012949` / `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` says the hospital “又收了一笔钱” in the same way; the actual effect is `cash -8`, while the text says 3.
- `evt:world-vienna-1912:000986` / `vienna-school-childhood.spelling-bee/spelling-bee.win` gives a brass cross and a public reputation effect, but the institution (school prize, teacher authority) is only a prop; no record of the award exists beyond reputation.
- `evt:world-vienna-1912:006906` / `vienna-market-household.soup-kitchen/soup-kitchen.keep` is a household refusal, but the excerpt serves Mitzi while the text and effects belong to Alois Moser 4. The “institution” is a pot and a door, not a rule.

### 3.5 Event mechanism absent or implausible

- `evt:world-vienna-1912:001128` / `vienna-childhood-friends.hidden-book/book-confiscated`: the text says the book is left on the desk and “nobody touched it”. The confiscation/punishment mechanism is absent.
- `evt:world-vienna-1912:005555` / `p9-social-relationship-initiative.apology-at-bakery/settle-the-account`: the text has an unnamed “someone” speaking slowly and a bunch of flowers. There is no account, no amount, no prior debt, no named friend.
- `evt:world-vienna-1912:006906` / `vienna-market-household.soup-kitchen/soup-kitchen.keep`: the text is about Alois refusing Mitzi. The effect is food +1 for Alois, relation -0.1, mood -0.05. Mitzi, the excerpt subject, gets nothing and never acts.
- `evt:world-vienna-1912:000607` / `p9-gap-childhood-chores.market-line/line-both-families`: the text shows a queue, a lunch pail, and coins, but never the two families’ bread, the division, or the numeracy act. The effect (`food +2`, `skill numeracy`) is asserted, not dramatized.
- `evt:world-vienna-1912:009570` / `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram`: the text has sugar cubes and a tram map, but the effect is two coffees and a relation. The tram talk is a motif, not a mechanism.

### 3.6 Money scale and period texture

- The clearest hard mismatch is `evt:world-vienna-1912:012949` / `p9-social-family-conflict-care.sick-parent-night/hospital-deposit`: **3 kronen** in prose versus **-8 kronen** in effects. This is not a rounding difference; it changes what the hospital trip costs the household.
- `evt:world-vienna-1912:009570` / `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.talk-tram` says “第三杯 Melange” in the title but the effect is two cups (`cash -0.4`); `evt:world-vienna-1912:010257` / `p9-social-daily-culture.cafe-newspaper/p9-social-daily-culture.cafe-newspaper.read-all` has an effect for **three** Melange but the text shows one cup and a water refill. The café sequence uses “third” as a mood marker, not a countable purchase.
- `evt:world-vienna-1912:001474` / `vienna-life-apprenticeship/printshop-apprentice` pays an apprentice **18 kronen/month** in 1926. The world uses “克朗” across the whole 1912–2000 run, so this may be a deliberate fictional currency; but if the setting is meant to be historical Vienna, the Krone/Schilling transition is invisible. I did not make this the sole reason for a failure, but it weakens period texture.
- `evt:world-vienna-1912:002730` / `vienna-family-childbirth/difficult-birth` and `evt:world-vienna-1912:012949` / `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` both say the hospital charged “another sum” without naming it, while the engine commits 20 and 8 kronen. The reader cannot compare the household’s burden across events.

### 3.7 Vague or generic prose

- `evt:world-vienna-1912:005555` / `p9-social-relationship-initiative.apology-at-bakery/settle-the-account`: “有人把话讲得慢，一句是一句……” — no name, no motive, no object of the apology. This is the weakest text in the sample (18/40).
- `evt:world-vienna-1912:004755` / `p10-migration-tasks.find-lodging/lodging-no-guarantor`: “他站在门口，箱子夹在两腿之间，最后提着箱子走了……” — a generic refusal; the reader cannot tell who “he” is, which lodging, or what the guarantor requirement was.
- `evt:world-vienna-1912:001166` / `statistical_infection`: “……肺炎让身体发热、虚弱，接下来的日子只能卧床。” — a medical summary, not a scene. It is functional as a state change but not literary.
- Birth lines are census summaries, as above.
- `textAudit` also reports **660 short-text events** and an average text length of **117.1**. The prose audit separately reports no authored outcome under 60 characters, so the short event lines are likely generated/statistical; the birth/café templates show the same economy of invention at the scene level.

---

## 4. Rewrites

`docs/v4/phase-12-rewrites.json` contains **12** replacements for composed batch outcomes. All target actions compile with `::`; none of the phase9/phase10 task actions (which lack `::`) were rewritten, even where they are weaker, because the task restricts rewrites to actions containing `::`.

Each rewrite:

- preserves every `{subjectPronoun}` / `{role}` token from the original and adds `{subjectPronoun}` only where the original used a hardcoded gendered pronoun;
- keeps the recorded effect set unchanged;
- makes an invisible cash/health/relation/flag effect visible, or removes a claim the effects do not support;
- is 125–192 Chinese characters, inside the 80–220 bound.

| # | Kernel / outcome | Defect fixed |
|---:|---|---|
| 1 | `r3-teen.first-friend-group` / `split` | The 85-character outcome states the split but never stages it; the friend’s pressure, the subject’s refusal, the missing chair, and the ended friendship now carry `mood`, `flag`, and `relation_end`. |
| 2 | `r1-work.shop-bankruptcy` / `sold-stock-before-seizure` | Hardcoded “她” for the neighbor; `cash +8` now counted; shame corresponds to `reputation -0.04`. |
| 3 | `r1-work.market-stall-allotment` / `pushed-the-cart-to-the-corner` | Hardcoded “她” for the neighbor; `cash -2` now has a named fee; the denial and borrowed porch remain. |
| 4 | `r1-work.unemployment-office` / `hired-as-a-temporary-clerk` | Hardcoded “她”; the 22-kronen wage and the name before No. 97 are now visible. |
| 5 | `r1-work.street-vendor` / `paid-the-hawker-fine` | Hardcoded “她” for the customer; the 3-kronen fine and 10-heller shortchange are concrete. |
| 6 | `r1-work.seamstress-fingers` / `reported-the-injury-to-the-union` | Removes the unsupported “new finger guards”; keeps the union membership and the forelady’s hostility. |
| 7 | `r1-work.coworker-death` / `signed-the-slip-and-fall` | Removes the unsupported widow’s pension; the funeral’s unanswered question carries the concealment. |
| 8 | `r1-work.machine-injury` / `hid-the-injury` | Hardcoded “他”; the 4-kronen deduction and the infected wound are explicit. |
| 9 | `r1-work.bakery-night-batch` / `burned-the-batch` | Hardcoded “他”; the 5-kronen payment, the burn, and the apprentice’s scraping are visible. |
| 10 | `r1-work.restaurant-kitchen` / `scalded-at-the-stove` | Hardcoded “他”; the 1-kronen deduction has a concrete cause (the ruined cloth). |
| 11 | `r1-work.hotel-ring` / `returned-the-ring` | Hardcoded “他”; the manager’s suspicion and the guest’s 4-kronen reward are staged. |
| 12 | `r1-work.commuting` / `slept-past-the-station` | Hardcoded “他”; the 1-kronen excess-fare ticket explains the cash effect. |

The rewrites do not attempt to fix the 16 excerpt events or the four scored experiment events; those are evidence, not editable content for this task. In particular, the 3-vs-8 kronen mismatch in `evt:world-vienna-1912:012949` remains unfixed because its action `p9-social-family-conflict-care.sick-parent-night/hospital-deposit` does not contain `::`.

---

## 5. Candid verdict

**The library is not at the 34/40 threshold.** In this sample: **2 passes out of 20; mean 28.75; pass rate 10%.** The two passes are a clean apprenticeship card and a strong war-ration leaflet. Three more texts are close (33, 32, 32), but close is not pass.

The content is numerous but not yet literary success. The surface audits say:

- 1,011 kernels, 4,065 outcomes;
- 319 composed events in the playtest, 168 distinct kernels, trace coverage 1.0;
- 18,193 distinct texts for 25,551 events, reuse ratio 0.288;
- zero unresolved template tokens, zero literal `None`/`undefined`, zero exact duplicate texts.

Those are real achievements of scale and plumbing. They do **not** establish pronoun agreement, subject attribution, money/effect consistency, or dramatic quality. The `phase-12-consistency.json` check reports zero flags on the 45 sampled events, yet this critique finds wrong-gender pronouns and subject mismatches in the same 45. The automated check is a keyword queue, not a literary verdict.

The main diagnosis is simple: **the prose is often good at the sentence level and wrong at the level of person.** The composer writes a vivid paragraph about whoever is nearest in the participant list, not necessarily the event’s trace subject; when the role is unrestricted, it reaches for a hardcoded `她`/`他`. The second problem is that the prose often withholds the exact thing the engine committed—cash, a flag, a refusal, a new lock, a pension—so the player cannot inspect causality. The third is template repetition and numeric-name clutter, which the exact-duplicate audits cannot see.

Before adding kernels, the project needs a casting/pronoun contract and an effect-to-prose contract:

1. **Casting:** never emit a gendered pronoun unless the role is sex-constrained; use `{subjectPronoun}` everywhere else. If the event text follows a participant other than the trace subject, either mark that explicitly or write the text around the trace subject.
2. **Effect visibility:** for every `cash`, `health`, `condition`, `flag`, `role`, and institutional effect, require a visible correlate in the text (an object, a price, a form, a door, a body) or a deliberate reason for withholding it. Do not claim an institution changed unless an organization/flag effect records it.
3. **Template budget:** cap repeated birth/café/queue frames per person and per scene family; replace numeric suffixes with period-plausible names. The 86-scene repeat for one person is not a content library; it is a loop.

Until those are fixed, more outcomes will increase the count without increasing the number of scenes a reader would remember.

---

## 6. Post-rewrite addendum

Re-read `docs/v4/phase-12-rewrites.json` and the current `text:` lines in the three batch files. **All 12 replacements are present verbatim** (checked by importing `RECIPE_PACKS` and comparing the current outcome text to the JSON replacement string). Every token in the original is still present, and every token in the replacement is either an existing role key or `{subjectPronoun}`; there are no missing or unknown tokens. The applied lines are:

| # | Kernel / outcome | Current file:line | Applied | Tokens |
|---:|---|---|:---:|:---:|
| 1 | `r3-teen.first-friend-group` / `split` | `batch3-child-adolescent-2.ts:689` | exact | OK |
| 2 | `r1-work.shop-bankruptcy` / `sold-stock-before-seizure` | `batch1-work-commerce.ts:840` | exact | OK |
| 3 | `r1-work.market-stall-allotment` / `pushed-the-cart-to-the-corner` | `batch1-work-commerce.ts:953` | exact | OK |
| 4 | `r1-work.unemployment-office` / `hired-as-a-temporary-clerk` | `batch1-work-commerce.ts:1869` | exact | OK |
| 5 | `r1-work.street-vendor` / `paid-the-hawker-fine` | `batch1-work-commerce.ts:1968` | exact | OK |
| 6 | `r1-work.seamstress-fingers` / `reported-the-injury-to-the-union` | `batch1-work-commerce.ts:2590` | exact | OK |
| 7 | `r1-work.coworker-death` / `signed-the-slip-and-fall` | `batch1-work-commerce.ts:1695` | exact | OK |
| 8 | `r1-work.machine-injury` / `hid-the-injury` | `batch1-work-commerce.ts:1755` | exact | OK |
| 9 | `r1-work.bakery-night-batch` / `burned-the-batch` | `batch1-work-commerce.ts:2400` | exact | OK |
| 10 | `r1-work.restaurant-kitchen` / `scalded-at-the-stove` | `batch1-work-commerce.ts:2673` | exact | OK |
| 11 | `r1-work.hotel-ring` / `returned-the-ring` | `batch1-work-commerce.ts:2738` | exact | OK |
| 12 | `r1-work.commuting` / `slept-past-the-station` | `batch1-work-commerce.ts:3560` | exact | OK |

### 6.1 Rewritten outcomes, re-scored

Same rubric and threshold: 0–10 per dimension, pass at **≥34**.

| # | Kernel / outcome | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---:|---:|---:|---:|---:|:---:|
| 1 | `r3-teen.first-friend-group` / `split` | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 2 | `r1-work.shop-bankruptcy` / `sold-stock-before-seizure` | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 3 | `r1-work.market-stall-allotment` / `pushed-the-cart-to-the-corner` | 9 | 5 | 8 | 8 | 30 | Fail |
| 4 | `r1-work.unemployment-office` / `hired-as-a-temporary-clerk` | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 5 | `r1-work.street-vendor` / `paid-the-hawker-fine` | 9 | 7 | 8 | 9 | 33 | Fail |
| 6 | `r1-work.seamstress-fingers` / `reported-the-injury-to-the-union` | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 7 | `r1-work.coworker-death` / `signed-the-slip-and-fall` | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 8 | `r1-work.machine-injury` / `hid-the-injury` | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 9 | `r1-work.bakery-night-batch` / `burned-the-batch` | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 10 | `r1-work.restaurant-kitchen` / `scalded-at-the-stove` | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 11 | `r1-work.hotel-ring` / `returned-the-ring` | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 12 | `r1-work.commuting` / `slept-past-the-station` | 9 | 6 | 8 | 8 | 31 | Fail |

- **Rewritten pass count: 9/12 (75%).**
- **Rewritten mean: 33.58/40** (sum 403).
- Fails: #3 market-stall low-cash (30), #5 street-vendor fine (33), #12 commuting (31).

### 6.2 The four composed events, re-scored with current recipe texts

| Event / current action | Sp | Dr | Ch | Ca | Total | Result |
|---|---:|---:|---:|---:|---:|:---:|
| `kernel-civic.leaflet-night::ctx-vienna-1912::milieu-printshop/civic-leaflet-police` | 9 | 8 | 8 | 6 | 31 | Fail |
| `kernel-civic.leaflet-night::ctx-vienna-war-1915::milieu-factory::civic-leaflet-war/civic-leaflet-war-ration` | 9 | 8 | 9 | 8 | **34** | **Pass** |
| `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` | 9 | 5 | 8 | 8 | 30 | Fail |
| `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/bought-the-middle-place` | 9 | 8 | 8 | 8 | 33 | Fail |

- **Composed pass count: 1/4 (25%).**
- **Composed mean: 32.00/40** (sum 128).
- The war-ration leaflet passes. The police leaflet still fails because “第二天，印刷所的门口多了一把新锁” is an institutional consequence with no corresponding effect (causality 6). The low-cash stall is now pronoun-clean and cash-consistent but has almost no dramatic turn (drama 5). The high-cash bribe is vivid but remains at 33 because the `reputation -0.04` never becomes visible.

### 6.3 Combined post-rewrite check and limits

Across the 12 rewritten outcomes plus the 4 composed events:

- **16-event pass count: 10/16 (62.5%).**
- **16-event mean: 33.19/40** (sum 531).
- This is **not** a full-library pass. It is a selected 16-event check: 12 rewrites chosen for prior defects, plus four composed events already sampled. Only the four composed events overlap with the original 20-event sample, so the comparison with the original 28.75 mean is directional, not a matched before/after measurement.

The rewrites fixed the most mechanical failures: the hardcoded `她`/`他` in the 12 targets, the invisible cash amounts, the false “new finger guards”, and the false widow’s pension. They did not fix the unrewritten excerpt events; the 3-vs-8-kronen mismatch in `evt:world-vienna-1912:012949`, the “谁也没碰” contradiction in `evt:world-vienna-1912:001128`, and the unnamed “有人” apology in `evt:world-vienna-1912:005555` all remain as previously scored.

### 6.4 Remaining hard failures

1. **Low-drama incidents still pass the specificity bar but not the drama bar.** `pushed-the-cart-to-the-corner` (30) and `slept-past-the-station` (31) are now clean, concrete, and causally consistent, but they are errands, not turns. The rewrite can fix a pronoun; it cannot invent stakes the outcome does not have.
2. **Unsupported institutional claims remain.** The police leaflet (31) still adds a new lock with no security/organization effect. This is the clearest remaining “collective outcome without a recorded mechanism.”
3. **Near misses are still failures.** `paid-the-hawker-fine` (33) and `bought-the-middle-place` (33) are competent but each lacks one dimension: the fine is episodic, and the bribe’s reputation loss is invisible.
4. **The unrewritten 16-event sample still carries the old failures.** This includes the money contradiction at `evt:world-vienna-1912:012949`, the wrong-subject pharmacy scene at `evt:world-vienna-1912:003839`, and the vague bakery apology at `evt:world-vienna-1912:005555`. Do not read 10/16 as a library-wide pass.

---

## 7. Post-fix re-score (regenerated playtest, 8 new excerpts + 4 composed)

This section supersedes section 6.2 for the four composed events; section 6 remains the pre-fix record. Re-read the regenerated `docs/v4/playtest.json` (`generatedAt` 2026-11-04T07:23, 88 years, 18,040 events, 3 excerpt lives × 15 events) and the current recipe `text:` lines. I did **not** reuse or re-score any old excerpt. The eight excerpts below were chosen to include both clean subject cases and residual subject/pronoun failures; this is a diagnostic sample, not a random sample.

**Applied-text check.** Of the 12 entries in `docs/v4/phase-12-rewrites.json`, **11 still match the batch files verbatim**. The twelfth, `pushed-the-cart-to-the-corner`, has been superseded by one of the additional market/leaflet revisions: the current line adds “条件是替她看两小时孩子” and “{subject}看了看天”. The JSON entry is therefore stale for that outcome; scoring below uses the current recipe text. The police leaflet and high-cash market outcome also carry the additional revisions: the police ending no longer claims a new lock, and the high-cash outcome adds the market woman, the rival’s curse, and the market master grinding chalk.

### 7.1 Eight new excerpts

| # | Date | Event / action | Trace subject | Subject/pronoun check | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | 1918-01 | `evt:world-vienna-1912:000541` / `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | Anton (male, 6) | Names Anton, then “**她**踮脚” | 9 | 5 | 8 | 5 | 27 | Fail |
| 2 | 1919-01 | `evt:world-vienna-1912:000661` / `p9-gap-childhood-chores.market-line/line-both-families` | Anton (male, 7) | Names Anton, then “Emil Weiss塞给**她**” | 8 | 5 | 7 | 4 | 24 | Fail |
| 3 | 1953-01 | `evt:world-vienna-1912:007259` / `p10-migration-tasks.move-district/move-share-smaller-room` | Mitzi (female, 41) | Does **not** name Mitzi; “**他**把工具袋……” | 8 | 6 | 7 | 5 | 26 | Fail |
| 4 | 1928-08 | `evt:world-vienna-1912:001857` / `r3-teen.parent-remarriage::ctx-vienna-reform-1930::milieu-tenement/accepts` | Lena (female, 16) | Names Lena, but `parent` and `stepparent` are both **Josef Bauer** | 8 | 7 | 5 | 5 | 25 | Fail |
| 5 | 1930-10 | `evt:world-vienna-1912:002138` / `major-crisis.press-accident/light-duty` | Hermann Lechner (male, 43) | Names Hermann throughout; Lena is participant | 9 | 9 | 9 | 8 | **35** | **Pass** |
| 6 | 1937-09 | `evt:world-vienna-1912:003456` / `major-crisis.press-accident/hand-crushed` | Friedrich 2 (male, 19) | Names Friedrich throughout; Lena is participant | 9 | 9 | 8 | 8 | **34** | **Pass** |
| 7 | 1962-12 | `evt:world-vienna-1912:009310` / `vienna-housing-move.rent-notice/rent-notice-neighbors-together` | Mitzi (female, 50) | Names Mitzi and Rosa Weiss 2; correct | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 8 | 1938-05 | `evt:world-vienna-1912:003585` / `vienna-church-community.saint-vincent-box/box-request-granted` | Otto Weiss (male, 29) | Names Otto and Mitzi; correct | 9 | 6 | 8 | 7 | 30 | Fail |

- **New-excerpt pass count: 3/8 (37.5%).**
- **New-excerpt mean: 29.38/40** (sum 235).

### 7.2 Four composed events, current recipe texts

| Event / current action | Sp | Dr | Ch | Ca | Total | Result |
|---|---:|---:|---:|---:|---:|:---:|
| `kernel-civic.leaflet-night::ctx-vienna-1912::milieu-printshop/civic-leaflet-police` | 9 | 8 | 9 | 8 | **34** | **Pass** |
| `kernel-civic.leaflet-night::ctx-vienna-war-1915::milieu-factory::civic-leaflet-war/civic-leaflet-war-ration` | 9 | 8 | 9 | 8 | **34** | **Pass** |
| `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/pushed-the-cart-to-the-corner` | 9 | 6 | 8 | 7 | 30 | Fail |
| `r1-work.market-stall-allotment::ctx-vienna-1912::milieu-tenement/bought-the-middle-place` | 9 | 8 | 9 | 9 | **35** | **Pass** |

- **Composed pass count: 3/4 (75%).**
- **Composed mean: 33.25/40** (sum 133).
- Against the previous composed scores: police leaflet **31 → 34**, war-ration **34 → 34**, low-cash **30 → 30**, high-cash **33 → 35**. The police leaflet now passes: removing the unsupported new lock and showing the printshop’s suspicion makes the `reputation`/`knowledge` effects legible. The high-cash bribe also passes: the market woman moving her scale and the rival’s curse make the reputational cost visible. The low-cash stall remains at 30: it now has a real trade-off (porch space for two hours of childcare), but the `她` for an unrestricted `neighbor` is still a hardcoded pronoun and the scene remains a denial, not a turn.

### 7.3 Twelve-event aggregate and subject-identity judgment

- **12-event pass count: 6/12 (50%).**
- **12-event mean: 30.67/40** (sum 368).
- This is not comparable to the previous 16-event check: the excerpt sample is new and deliberately includes residual failures. Do not read 6/12 as a full-library pass.

**Subject identity did improve, but the fix is partial.**

- **Improved:** 7 of the 8 scored excerpt texts name the trace subject; the two strongest scenes (#5 Hermann Lechner, #6 Friedrich 2) now follow the trace subject even though the excerpt’s focal person is a participant. #7 names Mitzi as the actor in a collective rent scene. The police leaflet no longer substitutes a generic institutional “new lock” for the subject’s actual consequence, and the high-cash market scene now shows social reaction around the named subject.
- **Still broken:** #1 and #2 name Anton but use `她`; #3 drops Mitzi entirely and uses `他`; #4 names Lena but casts the same `person-josef-bauer` as both `parent` and `stepparent`, so “Josef Bauer” appears three times as if he were multiple people. At least three more excerpts in the same 45 show the same classes: `evt:world-vienna-1912:001537` never names Mitzi, `evt:world-vienna-1912:010521` uses “等他回到咖啡馆” for Mitzi Lechner, and `evt:world-vienna-1912:012197` never names trace subject Anton Lechner 2 at all.
- **Net:** wrong-subject prose is reduced in the strong scenes, but not eliminated in the excerpt set; wrong-gender pronouns are reduced, but 3 of these 8 scored excerpts still contain one, and at least five are visible across the full 45.

### 7.4 Remaining hard failures

1. **Pronoun agreement is still not enforced.** `evt:world-vienna-1912:000541` (“她” for Anton), `evt:world-vienna-1912:000661` (“她” for Anton), and `evt:world-vienna-1912:007259` (“他” for Mitzi / no named subject) are hard failures, not near misses.
2. **Partner/role casting still collides.** `evt:world-vienna-1912:001857` puts the same `person-josef-bauer` in both `parent` and `stepparent`; the text cannot distinguish the two roles. This is a casting/data failure, not a prose-style issue.
3. **Wrong or absent subject survives in participant events.** `evt:world-vienna-1912:007259` never returns to Mitzi; `evt:world-vienna-1912:010521` follows Mitzi Lechner and uses `他`; `evt:world-vienna-1912:012197` is about Gustav Kral and the coal cart, not trace subject Anton Lechner 2. The new strong scenes show the engine can follow the trace subject; these cases show it still does not always do so.
4. **Low-drama everyday outcomes still fail even when the subject is correct.** #1/#2 have correct names but only chores and queues; the cash, health, food, and numeracy effects remain mostly invisible. The low-cash market outcome has the same problem: concrete objects, weak turn.
5. **Composed near miss.** The low-cash market outcome remains at 30 because of the hardcoded `她` and the absence of a decisive change. The police and high-cash outcomes now pass; the war-ration leaflet still passes.
6. **Rewrite JSON drift.** `docs/v4/phase-12-rewrites.json` still contains the pre-additional version of `pushed-the-cart-to-the-corner`; the current recipe text adds the childcare condition and “看了看天”. Regenerate or explicitly mark that JSON entry as superseded before using it as a migration source.

The engine fix improved the worst class of wrong-subject prose in the strong focal/participant scenes, but it did not make pronoun agreement or partner casting safe. More rewrites are not the first blocker now; the remaining failures are in casting, pronoun rendering, and the dramatic stakes of low-event outcomes.

---

## 8. Final re-score (final playtest, 12 new excerpts)

Final `docs/v4/playtest.json`: `generatedAt` 2026-11-04T07:45, 88 years, **20,186 events**, **443 composed events** (203 distinct kernels, trace coverage 1.0), text reuse ratio **0.1777**, **0 unresolved template tokens**, and no literal `None`/`undefined`. Those are library-level improvements; they are not excerpt-level literary scores.

This round scores **12 committed events from the new excerpts only**. No composed events are included, and no old excerpt was re-scored. The sample is diagnostic: it includes clean subject cases, residual pronoun failures, and everyday scenes where effect visibility is the main question.

| # | Date | Event / action | Trace subject | Subject/pronoun check | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | 1918-01 | `evt:world-vienna-1912:000544` / `p9-gap-childhood-chores.laundry-help/laundry-three-heller` | Anton (male, 6) | Names Anton; “**他**踮脚” now agrees | 9 | 5 | 8 | 6 | 28 | Fail |
| 2 | 1919-01 | `evt:world-vienna-1912:000678` / `p9-gap-childhood-chores.stay-after-school/stay-twice-cleaning` | Anton (male, 7) | Names Anton; “顺着**她**写歪的那一列” is ambiguous/likely wrong | 9 | 5 | 8 | 5 | 27 | Fail |
| 3 | 1921-01 | `evt:world-vienna-1912:000980` / `vienna-life-child-labour/folds-notices` | Anton (male, 9) | Names Anton throughout; correct | 9 | 6 | 9 | 8 | 32 | Fail |
| 4 | 1923-07 | `evt:world-vienna-1912:001303` / `kernel-edu.lesson-recitation::ctx-vienna-medical-1930::milieu-school::edu-recitation-medical/edu-recitation-medical-check` | Franz (male, 11) | Names Franz throughout; correct | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 5 | 1927-01 | `evt:world-vienna-1912:001956` / `p9-childhood-apprenticeship.cover-for-sibling/forewoman-catches` | Hedwig (female, 15) | Does not name Hedwig; “**他**没买票” and “听**他**讲完” are wrong | 7 | 7 | 7 | 5 | 26 | Fail |
| 6 | 1946-12 | `evt:world-vienna-1912:006025` / `vienna-parish-aid.soup-kitchen/soup-kitchen.help-wash` | Hedwig (female, 34) | Names Hedwig; correct | 9 | 6 | 9 | 7 | 31 | Fail |
| 7 | 1973-01 | `evt:world-vienna-1912:012922` / `task-vienna-daily-culture.public-lecture/public-lecture.draw-pipe` | Hedwig (female, 61) | Names Hedwig, then “请**他**上去画 / **他**画完” is wrong | 9 | 7 | 8 | 6 | 30 | Fail |
| 8 | 2000-03 | `evt:world-vienna-1912:020065` / `vienna-elder-bereavement.empty-room/empty-room.keep-room` | Hedwig (female, 88) | Names Hedwig; correct | 9 | 7 | 9 | 7 | 32 | Fail |
| 9 | 1937-07 | `evt:world-vienna-1912:003784` / `vienna-printshop-daily.wage-shortfall/wage-take-it` | Emil (male, 25) | Names Emil; correct | 8 | 6 | 8 | 7 | 29 | Fail |
| 10 | 1941-02 | `evt:world-vienna-1912:004740` / `vienna-family-fatherhood/child-and-mother-weak` | Emil (male, 29) | Names Emil and Elisabeth; correct | 9 | 9 | 9 | 8 | **35** | **Pass** |
| 11 | 1944-08 | `evt:world-vienna-1912:005367` / `vienna-family-childbirth/stillbirth` | Elisabeth Bauer (female, 32) | Names Elisabeth and Emil; correct | 9 | 9 | 9 | 7 | **34** | **Pass** |
| 12 | 1958-04 | `evt:world-vienna-1912:009043` / `p9-gap-adult-ordinary-day.wedding-procession/wedding-procession.dragged-in` | Emil (male, 46) | Names Emil, then “给**她**倒酒 / **她**咬了一口” is wrong | 9 | 6 | 8 | 5 | 28 | Fail |

- **Final pass count: 3/12 (25%).**
- **Final mean: 30.50/40** (sum 366).
- Dimension means: specificity **8.75**, drama **6.75**, character/period **8.42**, causality **6.58**.
- Near misses: `000980` child labour **32**, `020065` empty room **32**, `006025` soup kitchen **31**.

### 8.1 Did the subject/pronoun fixes improve the excerpts?

**Subject selection improved substantially. Pronoun agreement did not fully.**

- **Subject identity is now correct in all 12 scored texts.** Each scene centers its trace subject; the old pattern of writing a vivid paragraph about a different named participant does not appear here. `001303` stays with Franz’s medical inspection, `004740` stays with Emil and the failing mother, `005367` centers Elisabeth’s stillbirth, and `020065` stays with Hedwig in the empty room.
- **Pronoun agreement is still a hard bug.** Four of the twelve have a wrong-gender or ambiguous pronoun: `001956` (“他没买票” for Hedwig), `012922` (“请他上去画” for Hedwig), `009043` (“给她倒酒 / 她咬了一口” for Emil), and `000678` (“她写歪的那一列” after Anton is the one writing). The first three are unambiguous; the fourth is at best ambiguous.
- **A second subject/casting residue remains outside the 12.** `evt:world-vienna-1912:013797` introduces “玛尔塔” who is not in the participant cast, and `evt:world-vienna-1912:010138` introduces “汉斯” who is not in the cast. These are not pronoun errors, but they show that character identity is not yet fully controlled by the cast.

### 8.2 Main remaining blocker

**The main blocker is no longer subject selection; it is effect visibility / causal legibility.**

Specificity is high (8.75) and character/period is high (8.42), but causality is the lowest dimension (6.58). The prose repeatedly withholds the committed effect:

- `000544`: the three-heller payment and cracked hand are absent; only the laundry chore is shown.
- `000678`: the cleaning punishment is visible, but the skill/relation effects are not.
- `006025`: the soup-kitchen work is physical, but the food and two relation effects remain off-page.
- `020065`: the cold room and three-day coal supply are strong, but the cash/health/relation/flag set is only implied.
- `003784`: the lighter wage envelope and two rolls are concrete, but no amount or wage consequence is named.
- `009043`: the wedding food is vivid, but the relation effect and Emil’s wrong-gender pronoun pull the scene apart.

This is also why drama is only 6.75: many scenes are well-observed tasks, not turns. The subject fix has made the prose point at the right person; the next problem is making the committed consequence visible in that person’s scene.

**Do not read 3/12 as a full-library pass.** It is a 12-excerpt diagnostic sample that deliberately includes residual pronoun failures and low-drama everyday events. The library-level counts (443 composed events, 0.1777 reuse, 0 unresolved tokens) show real improvement in generation and plumbing; they do not establish that the excerpt prose is at the 34/40 threshold.
