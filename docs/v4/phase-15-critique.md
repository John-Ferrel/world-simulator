# Phase 15 — Independent Critique / Playtest

Date: 2026-11-05  
Reviewer: independent Critic/Playtester (no code or content edits)  
Primary evidence: `docs/v4/phase-15-phase15-a.md` / `.json` (16,056 events, 383 persons, 60 years), `docs/v4/phase-15-phase15-b.md` / `.json` (21,605 events, 478 persons, 60 years), `docs/v4/phase-15-experiments.json`, `docs/v4/phase-15-history-coverage.md`, `docs/v4/phase-15-report.md`, `docs/v4/phase-15-mechanics-review.md`.

## 0. Method and an artifact warning

I read the complete subject-event lists for **A Klara (152 events)**, **A Josef (180)**, **A Hedwig (145)** and **B Klara (216)**, plus the short **B Hedwig (8)**, and used **A Lena**, **A Anton**, **B Mitzi** and **A Helene Weiss** for endings, silence and state counts. I read the state snapshots, `positions`, `phase15ActionCounts`, `historyReviews`, all six experiments and the report. I scored 15 events on the Phase 14 4×10 rubric (Specificity, Drama, Character, Causality; pass ≥34) and four lives on the 6×5 whole-life rubric (Specificity, Causality, Character continuity, Relationship continuity, Historical texture, Dramatic shape; 30 max).

**The dossiers changed under me.** The 15:00:11 generation of `phase15-a` contained **Berta Winter** (116 events). It was overwritten at 15:26 by a run that replaces her with Helene Weiss. I read Berta's full life before the overwrite: it had a `war-widow-with-children` state created by a pension scene with no husband death, a 1939 remarriage that removed the state, a secret affair with Rosa Bauer, a public scandal, and a statistical old-age death. Those exact ids are no longer in the final file, so I do **not** use them as scored evidence. The same failure is visible in the retained A Josef life, which is quoted below. The churn is itself a reproducibility problem: the report, the dossier and this critique can refer to different worlds under the same filenames.

All ids below are `evt:world-vienna-1912:<suffix>` unless stated otherwise.

---

## 1. Headline verdict and scores

**Phase 15 is a real mechanism, not a content trick. It is not yet a game that reliably produces good lives.**

The state layer genuinely persists education, apprenticeship, widowhood, investigation, offices and a curse (the curse as a state, not yet as a consequence); the controlled tests and selected lives prove that much. But the whole-life quality did not rise. My four scored lives average **17.25/30**, below Phase 14's four-life mean of 19.0, and none reaches the 26/30 “reads as a life” gate. The new state text is the weakest layer in the 15-event sample: state ticks average 16.0/40 and state reactions 13.7/40, while the authored composed kernels average 27.0/40. The best moments are still authored scenes (the festival king, the real tiny office), not state ticks. The report is unusually candid about many limits, but it overstates the curse and parts of the historical table.

### Whole-life scores

| Life | Specificity | Causality | Character | Relationships | Historical texture | Dramatic shape | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| A Klara (1912–1957, worker → offices) | 4 | 3 | 3 | **1** | 4 | 4 | **19/30** |
| A Josef (1912–1959, craft wish → war widow) | 3 | **1** | **1** | **1** | 4 | 2 | **12/30** |
| A Hedwig (1912–1966, ordinary life + curse) | 4 | 2 | 3 | 2 | 4 | 3 | **18/30** |
| B Klara (1912–1972, stage → office) | 4 | 3 | 3 | 2 | 4 | 4 | **20/30** |
| B Hedwig (1912–1918, short life) | 3 | **0** | 2 | 2 | 2 | 1 | **10/30** |

Mean of the four full lives: **17.25/30**. Mean including the short life: **15.8/30**. Phase 14's four lives were 19.0; this is not a like-for-like sample, but there is no evidence of a higher floor.

### Why these scores

- **A Klara, 19.** The power arc is real: `003111` creates a party and a `主席` position with `预算/签字/人事`; `003572` takes over a club; `003824` creates a `公共礼仪官` office; `005886` founds a second `权力俱乐部`; `006019` contains the best political insight in either dossier (“真正的权力不在主席的椅子上，而在会前对名单的修改”). But the child `Anton 2` born in `003085` is never seen again, the office authority is never exercised, and the five identical “第一次真正坐在一张有权力的桌子后面” reactions (`003573`, `003825`, `005887`, `006020`, `008385`) turn a career into a repeated assertion. Relationship continuity is 1.
- **A Josef, 12.** The craft wish is a generic tick; the only strong spine is war and the `war-widow-with-children` state, which is applied to a male subject who is told he has a husband (`005245`) and then receives a widow pension for fifteen years (`005304` … `009642`) — even though he marries Friedrich Hofer 2 in `006837` (1945.01) and the state remains `remarried:false`. The header says he died in 1959.12, but his last event is a river walk in 1959.10 (`011378`) and there is no death event. Children `Alois Bauer` (`002870`) and `Friedrich Bauer` (`004375`) disappear. The subject is misgendered in the last event (“她一路数着路灯”).
- **A Hedwig, 18.** The tenement, hospital, painting commission, sanatorium and library scenes are specific. The curse does react twice (`010438`, `011221`), but it reacts to its own aftermath, not to the betrayal, and the committed effect is only `mood -0.06`; the fever is prose, not a health fact. The ending is `statistical_death/other` (`013707`). Children and partners recur just enough to show the gap: `Anton Winter` (`003313`) is born, a marriage and divorce follow, and the child is not a durable cast member.
- **B Klara, 20.** This is the best Phase 15 showcase. The apprenticeship contract ticks (`002572`, `002821`) and transitions to `journeyman` (`002882`); the stage title (`003284`) is mechanically distinct from the later real office (`016868`); the `temporarily chair` positions (`010142`, `018529`) are real records. But `Education: apprenticeship 0` remains, because the journeyman transition commits no `education` effect; the active `stage-sovereign` from 1931.03 is still active in 1972.09, 41 years after a 3–24 month definition; children `Anton 2` and `Berta 2` disappear (Mitzi 2 and Maria 2 appear only sporadically); and the 1972.09 last event is a winter-stairs fragment, not a horizon.
- **B Hedwig, 10.** Eight events, a `cursed-by-wish` state with zero ticks, and a death in `Haus der Tante in Klosterneuburg` (`000715`) although she lives in `Leopoldstädter Zinshaus, gemeinsamer Gang`. The curse never touches a betrayer; the death is in the wrong place. A short life can be ordinary, but this one is not coherent.

---

## 2. Event-level review

The sample is purposive, not a library estimate: 7/15 are state-layer events and 3/15 concern endings (two death events and one moving-day whose death is absent), both far above their share of the lives. It is a stress test of the new layer. Pass threshold is 34/40, as in Phase 14.

| # | Life | Date | Event id | Action / type | Category | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | A Josef | 1940.01 | `005304` | `state_tick:war-widow-with-children/pension-year/paid` (state tick) | pension | 6 | 2 | 1 | 1 | **10** | Fail |
| 2 | B Klara | 1931.01 | `003351` | `state_tick:stage-sovereign/performance-run/lost-the-crowd` (state tick) | stage | 8 | 6 | 7 | 3 | **24** | Fail |
| 3 | B Klara | 1955.01 | `012563` | same tick, same text, 24 years later (state tick) | stage | 6 | 4 | 5 | 3 | **18** | Fail |
| 4 | A Hedwig | 1958.01 | `011120` | `state_tick:under-investigation/case-progress/evidence` (state tick) | legal | 4 | 3 | 5 | 0 | **12** | Fail |
| 5 | A Hedwig | 1957.01 | `010438` | `state_reaction:cursed-by-wish/curse-betrayal` (state reaction) | curse | 7 | 6 | 7 | 1 | **21** | Fail |
| 6 | A Klara | 1950.01 | `008385` | `state_reaction:wish-power/power-office` (state reaction) | power | 2 | 1 | 3 | 0 | **6** | Fail |
| 7 | B Klara | 1964.08 | `016869` | same reaction after a real office (state reaction) | power | 3 | 3 | 3 | 5 | **14** | Fail |
| 8 | A Josef | 1940.04 | `005245` | `r15-fam.widow-pension/.../pension-denied` (composed) | family | 7 | 5 | 1 | 0 | **13** | Fail |
| 9 | B Klara | 1931.03 | `003284` | `absurd15-wish.crown-for-a-day/.../festival-king-only` (composed) | absurd power | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 10 | B Klara | 1964.08 | `016868` | `absurd15-wish.crown-for-a-day/.../real-tiny-office` (composed) | absurd power | 9 | 8 | 8 | 9 | **34** | **Pass** |
| 11 | B Klara | 1957.12 | `013285` | `r15-love.borrowed-room/.../refuses` (composed) | love | 8 | 7 | 7 | 5 | **27** | Fail |
| 12 | A Klara | 1932.01 | `003085` | `vienna-family-childbirth/son-born` (base) | birth | 8 | 6 | 7 | 7 | **28** | Fail |
| 13 | A Lena | 1929.01 | `002320` | `statistical_death/violence` (base) | death | 3 | 1 | 2 | 0 | **6** | Fail |
| 14 | B Hedwig | 1918.10 | `000715` | `statistical_death/pneumonia` (base) | death | 5 | 2 | 4 | 1 | **12** | Fail |
| 15 | B Mitzi | 1950.07 | `010151` | `vienna-housing-move.moving-day/.../sell-up` (base) | leaving | 8 | 6 | 7 | 7 | **28** | Fail |

**Aggregate:** 2/15 pass (13.3%), mean **19.13/40**. By layer:

| Layer | Events | Mean /40 | Passes |
|---|---:|---:|---:|
| State tick | 4 | **16.0** | 0/4 |
| State reaction | 3 | **13.7** | 0/3 |
| Composed kernel | 4 | **27.0** | 2/4 |
| Base | 4 | **18.5** | 0/4 |

The new state layer is the weakest text in the sample. The authored absurd kernels are the strongest. This is the opposite of the design's assumption that state is the missing middle layer.

### Notes on the strongest and weakest events

- **#9 festival king, 34.** “代表团没有带来任命书，只带来一套戏服……掌声是真的，王冠是假的，晚饭也是真的。” The costume, the applause, the false crown and the real meal are exact. It correctly creates a `stage-sovereign` state, not a `position`. The only flaw is that the 1931.03 event is preceded by a stage tick in 1931.01.
- **#10 real tiny office, 34.** “职位不大，薪水也不高，但上面有印章，有任期，有一间可以锁门的办公室。Klara把任命书读了三遍，才确认这不是戏票。” This is a genuine real-office scene: it creates `市民礼仪处`, a `公共礼仪官` position with three authorities and a wage. It is the best proof that the wish can produce a real, bounded office. The later dossier does not use the office, but the scene itself is strong.
- **#8 widow pension, 13.** “Josef收到一封退件，上面说材料不足。Josef把丈夫的军帽从柜子里拿出来……” The family kernel is specific about the office, the queue and the cap, but the cap belongs to no dead husband, and the state it creates will ignore the 1945 marriage. This is exactly the family-continuity mechanism the phase promised, failing at the first step.
- **#11 love refused, 27.** “Friedrich Stein在第三次见面时说不能再这样。Klara没有挽留，只把对方落下的手套收进抽屉；后来每次打开抽屉，都能看见那双手套，却想不起最后一次见面时对方穿的是什么外套。” The glove and the forgotten coat are good; but the committed effects are only `relation acquaintance` and `flag refused_secret_meeting`. There is no `forbidden-attachment` state, no reciprocity/exposure/jealousy, and no later consequence. It is a scene, not a love mechanism.
- **#1 war widow, 10.** “Josef在办事处排了一上午，终于领到这个月的抚恤金……把剩下的压进铁盒。” The office detail is fine; the subject is wrong. The state is added in `005245` four months later, with “Josef把丈夫的军帽从柜子里拿出来”; there is no husband death anywhere. The event is mechanically impossible and the prose never notices.
- **#5 curse reaction, 21.** “背叛发生后的夜里，Hedwig自己发起了高烧；Friedrich Berg第二天照常出门。” The image is good, but the cause is `010437`, an investigation scene, not the betrayal `010625`, which happens four months later. The effects are only `mood -0.06`. The curse is a mood, not a cross-person mechanism.
- **#6 power office, 6.** “Klara第一次真正坐在一张有权力的桌子后面。” In 1950, sixteen years after `003573` said the same sentence. No table, no room, no person, no decision. It is a pure assertion.
- **#13 Lena death, 6.** “Lena在Haus der Tante in Klosterneuburg卷入一场冲突……” She has lived in `Leopoldstädter Zinshaus, gemeinsamer Gang` for all 17 events. The death is in a place she never lived, with no prior conflict and no cause chain.

---

## 3. The five most important remaining failures

### 3.1 State lifecycle is causally inverted and some states never expire

**Evidence.**
- A Josef: `005304` (1940.01) is a `state_tick:war-widow-with-children/pension-year/paid`: “Josef在办事处排了一上午，终于领到这个月的抚恤金……” But the state is only added by `005245` (1940.04): “Josef收到一封退件……Josef把丈夫的军帽从柜子里拿出来……” The tick mutates `pensionStatus denied -> paid` on `state:world-vienna-1912:41` before that instance exists.
- B Klara: `003351` (1931.01) is `state_tick:stage-sovereign/performance-run/lost-the-crowd`: “新排的戏没有坐满……经理说下一轮要换一个更年轻的国王。” The stage state is added by `003284` (1931.03), “代表团没有带来任命书，只带来一套戏服”.
- B Klara's active `stage-sovereign` is `since 1931.3`, role `节日国王`, `performances 0`, and still active in the 1972.09 state snapshot, 41 years after a definition whose design duration is 3–24 months. A second instance is `since 1955.12, endedAt 1955.1`; a third is `since 1964.10, endedAt 1964.1`. The delivered B state snapshot itself contains both inversions.
- A Hedwig's `cursed-by-wish` is `since 1912.1`, still active at her 1966.1 death, `ticks 0`, severity 0.6, triggers 0. That is 54 years against a 12–240 month definition.
- Death closes positions (A Klara's three positions end in 1957.11) but **not person states**. A Klara's `wish-power`, A Josef's five states (`wish-craft`, `public-scandal`, `war-widow-with-children`, `factory-employment`, `grief`) and A Hedwig's three states (`cursed-by-wish`, `under-investigation`, `public-scandal`) are all `active` in their final snapshots after the header death dates. A dead person can still carry a wish, a pension, a factory job and a political file into the ending. The mechanics review warned about this (`B3`); the delivered JSON still shows it.

**Scale.** In the 17 dossier lives, **19 state tick/reaction events precede the `state_add` they mutate** (A: 9; B: 10). The pattern is systematic: a state added in March, July, August or November gets a January tick before it. The likely cause is the annual tick pass stamping all ticks at January and running before same-year scenes, plus expiry using year-start dates. The result is a journal where causes follow effects.

**Classification: state-layer bug.** This is the highest-leverage failure because every state's causal readability depends on it.

### 3.2 A war-widow state invents a dead husband and ignores a real marriage

**Evidence.** `005245` (1940.04) is `r15-fam.widow-pension/.../pension-denied` in `milieu-army`:

> “Josef收到一封退件，上面说材料不足。Josef把丈夫的军帽从柜子里拿出来，放在桌上看了很久；Luise Bauer问那是什么，Josef说是一件旧衣服。”

Effects: `state_add war-widow-with-children state:world-vienna-1912:41`, parameters `pensionStatus denied, dependentCount 2, grief 70`, link `eldestChild person:evt:world-vienna-1912:004099:child`. The same text returns in `008028` (1949.01): “Josef把丈夫的军帽……孩子问那是什么”. The state then ticks fifteen times (`005304`, `005613`, `005948`, `006227`, `006523`, `006813`, `007093`, `007409`, `007720`, `008028`, `008342`, `008645`, `008997`, `009314`, `009642`) through 1954; the snapshot at death is `pensionStatus pending, monthlyPension 7, dependentCount 2, arrearsMonths 11`, active 1940.4–1959.12.

There is no husband death. The only marriage in the dossier is `006837` (1945.01), “Josef和Friedrich Hofer 2……婚礼那天，借来的桌子拼在院子里，汤里只有几片肉；Friedrich Hofer 2把戒指戴反了”. The widow state remains active with `remarried:false` and keeps ticking after the wedding; the design's remarriage exit (“remarriage ended the widowhood state”) never fires. The 1940 “丈夫的军帽” therefore cannot be the cap of the only husband, who is alive and marrying him in 1945. Josef also has a child `Alois Bauer` with Mitzi Moser 2 (`002870`) and a child `Friedrich Bauer` with Elisabeth Winter (`004375`); the state's linked child `004099` is neither of the named births.

**Classification: content bug (widow kernel on a male subject with no dead spouse) plus state-transition bug (remarriage does not end the state).** This is the clearest case where “state count > 0” is not continuity; the state invents a dead husband and then ignores the living one.

### 3.3 Deaths are still statistical, silent, or in the wrong place

**Evidence.**
- A Josef: header “died 1959.12”; last event `011378` (1959.10) is “Josef顺着河岸一直走……她一路数着路灯走完最后一段巷子”. No death event. The life stops two months before the declared death.
- A Anton: header “died 1935.03”; last event `003671` (1935.01) is a clinic visit. No death event.
- B Mitzi: header “died 1950.11”; last event `010151` (1950.07) is a moving-day. No death event. Her only death-tagged event is a child death in 1942.
- B Hedwig: `000715` (1918.10) dies “在Haus der Tante in Klosterneuburg”, but every prior event places her in `Leopoldstädter Zinshaus, gemeinsamer Gang`.
- A Lena: `002320` (1929.01) dies in `Haus der Tante in Klosterneuburg`, but all 17 events are in the Leopoldstadt tenement.

Four of the five scored endings are `statistical_death` or absent; only B Klara reaches the horizon, and her last event is a winter-stairs fragment, not an explicit horizon. The report says “literary quality is not established” and “state count is not a literary score”; this is the evidence. Phase 14's “statistical death” failure is not fixed. In two cases it is worse: there is no death event at all.

**Classification: base-engine bug (death scheduling/place anchoring) plus content/dossier bug (no deathbed or horizon scene).** The state layer has no death/exit state to prevent this.

### 3.4 The curse reacts to its own aftermath, not to the betrayal, and the consequence is prose-only

**Evidence.** The actual betrayal is `010625` (1957.05): “Mitzi Stein告诉所有人Hedwig偷了东西……Hedwig去市场时，摊主把零钱放在柜台上，不再递到手里。” The curse reaction is `010438` (1957.01), four months **before** that betrayal:

> “背叛发生后的夜里，Hedwig自己发起了高烧；Friedrich Berg第二天照常出门。没有人把这两件事放在一起。”
> `causes: evt:world-vienna-1912:010437`; effects: only `mood -0.06`, reason “the curse recoils”.

`010437` is not a betrayal; it is `r15-curse.aftermath/.../investigation` (an inquiry about Friedrich Berg's illness). The second reaction `011221` (1959.01) is caused by `011220` `fear-spreads`, not by a betrayal; its effects are again only mood. The state remains `triggers 0`; the reaction never increments the trigger count, never applies a health effect to the named target, and never creates a relation or position consequence. The prose says “Hedwig自己发起了高烧”, but there is no `health` effect; the fever is a sentence, not a fact.

The report (5.3) says “The reaction is caused by a committed betrayal event, not a timer” and “A second betrayal in 1959 has the same structure.” The first is false for `010438` (cause `010437`), and the second is false for `011221` (cause `011220`). The controlled C experiment asserts a health −0.18 on `person-hermann-kral`, but its `sampleEvents` do not include the betrayal, the reaction, or any text for Hermann Kral; only unrelated grief, investigation and statistical-illness events are shown. That is an assertion, not readable evidence.

**Classification: state-reaction scope/cause bug plus content/effect bug.** The curse is a narrative motif with a mood effect, not a cross-person mechanism.

### 3.5 The power wish creates real records but paper authority; the reaction text fakes power

**Evidence.** The real records are there: A Klara `003111` creates `权力俱乐部` and a `主席` position with `预算/签字/人事`; `003572` creates `临时主席`; `003824` creates `公共礼仪官` with `主持仪式/签发礼节函/安排吊唁`; B Klara `016868` creates the same office. That is more than a mood. But:

- The authority is free text (`预算/签字/人事`, `召集会议`) and no dossier scene **shows** the position being used to command, hire, budget or sign. The office is a record, not an observed exercise of power.
- The `power-office` reaction is identical five times: `003573`, `003825`, `005887`, `006020`, `008385`; the last is in 1950, sixteen years after the first. B Klara adds `003285`, `010143`, `012261`, `016869`, `018530`. The sentence is always “Klara第一次真正坐在一张有权力的桌子后面。那一刻比想象中安静，也比想象中更让人舍不得起身。” It fires after a festival costume (`003285`), after an understudy/club, after a real office, and after a party grew from 11 to 40. It is a tag reaction, not a position check.
- A Klara `005886` (1942) founds a **second** organization also named `权力俱乐部` while the 1932 one still exists. `006019` (1943) says “俱乐部从十一人变成四十人。Klara仍然坐主席的位置”, but the 1942 position title is `发起人`, not `主席`. The sentence and the committed position disagree.
- B Klara `020143` (1970.02) is `r15-org.workshop-closure/.../wages-cut`: “厂子没有关，但工钱减了三成……” The action says closure; the text says the factory did not close. It adds a `strike-wave` state, not a closure. The organization mechanism is not actually exercised.

**Classification: state-reaction scope/content bug plus organization/position content bug.** The wish did produce real offices and one excellent ironic insight (`006019`), but “real authority” is overstated. Narrative irony does masquerade as mechanical power in the repeated `power-office` text, especially at the stage title and the 1942/1950 clubs.

---

## 4. Does the state layer actually improve continuity?

Compare the four Phase 14 failures directly.

### 4.1 Career and education resets

**Partial improvement, with an authority hole.**
- B Klara: `002291` (1927.09) apprenticeship accepted → `002572` (1928.01) and `002821` (1929.01) ticks → `002882` (1930.01) `r15-work.journeyman-test/.../passed` → `state_transition apprenticeship-contract -> journeyman`. This is a real committed education chain, not a random jump.
- B Anton: `university-student` 1933.07–1936.01, four term ticks, `state_transition` to `university-graduate`; `Person.education` is `higher level 6`. This is the strongest proof that the university state can drive the authoritative field.
- But B Klara's header still says **“Education: apprenticeship 0”** after the journeyman transition. The `002882` effects are reputation, flag and `state_transition`; there is no `education` effect. The state says `journeyman`; the person record says level 0. The design promise “`Person.education` remains authoritative; the state drives it” is not met for the apprenticeship branch.
- A Klara has `Education: apprenticeship 0` with no apprenticeship state at all, despite being accepted at `Buchdruckerei Winter & Söhne` in 1927. The A dossier never uses the education state; the old career-reset problem survives there.

**Verdict:** university continuity is genuinely improved; apprenticeship continuity is half-built; the A seed does not use it. “State count > 0” is not proof.

### 4.2 Partners and children forgotten

**Not improved.**
- A Klara: `003085` (1932.01) “生下一个男婴，取名Anton 2”; Anton 2 is never mentioned again in 152 events. The partner Alois Kral 2 exits in `003826` (1935.06) with a real breakup, so the partner exit is better; the child is not.
- A Josef: `002870` Alois Bauer, `004375` Friedrich Bauer; neither child is a durable cast member. The widow state invents a dependent `004099` and a dead husband before the actual 1945 marriage. This is worse than forgetting: it fabricates a family.
- B Klara: `004134` Anton 2 (1934.01), `004441` Mitzi 2 (1935.01), `010578` Maria 2 (1951.01), `010991` Berta 2 (1952.01). Mitzi 2 and Maria 2 reappear in one or two service scenes, but Anton 2 and Berta 2 do not; the `grieving_mother` role from the 1933 stillbirth is a label, not a child state. This is sporadic cameo, not durable relationship.
- A Hedwig: `003313` Anton Winter is born; there is a separation (`003566` 1934.01) and a late divorce (`011134` 1958.01), but the child is not a recurring cast member. Some children recur in service scenes, but no durable parent-child condition or child state is visible in the delivered lives.
- The state layer has `links.eldestChild` for war widows, but that is a link on one state, not a general child relationship. It cannot cast a child at 5, 15 and 30. Phase 14's largest content-mechanism blocker remains.

**Verdict:** partner exits improved in places; children did not. The product promise “durable people” is not met.

### 4.3 Statistical death

**Not improved; in some lives it is worse.**
- A Josef, A Anton and B Mitzi die with **no death event** (see §3.3).
- A Lena and B Hedwig die in Klosterneuburg while living in Leopoldstadt.
- A Klara dies of pneumonia (`010804`) after repeated statistical infections, with no chronic-illness state; A Hedwig dies of `statistical_death/other` (`013707`) after a sanatorium stay, with no linking condition.
- B Klara reaches 1972 alive, but the last event is `vienna-elder-care.winter-stairs/stay-indoors` (1972.09), not an explicit horizon. The design's “horizon ending is explicit” is not shown in the dossier.

**Verdict:** the state layer did not touch the death layer. Phase 14's 17/40 death score would not improve on this evidence; the silent deaths are a regression in the dossier itself.

### 4.4 Blocked casting

**No blocked-cast count is present in A/B JSON.** The report says reachability is uneven (§10.4), but there is no metric. The qualitative evidence is worse than a blocked cast: the widow kernel cannot cast a dead husband, so it writes one into the prose (`005245`); the curse cannot cast a betrayer at the right time, so it reacts to an aftermath (`010438`); the power reaction cannot check a position, so it announces one (`008385`). These are casting substitutions, not solutions. The 42 `r15-*` + 27 generated kernels are authored, but the selected lives use a narrow subset (see §9).

**Overall:** the state layer is a real improvement for **education/university**, **office records**, **apprenticeship ticks** and **some affair/investigation persistence**. It is not an improvement for **children**, **death**, **curse target** or **power exercise**. State count > 0 is not proof of continuity.

---

## 5. Power wish: real authority, irony, puppet office, stage title, or nothing?

**A Klara: real office records, weak exercise, genuine irony.**
- `003111` (1932.01): “没有盛大的任命仪式，只有一间办公室、一枚印章和一份需要签字的预算。Klara第一次真正拥有可以命令别人的位置。” Effects include `organization_found 权力俱乐部` and `position 主席` with authority `预算/签字/人事`.
- `003824` (1935.03): `公共礼仪官`, a real position with a wage of 3 and authorities `主持仪式/签发礼节函/安排吊唁`.
- `005886` (1942.01): a second `权力俱乐部`, position `发起人`.
- `006019` (1943.01): “俱乐部从十一人变成四十人。Klara仍然坐主席的位置，但每次开会前都要先和Mitzi Moser 3对一遍名单。有人开始叫Klara‘主席’，也有人只在需要签字时才来。” This is the best line in the Phase 15 corpus: real authority is list control, not the chair. It is a knowledge/flag, not a check, but it is genuine irony.

**B Klara: stage title, real tiny office, club chairs, no explicit puppet office in the final dossier.**
- `003284` (1931.03): festival king, “掌声是真的，王冠是假的，晚饭也是真的.” `stage-sovereign`, no position.
- `016868` (1964.08): real `公共礼仪官` position with a term and an office.
- `010142` (1950.07) and `018529` (1967.03): `临时主席` in two separate `接手后的俱乐部` organizations, both with authority only `召集会议`. The identical text (“会员只剩十一个人，欠着两个月房租”) recurs 17 years apart.
- The 1964 `power-office` reaction is caused by a real office, so it is not false; the 1931.03 reaction is caused by a costume, so it is.

**Did narrative irony masquerade as mechanical power?** Yes. The `power-office` reaction fires on `festival-king-only` (`003285`) and on an understudy/club, with no `position` effect; the text says “第一次真正坐在一张有权力的桌子后面” when the character is wearing a costume. In A Klara the same sentence fires five times over 16 years, including 1950 (`008385`), long after the first office. The report correctly says “a stage king is a state with no authority” (design/report), but the narrative reaction does not enforce that distinction. The reaction's tags, not a `position` condition, decide when to speak.

**Did it produce a puppet office?** The final B Klara dossier has no explicit `puppet-office` event (the earlier generation did). The closest is A Klara's `006019`: she is chair, but the list is edited before the meeting; the office is real, the power is partly borrowed. That is the right kind of irony, and the final report correctly does not claim a literal puppet office.

**Verdict:** the wish produced **real records** (positions, organizations, a stage title) and **one strong ironic insight**. It did not produce **observed exercised authority**: no dossier scene shows `position` being used to command, hire, budget or sign; the authority strings are free text; the repeated reaction is a label. “Real office, paper authority” is the accurate description.

---

## 6. Curse: did it react to a real betrayal and produce a real cross-person consequence?

**In the full lives: no, not as a cross-person mechanism.**
- A Hedwig has `cursed-by-wish` from 1912.1 to her 1966.1 death, `ticks 0`, `triggers 0`.
- `010438` (1957.01) says “背叛发生后的夜里，Hedwig自己发起了高烧；Friedrich Berg第二天照常出门.” The cause is `010437`, an `r15-curse.aftermath/.../investigation` scene, not the betrayal. The actual betrayal `010625` is 1957.05. The effect is `mood -0.06`.
- `011221` (1959.01) says the same with Mitzi Stein; cause `011220` `fear-spreads`, effect `mood -0.06`.
- The curse harms **Hedwig** in the prose, not the betrayer. The fever is not a `health` effect; the state's `triggers` never increments; there is no relation, position or property consequence for Friedrich Berg or Mitzi Stein.
- B Hedwig has the curse from birth, dies at 6, no reaction. The 54-year active curse in A Hedwig is far beyond the 12–240 month definition.

**The report's claim is wrong on the evidence.** `phase-15-report.md` §5.3 says “The reaction is caused by a committed betrayal event, not a timer” and “A second betrayal in 1959 has the same structure.” The causes are `010437` and `011220`, both aftermath events; the actual betrayal is `010625` (1957.05), and there is no 1959 betrayal. The report's sentence “The check failed, so the written failure branch (the curse recoiling on its holder) was used” is also not auditable: the committed event has no check trace, only `mood -0.06`. There is no roll to inspect.

**Controlled experiment C, separately.** The check is:

```text
betrayal_triggered_reaction  pass
  1914:state_reaction:cursed-by-wish/curse-betrayal causes=evt:...curse:000023
reaction_had_concrete_health_effect  pass
  person-hermann-kral:-0.17999999999999994
```

This is a machine assertion. The `sampleEvents` for C do not include `evt:...curse:000023`, the reaction, the betrayer, or any text about Hermann Kral; they show unrelated grief/under-investigation ticks and statistical illnesses. The experiment therefore does **not** provide a readable betrayal → curse → cross-person consequence. If the check is correct, it proves a health delta on a named person, but a health delta alone is not a story consequence; and the full life shows the opposite branch (recoil, mood only). The controlled experiment should be treated as a unit-test assertion, not as proof that the curse mechanism works in play.

**Verdict:** the curse reacts, but to the wrong event, with the wrong target, and without a committed consequence. It is the clearest example of narrative causality without mechanical causality.

---

## 7. Historical familiarity and divergence

### What is recognizable

`historyReviews` match the expected anchors: 1914 July Crisis, Sarajevo and WWI; 1916 Franz Joseph; 1918 influenza; 1922 Geneva Protocols; 1929 Wall Street Crash; 1931 Creditanstalt; 1938 Anschluss; 1939 WWII; 1945 food/fuel crisis, Vienna Offensive and Second Republic; 1948 Marshall Plan; 1955 State Treaty; 1956 Hungarian refugees; 1968 Czechoslovak refugees. The lives show 1938 Anschluss compliance/flight, 1945 liberation and postwar illness, war conscription, shell shock and trench foot, and the 1950s housing queue. The historical stage is visible as a backdrop.

### What is not established

- **Dates are coarse or wrong.** The Anschluss is `1938.01` in every dossier, although the index has `1938-03-12`. The liberation is `1945.01`, although the Vienna Offensive is April 1945. The review matches by hook/title term, not by date. The result is a January placeholder history, not a month-accurate stage.
- **The report's historical table is stale and internally inconsistent.** `phase-15-report.md` §7 table lists 1931–1935 as “matched 1 / unobserved 2 / Creditanstalt, Dollfuss assassination”. The delivered A `historyReviews` for 1931–1935 has `matchedCandidates: 1` (Creditanstalt) and lists `1934-austrian-civil-war` and `1934-dollfuss-assassination` as **unobserved**. The report's “Dollfuss” example is therefore wrong. The same report says “WWII unobserved in B”; the delivered B `historyReviews` for 1936–1940 matches `event:1939-wwii` and lists only `1938-kristallnacht` as unobserved. These are not minor: they overstate/understate the historical layer in opposite directions.
- **Unobserved is not divergence.** A 60-year run with 383/478 persons and 8–9 dossier lives will miss many witnesses. The 1934 civil war and Dollfuss are unobserved in both seeds; that can be a real fork, a scheduling gap, or simply no cast. The review's own note says similarity is not proof and absence is not proof. The critique should use “not observed in this run”, not “history diverged.”
- **Real people are used as random functionaries.** A Rosa's 1924 apprenticeship is promised by `Arthur Schnitzler` at a printshop; B Emil's laundry is checked by `Karl Kraus`. These are not historical fates, but they are implausible roles for known writers/physicians and they weaken the historical texture. The legitimate Schnitzler theatre cameo (A Rosa 1931, “他当过医生”) shows the better use; the printshop/laundry versions should be cut or renamed.
- **A 1945 same-sex wedding is staged as normal.** A Josef's `006837` (1945.01) is a courtyard wedding to Friedrich Hofer 2 with guests, a borrowed table and a ring, and no legal or police risk. In 1945 Vienna this would be criminalized; the event does not mark an alternate-history fork. That is a historical-texture problem, independent of the state bug in §3.2.
- **Matched candidates are not lived scenes.** The 1955 State Treaty is matched in `historyReviews`, but no scored life has a State Treaty scene; the 1955 events in the dossiers are ordinary work, rent and laundry. A match in the world event list is not proof that a focal life experienced the event. The report's table should say “candidate matched somewhere in the world”, not imply lived history.

**Verdict:** the index is a real, sourced reference layer; the runtime review is a title-term witness count, not historical fidelity. The correct claim is “recognizable anchors with coarse dates”, not “the simulation is historically accurate.”

---

## 8. Repetition and boredom

### State text repeats heavily

- A: `state_tick:wish-love/love-pressure/press-on` **10×** (“Emil又把那件没实现的事翻出来想了一遍……”); `war-widow/.../paid` **9×** for Helene and **7×** for Josef; `war-widow/.../pending` **7×**; `factory-employment/.../held-on` **7×**; `state_reaction:wish-power/power-office` **5×**; `project_failed` **5×**.
- B: `wish-craft/put-away` **7×**; `wish-love/put-away` **7×**; `wish-craft/press-on` **6×**; `wish-love/press-on` **6×**; `power-office` **5×**; `wish-knowledge/press-on` **5×**; `under-investigation/case-progress/evidence` **4×**.
- The action counts record **196** `war-widow-with-children` ticks in A and **183** apprenticeship ticks in B; the same “下个月再来” and “排了一上午” variants dominate. The state layer's tick vocabulary is too thin for annual recurrence.

### Base repetition

- A dossiers: 1,021 events, 120 repeats (11.8%); B: 1,252 events, 114 repeats (9.1%). The repeats include clinic visits, toothache, funeral-society payments, laundry-line disputes, rent notices and `statistical_illness_worsened`.
- B has `vienna-church-community.tenement-prayer/rent-prayer-argument` **9×** with the same “守夜人太多，踩坏了楼梯木板” text.
- `r15-wish.found-faction/.../took-over-a-club` uses the exact same “会员只剩十一个人，欠着两个月房租” text in 1934, 1950 and 1967 (A 1934; B 1950/1967). The club does not age or change.
- `absurd15-wish.crown-for-a-day/.../festival-king-only` is identical in 1931 and 1955 (B Klara), including “一天两场，管一顿饭”. The second run is not a return; it is a template re-fire.

### Absurd content that is merely random

- Karl Kraus as a laundry checker (B Emil) and Arthur Schnitzler as a printshop foreman (A Rosa) are random cameos, not institutions or mistakes. They are not the intended black humour; they are historical-name collisions.
- `r15-org.workshop-closure/.../wages-cut` says “厂子没有关” in a closure action. The event is neither a closure nor a strike; it is a wage cut with a `strike-wave` state.
- The male war widow with a husband, and a curse that recoils before the betrayal, are absurd in the wrong way: they are mechanical contradictions, not authored irony.
- The genuinely good absurd kernels are the festival king (`003284`) and the real tiny office (`016868`): both are produced by a concrete institution (a parade committee, a citizens' delegation), not by a random draw. That is the standard the rest should meet.

### Which lives are fragments?

- **A Josef** is the clearest fragment: 180 events, a craft-wish tick, a war, a widow state that invents a dead husband and ignores a real 1945 marriage, two children who vanish, and no death. It is a sequence of state ticks and unrelated scenes, not a life.
- **A Hedwig** has a curse/survival spine and some strong scenes (the sanatorium, the painting commission, the rent hearing), but many tasks are interchangeable and the curse does not pay off. It is a partial life, not a fragment.
- **A Klara** and **B Klara** have real spines (power/stage), but the repeated `power-office` text and the vanishing children keep them from “reads as a life.”

---

## 9. Performance and reachability

### State counts (delivered A/B)

| Metric | A | B |
|---|---:|---:|
| Events / persons / alive | 16,056 / 383 / 170 | 21,605 / 478 / 242 |
| State facts | 604 | 609 |
| State ticks | 542 | 529 |
| State reactions | 26 | 27 |
| State transitions | 18 | 36 |
| Active / ended states | 136 / 45 | 167 / 73 |
| Positions | 16 | 15 |
| Distinct state definitions used | 18 | 20 |

The distribution is narrow. A: `war-widow 17`, `apprenticeship 39`, `stage 34`, `under-investigation 25`, `public-scandal 12`, `grief 14`. B: `apprenticeship 69`, `stage 29`, `failed-apprentice 24`, `university-student 9`, `war-widow 14`, `under-investigation 16`. **Missing entirely:** `chronic-illness`, `debt-bondage`, `blacklisted`, `fame`, `workshop-closure` (as a state). The four Phase 14 failures were education, debt, illness/blacklist and durable relationships. Education is partly covered; debt, chronic illness and blacklist are not. The state layer is not the broad mechanism layer the design promised; it is a few generic states plus a large education branch.

### Reachability

Authored: 48 state definitions, 42 `r15-*` kernels + 27 generated kernels. Observed in the selected lives / world counts:

- `r15-org.workshop-closure`: **1** in A, **2** in B; the one in B Klara (`020143`) explicitly says the factory did not close.
- `r15-org.strike-settlement`: **1** in B; not in the scored lives.
- `r15-org.cooperative-reopening`: **0**.
- `r15-edu.scholarship-grant`: **1** in A, **6** in B; only one visible in a dossier.
- `r15-love.*`: 1–3 per action; `forbidden-attachment` only 2 instances in each seed.
- `r15-fam.widow-pension`: 14 in A, 13 in B; the dominant family kernel, and the one with the male-widow bug.
- `r15-curse.betrayal-at-table`: 31+ in A, 30+ in B; the “curse” is mostly a generic betrayal kernel.
- `absurd15-stage.cast-the-king`: 40+; `absurd15-wish.crown-for-a-day`: 1 in A, 4 in B.
- `r15-wish.power-offer`: 1 in A, 1 in B; no explicit puppet office in the final B.

**Blocked casts:** there is no blocked-cast count in A/B JSON, and the report gives none. The qualitative substitute is worse: the widow kernel invents a dead husband, the curse reacts to an aftermath, and the power reaction announces an office. The selected dossiers cover 1,021/1,252 events, not the full 16k/21k; content that does not appear in them is not necessarily unreachable, but the report's “42+27 kernels” is an authored count, not a reachability count. The report admits this in §10.4; the headline table should too.

### 20k performance

The report has real 20k numbers:

| Load | ms/year | Heap |
|---|---:|---:|
| Phase 14 baseline (composition, no state) | **4,290** | 419 MB |
| + states, 1% density (200 instances) | **6,582** | 731 MB |
| + states, 5% density (1,000 instances) | **8,666** | 950 MB |

This is candid and useful: the state option is **above the 5 s/year target** at both densities. The report also says the final 88-year/20k production runs were not repeated under the final code; the delivered life evidence is 60 years / 383–478 persons. There is no PostgreSQL or API measurement (`e2e` blocked `ECONNREFUSED 127.0.0.1:55432`). Do not claim 20k state-layer production capacity from this.

### Tests

`pnpm test`: 88 files, 515 pass, 36 skip; v4: 39 files, 235 pass, 8 skip; build 3.15 s. These are real and should be acknowledged. They are not literary evidence, and the deterministic critic says “pass — no findings” on both dossiers despite the male widow, silent deaths and repeated power text. The automated critique is not a meaningful gate for this phase.

---

## 10. Verdict: does Phase 15 meet its product goal?

**Partially. The mechanism is real; the game is not yet.**

### Genuinely proven

- A typed state layer can persist, tick, react, transition and commit facts. The tests and the B Klara apprenticeship / B Anton university chains are real evidence.
- A wish can produce a real `Position` and a real organization; A Klara's `003111`/`003824`/`005886` and B Klara's `016868` are not prose-only.
- A stage title can be mechanically distinct from a real office: `003284` creates `stage-sovereign`, not a position; `016868` creates a position.
- The history index is versioned, sourced, validated and separate from fiction; the coverage document is candid about its gaps.
- The report's 20k benchmark is real and honestly says the target is missed; the model API is honestly blocked (HTTP 403); the e2e is honestly blocked (no Postgres).

### Not proven

- A working runtime LLM content factory. The four packs are subagent-authored and offline-validated; the configured model returned 403. The factory is a validator/store, not a live generator.
- The curse as a cross-person mechanism. The full life reacts to its own aftermath with a mood effect; the controlled C experiment is an assertion without readable events.
- Real power. Positions exist, but no dossier scene shows `position` being exercised to command/hire/budget/sign; authority is free text; the repeated `power-office` text fires without a visible position check.
- Durable children and partners. Named children disappear; the widow state invents a dead husband and ignores the real 1945 marriage; no durable parent/child state is visible.
- Deathbed/horizon and statistical-death repair. Three silent deaths, two wrong-place deaths, two statistical deaths without a linking condition, one horizon fragment.
- 20k final-code performance and PostgreSQL persistence. The 20k numbers are synthetic, 3 years, no DB, and above the target.
- Historical fidelity. The index is good reference material; the runtime review is title-term matching with coarse January dates and stale report examples.

### Fun >> Rigor?

Not on this evidence. The state layer adds rigor and some real persistence; it does not add enough fun. The best moments are authored kernels (festival king, real tiny office, the faction-price insight), not state ticks. The whole-life mean is 17.25/30, the event sample is 2/15 pass, and the new state text is the weakest layer. A player would remember the false crown and the stamped appointment letter, not the 196th war-widow pension tick.

### Three highest-leverage fixes for Phase 16

1. **Make state time causal and finite, and give death/relationships a mechanism.**
   - Tick after `state_add`; enforce `durationMonths`; expire/replace before the next scene; record check/trigger in the state fact; close states/positions on death and move.
   - Add a `parentOf`/child state and a deathbed/exit kernel; no silent deaths; no wrong-place deaths.
   - Evidence: `005304` before `005245`; B Klara's 41-year stage state; A Hedwig's 54-year curse; A Josef/A Anton/B Mitzi silent deaths; B Hedwig `000715`.

2. **Make wish/curse consequences targeted and mechanical.**
   - Curse: react to the actual betrayal event, apply a real health/relation/position effect to `$betrayer`, increment `triggers`, record the d20/check; the recoil branch must also be a committed effect, not prose.
   - Power: require a `position` condition to command/hire/budget/sign; use a bounded authority vocabulary; close or reuse organizations instead of founding another same-name `权力俱乐部`; do not let the `power-office` reaction fire on a costume.
   - Evidence: `010438` vs `010625`; `011221` vs `011220`; `008385`; `005886`; `006019`; `003285`.

3. **Raise reachability and variant depth, and clean the historical surface.**
   - Make the 48 definitions/69 kernels actually reachable; add variants/cooldowns for war-widow, apprenticeship, factory, power-office and rent-prayer; cut or rename random historical cameos (Schnitzler as printshop foreman, Kraus as laundry checker); fix 1938/1945 dates and the report's Dollfuss/WWII table.
   - Evidence: 196 war-widow ticks; 5× power-office; 9× rent-prayer; `r15-org.cooperative-reopening` 0; `020143` “厂子没有关”; report §7 table and the “WWII unobserved in B” sentence.

**Final sentence:** Phase 15 should keep the state layer; it is the right architectural direction and it has real proofs. But the layer is currently better at **recording** a life than at **making** one. The next phase should stop adding definitions and make the existing states causally ordered, finite, targeted and reachable; until then, the honest description is “a real mechanism inside a still-fragmented life simulator,” not “the composable story engine” and not “Fun >> Rigor.”

---

## Addendum — final dossier re-check (2026-11-05)

I re-read the final dossiers and experiments; I did not rerun the simulator. Final files:

| File | Events | Persons | State facts | Ticks | Reactions | Transitions | Active / ended | Positions |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase15-a` | 16,844 | 472 | 325 | 287 | 26 | 12 | 92 / 72 | 16 |
| `phase15-b` | 19,221 | 469 | 384 | 335 | 29 | 20 | 124 / 87 | 12 |

**The report is not synchronized with these dossiers.** `phase-15-report.md` still describes the previous 16,056 / 21,605 run, 604 / 609 state facts, 542 / 529 ticks, **196 war-widow ticks**, and the `010437` curse cause. Those numbers and examples are not in the final files. Use the final JSON, not the report's §5 or §9.

### A1. Which of the five findings are fixed, which persist

| Finding | Status | New evidence |
|---|---|---|
| 1. State lifecycle inversion / dead active states / 40-year stage | **Mostly fixed; one inversion and duration holes remain** | Tick-before-add is down from 19 to **one** in the eight exported lives: Berta Hofer `008615` (1949.02) reacts before `008613` (1949.12) adds the `forbidden-attachment` state it mutates. Dead active states in those lives are **0**; deaths now carry `endedStateIds`. B Klara's stage state is 19 months, not 40 years. But A Hedwig's curse runs **598 months** (1912.1–1961.11) and only ends at death; A Emil's `stage-sovereign` runs **104 months** and is still active at the 1972 horizon. |
| 2. Male war-widow with invented husband | **False positive gone; female-only positive path not demonstrated** | There is **no `war-widow-with-children` state and no widow kernel** in either final 60-year run (`stateCounts` and `phase15ActionCounts` have zero widow keys). A Josef now has only `wish-craft`; he dies of tuberculosis in `013774` (1965.06). The male-widow bug is fixed by non-occurrence, but the female-only replacement is unreachable in the delivered sample. |
| 3. Statistical / silent / wrong-place deaths | **Mostly fixed; one silent death remains** | A Klara `010595` (1957.12, pneumonia), A Josef `013774` (1965.06, tuberculosis), A Anton `010003` (1956.07, press accident), A Lena `002195` (1929.01, now in Leopoldstadt), B Hedwig `004158` (1936.01, now in Leopoldstadt), B Klara `003288` (1932.10, fatal press accident), Berta Hofer `017631` (1970.01). **A Hedwig still has no death event** in her 125 subject events: header died 1961.11, last event `011948` (1961.10), and no `death` effect in the eight exported lives. Her curse still ends `owner_died` in the snapshot, so the state cleanup is based on the person record, not a committed death fact. |
| 4. Curse caused by aftermath, no cross-person effect | **Wrong cause fixed; full-play consequence still absent** | There is **no `state_reaction:cursed-by-wish` in A or B** and no `state_reaction:cursed-by-wish` key in either `phase15ActionCounts`. A Hedwig's curse ends `owner_died` at 1961.11 with `triggers 0`; the only curse-related scenes are `r15-curse.aftermath` (`007663`, `008375`), which no longer carry the `betrayal` tag. The forced C experiment is now the only curse reaction evidence. |
| 5. Power wish produces paper authority; reaction fakes power | **Persists** | A Klara still gets real offices/factions: `002665` (1931.08, `公共礼仪官`), `005325` (1942.01, `发起人`), `005895` (1944.06, `发起人`), `008926` (1953.09, `公共礼仪官`). But there is no `主席`; `005465` (1943.01) still says “Klara仍然坐主席的位置” while the committed position is `发起人`; the five identical `state_reaction:wish-power/power-office` events remain (`005326`, `005466`, `005896`, `006321`, `008927`), including after a party split. The second same-name `权力俱乐部` remains (`005325`, `005895`). B Klara has only the stage reaction `003040`, then dies at 20. |

### A2. Re-scores

The material changed for all four requested lives, so these are fresh scores, not the old table.

| Life | Old | New | Why |
|---|---:|---:|---|
| A Klara | 19 | **19** | The death is now a real fact (`010595`), the wish state ends `owner_died`, and the power arc has offices and factions. But the many children (1931, 1932, 1933, 1934, 1935 stillbirth, 1942, 1943, 1944) remain birth effects; no child is a durable cast member, and the “first time at a table of power” text still repeats five times. Specificity 4, causality 3, character 3, relationships 1, history 4, drama 4. |
| A Josef | 12 | **17** | The male widow, the 15 pension ticks and the silent death are gone. He now has a craft-wish spine, war/refugee work, a TB death with a named cause (`013774`), and a partner exit. But the child `Rosa Bauer` (`003058`) is not durable, the partners reset (Marie Huber → Mitzi Moser → Anton Stein 3 → Alois 2), and 21 “她” tokens appear, including subject misgendering. Specificity 3, causality 3, character 2, relationships 2, history 4, drama 3. |
| A Hedwig | 18 | **18** | The wrong curse reaction is gone, but the curse is now inert; the remarriage (`007470`) and children (`007826`, `008170`, `008540`) give more family texture, while the death is still silent. Specificity 4, causality 3, character 3, relationships 2, history 4, drama 2. The score stands, for different reasons. |
| B Klara | 20 | **18** | This is no longer a 216-event life. She is a 35-event short life who dies at 20 in `003288`. The apprenticeship, failed journeyman exam, TB waiting list, festival king and press accident are a strong short arc, but there is little history or durable relationship. Specificity 4, causality 3, character 3, relationships 2, history 2, drama 4. |

Mean of the four: **18.0/30**, up from 17.25 but still below Phase 14's 19.0. No life reaches 26/30. The improvement is real but local: A Josef gains five points because two severe bugs were removed; B Klara loses two because the run produced a different, much shorter life; A Klara and A Hedwig stand.

### A3. The curse, specifically

**In the full lives: no curse reaction, therefore no cross-person health effect.** A Hedwig has `cursed-by-wish` from 1912.1 to 1961.11, `ticks 0`, `triggers 0`; the state is ended by `owner_died`. There is no `state_reaction:cursed-by-wish` in her 125 events and none anywhere in A/B. `007663` (“Helene Bauer病倒以后，楼里开始有人避开Hedwig”) and `008375` (“Gustav Berg 2病好以后来敲过门”) are `r15-curse.aftermath` scenes, not reactions, and they no longer carry the `betrayal` tag. B Hedwig's curse ends at her 1936.1 death with no reaction. So the wrong-cause bug is fixed by removing the trigger, but the full-play curse has become **inert**.

**Forced C experiment:** the check now says `state_reaction:cursed-by-wish/curse-betrayal causes=evt:world:phase15-exp:curse:000021` and `person-hermann-kral:-0.17999999999999994`. The C `sampleEvents` still begin at `000032` and do **not** include the reaction, the betrayal, or any text for Hermann Kral; only the check detail names the target and delta. The forced success branch therefore proves that the effect *can* be applied by the test harness, not that a reader can see a betrayal → curse → injury chain. The answer is: **caused by a real betrayal only in the forced experiment; no cross-person health effect in the full lives.**

### A4. State lifecycle re-check

- **Tick-before-add:** fixed except Berta Hofer. `008615` (1949.02) is `state_reaction:forbidden-attachment/betrayal-widens-the-secret`: “背叛发生以后，Berta Hofer发现那间借来的房间不再安全……” It mutates `forbidden-attachment` instance `state:world-vienna-1912:79` (`exposure 10 -> 30`, `jealousy 5 -> 25`), but the state is only added by `008613` (1949.12): “Berta Hofer和Hermann Moser开始在咖啡馆后门见面.” The affair reacts to a betrayal ten months before it begins. This is the one remaining causal inversion.
- **Dead active states:** fixed in the eight exported lives. A Klara's `010595` death effect ends `wish-power`; A Josef's `013774` ends `wish-craft`; B Klara's `003288` death effect lists `endedStateIds` for `wish-power`, the apprenticeship state and the stage state, plus `exitEffects` removing the `apprentice` role and `stage_sovereign` flag. Every dead person's snapshot in the exported lives now says `owner_died`. The only inconsistency is A Hedwig, whose states end `owner_died` without a death fact.
- **40-year stage state:** gone. B Klara's festival-king state runs 1931.3–1932.10 (19 months) and ends `owner_died`. **But durations are still not enforced:** A Hedwig's curse is 598 months against a 12–240 month definition; A Emil's stage-sovereign is 104 months against 3–24 and is still active at 1972. The old 40-year stage state has been replaced by a 49.8-year curse and an 8.7-year stage state.
- **onEnter/onExit recording:** fixed. B Klara's `002356` state_add includes `education` and `role` effects; Berta Hofer's `008613` state_add carries `entryEffects: [{flag: secret_attachment_active}]`; B Klara's `003288` death carries `exitEffects` and `endedStateIds`. This is a real replay improvement.
- **State volume:** A state facts fell from 604 to 325 and ticks from 542 to 287; B fell from 609 to 384 facts and 529 to 335 ticks. The suppression of same-month ticks and the removal of the war-widow state explain much of the drop. Fewer state facts are not automatically worse; the remaining facts are better ordered.

### A5. Verdict and top three remaining issues

The final state layer is **worth keeping**. The fixes are real, not cosmetic: death now ends states and records `endedStateIds`; `onEnter`/`onExit` are in the committed facts; the male widow and the wrong-place deaths are gone; B Klara's death is a named accident with exit effects; the general tick-before-add class is fixed. The layer is more conservative and more replayable than the version I first reviewed.

It is not finished. The curse is now unreachable in full play, power is still paper authority, one reaction still precedes its state, durations are not enforced, and A Hedwig still dies without a death fact.

**Top three remaining issues:**

1. **Finish lifecycle enforcement.** Fix the Berta Hofer `008615`/`008613` inversion; enforce duration/exit for the 598-month curse and 104-month stage state; require a committed death fact before `owner_died` state cleanup (A Hedwig `011948` → 1961.11 has no death event).
2. **Make the curse reachable and observable in full play.** The forced C check is not enough. A real betrayal in a focal life must produce `state_reaction:cursed-by-wish`, a visible check/trace, and a committed health/relation effect on the betrayer; the sample must include the event, not just the `-0.18` assertion.
3. **Make power authority exercised, not announced.** `005465` still says “still chair” while the position is `发起人`; five `power-office` reactions repeat the same “first time” text; two same-name `权力俱乐部` organizations are founded (`005325`, `005895`); no dossier scene shows a `position` condition being used to command, hire, budget or sign. One real command scene would be worth more than another office. The female-only war-widow path should also be made reachable if it is to count as a delivered mechanism.

**Addendum verdict:** the final pass is a meaningful repair, not a rewrite. The state layer is closer to trustworthy; the life layer still needs the curse, power and one death fact to become legible. I would keep the layer and fix these three before adding any new state definitions.

---

## Final lifecycle note (2026-11-06)

I read the final A/B dossiers and experiments only; no rerun. Final counts: A 16,438 events / 432 persons / 386 state facts / 254 ticks / 24 reactions / 13 transitions / 24 active / 133 ended / 16 positions / 17 state types; B 18,555 / 438 / 439 / 278 / 23 / 21 / 26 / 166 / 14 / 20.

The lifecycle fixes hold in the exported lives. My read-only check over the eight subject dossiers finds **0 tick-before-add** and **0 active person states on dead people**. The old Berta Hofer inversion is gone. A Hedwig now has a real death event, `006483` (1946.11, `major-crisis.press-accident/press-kills`), and both her `cursed-by-wish` and `factory-employment` states end `owner_died`; the curse no longer depends on a missing death fact. A Klara's death is `010145` (1957.06); her real offices (`002723` 1931.08, `005369` 1942, `008578` 1953) close at their terms, with the last ending at her death. The 40-year stage state is gone: B Klara's `stage-sovereign` runs 1931.3–1932.1 and ends `duration expired`. Expired-state removal now shows in the snapshots, and `onEnter`/`onExit` facts remain committed.

What still holds:

- **Curse.** There are **0 `state_reaction:cursed-by-wish` events** in A or B and 0 action-count keys. The forced C experiment still checks `curse:000022` → `person-hermann-kral:-0.18`, but its sample starts at `000044` and does not include the reaction or the health fact. The curse is now correctly caused only by a betrayal, but it is unreachable in full play; the forced branch is still an assertion, not a cross-person scene.
- **Power.** The offices are real, but the authority remains paper. A Klara still has six `power-office` reactions (`002724`, `005370`, `005510`, `008241`, `008579`, `009633`), two same-name `权力俱乐部` foundings (`005369`, `008240`), and no dossier scene showing a `position` condition being used to command, hire, budget or sign. The “first time at a table of power” text is still repeated.
- **Duration.** Death cleanup works, but duration is still not enforced: A Hedwig's curse runs 1912.1–1946.11 (**418 months**, against 12–240), and B Hedwig's 1912.1–1936.1 (288 months); both end only at death.
- **Durable people.** The child problem remains. A Klara has eight birth events and no child state; A Josef's `Rosa Bauer` (`003058`) and A Hedwig's children are birth effects, not durable cast. The state layer cleans death and office records but does not yet make a family persist.

**Is the final layer worth keeping?** Yes. The lifecycle work is real: state time is now ordered, dead people no longer carry active mechanisms, expiry commits, and `onEnter`/`onExit` are replay-visible. This is a materially more trustworthy state layer than the one I first reviewed. The remaining failures are now mostly **content and reachability**, not the lifecycle core.

**Top three remaining issues:**

1. **Make the curse reachable and observable in full play.** The forced C check is not enough; a real betrayal in a focal life must produce `state_reaction:cursed-by-wish`, a visible check, and a committed health/relation effect on the betrayer.
2. **Make power authority exercised.** A Klara's offices and factions are records, not commands; the repeated `power-office` text and the two `权力俱乐部` organizations should be replaced by one scene that actually uses `position` authority to hire, budget, sign or command.
3. **Make durable people and duration part of the mechanism.** Add a child/parent state or condition so A Klara/A Josef/A Hedwig's children can recur, and enforce durations so A Hedwig's 418-month curse is not ended only by death.

**Final note:** the engine fixes are accepted; the state layer should stay. Phase 15 has moved from “the lifecycle cannot be trusted” to “the lifecycle is trustworthy, but the curse, power and family content are not yet doing the work.”
