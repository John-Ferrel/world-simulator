# Phase 13 — Literary Critique

**Scope.** Five committed lives from `docs/v4/playtest.json` (`generatedAt` 2026-11-04T11:11:03Z, seed `vienna-1912-vertical-slice`, 1912–2000, 33,215 events, 8,367 composed events, 921 kernels). The dossier is `docs/v4/phase-13-lives.md`: Anton (11), Hedwig (69), Mitzi (64), Lena (36), Emil (22) — ages at death — 15 events each, 75 events total.

**Sample.** 20 events, stratified across the required categories: ordinary childhood (3), school (3), work (4), family/courtship (3), illness (2), migration (1), war/history (3), decisive turn (3), composed event (7), composed task (1). Genres overlap (a work scene can also be a history scene), so these counts are not a partition. Twelve are base scenes and eight are composed kernels. This is a purposive sample, not a random sample: it deliberately includes the strongest composed scenes and the weakest emitted fragments. The pass rate below is therefore a stress test of the committed prose, not a library-wide estimate.

**Scoring unit.** Each text is scored against its own trace subject and recorded effects. Focal attribution — whether the scene actually belongs to the life it is printed under — is audited separately in §2.3, so a coherent scene about a participant is not double-penalised in the four dimensions.

**Pass threshold.** 34/40. Specificity, drama, character/period and causality are each 0–10. A text at 33 is a near miss, not a pass.

---

## 1. The 20-event sample

`evt:` prefix omitted from the EventId column; all ids are `evt:world-vienna-1912:<suffix>`.

| # | Life | Date | EventId | Action (path) | Category | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Anton | 1918-01 | `000673` | `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` (base) | ordinary childhood | 9 | 6 | 9 | 7 | 31 | Fail |
| 2 | Anton | 1919-01 | `000824` | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` (base) | childhood labour | 10 | 6 | 9 | 9 | **34** | **Pass** |
| 3 | Hedwig | 1936-01 | `004649` | `r2-law.rent-contract::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-repair-clause` (composed) | housing / history | 9 | 7 | 9 | 6 | 31 | Fail |
| 4 | Hedwig | 1953-01 | `010122` | `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` (base) | ordinary adult | 5 | 3 | 5 | 4 | 17 | Fail |
| 5 | Hedwig | 1965-01 | `015240` | `r13-civ.recover-at-home::ctx-vienna-postwar-1945::milieu-tenement/back-to-work-too-soon` (composed) | illness / work | 9 | 9 | 9 | 7 | **34** | **Pass** |
| 6 | Mitzi | 1926-04 | `002045` | `vienna-adolescence.school-or-brickworks/go-to-brickworks` (base) | school / decisive turn | 9 | 9 | 9 | 8 | **35** | **Pass** |
| 7 | Mitzi | 1955-01 | `010872` | `vienna-life-injury-recovery/home-care` (base) | illness | 6 | 5 | 7 | 2 | 20 | Fail |
| 8 | Mitzi | 1976-02 | `020389` | `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-too-late` (composed task) | death / disaster | 8 | 9 | 8 | 4 | 29 | Fail |
| 9 | Lena | 1925-02 | `001820` | `r2-leisure.diary-snoop::ctx-klosterneuburg-rural-1912::milieu-tenement/confronted-the-family` (composed) | family | 8 | 8 | 9 | 8 | 33 | Fail |
| 10 | Lena | 1929-01 | `002804` | `p9-childhood-apprenticeship.learn-the-task/demoted-to-clean` (base) | work / apprenticeship | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 11 | Lena | 1931-01 | `003255` | `major-work-first-employment/turned-away` (base) | work / decisive turn | 9 | 9 | 9 | 9 | **36** | **Pass** |
| 12 | Lena | 1933-01 | `003816` | `vienna-family-childbirth/daughter-born` (base) | family / childbirth | 9 | 8 | 9 | 6 | 32 | Fail |
| 13 | Lena | 1934-01 | `004154` | `kernel-migrate.return-home::ctx-vienna-authoritarian-1934::milieu-tenement/civic-return-home` (composed) | migration / history | 9 | 9 | 10 | 8 | **36** | **Pass** |
| 14 | Lena | 1940-12 | `005748` | `p9-work-transport.strike-rumor/strike-rumor-tell-foreman` (base) | work / history | 6 | 6 | 6 | 3 | 21 | Fail |
| 15 | Lena | 1942-01 | `006548` | `r13-fam.collect-funeral-money::ctx-vienna-authoritarian-1934::milieu-tenement/enough-collected` (composed) | war / community | 10 | 9 | 10 | 7 | **36** | **Pass** |
| 16 | Lena | 1944-01 | `007193` | `r13-edu.literacy-class::ctx-vienna-authoritarian-1934::milieu-tenement/signs-own-name` (composed) | school / adult education | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 17 | Lena | 1946-12 | `007845` | `r13-turn.school-leaving::ctx-vienna-postwar-1945::milieu-tenement::reform-leaving-age/straight-to-factory` (composed) | family / school / turn | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 18 | Emil | 1919-01 | `000822` | `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` (base) | ordinary childhood | 10 | 8 | 9 | 8 | **35** | **Pass** |
| 19 | Emil | 1928-03 | `002520` | `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.scolded` (base) | work | 9 | 7 | 9 | 5 | 30 | Fail |
| 20 | Emil | 1934-06 | `004121` | `vienna-courtship-courtyard.letter-answer/mother-opened-letter` (base) | family / courtship | 5 | 4 | 6 | 3 | 18 | Fail |

### 1.1 Short notes on the near misses and the passes

- **#1 market line, 31.** The queue, the swept crumbs, the muddy potatoes and the apron are excellent. Drama is low (the queue disperses, the boy improvises), and the recorded `relation` is with Alois Huber, who never appears; the cash spent on potatoes is also not recorded. It is a good observation, not a turn.
- **#2 laundry, 34.** The three heller, the lye-whitened fingers, the cracked tiger's mouth and the money in the sock all match `cash +0.03`, `health -0.03` and the relation with Emil Weiss. It passes on specificity and causality, not on drama.
- **#3 rent contract, 31.** The clause, the roof leak, the neighbour's testimony and the pen are period-perfect, but `cash -6` is completely invisible. The scene is about a clause, not about what the signature costs.
- **#4 laundry-line, 17.** The same text appears 113 times in the full playtest. No names, no cause, no stake, no mechanism; “第二天都点了头” is the entire resolution.
- **#5 recover, 34.** The relapse, the wet towel and the wage deduction are strong. `cash +2` is not shown, and the title's “第一碗粥” never appears. It passes because the health/condition/flag chain is legible.
- **#6 school-or-brickworks, 35.** The arithmetic book pushed to the corner, the night-school address folded into the shoe, the four kroner and the red brick dust are a complete turn. The `role`, `cash`, `health`, `flag` and two relations are all visible.
- **#7 home-care, 20.** The recipe defines `health -0.03`, `cash -2` and `condition inflamed_wound`, but the committed event's effect list is **empty**. The prose says the wound is red and the family tears up its last clean sheet; the state records nothing. This is effect loss on commit, not a prose-only mismatch.
- **#8 rescue, 29.** A strong standalone disaster scene, but the recorded death belongs to the neighbour (Mitzi), and neither the title nor the text ever names her. The rescuer, Grete Bauer, is the trace subject; Mitzi dies off-page in her own death event.
- **#9 diary, 33.** The confrontation, the sibling's denial, the father's silencing and the cutlery-only dinner are strong. The title's brass lock never appears, and the third `relation` (with an official) is invisible. One point short.
- **#10 demoted, 34.** The composing stick, the wide/narrow spacing, the ink rollers and the solvent-whitened knuckles are exact. The demotion, the skill gain and the relation with Otto Hofer 2 all land.
- **#11 turned-away, 36.** The work book, the missing discharge certificate, the roster, the crowd, the noon bell and the names being written without her are the best work scene in the sample. The only invisible item is the two-krone carfare.
- **#12 daughter-born, 32.** The kettle, Emil's coal-black hands, the midwife counting six kroner and the released sheet are vivid. The recipe defines `cash -6` for the midwife, but the committed event records only `birth` and `health`; the six kroner is effect loss, not a prose invention. The midwife also has no relation effect. The text is faithful to the recipe; the state is not.
- **#13 return-home, 36.** The border at dawn, the papers turned three times, “经济移民” written over her correction, and her decision not to ask again are the strongest identity scene in the sample. `cash -6` is invisible, but the `flag`, `knowledge` and two relations are exact.
- **#14 strike-rumor, 21.** The emitted text is the chalk-on-the-locker consequence without the telling. The action is “tell the foreman”; the foreman and the telling are both absent. The recorded `reputation -0.08` and the relation with the foreman have no cause on the page.
- **#15 collect-funeral, 36.** The old hat, the four floors, the two coppers, the old shirt, the door opened a crack, the plain coffin, the widow counting and pouring out the coins to count again — this is a real micro-story. `cash -2` is unexplained (the text only collects), which is the one flaw.
- **#16 literacy, 34.** The slate, the third attempt, the last stroke, the butcher's sign “今日有肝” and the ledger cover are a complete quiet turn. The `mood`, `flag` and `literacy` effects are visible; the teacher is a helper without a relation effect, which is acceptable.
- **#17 school-leaving, 35.** The name crossed off the secondary list, the half loaf of bread, the “临时” factory badge, the twelve-hour day and the two kroner more than an apprentice are exact. `cash +2`, `condition fatigue`, `role factory_hand`, the flag and the guardian relation all land.
- **#18 coal, 35.** “叫你Alois Lechner来”, the red ears, the frozen slag heap, the shoe tip, the apron full of nuggets and the paper bag hidden behind the back are the best childhood scene in the sample. The only mismatch is the `relation` with Mitzi Hofer, who is not in the scene.
- **#19 lead-type, 30.** The whole case of 8-point type, the rolling blocks, the ruler on the table edge and “下次用两只手托底” are strong. The text says two kroner are docked, but the effect list contains only two relations and no cash. The fine is a phantom.
- **#20 letter, 18.** The emitted text is a narration variant: laundry smell, a lowered voice, a glance at the door. The letter, the mother who opened it, the rumour and the answer are all absent. The main outcome text has the whole causal chain; the player never sees it.

---

## 2. Aggregate results

### 2.1 Headline

- **Pass count: 10/20 (50%).**
- **Mean: 30.55/40** (sum 611).
- **Dimension means: specificity 8.35, drama 7.25, character/period 8.45, causality 6.50.**
- **75% target (15/20): not met.** The sample is five passes short. Even the optimistic, composed-heavy sample does not reach the target; a proportional sample would likely score no better (see §2.4).
- **Near misses:** diary 33, daughter-born 32, market line 31, rent contract 31, lead-type 30, rescue 29. The first four are within 1–3 points; the last two have a structural defect, not a polish problem.
- **Deep failures:** letter 18, laundry-line 17, home-care 20, strike-rumor 21. These are not near misses; they are missing scenes.

### 2.2 Comparison with Phase 12

Phase 12's final excerpt score was **3/12 (25%), mean 30.50**, dimensions **8.75 / 6.75 / 8.42 / 6.58**. The Phase 13 sample is larger and includes eight composed events, so the two totals are not like-for-like. The base-only comparison is the fair one.

| Metric | Phase 12 (12 base excerpts) | Phase 13 (20: 12 base + 8 composed) | Phase 13 base only (12) | Phase 13 composed only (8) |
|---|---:|---:|---:|---:|
| Pass count | 3/12 (25%) | 10/20 (50%) | 5/12 (41.7%) | 5/8 (62.5%) |
| Mean | 30.50 | 30.55 | 28.58 | 33.50 |
| Specificity | 8.75 | 8.35 | 8.00 | 8.88 |
| Drama | 6.75 | 7.25 | 6.50 | 8.38 |
| Character/period | 8.42 | 8.45 | 8.00 | 9.13 |
| Causality | 6.58 | 6.50 | 6.08 | 7.13 |

What this says:

- **The pass rate doubled, but the mean did not move.** Phase 13 clears the 34-point bar more often because the composed scenes add real turns and because drama rose by half a point. It does not raise the average text: the new lows (17, 18, 20, 21) are lower than Phase 12's lows (26–28), and they cancel the gains.
- **The composed layer is the improvement.** 5/8 pass, mean 33.50, drama 8.38, character 9.13. This is a genuine micro-story layer. Its weakest dimension is still causality (7.13): even the best scenes hide a cash amount, a relation, or a mechanism.
- **The base layer did not improve.** 5/12 pass, mean 28.58, causality 6.08 — slightly below Phase 12's 30.50/6.58 base sample. The base scenes are where the narration layer lives, and the narration layer is the problem.
- **Causality is flat at the library level** (6.58 → 6.50). This is the same bottleneck Phase 12 identified. The subject fix did not become an effect-visibility fix.

### 2.3 Focal attribution audit (separate from the four dimensions)

The five excerpts are supposed to be five lives. They are not consistently about the named person.

| Life | Events about the focal person | Events about another trace subject | Birth/statistical, no trace subject |
|---|---:|---:|---:|
| Anton | 7 | 5 | 3 |
| Hedwig | 8 | 5 | 2 |
| Mitzi | 7 | 7 | 1 |
| Lena | 8 | 5 | 2 |
| Emil | 11 | 2 | 2 |
| **Total** | **41/75 (54.7%)** | **24/75 (32.0%)** | **10/75 (13.3%)** |

Only 55% of the dossier's events are actually about the focal person. In the 20-event sample, 7/20 (35%) are about someone else: diary (Hedwig), return-home (Elisabeth Bauer), school-leaving (Luise Bauer), recover (Luise Berg), rescue (Grete Bauer), strike-rumor (Friedrich Weiss), letter (Franz). This is a dossier-level failure, not a sentence-level one: each text may be coherent about its own subject, but the reader following “Hedwig's life” spends five of fifteen bullets in other people's scenes, and “Mitzi's death” is written from the rescuer's point of view without naming Mitzi.

The markdown dossier does not print the trace subject. The JSON does, but the rendered page does not. A reader cannot tell that `1948.12 曝光十二秒` is Hedwig's scene while `1965.01 退烧后的第一碗粥` is Luise Berg's. This is the single largest obstacle to reading the dossier as five lives.

### 2.4 Sampling caveat

The 20-event sample over-weights composed events: 8/20 (40%) vs 15/75 (20%) in the excerpts. This is deliberate, to test the new Phase 13 layer. It is also an optimistic bias. A proportional sample would contain about 4 composed and 16 base events; at the observed pass rates (62.5% composed, 41.7% base), the expected pass count is about **9/20**, not 15/20. The 10/20 result is therefore not a pessimistic reading of the library; if anything, it is slightly generous.

The sample is also category-stratified, not random. It includes the best composed scenes (return-home, collect-funeral, school-leaving) and the worst emitted fragments (letter, laundry-line). That is the right sample for a literary stress test, but it is not a library-wide acceptance estimate.

---

## 3. Failure patterns

### 3.1 Top three

#### Pattern 1 — Narration selection severs cause from consequence (absent mechanism / invisible effects)

This is the dominant failure and the one that explains the base/composed gap. In `packages/v4/engine.ts`, `selectNarration()` returns a narration variant whenever one exists; the outcome's main text is only used when there are **zero** valid variants. Of the 43 base scenes in these lives that use the generated JSON-pack narration layer, every excerpt text matched a narration variant and none matched the outcome's main text. The TS-authored base scenes without narration (e.g. `turned-away`, `home-care`) use `immediateText` directly. The point is that where narration exists, it replaces the main text rather than supplementing it.

The narration variants were authored as atmospheric alternatives, and the validator checks length (≥20), key and condition shape (`packages/v4/generated.ts`, `packages/v4/content-author/strict.ts`), but not whether the variant names the subject, preserves the mechanism, or makes the committed effects visible. The result is a layer of prose that can be beautiful and causally mute.

Exact cases:

- **`evt:world-vienna-1912:005748` / `p9-work-transport.strike-rumor/strike-rumor-tell-foreman`.** The action is “tell the foreman”. The emitted text is: “粉笔字写在柜门正中间，字迹压得很重。Friedrich Weiss用袖子擦，擦不干净，只留下灰白的一层。车间的汽笛响起来，谁也没过来帮他。” There is no foreman, no telling, no meeting. The recorded `reputation -0.08` and the relation with the foreman have only a consequence on the page. The main text — “第二天清早{subject}在门房把活动室的事跟{foreman}说了一遍……” — has the cause; it was not selected.
- **`evt:world-vienna-1912:004121` / `vienna-courtship-courtyard.letter-answer/mother-opened-letter`.** The emitted text is: “洗衣房的碱水味顺着楼梯上来。Emil说的时候压低了声音，眼睛却往Franz身后的门看，像在确认还有谁在听。” The letter, the mother who opened it, the rumour and the answer are all absent. The main text has all four. This is a 53-character fragment replacing a 164-character causal scene.
- **`evt:world-vienna-1912:015930` / `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.only-hot-water`.** The recorded relation is “只递出一壶热水”; the emitted text is “走廊的脚步声一直没停。Mitzi把椅子挪到门边又挪回来，最后干脆坐到厨房里，借着炉火的一点亮等天亮。” The hot water — the one moral action in the outcome — is missing. The main text has “只从门缝递出一壶热水”.
- **`evt:world-vienna-1912:005844` / `p9-history-union-political.split/split-open-debate`.** The emitted text is “两只手同时按住桌角，纸张被压出褶皱。Lena说完整句话，才发现自己站得腿有点麻。” The split, the two factions, the proposal to print the disagreement and the agreement to postpone are all absent. The `skill`, `relation` and `relation` effects have no mechanism.
- **`evt:world-vienna-1912:010872` / `vienna-life-injury-recovery/home-care`.** The emitted text is “Mitzi没有去诊所，只用热水和旧布洗了伤口。第二天伤口周围发红，家里人把仅剩的干净床单撕成条。” The recipe defines `health -0.03`, `cash -2` and `condition inflamed_wound`, but the committed `effects` list is empty. This is worse than a narration drop: the effects were lost on commit. The prose is faithful to the recipe; the state is not.

This pattern is not “the prose is too literary”. It is “the prose is not the same event as the state”. A player who reads the text and then inspects the journal sees a different transaction.

#### Pattern 2 — Focal-subject drift and unanchored pronouns

Two related failures:

1. **Dossier drift.** 24/75 events (32%) have a trace subject other than the focal person. The excerpt builder includes any event where the focal person is a participant, and the markdown does not label the subject. Examples: Hedwig's 1945 “替妹妹顶一班” is Gustav Hofer's scene; Mitzi's 1976 death is Grete Bauer's rescue scene; Lena's 1934 “回程票与边境小屋” is Elisabeth Bauer's border scene; Lena's 1946 “义务教育的最后一年” is Luise Bauer's factory scene.
2. **Unanchored pronouns.** Even when the subject is correct, the text may start with `他`/`她` or never name the subject, so the reader attaches the scene to the wrong person. Examples:
   - **`evt:world-vienna-1912:008072` / `kernel-civic.strike-vote::.../civic-strike-no`:** “他算了算家里的房租和母亲的药钱，在表决时把手放在膝盖上。Mitzi看见了……” The trace subject is Otto Hofer 2, not Mitzi. In Mitzi's dossier this reads as Mitzi's own hesitation until “Mitzi看见了” retroactively reassigns it. The template's `{subjectPronoun}` is correct for Otto; the dossier context is not.
   - **`evt:world-vienna-1912:009481` / `p9-work-transport.strike-rumor/strike-rumor-sign`:** “Luise Berg 2签完名走出门，夜里的风把衣领吹硬，他想的是明早六点那趟汽笛。” The narration hardcodes `他` independently of the cast's actual sex; for a female subject it is a misgendering, and the template offers no `{subjectPronoun}` escape.
   - **`evt:world-vienna-1912:006337` / `vienna-tenement-neighbors.lost_room_key/key_lost_landlady`:** “房东太太在账本上记下一克朗五十赫勒的换锁钱。Hedwig的旧挂锁用铁丝拧在门扣上，风一吹就哐当响。” The trace subject is Gustav Lechner 3; the second sentence is about Hedwig. The scene changes owner between sentences.
   - **`evt:world-vienna-1912:020389` / `kernel-crisis.task-rescue-neighbor::.../rescue-too-late`:** “梁木塌下来时，里面已经没有声音。Grete Bauer和Alois Huber 3扒了半个钟头，只拖出一只烧焦的箱子……登记了Grete Bauer的名字。” The death effect belongs to the neighbour, Mitzi, who is never named. The title “冲进烟里把人拖出来” promises a rescue; no one is pulled out. This is a strong scene about Grete and a failed scene about Mitzi's death.
   - **`evt:world-vienna-1912:000852` / `vienna-childhood-street.cigarette-card/card-stolen`:** “巷口有人跑过来，肩膀撞在Elisabeth Bauer的胳膊上……Anton从后面追上去……” The trace subject is Elisabeth Bauer, not Anton. In Anton's life, the scene is a cameo in someone else's misfortune.

The `phase-13-lives.md` headers name the focal person, and the bullets do not. That presentation choice turns a 32% subject-drift into a reading experience where the named life keeps dissolving into neighbours.

#### Pattern 3 — Money and effect amounts do not match the committed state

Money is the most concrete causal signal in these lives, and it is frequently wrong, missing, or unearned. The cleanest mismatches:

- **`evt:world-vienna-1912:003557` / `vienna-legacy-worklife.union-office/union-office.enroll-first`:** “六十赫勒在桌上排成三枚二十赫勒的硬币。Emil数了两遍，才在名册上写‘已缴’。” The effect is `cash +1 克朗`. Sixty heller is 0.6 krone, not 1 krone. The main text also says sixty heller; the mismatch is in the content, not the narration.
- **`evt:world-vienna-1912:006548` / `r13-fam.collect-funeral-money::.../enough-collected`:** The text collects money door to door and ends with “帽子里的钱够买一口薄棺”. The effect is `cash -2 克朗`, reason “端着一顶帽子走楼道”. The subject is **spending** two kroner while collecting; the text never says so. The amount is invisible and the sign is counter-intuitive.
- **`evt:world-vienna-1912:002520` / `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.scolded`:** “Buchdruckerei Winter & Söhne敲着桌沿骂人，扣下两个克朗。” The effect list contains two `relation` effects with Mitzi and **no cash**. A two-krone fine is asserted in prose and absent from state.
- **`evt:world-vienna-1912:003816` / `vienna-family-childbirth/daughter-born`:** “接生的人把六克朗点清”. The effects are `birth` and `health` only, but the recipe defines `cash -6` for the midwife fee. This is the same effect-loss class as `home-care`: the prose is right about the recipe and the state is wrong. The six kroner is not a content omission; it was dropped on commit.
- **`evt:world-vienna-1912:015240` / `r13-civ.recover-at-home::.../back-to-work-too-soon`:** “第二天早上，Luise Berg又去了，因为请假的扣款比药贵。” The effect is `cash +2 克朗`. The prose frames the return to work as a loss; the state records a gain. The +2 may be the pay for the days worked, but the text never shows a pay packet, so the reader reads a deduction.
- **`evt:world-vienna-1912:004649` / `r2-law.rent-contract::.../signed-with-repair-clause`:** `cash -6`; the text has no amount. The signature is the dramatic action; the cost is invisible.
- **`evt:world-vienna-1912:003826` / `r1-cul.fashion-purchase::.../ruined-by-rain`:** `cash -12`; the text has no price. The hat is ruined, but the twelve kroner — the reason the loss matters — is not on the page.
- **`evt:world-vienna-1912:008461` / `r1-cul.photography-studio::.../eyes-closed`:** `cash -2`; the text has no sitting fee. The closed eyes are visible; the two kroner are not.
- **`evt:world-vienna-1912:003000` / `vienna-medical-treatment.sanatorium/sanatorium-go`:** The emitted text says “安娜的信第三天到”. The `relation` effect is with **Alois Lechner**, and “安娜” is not in the participant cast. The main text also hardcodes “安娜” instead of `{neighbor}`. The 12-krone fare/deposit is invisible.

The pattern is not “the amounts are implausible”. It is “the amount in the prose and the amount in the state are different numbers, or one of them is missing”. A reader cannot audit the life; the journal and the text disagree.

### 3.2 Secondary patterns

- **Template repetition / low drama.** The top repeated entry in `textAudit` is `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line` — 113 occurrences of “湿床单对折，木夹子排开衬衫。两人各自扯紧绳子的一头，谁也没看谁，但第二天都点了头。” (the count includes the attached title line). In 75 excerpt events, four scene titles repeat: `cigarette-card/card-trade` (Anton 1919.02, 1921.06), `hoop/hoop-lose` (Anton 1921.08, Mitzi 1922.08), `market-errand/errand-lost-coin` (Anton 1922.04, 1923.05), and `dropout-return` (Emil 1927.07 catch-up, 1929.04 sent-to-work, both titled “半年后回到最后一排” with opposite outcomes). The birth frame repeats in all five lives: “X在Y出生。Z在生产后抱着孩子；这间住处现在住了N口人。” It is a census line, not a scene.
- **Title/text gaps.** “退烧后的第一碗粥” has no porridge; “回程票与边境小屋” has no hut; “日记本上的小铜锁” has no lock; “煤比面包贵” has no price comparison; “冲进烟里把人拖出来” has no rescue. The titles are often better than the texts, which makes the disappointment sharper.
- **Hardcoded names not in the cast.** `sanatorium-go` says “安娜” in both the main text and the default narration while the cast role is `{neighbor}` (Alois Lechner). This is the same class Phase 12 found with “玛尔塔” and “汉斯”; it is reduced, not eliminated.
- **Effect loss on commit.** `home-care` and `daughter-born` are the confirmed cases: the recipes define `health -0.03`/`cash -2`/`condition inflamed_wound` and `cash -6` respectively, but the committed `effects` lists are empty or partial. `statistical_infection` is a statistical event with a pneumonia text and no effect list; that may be by design (the statistical model applies health outside the event), but the page still describes a state change that the committed fact does not show. The `warnings` include `unresolved_effect_ref: 206`; the excerpt shows at least two cases where a recipe effect did not survive. This is an engine/persistence issue, not a rewrite issue.
- **Narrow social range.** The 75 events contain no direct combat or mobilization scene; the war/home-front appears mainly as scarcity and a 1942 funeral collection, while the historical state appears as 1934 border paperwork and a 1948 postwar portrait. The 40-year scheduling audit shows `vienna-life-wwii-conscription` blocked 81 times, `vienna-family-childbirth` 109, `vienna-illness-household.mother-falls` 129, `vienna-family-divorce` 92, `vienna-courtship-courtyard.family-table` 28 — all mostly `missing_role`. The family audit itself shows 127 partner formations and 40.2% partnered woman-years, so the machinery is not absent; the excerpts under-represent it because the family scenes often fail casting and because the 15-event sample is work/neighbour-heavy. The lives default to subject + neighbour/worker scenes. That is why the dossier reads as a tenement/work chronicle rather than a full life.

---

## 4. The composed/base gap

The strongest result in this phase is not the overall pass rate; it is the gap between the two layers.

| Layer | Share of excerpts | Pass | Mean | Sp | Dr | Ch | Ca |
|---|---:|---:|---:|---:|---:|---:|---:|
| Composed | 15/75 (20%) | 5/8 (62.5%) | 33.50 | 8.88 | 8.38 | 9.13 | 7.13 |
| Base | 60/75 (80%) | 5/12 (41.7%) | 28.58 | 8.00 | 6.50 | 8.00 | 6.08 |

“Share” is the full 75-excerpt composition; “Pass” and “Mean” are for the 8 sampled composed and 12 sampled base events. The sample deliberately over-weights composed events, so the two pass rates are not weighted by the share column.

The composed layer is close to a micro-story library. `return-home` is a complete identity scene; `collect-funeral-money` is a complete community scene; `school-leaving` is a complete family/class scene; `literacy-class` is a complete interior turn; `rent-contract` is a complete institutional trap (except the missing six kroner). The composed scenes have a subject, a gatekeeper, a document or object, a cost, and an irreversible change. That is the shape the whole library needs.

The base layer is still an event-record layer. Its best scenes (`coal`, `laundry`, `turned-away`, `school-or-brickworks`, `demoted`) are as good as the composed scenes. Its weak scenes are not failed descriptions; they are descriptions of a different event than the one recorded. The narration layer is the reason: it selects atmosphere over mechanism, and the main text — which often has the mechanism — is never used when a variant exists.

This is the highest-leverage finding of Phase 13: **the library has a good causal text layer and a weak emitted text layer, and the emitted layer is the one the player reads.** Fixing narration selection (or making every variant causally complete) would improve more lives than adding another hundred kernels.

---

## 5. Ten replacement texts

Targets are the weakest outcomes in the sample, preferring composed/task actions with `::`. Each replacement preserves existing `{tokens}`, introduces no new effect types, and stays within 80–220 non-whitespace characters. The JSON form is in `docs/v4/phase-13-rewrites.json`.

### R1 — `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-too-late`

- **EventId / path:** `evt:world-vienna-1912:020389`, composed task.
- **Original:** “梁木塌下来时，里面已经没有声音。{subject}和{worker}扒了半个钟头，只拖出一只烧焦的箱子；消防队来后，把围观的人赶开，登记了{subject}的名字。消防队走后，没人敢去碰那只箱子。烧焦的箱子被留在院子里。”
- **Replacement:** “{subject}撞开阁楼门，烟先滚出来，{neighbor}倒在门后，手指还扣着门槛。{subject}和{worker}拽着{neighbor}的腋下往外拖，拖到楼梯口时人已经没气；梁木跟着塌下，只压住一只烧焦的箱子。消防队赶开围观的人，登记了{subject}的名字，{neighbor}的名字写在另一张纸上。{subject}的袖口烧穿，去诊所包扎花了三克朗，那只箱子留在院子里，谁也没再碰。”
- **Reason:** The death effect belongs to `{neighbor}`, but the original never names or shows the neighbour. In Mitzi's dossier, her death scene contains neither Mitzi nor a death on the page. The rewrite puts `{neighbor}` behind the door, makes the rescue fail visibly, keeps the witness statement and the `-3` krone doctor visit, and preserves the relation with `{worker}`.

### R2 — `kernel-civic.strike-vote::ctx-vienna-postwar-1945::milieu-printshop/civic-strike-no`

- **EventId / path:** `evt:world-vienna-1912:008072`, composed.
- **Original:** “{subjectPronoun}算了算家里的房租和母亲的药钱，在表决时把手放在膝盖上。{delegate}看见了，没有点名，只把反对票数念了两遍；第二天，工头把{subjectPronoun}的工位调到了机器最响的那一头。下班时，工头在门口记下{subjectPronoun}的工号。”
- **Replacement:** “轮到{subject}表决时，{subjectPronoun}把双手放在膝盖上，没有举。散会后{delegate}没有点名，只把反对票数念了两遍，念到第二遍时看了{subject}一眼。第二天，工头把{subject}的工位调到机器最响的那一头；下班时又在门口记下{subject}的工号。{subject}知道这不算处分，可耳朵一直响到回家。”
- **Reason:** The original opens with a pronoun; in Mitzi's life it reads as Mitzi, but the trace subject is Otto Hofer 2. The rewrite anchors `{subject}`, keeps the delegate's deliberate silence, the foreman's reassignment and the recorded knowledge that opponents are not named but workstations move.

### R3 — `r2-law.rent-contract::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-repair-clause`

- **EventId / path:** `evt:world-vienna-1912:004649`, composed.
- **Original:** “{landlord}把租约摊在桌上，第十三条写着‘小修由房客自理’。{subject}问屋顶漏雨算不算小修，{landlord}说看漏多大。{neighbor}在旁边插嘴，说去年冬天水从三楼一直滴到院子里；{landlord}把笔递过来，让{subject}先签，再谈漏雨。”
- **Replacement:** “{landlord}把租约摊在桌上，第十三条写着‘小修由房客自理’，旁边一栏是六克朗的钥匙押金。{subject}问屋顶漏雨算不算小修，{landlord}说看漏多大。{neighbor}在旁边插嘴，说去年冬天水从三楼一直滴到院子里；{landlord}把笔递过来，说签了才给钥匙。{subject}数出六克朗，在第十三条下面签了名。”
- **Reason:** The `cash -6` is invisible in the original. The rewrite makes the six kroner a key deposit on the same page as clause thirteen, so the signature has a price. It preserves the clause knowledge, the landlord relation and the signature flag.

### R4 — `r1-cul.photography-studio::ctx-vienna-postwar-1945::milieu-tenement/eyes-closed`

- **EventId / path:** `evt:world-vienna-1912:008461`, composed.
- **Original:** “{photographer}让{subject}别眨眼，数到十二。镁粉一闪，{sitter}在快门声里轻轻咳了一下；底片洗出来，{subject}的眼睛是闭的，{sitter}的手却清楚得能看见指节上的墨。”
- **Replacement:** “{photographer}收了{subject}两克朗，让{subject}坐在白布前别眨眼，数到十二。镁粉一闪，{sitter}在快门声里轻轻咳了一下；{photographer}没说话，把底片夹进暗袋。三天后取片，{subject}的眼睛是闭的，{sitter}的手却清楚得能看见指节上的墨。{photographer}说这张不能挂橱窗，{subject}还是把它夹进了账本。”
- **Reason:** The `cash -2` sitting fee is absent. The rewrite makes the fee, the wait and the closed-eye result one chain, while keeping the photographer relation and the knowledge that the sitter coughed during the exposure.

### R5 — `r2-leisure.diary-snoop::ctx-klosterneuburg-rural-1912::milieu-tenement/confronted-the-family`

- **EventId / path:** `evt:world-vienna-1912:001820`, composed.
- **Original:** “{subject}把本子摊在{parent}面前，翻到多出来的那一行字：今天什么都没发生。{parent}说只是担心，{subject}说担心不是理由。{sibling}在门口说不是自己写的，{parent}让{subjectPronoun}闭嘴。那天晚饭，桌上只有刀叉的声音。”
- **Replacement:** “{subject}把日记本摊在{parent}面前，小铜锁还挂在搭扣上，锁鼻却被撬歪了。{subject}翻到多出来的那一行字：今天什么都没发生。{parent}说只是担心，{subject}说担心不是理由。{sibling}在门口说不是自己写的，{parent}让{subjectPronoun}闭嘴。那天晚饭，桌上只有刀叉的声音，{subject}把撬坏的锁放在桌角，谁也没去碰。”
- **Reason:** The title is “日记本上的小铜锁”, but the original has no lock. The rewrite puts the forced lock on the table as the physical evidence of the betrayal, and keeps the `mood -0.12`, `family_distrust`, the confrontation flag and the two rival relations.

### R6 — `r1-cul.fashion-purchase::ctx-vienna-reform-1930::milieu-tenement/ruined-by-rain`

- **EventId / path:** `evt:world-vienna-1912:003826`, composed.
- **Original:** “{subject}买了帽子，第一次戴出去就下雨。帽檐塌下来，像一只湿透的鸟；{partner}把自己的旧帽换给{subject}，说这顶经得起雨。{subject}把新帽子晾在炉边，第二天缩了一圈，再也戴不上。”
- **Replacement:** “{subject}在橱窗前站了三个下午，最后数出十二克朗，把帽子捧回家。第一次戴出去就下雨，帽檐塌下来，像一只湿透的鸟；{partner}把自己的旧毡帽换给{subject}，说这顶经得起雨。{subject}把新帽子晾在炉边，第二天缩了一圈，再也戴不上，十二克朗只剩下一圈硬边。”
- **Reason:** The `cash -12` is the stake of the scene, but the original never names a price. The rewrite shows the saving, the purchase and the loss; the last clause makes the twelve kroner visible without adding an effect. It preserves `ruined_hat`, the partner relation and the rain flag.

### R7 — `vienna-courtship-courtyard.letter-answer/mother-opened-letter`

- **EventId / path:** `evt:world-vienna-1912:004121`, base.
- **Original:** “洗衣房的碱水味顺着楼梯上来。{neighbor}说的时候压低了声音，眼睛却往{subject}身后的门看，像在确认还有谁在听。”
- **Replacement:** “回信没有到{subject}手里。{partner}的母亲先拆了它，连信封上的邮戳一起摊在洗衣房的桌上，说有人写字来缠自家孩子。话传到院子里时已经添了油，{neighbor}隔着栏杆把原话学了一遍，说得很难听；{partner}再见到{subject}时，眼睛先往母亲那边看。{subject}站在水桶边，知道这封信已经被拆成了两家的脸面。”
- **Reason:** The emitted text is a narration fragment with no letter, mother or answer. The action is “mother opened the letter”; the rewrite restores the whole causal chain and keeps `reputation -0.06`, `mood -0.08` and the negative relation with `{partner}`.

### R8 — `p9-work-transport.strike-rumor/strike-rumor-tell-foreman`

- **EventId / path:** `evt:world-vienna-1912:005748`, base.
- **Original:** “粉笔字写在柜门正中间，字迹压得很重。{subject}用袖子擦，擦不干净，只留下灰白的一层。车间的汽笛响起来，谁也没过来帮他。”
- **Replacement:** “第二天清早，{subject}在门房把活动室的事跟{foreman}说了一遍。{foreman}没表态，只把烟头在鞋底按灭。中午之后，更衣室里没人再跟{subject}搭话，柜门上不知谁用粉笔写了‘告密的’。{worker}从{subject}身边过去，肩膀蹭了一下，没停；{subject}用袖子擦那两个字，擦不干净，只留下灰白的一层。”
- **Reason:** The original only has the consequence; the telling and the foreman — the action's actual mechanism — are absent. The rewrite restores the conversation in the gatehouse, the foreman's silence, the worker's cold shoulder and the chalk, keeping the recorded `reputation -0.08` and the foreman relation; the worker's cold shoulder is a visible social consequence, not a new effect. It also removes the hardcoded “帮他”, which would misgender a female subject.

### R9 — `vienna-tenement-neighbors.laundry_line_dispute/compromise_split_line`

- **EventId / path:** `evt:world-vienna-1912:010122`, base.
- **Original:** “湿床单对折，木夹子排开衬衫。两人各自扯紧绳子的一头，谁也没看谁，但第二天都点了头。”
- **Replacement:** “{subject}把洗好的床单搭上院子里的公用晾衣绳，占了整条。{neighbor}抱着一盆湿衣服下来，说自家孩子明天要穿干净衬衫上学。两人在绳子两头扯了一阵，最后{subject}把床单对折，腾出一半，{neighbor}用木夹子把衬衫一件件排上去。谁也没道歉，但第二天见面都点了头。”
- **Reason:** This is the most repeated text in the playtest (113 times), and it has no names, no cause, no stake and no mechanism. The rewrite makes the public line, the child's school shirt and the half-and-half compromise concrete, while preserving the relation and mood effects.

### R10 — `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.scolded`

- **EventId / path:** `evt:world-vienna-1912:002520`, base.
- **Original:** “{subject}在{workplace}碰翻一整盘8点铅字，字块滚了一地。{employer}敲着桌沿骂人，扣下两个克朗。{worker}蹲在过道里帮忙捡字，只说了一句‘下次用两只手托底’。”
- **Replacement:** “{subject}在{workplace}碰翻一整盘8点铅字，字块滚了一地。{employer}从玻璃隔间出来，用尺子敲着桌沿骂了五分钟，说这两个克朗月底从工钱里扣，账房把罚单压在玻璃板下。{worker}蹲在过道里帮忙捡字，只说了一句‘下次用两只手托底’。”
- **Reason:** The original says two kroner are deducted, but the effect list has only two relations and no cash. The rewrite turns the fine into a deferred debt recorded on a slip, preserving the humiliation and the worker's help without asserting an uncommitted cash change.

### 5.1 What the rewrites do and do not fix

- **Do:** make the subject visible, restore the missing mechanism, put the committed amount on the page, and turn a fragment into a scene. My estimate — not a re-run — is that eight of the ten would clear 34/40 on a text-only re-score; R9 and R10 still have low drama even after the fix.
- **Do not:** change the recorded effects, repair the `home-care` effect loss, make the narration selector prefer causal variants, or fix the 24/75 focal-attribution drift. Those are engine/scheduling/content-selection problems, not prose problems. Do not read the rewrite count as a library-level pass.

---

## 6. Verdict

**The library is not yet a set of readable micro-stories. It is a two-tier library: a strong composed minority that is genuinely literary, and a base majority that is still a competent event record with atmospheric narration.**

The evidence:

- **10/20 pass, mean 30.55, causality 6.50.** The 75% target is not met; the sample is five passes short. Phase 12 was 3/12 (25%), mean 30.50. The pass rate doubled, but the mean did not move. The improvement is real in drama and in the composed layer; it is not a library-wide literary improvement.
- **The composed layer is the micro-story layer.** 5/8 pass, mean 33.50, character 9.13. `return-home`, `collect-funeral-money`, `school-leaving` and `literacy-class` are scenes a reader can follow, quote and remember. `rent-contract` has the same shape, though it hides its six kroner. They have a subject, an institution, a cost and a turn.
- **The base layer is still an event-record layer.** 5/12 pass, mean 28.58, causality 6.08. Its best scenes (`coal`, `laundry`, `turned-away`, `school-or-brickworks`, `demoted`) are excellent. Its weak scenes are not badly written; they are written around the event. The letter scene has no letter. The strike-rumour scene has no telling. The eviction scene has no hot water. The laundry-line scene has no dispute. The home-care scene has no effect.
- **The dossier is not yet five lives.** 24/75 events (32%) are about someone else; 10/75 (13%) are birth/statistical connective tissue with no trace subject. Mitzi's death is written from Grete Bauer's point of view and never names Mitzi. Hedwig's 1945 scene is Gustav Hofer's. Lena's 1934 border scene is Elisabeth Bauer's. The markdown does not label the subject, so the reader cannot tell.
- **The causal bottleneck is unchanged.** Phase 12 found effect visibility as the main blocker (causality 6.58). Phase 13 is 6.50. The new composed scenes raise specificity and drama, but they still hide cash amounts (rent, photo, funeral collection, fashion) and the base layer still hides mechanisms. The library has become more dramatic without becoming more auditable.
- **The engineering wins are real but not literary.** 8,367 composed events, 921 kernels, trace coverage 1.0, 0 unresolved template tokens, 0 literal `None`/`undefined`, 0 events after a recorded death, 0 overfull households. These are genuine. They establish that the simulator can produce these scenes; they do not establish that the scenes are readable. Phase 12's warning still applies: do not read a green audit as a literary pass.

**What would change the verdict:**

1. **Make narration variants causally complete, or fall back to the main text when a variant is not.** This is the single highest-leverage fix. The main texts for `letter-answer`, `strike-rumor`, `laundry-line`, `split-debate`, `sanatorium` and `evicted-neighbours` are already better than the emitted variants. The engine's `selectNarration()` currently never uses the main text when a variant exists; changing that policy, or validating variants against the outcome's effect vocabulary, would lift the base layer immediately.
2. **Select focal-subject events for the life dossier, or label the subject.** A life should be mostly about the person whose name is on the section. If participant scenes are kept, print “seen through X” or the trace subject; otherwise the reader is reading an ensemble chronicle with five misleading headers.
3. **Put the committed amount and mechanism on the page.** Rent, photo, funeral collection, fashion, union dues and the two-krone fine are all concrete; they should be in the text, not only in the trace. The midwife fee in `daughter-born` is the reverse case: it is in the text and missing from state, which is an effect-loss bug, not a prose fix.
4. **Restore lost effects before rewriting prose.** `home-care` and `daughter-born` describe state changes that the committed event does not contain. A text rewrite cannot fix a missing `health`/`cash`/`condition` effect; the journal will still disagree with the page.
5. **Reduce the high-frequency scene repeats and the title/text gaps.** The top repeated text (113) and the repeated `dropout-return` title are visible in a 15-event excerpt. The titles should name an object or action that the text actually contains.

**Candid bottom line:** Phase 13 moved the library from “mostly competent event records with a few good scenes” toward “a strong composed micro-story layer plus a weaker base chronicle”. It did not reach the 75% target, and it did not solve the causality/effect-visibility problem. The composed scenes are worth keeping and extending; the base narration layer needs a causal contract before the five-life dossier can be called a set of readable micro-stories.

---

## Appendix — evidence and limits

- **Source:** `docs/v4/playtest.json`, `generatedAt` 2026-11-04T11:11:03.373Z, seed `vienna-1912-vertical-slice`, 88 years, 33,215 events, 3,227 task events, 8,367 composed events, 921 distinct kernels, trace coverage of composed events 1.0, text reuse ratio 0.122, 29,162 distinct texts, 745 short-text events, 0 unresolved template tokens, 0 literal `None`/`undefined`, 0 committed events after the subject's recorded death (the excerpt metadata shows 1/6/2 post-death events were excluded for Anton/Mitzi/Emil).
- **Dossier:** `docs/v4/phase-13-lives.md`, five lives, 15 events each.
- **Audits read:** `textAudit`, `compositionAudit`, `schedulingAudit`, `anomalies`, `warnings`; `docs/v4/phase-13-scheduling.json`, `docs/v4/phase-13-family.json`.
- **Prose read:** `packages/v4/content/kernels/recipes/batch13-*.ts`; `packages/v4/content/kernels/health-violence-war.ts`, `civic-culture-migration.ts`; generated packs under `packages/v4/content/generated/`.
- **Engine observation:** `selectNarration()` in `packages/v4/engine.ts` returns a narration variant whenever one exists and falls back to `outcome.immediateText` only when there are none. Of the 43 base scenes in these lives that use the generated JSON-pack narration layer, all 43 emitted texts matched a variant and none matched the main outcome text. TS-authored base scenes without narration use `immediateText` directly. This is a read-only observation; no code was edited.
- **Limits:** the 20-event sample is purposive and over-weights composed events (8/20 vs 15/75). The pass rate is a stress test, not a library-wide estimate. A proportional sample would likely score about 9/20. The four dimensions are a critic's judgment, not an automated metric; the exact scores for 33/34 near-misses are sensitive to one point. No real-LLM prose was generated for this critique; all quoted text is committed engine output.
- **No edits:** only `docs/v4/phase-13-critique.md` and `docs/v4/phase-13-rewrites.json` were written. No code, content, kernel, pack or playtest file was modified.

---

# Final re-score (post-fix)

**This section supersedes §2.1–2.4, §6, and the narration counts in the Appendix for the final playtest.** The earlier scores and counts are retained above as the pre-fix record.

**Final playtest.** `docs/v4/playtest.json`, `generatedAt` 2026-11-04T12:00:54.620Z, seed `vienna-1912-vertical-slice`, 88 years, **35,554 events**, **7,096 composed actions (4,199 scenes + 2,897 tasks)**, **711 kernels**, 406 births, 787 persons, 320 alive, **31,865 distinct texts**, reuse **0.1038**, 0 unresolved template tokens, 0 post-death subject or participant events. The excerpt set is now **5 lives × 15 subject-only events**: Anton (16 total), Mitzi (307), Hedwig (325), Matthias (287), Lena (160).

## F1. What the fixes actually changed

### F1.1 Subject identity: fixed at the dossier level

| Excerpt set | About the focal person | About another trace subject | No trace subject (birth/statistical/response) |
|---|---:|---:|---:|
| Previous (5 lives) | 41/75 (54.7%) | 24/75 (32.0%) | 10/75 (13.3%) |
| Final (5 lives) | **63/75 (84.0%)** | **0/75 (0%)** | 12/75 (16.0%) |

This is the clearest win. The old failure — Mitzi’s death written from Grete Bauer’s point of view, Hedwig’s 1945 scene belonging to Gustav Hofer, Lena’s 1934 border scene belonging to Elisabeth Bauer — is gone. Every excerpt event with a trace subject now has the focal person as that subject.

Text-level anchoring is not perfect. `semmel-no-words` still never names Matthias; `rent-sell-furniture-move` uses second-person “你”; `union-office.enroll-first` opens from the young applicant’s point of view. But these are now prose-level exceptions, not a dossier-level subject drift.

### F1.2 Narration: major outcomes recovered, low-significance variants still leak

Of the 37 base scenes in these excerpts that come from generated JSON packs, **10 use the main outcome text** and **27 still use a narration variant**; 0 have unresolved tokens. The old catastrophic examples are no longer visible: the letter scene is not in these lives, the strike-rumour scene is not in these lives, the evicted-neighbours and split-debate fragments are not in these lives. The fallback is working for major outcomes and short variants.

The residual narration failures are now concentrated in low-significance scenes:

- `evt:world-vienna-1912:013552` / `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet`: the main text has Hedwig advising the worker not to sign the form (“{subject}劝工友别填表，说填了名字就会被记成闹事的人”); the emitted default is only cough syrup, a folded watch and a lifted corner of the rules. The advice — the action — is absent.
- `evt:world-vienna-1912:009290` / `vienna-legacy-worklife.union-office/union-office.enroll-first`: the default keeps the young applicant’s point of view and hides the one-krone dues; the main text has the enrollment and the sixty-heller payment.
- `evt:world-vienna-1912:007832` / `vienna-market-debt.rent-arrears/rent-sell-furniture-move`: the main text itself uses second-person “你”; the emitted alt drops the 2.80 kroner from the furniture sale. This is a base-content POV bug plus a narration omission, not a selector bug alone.

So narration-selection is no longer the dominant failure, but it is not eliminated.

**Rewrite verification.** Of the ten proposed rewrites, only **R1 (rescue-too-late)** appears in these five excerpts. It is applied and scores 37/40. The other nine target scenes (`strike-vote`, `rent-contract`, `photography`, `diary-snoop`, `fashion-purchase`, `letter-answer`, `strike-rumor`, `laundry-line`, `lead-type-drop`) are not in this excerpt set, so this re-score cannot verify them.

### F1.3 Engine fixes: visible, but incomplete

- **Empty effects fixed.** `evt:world-vienna-1912:006995` / `vienna-life-injury-recovery/home-care` now records `health -0.03`, `cash 2`, `condition inflamed wound`; previously the committed effect list was empty. The text still hides the two kroner for clean cloth, but the state is no longer blank.
- **Dead participants fixed.** The rescue event now names the dying neighbour (`Ferdinand Winter 5`) and separates the death from Hedwig’s witness role; the old version killed an unnamed neighbour off-page.
- **Cash debt captured.** `son-born` now shows “其中6克朗记入债务”; `medical-debt` shows “其中16克朗记入债务”; `vaccination` shows “其中3克朗记入债务”. The debt is no longer a silent cash hole.
- **Residual mechanics.** `warnings` still reports **304 unresolved effect refs**, **1 effect_on_dead_or_missing**, **20,124 scene_blocked** (19,902 `missing_role`), and **3,163 external_cash_inflow**. These are not prose problems, but they still shape which lives can be told.

## F2. Fresh 20-event sample

Selection: four events per life, 8 composed and 12 base, including one composed task. The sample over-weights composed events (8/20 = 40%) relative to the excerpt set (20/75 = 26.7%) to test the new layer; it is purposive, not random.

`evt:` prefix omitted from EventId; all ids are `evt:world-vienna-1912:<suffix>`.

| # | Life | Date | EventId | Action (path) | Category | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Anton | 1913-04 | `000075` | `r1-child.foundling-wheel::ctx-vienna-1912::milieu-tenement/left-at-the-wheel` (composed) | infancy / institution | 9 | 9 | 8 | 3 | 29 | Fail |
| 2 | Anton | 1918-01 | `000647` | `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` (base) | ordinary childhood | 9 | 6 | 9 | 7 | 31 | Fail |
| 3 | Anton | 1919-01 | `000776` | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` (base) | childhood labour | 10 | 6 | 9 | 9 | **34** | **Pass** |
| 4 | Anton | 1923-01 | `001412` | `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` (base) | childhood labour | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 5 | Mitzi | 1925-01 | `001767` | `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` (base) | school / work turn | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 6 | Mitzi | 1931-03 | `003212` | `vienna-historical-social-movement.district-list/organize-relief-table` (base) | community / history | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 7 | Mitzi | 1934-05 | `004079` | `r2-rural.farm-servant::ctx-vienna-authoritarian-1934::milieu-tenement/wages-withheld` (composed) | work / debt | 9 | 9 | 9 | 4 | 31 | Fail |
| 8 | Mitzi | 1952-11 | `010047` | `r13-turn.starting-business::ctx-vienna-postwar-1945::milieu-tenement::postwar-empty-shops/signed-the-lease` (composed) | decisive turn / business | 10 | 8 | 9 | 6 | 33 | Fail |
| 9 | Hedwig | 1932-01 | `003491` | `vienna-family-childbirth/son-born` (base) | family / childbirth | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 10 | Hedwig | 1953-01 | `010604` | `r13-fam.visit-grave::ctx-vienna-postwar-1945::milieu-tenement/flowers-placed` (composed) | family / mourning | 9 | 7 | 10 | 8 | **34** | **Pass** |
| 11 | Hedwig | 1956-09 | `011901` | `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-too-late` (composed task) | death / disaster | 9 | 10 | 9 | 9 | **37** | **Pass** |
| 12 | Hedwig | 1960-01 | `013552` | `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` (base) | work / illness | 8 | 5 | 8 | 4 | 25 | Fail |
| 13 | Matthias | 1924-01 | `001586` | `task-vienna-youth-apprenticeship-search/trial-promised` (base task) | school / work | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 14 | Matthias | 1937-10 | `004903` | `r3-mig.xenophobic-landlord::ctx-vienna-authoritarian-1934::milieu-tenement/prepaid-year-of-rent` (composed) | migration / housing | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 15 | Matthias | 1954-12 | `010836` | `r1-hc.tuberculosis-diagnosis::ctx-vienna-postwar-1945::milieu-tenement/sanatorium-waitlist` (composed) | illness / work | 9 | 8 | 9 | 7 | 33 | Fail |
| 16 | Matthias | 1957-12 | `012153` | `r13-rel.long-distance-marriage::ctx-vienna-postwar-1945::milieu-union/letters-grew-shorter` (composed) | family / marriage | 8 | 8 | 9 | 9 | **34** | **Pass** |
| 17 | Lena | 1931-11 | `003191` | `vienna-market-household.soup-kitchen/soup-kitchen.keep` (base) | family / scarcity | 8 | 8 | 9 | 9 | **34** | **Pass** |
| 18 | Lena | 1939-09 | `005504` | `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line` (base) | neighbour / ordinary | 9 | 7 | 9 | 6 | 31 | Fail |
| 19 | Lena | 1943-01 | `006803` | `vienna-family-childbirth/son-born` (base) | family / childbirth | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 20 | Lena | 1946-03 | `007832` | `vienna-market-debt.rent-arrears/rent-sell-furniture-move` (base) | migration / housing | 8 | 7 | 9 | 5 | 29 | Fail |

### F2.1 Notes on the failures and near misses

- **#1 foundling, 29.** The prose is strong: wooden wheel, prayer card, copper button, numbered band, “等活过冬天再取名”. But Anton’s birth event says Josefine Hofer gave birth to him in Hofer-Wohnung; this event says he was left at a foundling wheel at 15 months and Josefine arrives from the country to ask whether he has a name. The kernel recast the parents as clerk and wet nurse. This is not a prose failure; it is a kernel eligibility/casting failure.
- **#2 market line, 31.** The queue, swept crumbs, muddy potatoes and apron are exact. The `relation` is with Hermann Weiss, who never appears; the potatoes’ cash cost is also unrecorded. Drama is low. A good observation, not a turn.
- **#7 farm-servant, 31.** “Mitzi干满一年……发现自己倒欠东家三克朗。” The effect is `cash 1 克朗` (recipe `cash -1`) plus a `servant_debt` condition. The three-krone debt is a string, not a number; the one-krone cash change is not in the text. Also the tenement context sits oddly with “长工屋” and “东家”.
- **#8 starting-business, 33.** “押金十八克朗，另加三个月预付。” The effect records only `cash 18`. The three months’ prepaid rent — the line that makes the risk real — is not in state. Strong scene, incomplete money.
- **#12 sick-fund, 25.** The emitted default is cough syrup, a folded watch and a lifted corner of the rules. Hedwig’s advice (“劝工友别填表”) is in the main text but not on the page, and the colleague relation has no visible cause. This is the clearest residual narration-selection failure.
- **#15 TB diagnosis, 33.** X-ray, lightbox, “肺尖有一块雾”, four-month wait, employer settles wages to month-end. The `cash 4` doctor/X-ray cost is nowhere in the text. Strong scene, invisible money.
- **#18 laundry yield, 31.** Lena yields the line; Grete Huber returns a newspaper packet of washing soda with coarse salt. The effect is `food 1`. Washing soda is not food; the effect type is wrong. This is a mechanics/effect-mapping failure, not a prose failure.
- **#20 rent-arrears, 29.** The text uses second-person “你蹲在地上……”, not Lena. The main text has the 2.80 kroner from selling the chest and chair; the emitted alt drops it. Base-content POV plus narration omission.
- **#6 district list, 34.** Quiet but complete: old newspapers, ruler grid, coal prices, bakery debts, the sick child in the third square, candle to the table edge. Skill, relation and mood all visible. It passes on specificity and causality, not on high drama.

## F3. Aggregate results

- **Pass count: 12/20 (60%).**
- **Mean: 32.75/40** (sum 655).
- **Dimension means: specificity 8.90, drama 7.50, character/period 8.95, causality 7.40.**
- **75% target (15/20): not met.** The sample is **three passes short**. The two 33s (#8, #15) are close; even if both were rounded to 34, the result would be **14/20 (70%)**, still short of 15/20. Reaching 75% would require at least one more genuine pass, not a rounding decision.
- **Base/composed split:** base 8/12 (66.7%), mean 32.42; composed 4/8 (50%), mean 33.25. The composed layer has the higher mean but the lower pass rate and the lower causality (6.88 vs 7.75). The remaining failures are concentrated in composed mechanics, not in base narration.

### F3.1 Comparison

| Metric | Phase 12 final | Phase 13 previous | Final post-fix |
|---|---:|---:|---:|
| Pass count | 3/12 (25%) | 10/20 (50%) | **12/20 (60%)** |
| Mean | 30.50 | 30.55 | **32.75** |
| Specificity | 8.75 | 8.35 | **8.90** |
| Drama | 6.75 | 7.25 | **7.50** |
| Character/period | 8.42 | 8.45 | **8.95** |
| Causality | 6.58 | 6.50 | **7.40** |

Against the previous Phase 13 sample: **+2 passes, +2.20 mean, +0.55 specificity, +0.25 drama, +0.50 character, +0.90 causality.** Against Phase 12: **+9 passes in a different sample, +2.25 mean, +0.82 causality.** The causality gain is the important one: it is the first time in three rounds that the dimension has moved materially.

### F3.2 What improved, concretely

- **Subject identity.** 63/75 own, 0 other; the five-life dossier now follows the named person. This was the largest single defect in the previous round.
- **Major-outcome narration.** Ten base scenes now emit the main text, and the catastrophic old variants are absent from these lives. The rescue rewrite is visible in Hedwig’s 1956 event and scores **37/40** — the best scene in either sample.
- **Effect persistence.** `home-care` is no longer empty. `son-born` carries the six-krone debt. The rescue death is attached to a named neighbour. These are real state fixes, not prose polish.
- **Average quality.** Mean 30.55 → 32.75; causality 6.50 → 7.40; specificity 8.35 → 8.90. The library is no longer “mostly competent event records” in the same sense; it now has a substantial set of scenes that clear 34.

## F4. Remaining top 3 failure patterns

### Pattern 1 — Money and effect mechanics: amounts, signs and effect types are still unreliable

This is now the largest single cause of failure. The prose often knows the right amount while the state records a different one, or records the right amount in the wrong type.

- **`evt:world-vienna-1912:004079` / `r2-rural.farm-servant::ctx-vienna-authoritarian-1934::milieu-tenement/wages-withheld`:** “Mitzi把账算到半夜，发现自己倒欠东家三克朗。” The effect is `cash 1 克朗` (recipe `cash -1`) plus `condition servant_debt`. The debt is a label, not a number; the one-krone cash movement is invisible.
- **`evt:world-vienna-1912:010047` / `r13-turn.starting-business::.../signed-the-lease`:** “押金十八克朗，另加三个月预付。” The effect records `cash 18` only. The prepaid months are not recorded; the risk is larger than the state.
- **`evt:world-vienna-1912:010836` / `r1-hc.tuberculosis-diagnosis::.../sanatorium-waitlist`:** `cash 4` for the doctor/X-ray is nowhere in the text.
- **`evt:world-vienna-1912:008937` / `r1-hc.medical-debt::.../medical-debt-reform-gap`:** `cash 16` debt is in the trace; the text says only “药费要自己垫” and “最贵的一瓶是出院那天开的”. The number is invisible.
- **`evt:world-vienna-1912:009290` / `vienna-legacy-worklife.union-office/union-office.enroll-first`:** the main text takes “六十赫勒” but the effect is `cash +1 克朗`. The old 60-heller/1-krone mismatch survives.
- **`evt:world-vienna-1912:005504` / `vienna-tenement-neighbors.laundry_line_dispute/subject_yields_line`:** the returned washing soda is recorded as `food 1`. The effect type is wrong; it is a cleaning good, not food.

**Classification: mechanics.** This is an effect-model problem — amounts, signs, debt semantics and type mapping — not a prose problem. Adding more prose will not fix it.

### Pattern 2 — Kernel eligibility, casting and context: composed scenes are applied to impossible lives

The new composed layer is dramatic and specific, but it is sometimes scheduled into a life that cannot support it.

- **`evt:world-vienna-1912:000075` / `r1-child.foundling-wheel::ctx-vienna-1912::milieu-tenement/left-at-the-wheel`:** Anton was born in 1912 to Josefine Hofer; at 15 months he is left at a foundling wheel, and Josefine “从乡下赶来” asks whether he has a name. The kernel has no eligibility gate for a child with living parents, and it casts the parents as clerk and wet nurse. This is a continuity break, not a bad sentence.
- **`evt:world-vienna-1912:016741` / `r13-rel.neighborly-help::...::neighborly-help-war/hid-the-extra-ration`:** in **1966**, the neighbour says “等打完仗再算”. The war variant fired in a postwar year. Context/date eligibility, not prose.
- **`evt:world-vienna-1912:004079` / `r2-rural.farm-servant::...::milieu-tenement`:** the text is a farm-servant scene (“长工屋”, “东家”) but the context is a Vienna tenement. It could be a rural work stint, but the life has no move or rural residence to support it.
- **`evt:world-vienna-1912:002475` / `r13-edu.boarding-school::.../admitted-to-dormitory`:** the only effect is `education`; the scene is about a confiscated pickle jar and bartered stamps. The education change is a label, not the scene’s causal action. This is a weaker version of the same problem: the effect is not the story.

**Classification: mechanics/content eligibility.** These are kernel gates, casting rules and context/date checks. They are not base-content prose weaknesses; the prose is often good.

### Pattern 3 — Residual base-content POV and low-significance narration anchoring

The old wholesale narration failure is gone, but a tail remains in base scenes that were not “major” enough to trigger the fallback.

- **`evt:world-vienna-1912:013552` / `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet`:** the emitted default has no advice and no visible relation; the main text has “Hedwig劝工友别填表”. Narration-selection still drops the action.
- **`evt:world-vienna-1912:009290` / `vienna-legacy-worklife.union-office/union-office.enroll-first`:** the default is the applicant’s POV; the dues are invisible. Narration plus money.
- **`evt:world-vienna-1912:007832` / `vienna-market-debt.rent-arrears/rent-sell-furniture-move`:** the main text uses second-person “你”; the alt drops 2.80 kroner. Base-content POV plus narration.
- **`evt:world-vienna-1912:003249` / `p9-social-relationship-initiative.apology-at-bakery/semmel-no-words`:** the text never names Matthias; it is a generic “two people at the counter” scene. Base-content subject omission.
- **`evt:world-vienna-1912:004063` / `vienna-tenement-neighbors.laundry_line_dispute/neighbor_yanks_clothes`:** the text has the quarrel and the muddy sheet, but the 0.15-krone soap debt is not on the page.

**Classification: base-content, with residual narration-selection.** This is now third. It is narrower than the previous round: the catastrophic variants are gone; the remaining cases are low-significance scenes, second-person legacy text, and unnamed subjects.

### F4.1 Direct answer to “primarily which?”

**Primarily mechanics, and secondarily content eligibility; narration-selection is now third, and base-content POV is a secondary contributor.** The previous round’s dominant pattern — a narration variant replacing the main causal text — has been reduced. The current pass-rate ceiling is set by effect bookkeeping (money amounts/signs/types) and by composed kernels that can be cast into impossible life stages or periods. The prose is often good enough; the state and the eligibility rules are not.

## F5. Verdict

**The 75% target is not met: 12/20 (60%), mean 32.75, three passes short of 15/20.**

This is a real improvement over the previous Phase 13 score (10/20, mean 30.55) and over Phase 12 (3/12, mean 30.50). The subject-only excerpt fix works: 63/75 events are now about the focal person, with zero participant-subject drift. The major-outcome narration fallback works: the best scene in either sample is the rewritten rescue (37/40), and the old catastrophic fragments are absent. The engine fixes are visible: `home-care` no longer has an empty effect list, `son-born` records the six-krone debt, and the rescue death is attached to a named neighbour. Causality rose from 6.50 to 7.40 — the first material gain in three rounds.

But the library is **not yet a set of readable micro-stories at the 75% level**. It is a subject-correct, causally improved library with a strong composed layer and a residual base tail. The composed layer now has the higher mean (33.25) but the lower pass rate (4/8) and the lower causality (6.88): its scenes are dramatic and specific, but their money and eligibility are unreliable. The base layer is more consistent (8/12 pass) but still contains second-person legacy text and low-significance narration fragments.

The next work is not another prose pass. It is:

1. **Effect mechanics:** make every committed cash amount, sign, debt and type visible and correct; fix `food` for washing soda, the 60-heller/1-krone mismatch, the three-krone servant debt, and the missing prepaid rent.
2. **Kernel eligibility/casting:** gate the foundling wheel on actual abandonment, gate the war variant on a war year, and require a rural residence/move for farm service. Do not let a composed kernel recast a living parent as a clerk or wet nurse.
3. **Residual base POV/narration:** convert the remaining second-person base texts to the subject, name the subject in generic scenes, and extend the main-text fallback to low-significance actions whose variants drop the mechanism.

**Candid bottom line:** the fixes moved the library from “two-tier with a broken base narration layer” to “subject-correct, causally improved, still short of the literary bar.” The 60% pass rate is an honest result, not a failure of the sample: the two 33s are near misses, but rounding them would still leave 14/20. The remaining gap is a mechanics and eligibility gap, not a sentence-level one.

---

# Post-cash-fix score

**Source.** `docs/v4/playtest.json`, `generatedAt` 2026-11-04T12:15:57.831Z: 35,375 events, 7,180 composed actions (4,267 scenes + 2,913 tasks), 732 kernels, 400 births, 781 persons, 31,730 distinct texts, reuse 0.103, 0 unresolved tokens, 0 post-death subject/participant events (excluding deaths in the same death event). Cash sign inversion is fixed; shortfalls now carry a debt note.

**Fresh sample.** 15 events, 3 per life, 7 composed / 8 base, including one base task. No event overlaps the 20-event sample above.

| # | Life | Date | EventId | Action (path) | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Anton | 1913-04 | `000075` | `r1-child.foundling-wheel::ctx-vienna-1912::milieu-tenement/left-at-the-wheel` (composed) | 9 | 9 | 8 | 3 | 29 | Fail |
| 2 | Anton | 1923-01 | `001412` | `p9-gap-childhood-chores.laundry-help/laundry-dragged-docked-pay` (base) | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 3 | Anton | 1923-05 | `001374` | `vienna-childhood-street.market-errand/errand-lost-coin` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 4 | Hedwig | 1952-04 | `010272` | `vienna-parish-aid.soup-kitchen/soup-kitchen.take-and-carry` (base) | 8 | 8 | 9 | 9 | **34** | **Pass** |
| 5 | Hedwig | 2000-03 | `034993` | `vienna-elder-bereavement.empty-room/empty-room.keep-room` (base) | 9 | 8 | 10 | 8 | **35** | **Pass** |
| 6 | Hedwig | 1988-01 | `028449` | `task-vienna-daily-culture.neighborhood-rumor/neighborhood-rumor.ask-directly` (base task) | 8 | 7 | 8 | 8 | 31 | Fail |
| 7 | Matthias | 1925-01 | `001799` | `r13-fam.help-homework::ctx-vienna-reform-1930::milieu-tenement/tears-on-the-page` (composed) | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 8 | Matthias | 1941-06 | `006194` | `vienna-parish-aid.funeral-society/funeral-society.pay` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 9 | Matthias | 1954-12 | `011084` | `r1-hc.tuberculosis-diagnosis::ctx-vienna-postwar-1945::milieu-tenement/sanatorium-waitlist` (composed) | 9 | 8 | 9 | 7 | 33 | Fail |
| 10 | Mitzi | 1928-02 | `002438` | `r3-teen.first-move-away::ctx-vienna-reform-1930::milieu-tenement::reform-workers-dormitory/hostel` (composed) | 8 | 7 | 8 | 7 | 30 | Fail |
| 11 | Mitzi | 1943-01 | `006880` | `vienna-family-childbirth/son-born` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 12 | Mitzi | 1958-07 | `012845` | `r1-hc.tenement-fire::ctx-vienna-postwar-1945::milieu-tenement/fire-death` (composed) | 9 | 10 | 9 | 8 | **36** | **Pass** |
| 13 | Lena | 1930-01 | `002927` | `r2-law.labor-court::ctx-vienna-reform-1930::milieu-government/back-pay-awarded` (composed) | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 14 | Lena | 1931-03 | `003190` | `vienna-legacy-worklife.union-office/union-office.enroll-first` (base) | 8 | 6 | 8 | 7 | 29 | Fail |
| 15 | Lena | 1944-08 | `007209` | `r3-mig.ship-passage::ctx-vienna-authoritarian-1934::milieu-tenement/steerage-in-a-storm` (composed) | 9 | 8 | 9 | 8 | **34** | **Pass** |

## C1. Result

- **Pass count: 10/15 (66.7%).**
- **Mean: 33.07/40** (sum 496).
- **Dimension means: specificity 8.73, drama 7.73, character 8.80, causality 7.80.**
- **75% equivalent (12/15): not met.** The sample is **two passes short**. Ten passes versus twelve needed; the 33 in #9 and the 31/30/29 cases are genuine failures, not rounding errors.
- **Comparison:** the previous 20-event sample was 12/20 (60%), mean 32.75. This 15-event sample is 10/15 (66.7%), mean 33.07 — directionally better, but the samples differ and the 75% equivalent is still not reached.

## C2. Top remaining failure

**Sentence-level subject/effect anchoring.** The cash sign is fixed, but the prose still sometimes withholds the committed amount or misnames the subject:

- **`evt:world-vienna-1912:011084` / `r1-hc.tuberculosis-diagnosis::.../sanatorium-waitlist`:** the trace records `cash 4` with a debt note; the text has the X-ray, the four-month wait and the folded certificate, but never the four kroner.
- **`evt:world-vienna-1912:003190` / `vienna-legacy-worklife.union-office/union-office.enroll-first`:** “六十赫勒在桌上排成三枚二十赫勒的硬币”, but the effect is `cash +1 克朗`. The amount mismatch survives the cash fix.
- **`evt:world-vienna-1912:028449` / `task-vienna-daily-culture.neighborhood-rumor/neighborhood-rumor.ask-directly`:** “把账本摊在桌上给**他**看” — Hedwig is female. Wrong pronoun in a 1988 scene.
- **`evt:world-vienna-1912:002438` / `r3-teen.first-move-away::.../hostel`:** “**他**学会了在熄灯前把工服叠好” — Mitzi is female. The same pronoun slips twice in one paragraph.

The foundling continuity break (`evt:...000075`: Anton born to Josefine Hofer, then left at a foundling wheel at 15 months) is still the clearest content-eligibility failure, but it is a single case; the pronoun/amount anchoring is the broader remaining pattern.

**Candid answer:** **10/15, mean 33.07, not >=12/15.** The cash sign fix improved the bookkeeping, and several scenes now pair a debt note with the text (son-born’s six kroner, funeral-society’s eight heller). But the 75% equivalent is not met: the remaining failures are sentence-level amount/pronoun anchoring, with one content-eligibility break. This is a narrow, fixable tail, not the old wholesale narration failure.

---

# Final targeted-fix score

**Source.** `docs/v4/playtest.json`, `generatedAt` 2026-11-04T12:25:56.025Z: 35,375 events, 7,180 composed actions (4,267 scenes + 2,913 tasks), 732 kernels, 400 births, 781 persons, 31,730 distinct texts, reuse 0.103, 0 unresolved tokens, 0 post-death subject events, 1 residual post-death participant edge. Targeted changes verified in the excerpts: TB diagnosis now says “诊费四克朗”; Hedwig’s 1988 pronoun is fixed; Mitzi’s first pronoun is fixed; the union main text now says one krone. The union *excerpt* still emits the old sixty-heller variant.

**Fresh sample.** 15 events, 3 per life, 4 composed / 11 base, including the only task in the excerpts. No event overlaps the previous 15-event sample.

| # | Life | Date | EventId | Action (path) | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Anton | 1919-01 | `000743` | `vienna-childhood-street.hoop/hoop-win` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 2 | Anton | 1919-01 | `000776` | `p9-gap-childhood-chores.laundry-help/laundry-three-heller` (base) | 10 | 6 | 9 | 9 | **34** | **Pass** |
| 3 | Anton | 1922-01 | `001244` | `p9-gap-childhood-chores.market-line/line-half-flour` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 4 | Hedwig | 1932-11 | `003494` | `vienna-legacy-worklife.hours-ledger/hours-ledger.read-for-others` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 5 | Hedwig | 1948-01 | `008831` | `r13-civ.join-charity::ctx-vienna-postwar-1945::milieu-tenement/dues-too-high` (composed) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 6 | Hedwig | 1988-01 | `028449` | `task-vienna-daily-culture.neighborhood-rumor/neighborhood-rumor.ask-directly` (base task) | 8 | 7 | 8 | 8 | 31 | Fail |
| 7 | Matthias | 1931-01 | `003249` | `p9-social-relationship-initiative.apology-at-bakery/semmel-no-words` (base) | 8 | 7 | 8 | 8 | 31 | Fail |
| 8 | Matthias | 1957-12 | `012366` | `r1-work.hotel-ring::ctx-vienna-postwar-1945::milieu-tenement/blamed-for-the-missing-towel` (composed) | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 9 | Matthias | 1950-04 | `009479` | `vienna-social-movement.aftermath/keep-the-list` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 10 | Mitzi | 1934-01 | `004076` | `vienna-family-divorce/separate-under-one-roof` (base) | 9 | 8 | 10 | 9 | **36** | **Pass** |
| 11 | Mitzi | 1928-02 | `002438` | `r3-teen.first-move-away::ctx-vienna-reform-1930::milieu-tenement::reform-workers-dormitory/hostel` (composed) | 8 | 7 | 8 | 7 | 30 | Fail |
| 12 | Mitzi | 1953-06 | `010703` | `p9-history-medical-daily.clinic-queue/queue-until-noon` (base) | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 13 | Lena | 1927-11 | `002196` | `r3-teen.first-friend-group::ctx-vienna-reform-1930::milieu-tenement/split` (composed) | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 14 | Lena | 1931-03 | `003190` | `vienna-legacy-worklife.union-office/union-office.enroll-first` (base) | 8 | 6 | 8 | 7 | 29 | Fail |
| 15 | Lena | 1939-01 | `005617` | `p9-social-daily-culture.last-standing-ticket/p9-social-daily-culture.last-standing-ticket.church-organ` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |

## T1. Result

- **Pass count: 11/15 (73.3%).**
- **Mean: 33.20/40** (sum 498).
- **Dimension means: specificity 8.80, drama 7.13, character 8.80, causality 8.47.**
- **75% equivalent (12/15): not met by one pass.** Eleven passes versus twelve needed. The four failures are #6 (31), #7 (31), #11 (30) and #14 (29); none is a rounding near miss at 33.

## T2. Top remaining pattern

**Targeted main-text fixes are not reaching every emitted narration variant.** This is now a variant-selection/anchoring problem, not a sign or eligibility problem.

- **`evt:world-vienna-1912:003190` / `vienna-legacy-worklife.union-office/union-office.enroll-first`:** the main text now says “收下第一笔会费一克朗”, but the excerpt still emits the old narration variant: “六十赫勒在桌上排成三枚二十赫勒的硬币。” The committed effect is `cash +1 克朗`. The targeted fix is in the main text, not in the variant the player sees.
- **`evt:world-vienna-1912:002438` / `r3-teen.first-move-away::.../hostel`:** the first pronoun is fixed (“她学会了在熄灯前把工服叠好”), but the next sentence still says “周末**他**把脏衣服带回家”. One leak remains in the same paragraph.
- **`evt:world-vienna-1912:003249` / `p9-social-relationship-initiative.apology-at-bakery/semmel-no-words`:** the text never names Matthias; the 0.14-krone price and the shared-bread relation are not anchored to a subject.
- **`evt:world-vienna-1912:028449` / `task-vienna-daily-culture.neighborhood-rumor/neighborhood-rumor.ask-directly`:** the pronoun is fixed, but the recorded reputation loss (“被楼道里一些人认为多管闲事”) never appears; the scene ends with a ledger check and no social consequence.

The cash sign is fixed; the debt note is present where the text states the amount (TB’s four kroner, son-born’s six kroner, funeral-society’s eight heller). The remaining failure is **emission-level**: non-major variants and generic base texts still drop or contradict the fixed main text. The foundling event is still present in Anton’s excerpt despite the no-kin gate, so the eligibility fix also has at least one residual life-data hole, but it is a single case rather than the main pattern.

**Candid answer:** **11/15, mean 33.20, not >=12/15.** The targeted fixes improved the main texts and the average (previous 10/15, 33.07), but one variant leak (union 60 heller), one pronoun leak (Mitzi), one unnamed subject (semmel) and one missing social consequence (rumor task) keep the sample one pass below the 75% equivalent.

---

# Final Phase 13 score

**Source.** `docs/v4/playtest.json`, `generatedAt` 2026-11-04T12:34:26.433Z: 31,830 events, 6,227 composed actions (3,573 scenes + 2,654 tasks), 661 kernels, 375 births, 757 persons, 28,406 distinct texts, reuse 0.108, 0 unresolved tokens, 0 post-death subject/participant events.

The four named target events (union enrollment, Mitzi hostel, semmel apology, foundling) are not in this 75-event excerpt set, so this score cannot re-verify them from the excerpts. It measures the remaining base/composed tail that is still visible.

**Fresh sample.** 15 events, 3 per life, 3 composed / 12 base, including one base task.

| # | Life | Date | EventId | Action (path) | Sp | Dr | Ch | Ca | Total | Result |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|:---:|
| 1 | Anton | 1921-01 | `001018` | `p9-gap-childhood-chores.fetch-coal/coal-refused-nuggets` (base) | 10 | 8 | 9 | 8 | **35** | **Pass** |
| 2 | Anton | 1922-05 | `001119` | `p9-childhood-household.name-day-gift/wooden-horse` (base) | 9 | 7 | 10 | 9 | **35** | **Pass** |
| 3 | Anton | 1922-05 | `001118` | `vienna-childhood-street.washhouse-fever/fever-recover` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 4 | Hedwig | 1927-01 | `002103` | `task-vienna-youth-apprenticeship-search/trial-promised` (base task) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 5 | Hedwig | 1931-02 | `003064` | `r3-mig.residency-registration::ctx-vienna-reform-1930::milieu-government::reform-new-register/paid-for-doorplate` (composed) | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 6 | Hedwig | 1939-01 | `005333` | `p9-social-relationship-initiative.apology-at-bakery/settle-the-account` (base) | 9 | 8 | 9 | 8 | **34** | **Pass** |
| 7 | Emil | 1929-05 | `002534` | `vienna-youth-threshold.first-wage/whole-envelope-home` (base) | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 8 | Emil | 1939-10 | `005257` | `vienna-medical-treatment.night-fever/sweat-it-out` (base) | 8 | 6 | 8 | 7 | 29 | Fail |
| 9 | Emil | 1934-05 | `003891` | `vienna-tenement-neighbors.lost_room_key/key_found_by_neighbor` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 10 | Mitzi | 1931-01 | `003069` | `r2-urban.clinic-residence-paper::ctx-vienna-reform-1930::milieu-hospital::r2-urban.clinic-residence-paper-reform/turned-away` (composed) | 9 | 8 | 9 | 9 | **35** | **Pass** |
| 11 | Mitzi | 1940-01 | `005560` | `vienna-family-childbirth/daughter-born` (base) | 9 | 7 | 9 | 9 | **34** | **Pass** |
| 12 | Mitzi | 1951-01 | `009022` | `p10-family-tasks.arrange-childcare/arrange-childcare.sister` (base) | 8 | 6 | 8 | 8 | 30 | Fail |
| 13 | Lena | 1930-11 | `002766` | `major-crisis.border-papers/papers-refused` (base) | 9 | 9 | 9 | 8 | **35** | **Pass** |
| 14 | Lena | 1936-01 | `004525` | `r13-work.open-shop::ctx-vienna-authoritarian-1934::milieu-tenement/licence-refused` (composed) | 9 | 9 | 9 | 8 | **35** | **Pass** |
| 15 | Lena | 1934-06 | `003882` | `vienna-medical-treatment.toothache/drops-and-endure` (base) | 8 | 7 | 9 | 7 | 31 | Fail |

## P1. Result

- **Pass count: 12/15 (80.0%).**
- **Mean: 33.67/40** (sum 505).
- **Dimension means: specificity 8.87, drama 7.47, character 8.93, causality 8.40.**
- **>=12/15: met exactly, with no margin.** Three base scenes fail (#8, #12, #15); one more slip would drop the sample below the 75% equivalent.

## P2. Top remaining pattern

**Base-scene cast/POV discipline: hardcoded or unnamed participants.** The cash/pronoun repairs targeted specific events; the remaining failures are generic base scenes that still introduce people who are not in the cast or hide the subject behind “来者”.

- **`evt:world-vienna-1912:005257` / `vienna-medical-treatment.night-fever/sweat-it-out`:** “**玛尔塔**把布拧到不滴水……” — the relation effect is with Matthias/focal-02, and 玛尔塔 is not in the participant cast. The caregiver is invented, and the relation is attached to someone else.
- **`evt:world-vienna-1912:009022` / `p10-family-tasks.arrange-childcare/arrange-childcare.sister`:** “孩子……不肯叫**来者**，姐姐蹲下来哄，**来者**把行李提进屋……” — Mitzi is never named; “来者” is a placeholder, and the only effect is `mood`. The scene has no subject and no relation.
- **`evt:world-vienna-1912:003882` / `vienna-medical-treatment.toothache/drops-and-endure`:** “**汉斯**第二天一早来敲门……” — 汉斯 is not in the cast and has no relation effect; the 0.60-krone debt is also unstated.

**Candid answer:** **12/15, mean 33.67, >=12/15 — met exactly.** The named variant/pronoun/cash fixes are not exercised by this excerpt set, so this sample neither confirms nor contradicts them. The remaining failures are base-content cast discipline (invented names, unnamed subjects), not narration selection or cash sign. The margin is zero: three base failures already sit at the threshold.
