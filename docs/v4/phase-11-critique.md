# Phase 11 Critique — Story Editor

**Reviewer:** Story Editor (subagent)
**Date:** 2026-11-04
**Scope:** `packages/v4/content/kernels/{childhood-education,work-commerce,family-social,health-violence-war,civic-culture-migration}.ts`; `packages/v4/composition/{types,contexts}.ts`
**Method:** Read the five kernel files and the composition contract; parsed 150 kernels, 450 base outcomes, 686 outcome texts including variants, and 98 variants for counts; scored 20 distinct kernels/outcomes. No LLM was used, no content was edited, no tests were run, and no git commands were used. Scores are editorial judgments, not test results.

## Bottom line

**Sample count: 20 kernels / 20 outcomes, across all five domains.**

**Major-event threshold (34/40): FAIL.**

- 20 scored samples: **mean 31.5/40; 9 pass, 11 fail.**
- 10 designated major / near-major samples: **mean 32.9/40; 4 pass, 6 fail** (marriage 35, childbirth 38, widowhood 38, surgery 36 pass; war mobilization 33, exile 31, pregnancy 31, university 29, strike 29, factory speedup 29 fail).
- Restricting to authored significance ≥ 0.80 gives 7 events, **4 pass / 3 fail, mean exactly 34.0** — still not a clean pass on a per-event threshold, and three of the four passes have caveats.

The line-level prose is often very good. The failure is not "bad writing"; it is the **causal contract**: major collective events frequently change only flags, roles, and mood, while the text claims wages, policies, deaths, migrations, households, or institutions have changed. Intimate family and health scenes are much stronger than work and civic scenes.

Domain means of the 20 samples:

| Domain | Sample mean | Read |
|---|---:|---|
| childhood / education | 29.0 | Vivid childhood detail; currency and school-to-university gates are weak. |
| work / commerce | 31.3 | Strong craft detail; adult wage scale and collective outcomes are not credible. |
| family / social | 35.5 | Best domain; marriage, birth, and widowhood are close to passing cleanly. |
| health / violence / war | 35.0 | Strong clinical and war prose; some period/casting leaks. |
| civic / culture / migration | 28.8 | Weakest: often a topic label with a flag, not an institution changing behavior. |

### Top problems, ranked

1. **Gender and casting are not aligned.** 30/30 civic kernels call the subject `她`; the subject role has no sex. 21 health kernels contain `他` with no sex restriction. 80 kernels contain gendered pronouns while their subject role is unsexed. The engine can cast a man into `她` prose and a woman into `他` prose.
2. **The money is not a money system.** 22–36 kronen/month adult wages, 1.5 kronen/day vs 4.5/month, 26 heller/day vs 22/month, 2 vs 8 kronen for the same shoes, kreuzer in 1900, 25 Schilling before 1925, and debt everywhere without a debt state.
3. **Collective events do not change institutions.** Strikes, elections, demonstrations, union meetings, petitions, and housing reform produce flags, roles, and reputation, not wages, policy, seats, housing, or organizational capacity.
4. **Major claims lack typed effects.** The last friend dies without a `death`; an exile "leaves Vienna" with a move to the station; a refugee sleeps in the kitchen without a `household`; retirement produces `unemployment` and no pension; a strike mediation restores a wage that is never changed.
5. **Conditions are too thin.** 24/30 civic kernels have only age/stage in their own conditions; publication has no literacy gate; election has no suffrage gate; promotion and severance have no tenure gate; retirement has no contribution gate.
6. **The prose is repetitive at production scale.** Every base kernel is a three-way scene; 15.6% of base outcomes use `第二天`; 16.2% use `门口`; 27.8% use `克朗`; 14.4% use the same bureaucratic window; 5.3% close on a silence coda. The style is coherent, but the reader can predict the beat.
7. **Context and milieu are mostly B-level, not C-level.** Only 1/98 variants keys on `milieuTags`; only 1/686 outcomes uses `{milieu}`; no outcome uses `{context}` or `{flavor}`. Place maps and wage multipliers change; institutions do not.

## 1. Scored sample

Dimensions: **Sp** specificity, **Mo** motive, **Ca** causality (action → typed state → later behavior), **Te** tension, **St** style, **Pe** period, **Fx** fact/effect consistency, **Me** memorability. Pass threshold is 34/40.

| # | Domain | Kernel / outcome | Sp | Mo | Ca | Te | St | Pe | Fx | Me | Total | Verdict |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | childhood | `child.household-rules` / `edu-rules-hides-bread` | 5 | 4 | 4 | 4 | 5 | 4 | 4 | 5 | **35** | PASS |
| 2 | childhood | `child.first-errand` / `edu-errand-good-change` | 5 | 4 | 2 | 2 | 4 | 2 | 2 | 4 | **25** | FAIL |
| 3 | childhood | `child.gift` / `edu-gift-ration-black-market` | 4 | 4 | 3 | 4 | 4 | 3 | 1 | 4 | **27** | FAIL |
| 4 | education | `edu.university-entrance` / `edu-university-matriculated` | 4 | 4 | 4 | 3 | 5 | 2 | 3 | 4 | **29** | FAIL |
| 5 | work | `work.factory-speedup` / `work-speedup-accepted` | 5 | 4 | 3 | 4 | 4 | 2 | 3 | 4 | **29** | FAIL |
| 6 | work | `work.strike-machine-hall` / `work-strike-joined` | 4 | 4 | 2 | 4 | 4 | 4 | 3 | 4 | **29** | FAIL |
| 7 | work | `work.craft-coffin-lid` / `work-coffin-honest` | 5 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | **36** | PASS |
| 8 | family | `family.marriage-household` / `marriage-household.parish-wedding` | 5 | 4 | 4 | 3 | 5 | 4 | 5 | 5 | **35** | PASS |
| 9 | family | `family.pregnancy` / `pregnancy.confirmed` | 5 | 4 | 2 | 3 | 5 | 4 | 3 | 5 | **31** | FAIL |
| 10 | family | `family.childbirth` / `childbirth.home-drawer` | 5 | 4 | 5 | 4 | 5 | 5 | 5 | 5 | **38** | PASS |
| 11 | family | `family.widowhood` / `widowhood.consumption` | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 5 | **38** | PASS |
| 12 | health | `health.clinic-queue` / `clinic-queue-soda-powder` | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 5 | **36** | PASS |
| 13 | health | `health.surgery` / `surgery-anaesthesia-death` | 4 | 3 | 5 | 5 | 5 | 4 | 5 | 5 | **36** | PASS |
| 14 | war | `crisis.war-mobilization` / `mobilization-called-up` | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | **33** | FAIL |
| 15 | civic | `civic.union-hall-meeting` / `civic-union-register` | 4 | 3 | 2 | 2 | 4 | 4 | 3 | 3 | **25** | FAIL |
| 16 | civic | `civic.election-day` / `civic-election-party` | 3 | 3 | 1 | 2 | 3 | 3 | 3 | 2 | **20** | FAIL |
| 17 | civic | `civic.exile-departure` / `civic-exile-leave` | 5 | 4 | 2 | 4 | 5 | 4 | 2 | 5 | **31** | FAIL |
| 18 | migration | `migrate.last-friend` / `civic-last-friend-funeral` | 4 | 4 | 1 | 4 | 5 | 4 | 1 | 5 | **28** | FAIL |
| 19 | culture | `culture.publication` / `civic-publication-accepted` | 5 | 5 | 4 | 3 | 5 | 4 | 4 | 5 | **35** | PASS |
| 20 | migration | `migrate.emigration-papers` / `civic-emigration-granted` | 5 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | **34** | PASS |

Notes on the passes:

- `marriage-household.parish-wedding` passes on texture and typed household/residence/marriage effects, but it has almost no tension and no consent/dowry negotiation.
- `surgery-anaesthesia-death` passes because death is actually typed, but the subject has no consent or cost gate; the prose carries the scene.
- `civic-publication-accepted` passes as a career beat, but there is **no literacy, education, or writing-skill condition**; an illiterate laborer can be cast as a published author.
- `civic-emigration-granted` passes as a procedural task, but it ends at the station and does not actually move the person out of the region.

The best prose in the sample is in `childbirth.home-drawer`, `clinic-queue-soda-powder`, `work-coffin-honest`, and `widowhood.consumption`. The worst causal scenes are `civic-election-party`, `civic-union-register`, `civic-last-friend-funeral`, and `work-strike-joined`.

## 2. Repetition patterns

These are not isolated word choices. They are production templates that make 150 different kernels feel like one writer working one beat.

### 2.1 Every kernel is a three-way scene

All 150 base kernels have exactly three outcomes. The weights cluster tightly:

- `0.4 / 0.35 / 0.25`: 58 kernels
- `0.4 / 0.30 / 0.30`: 55 kernels
- `0.35 / 0.35 / 0.30`: 18 kernels
- `0.45 / 0.30 / 0.25`: 13 kernels
- `0.45 / 0.35 / 0.20`: 5 kernels
- `0.50 / 0.30 / 0.20`: 1 kernel

The recurring shape is "comply / refuse / third way". Examples: `edu-rules-waits-turn` / `edu-rules-hides-bread` / `edu-rules-feeds-youngest`; `work-strike-joined` / `work-strike-stayed` / `work-strike-mediated`; `civic-election-party` / `civic-election-opposition` / `civic-election-missed`. The third way is usually a procedural compromise that costs a little cash and produces a flag. This is predictable and flattens motive: most characters want the same three things (keep the job, keep the family, avoid the police).

### 2.2 The "next day" coda

`第二天` appears in **70/450 base outcomes (15.6%)** and **100/686 total (14.6%)**. It is usually a second ending appended after the scene has already resolved.

Examples:

- `edu-punish-war-curfew`: "第二天，{parent}真的去车站问了班次" — no evacuation, move, or family state changes.
- `work-promotion-accepted`: "第二天把外套挂进隔间" — the promotion effect is already applied; the sentence adds no new relation or obligation.
- `civic-election-opposition`: "第二天，党部门口贴出一张没有署名的名单" — no party, election, or reputation state beyond the existing flag.
- `health-quarantine-breaks-out`: "第二天防疫队来查人" — the epidemic squad is narrated, but there is no inspection, fine, or quarantine state.

The coda is doing the work that a consequence should do. It is atmospheric, not causal.

### 2.3 The silence coda

Explicit `沉默` is almost absent from narration. The functional equivalent is a cluster of **24/450 base outcomes (5.3%)** using `谁也没…` / `什么也没说` / `没有再提` / `没有开口`. In the full 686 texts it is 34 (5.0%).

Examples:

- `work-proof-spoiled`: "{worker}…把散落的铅字按字号归回字盘，却什么也没说。"
- `family.in-laws.duplicate-key`: "两人在床上背对背，谁也没提这件事。"
- `crisis.front-wound.front-wound-death`: "那半块面包被塞回同乡手里，谁也没吃。"
- `civic.exile-leave`: "火车开动时，谁也没有挥手。"
- `health.pain-managed-at-home`: "两个人谁也没提医院。"

This is a good gesture once or twice. At pack scale it becomes a way to end a scene without deciding anything. The silence often replaces the missing typed effect: no one speaks, so no institution has to respond.

### 2.4 Doorway and object tableaux

`门口` appears in **73/450 base outcomes (16.2%)** and **116/686 total (16.9%)**. The recurring image is someone standing at a threshold, holding an object, not entering.

Examples: `edu-neighbor-turns-away` ("第二天门口多了一小锅粥"), `work-dismissal-severance` ("两人在面包店门口分了那块补偿里的面包"), `family.in-laws.duplicate-key`, `civic-police-questioned` ("两名巡警在门口等她"), `civic-return-refused` ("在边境站的长椅上坐到天亮").

The final sentence is often a short object/body detail: `edu-rules-feeds-youngest` ("把空碗推远了一点"), `edu-gift-keeps-boots` ("穿着靴子在厨房睡了一夜"), `edu-punish-belt` ("听见水桶碰井沿的声音"), `work-coffin-honest` ("把{subject}的名字写在工牌背面"), `health-surgery-appendectomy` ("扶着墙走到电车桥下，歇了两次"), `civic-exile-leave` ("站台上的钟慢了两分钟"). **42/686 outcomes (6.1%)** end in a sentence of 14 characters or fewer. The tableau is memorable, but it is also a hiding place: the prose stops at the image so the effect system does not have to answer what changed.

### 2.5 The bureaucratic window

**65/450 base outcomes (14.4%)** and **96/686 total (14.0%)** contain `窗口` / `柜台` / `办事处` / `注册处` / `市政厅` / `表格` / `印章` / `按了手印`. The same blocking clerk, the same insufficient paper, the same "next window" recur across all five domains:

- `edu-university-refused`: the clerk returns the materials at noon.
- `work-relief-refused`: the residence certificate and work book do not match.
- `civic-emigration-refused`: the guarantor's income is insufficient.
- `civic-pension-missing`: a ten-year-old employer certificate is missing.
- `health-clinic-ticket-next-week`: "今日号满", a paper for next Wednesday.
- `family-separation.no-legal-form`: the office says there is no form for this.

This is a genuine historical texture — 1900–1935 Vienna was a paperwork state — but the pack uses it as a universal plot engine. The institution is almost always a wall, never a rule that can be learned, exploited, or changed. The same scene appears in education, health, work, family, and migration with only the noun changed.

### 2.6 Hands, ink, and the print-shop gravity well

**43/450 base outcomes (9.6%)** and **56/686 total (8.2%)** contain `手心` / `手指` / `手背` / `手腕` / `油墨` / `铅字` / `墨迹` / `红铅`. Print and culture scenes almost always end with ink on the hands:

- `work-proof-caught`: "工牌旁添了'校样'两个字"; the worker pushes over tea.
- `work-proof-spoiled`: "手指一直发僵"; the worker sorts type and says nothing.
- `work-proof-war-censored`: "手上全是红铅."
- `civic-publication-accepted`: "红铅笔从第一行划到最后一行."
- `civic-censorship-defy`: "烧纸的烟飘进院子."

The print shop is the pack's most convincingly researched milieu, and it is overused as the place where writing, politics, and violence all become legible. `civic.leaflet-night`, `culture.publication`, `culture.censorship`, and `work.compositor-night-proof` share the same ink-and-paper imagery; the reader begins to feel that every idea in Vienna is set in the same shop.

### 2.7 Money as a punctuation mark

`克朗` appears in **125/450 base outcomes (27.8%)** and **145/686 total (21.1%)**. Amounts are often stated with confidence and then contradicted by the typed effect, the wage scale, or another outcome:

- `child.first-errand`: two kreuzer buy salt and half a loaf; no cash is deducted.
- `child.gift`: "两克朗" in the text, `+8` cash in the effect.
- `work.factory-speedup`: 34 kronen per month for a twelve-hour factory worker; another kernel gives a foreman 140.
- `work.unemployment-relief-municipal-job`: "一天一克朗半" but `wage: 4.5` per month and a `+4.5` "first week" payment.
- `work.hiring-daywork`: "二十六赫勒" for a day but `wage: 22` per month.
- `health.pain-electric-belt`: 25 **Schilling** in an elderhood kernel that can occur in 1900.

Money is used as sensory detail ("coins, kronen, receipts, debts") but not as a consistent unit. That undermines the pack's strongest claim: that the world is a material simulation.

### 2.8 Titles and variants repeat the same shape

**108/150 titles contain `的`**, usually as an object tableau: "信封里的两周", "压板下的三根手指", "门缝里的眼睛", "柜台后的一张字条", "楼梯间里的新工厂", "账房里少的一页". The titles promise a still life; the outcomes often deliver one. This is a coherent editorial voice, but it also means the table of contents reads as a list of objects rather than a list of causal questions.

The civic reform variants are near-copies, not independent mechanisms:

- `civic.union-hall-meeting` / `civic-union-reform-arbitration` vs `civic.reform-meeting` / `civic-reform-clinic-committee`: same room, same table, same three-year residence proof, same "don't hand over the coal ledger" beat, nearly the same effects.
- `civic-union-reform-waitlist` vs `civic-reform-clinic-waitlist`: same "new flats go to well-behaved families", same confiscated lease copy, same no-receipt ending.

That is duplication, not context variation. It makes the reform context look thicker than it is.

## 3. Structural defects

### 3.1 Gendered prose, ungendered casting

This is the clearest casting defect in the pack.

- **30/30 civic/culture/migration kernels** narrate the subject as `她`. Their `subjectRole()` helper sets age only; none sets `sex`.
- **21 health kernels** contain `他` while the subject role is not sex-restricted; in many of them the subject is clearly the referent (`health.lead-poisoning`, `health.mental-breakdown`, `crisis.arrest-questioning`, `crisis.denunciation`).
- Across the five files, **80 kernels contain gendered pronouns while their subject role is not sex-restricted**. Some `他` references are to other people, but the civic set is unambiguous: every kernel calls the subject `她`.
- The engine casts by role, not by pronoun. A male subject can be cast into `civic-election-party` and be called `她`; a female subject can be cast into `health.lead-wrist-drop` and be called `他`.

Fix options: set `sex: 'female'` / `sex: 'male'` on the subject role where the prose is gendered, or neutralize every subject pronoun to the role token/name. The former is cheap but narrows the lives the pack can tell; the latter is better for a compositional engine.

Related miscasts:

- `family.pregnancy` and `family.childbirth` require a `midwife` role of kind `neighbor` with **no sex**. A male neighbor can be cast as the midwife.
- `family.in-laws` requires `mother_in_law` of kind `neighbor` with **no sex**. A man can be cast as the 婆婆.
- `family.widowhood` requires `in_law` of kind `neighbor`; any unrelated neighbor can be labeled an in-law.
- `family.child-illness` requires `child` of kind `neighbor` with `sameHousehold: true`; the engine can cast any household member aged 0–8, not necessarily the subject's child. The relation effect then asserts `kin`. Phase 10 already flagged this same role pattern.
- `civic.refugee-aid` requires `refugee` of kind `neighbor`; any neighbor can be cast as a refugee. There is no refugee/status condition.
- `civic.salon-encounter` requires a `historical` role with `historicalId: 'Q44328'` and hardcoded `met_karl_kraus` / `argued_with_karl_kraus` flags. If the curated historical person is absent or renamed, the required role cannot cast and the scene silently disappears; the flags also hardcode an identity the role contract only refers to by Q-ID.
- `work.unemployment-relief-desk` requires an `employer` role of kind `organization`, `organizationKind: 'state'`. The relief office is not an employer; the role is a funding hack and is never referenced in the text.

### 3.2 Major events change flags, not institutions

The pack's worst causal pattern is a major collective event whose outcomes change only personal flags, roles, reputation, and mood, while the prose claims a wage, policy, election, or organizational result.

| Outcome | What the text claims | What is actually typed |
|---|---|---|
| `work-strike-joined` | strike demands: restore the old wage, withdraw the short-time list | `cash -8`, union membership, `striker` role, reputation, flag; **no wage, hours, or organization-state change** |
| `work-strike-mediated` | "先恢复原工价一周，短工名单暂缓" | cash -2, union membership, `shop_delegate` role, relations, flag; **no wage or short-time-list change** |
| `civic-election-party` | vote, party work, checking door numbers | party membership, `election_worker` role, reputation, relation, cash, knowledge; **no election result, seat, or policy** |
| `civic-demonstration-march` | march on the Ringstrasse | `demonstration_marshal` role, flag, reputation, relation, health; **no political or repression consequence** |
| `civic-union-register` | formal joining of the union | membership, `dues_book_keeper` role, relation, cash, knowledge; **no union density, treasury, or collective-bargaining effect** |
| `civic-petition-filed` | 120 signatures delivered to the city | `petition_carrier` role, reputation, relations, cash, knowledge, flag; **no administrative response or policy change** |
| `civic-union-reform-waitlist` | new municipal flats are allocated | flag, relation, cash, reputation; **no housing allocation, rent, or residence change** |

These are not minor omissions. If a strike, election, demonstration, union, petition, or housing allocation can occur without changing the organization, the wage, the housing stock, or the government, then the pack is writing **about** politics rather than simulating it. The `civic` file is the clearest case: 24 of its 30 kernels have only age/stage in their own `conditions` array, so the scenes are open to any adult and the political outcome is always personal.

The same problem appears in work:

- `work-promotion-accepted` promotes a 26-year-old to foreman at 140 kronen because "the old foreman retired"; there is no tenure, skill, vacancy, or foreman-role condition. Any eligible adult can get the chair.
- `work-dismissed-severance` says "干满五年，补一个月工钱，共二十克朗"; there is no five-year tenure condition, and 20 kronen is not one month at the pack's own 24–28 kronen wage.
- `work-relief-approved` says six weeks at 12 kronen per week; the effect is a single `+12` cash payment. There is no recurring benefit, no six-week condition, and no later check.
- `migrate.retirement` sets `unemployment` and a `retired` role, but no pension income. The text says "退休"; the state says "no job". A retiree with no pension is not a retirement system.

### 3.3 Claims without a typed effect

Some outcomes state a major fact that has no matching effect at all. These are not "the effect is small"; the effect is absent.

| Outcome | Claim | Missing state |
|---|---|---|
| `civic-last-friend-funeral` | "唯一的老友去世" / "最后一个老朋友走了" | **No `death` effect on `$friend`.** Only `relation_end`, a flag, a condition, knowledge, and health. The friend remains alive in the world. |
| `civic-last-friend-missed` | the friend's funeral happened without the subject | same: no `death` effect |
| `civic-exile-leave` | "在护照盖章后离开维也纳" / train leaves | only `move` to `@station`; **no move to another region**, no household split, no asset loss |
| `civic-refugee-shelter` | the refugee sleeps in the subject's kitchen | only `moveOther` to `@home`; **no `household` effect**, so the refugee is not a household member and the rent/food burden is only a cash debit |
| `civic-refugee-postwar-found` | found in a shelter and taken to register | link/knowledge/flag/cash/health; **no `move`** for the refugee |
| `civic-retirement-retire` | retirement | `unemployment` + `retired` role; **no pension, no reduced income, no contribution record** |
| `inheritance.older-will` | estate frozen for six months | flag + knowledge; **no estate freeze, no blocked asset, no later release** |
| `family.pregnancy.confirmed` | pregnancy confirmed | role + condition; **no due date, no risk state, and `family.childbirth` does not require pregnancy** |
| `work-strike-mediated` | wage restored for one week | no wage/employment effect |
| `health.lead-wrist-drop` | moved to the warehouse | employment effect exists, but the new wage is 64/month, far below the pack's foreman 140 and baseline 108–260 |

The pregnancy/childbirth pair deserves special mention. `pregnancy.confirmed` adds `role: 'pregnant'` and `condition: 'expecting a child'`; `family.childbirth` requires a partner, health, cash, and household size, but **not** pregnancy. A woman can give birth without the pregnancy kernel, and a pregnancy can persist forever if the birth kernel never fires. The two scenes are narratively linked but not state-linked.

### 3.4 Silent effect drops from context placeholders

The composer drops any effect whose `@place` is not mapped in the winning context (`resolveEffect` → `compileOutcomes`). It keeps the outcome if any other effect survives. This creates text that claims a major change with no matching typed effect, without a validation failure.

Concrete cases:

- `edu-school-enrolled` has `education.placeId: '@school'`. `ctx-vienna-war-1915` and `ctx-vienna-crisis-1923` have **no `@school`**. In those contexts the education effect is dropped; the cash, relation, `pupil` role, literacy skill, and flag survive. The text still says the child was enrolled and shown to a seat.
- `edu-university-matriculated` has `education.placeId: '@university'`. `ctx-vienna-reform-1930` has **no `@university`**. The education effect is dropped; the cash, move, `university_student` role, relation, and flag survive. The text still says the subject matriculated.
- `edu-move-to-relatives` has `residence: '@rural'` and `move: '@rural'`. `ctx-vienna-postwar-1920` has **no `@rural`**. Both effects are dropped; the text still says the family moved to the country and the child transferred to a small-town school.
- `civic-city-arrival-factory` has `employment.workplaceId: '@workplace'`. `ctx-klosterneuburg-rural-1912` has **no `@workplace`**. The employment effect is dropped; the residence, cash, relation, flag, and knowledge survive. The text still says she found a factory job.

This is a composition-contract bug as much as a content bug. The engine should not silently keep a text whose key effect was removed; it should either fail the outcome, replace the text, or report the drop. The current behavior makes "specificity" look better than the state actually is.

### 3.5 Conditions are too thin to make the scene a mechanism

**24/30 civic/culture/migration kernels have only age (and sometimes stage) conditions.** There is no literacy gate for `culture.publication`, no university education for `culture.lecture-rivalry`, no citizenship/sex for `civic.election-day`, no political role for `civic.exile-departure`, no print skill for `civic.underground-press`, no migration history for `migrate.return-home`, and no widow/contribution condition for `migrate.pension-appeal`. The subject can be anyone of the right age.

Examples:

- `culture.publication` / `civic-publication-accepted`: a short story is accepted by a publisher; the only condition is age 20–70. There is no literacy, education, writing skill, prior manuscript, or editor relation.
- `culture.lecture-rivalry` / `civic-lecture-challenge`: a student challenges a professor's sample; the only condition is age 18–65. There is no university enrollment or education status.
- `civic.election-day`: the only condition is age 21–70. In `ctx-vienna-1912`, a 21-year-old woman can vote, which is historically false for pre-1918 Vienna.
- `civic.exile-departure`: the only condition is age 20–70. Any adult in a crisis context can become an exile, with no prior activism, party role, or police record.
- `migrate.retirement` has age 60–85 and `employment: true`, but no contribution years or pension eligibility.

This is why many civic scenes read as topic labels: the kernel is not selecting for the people who could plausibly do the thing.

**Topic-label kernels, not causal incidents (as major events):**

- `civic.election-day` — an election occurs, but no election result, seat, government, or policy changes.
- `civic.union-hall-meeting` — a union meeting occurs, but no union decision, density, treasury, or bargaining position changes.
- `civic.reform-meeting` — a reform meeting occurs, but no housing allocation, rent, clinic access, or policy changes.
- `civic.demonstration` — a march occurs, but no political consequence follows unless the crisis variant fires.
- `civic.petition-drive` — signatures are delivered, but no administrative response or policy change follows.
- `migrate.retirement` — a retirement occurs, but the state is `unemployment` and no pension exists.
- `migrate.last-friend` — a death is narrated, but the friend is never given a `death` effect.

Each of these has *some* typed effect (a role, flag, membership, cash, or relation), so it is not literally empty. The problem is that the effect is not the one the title and text promise. They are labels for a theme, not mechanisms that alter future behavior.

### 3.6 Duplicate and near-duplicate variants

The civic reform pair is the clearest copy-paste:

- `civic.union-hall-meeting` / `civic-union-reform-arbitration`
- `civic.reform-meeting` / `civic-reform-clinic-committee`

Both are "the activity room becomes a consultation office, the housing officer asks for three years' residence, the organizer kicks her shoe, don't hand over the coal ledger." The effects are nearly identical: `rent_arbitration_delegate`, union membership, relation to housing officer, cash -1, same knowledge. The waitlist pair repeats the same "new flats for well-behaved families / confiscated lease copy / no receipt" beat.

This is not context variation; it is the same scene under two titles. Either differentiate the two institutions (union legal aid vs municipal housing office) or delete one.

## 4. Period, institution, and unsupported assumptions

### 4.1 Currency and wage scale

| Evidence | Problem |
|---|---|
| `child.first-errand`: "两枚十字币"; title "一枚十字币" | Kreuzer was obsolete in Austria after the 1892 currency reform; Vienna uses kronen/heller, then Schilling from 1925. The amount is also too small for salt and half a loaf. |
| `health.pain-electric-belt`: 25 **Schilling** | The Schilling was introduced in 1925. The kernel is elderhood and can fire in 1900–1924 contexts. |
| `work.factory-speedup`: `wage: 34`, `26`, `36` | The pack's own baseline (`vienna-1912.ts`) uses monthly wages of 108–260. 26–36 kronen per month is not a viable adult factory wage. The text says "月底" and a 3-kronen bonus, so this is not a weekly wage either. |
| `work.unemployment-relief-municipal-job`: "一天一克朗半" vs `wage: 4.5` | At 1.5/day for a week the payment should be ~9–10.5, not 4.5. The `+4.5` "first week" cash is inconsistent with the text. |
| `work.hiring-daywork`: "二十六赫勒" per day vs `wage: 22` | 26 heller/day is ~7 kronen/month, not 22. |
| `work.dismissed-severance`: "干满五年，补一个月工钱，共二十克朗" | One month at the pack's own 24–28 kronen is 24–28, not 20. There is no tenure condition. |
| `family.dowry-negotiation`: condition cash ≥ 8; effect -20 | The text says 20 kronen paid; the engine can only debit what the household has and clamps at zero. No debt state exists. |
| `edu-university-matriculated`: condition cash ≥ 25; effect -52 | Same: the text says 40 + 12 rent; the effect can be clamped. |
| `health.clinic-queue`: cash -6 with no cash condition | A destitute household can be treated as paying 6; the engine silently debits less. |
| `family.marriage-household.tavern-debt`: "欠条...圣烛节前还清" | Only a cash debit; no debt/obligation effect. The tavern uncle's claim disappears after the scene. |

The pack repeatedly uses "debt" as a narrative fact without a debt state. There is no `EventEffect` for a loan, obligation, or creditor; `cash` is spot money. Any scene that says "欠条", "赊账", "预支", "分期", or "下个月还" is not represented in the simulation. This is a systemic limitation, not a single typo.

### 4.2 University, school, and the lyceum

`ctx-vienna-1912` maps `@university` to `place-wien-maedchenlyzeum`, a girls' lyceum. `vienna-1912.ts` itself notes that the lyceum leaving certificate "did not automatically open university study." The same mapping is used in `ctx-vienna-medical-1930` and `ctx-vienna-university-1912`.

Consequences:

- `edu.university-entrance` can compile in `ctx-vienna-1912` and place the student at a secondary girls' school while the effect says `education.status: 'higher'`.
- `edu.scholarship-exam` hardcodes "考试在女子中学的二层教室" but the subject role has no sex condition; a boy can be cast into a girls' school exam.
- The pack has no Matura/Gymnasium distinction. `education.status: 'secondary'` can mean a Bürgerschule or a Gymnasium; the university-entrance kernel treats any secondary status as sufficient, with only a Latin exam as a gate.

This is the single clearest period/institution error in the education file. Either add a real university place and a Matura condition, or reframe the kernel as a lyceum/teacher-training scene and remove the university claim.

### 4.3 Port context without a port

`ctx-emigration-port-1912` is titled "港口与离境手续" but maps every place to Vienna:

- `@station` → `place-wien`
- `@government` → `place-wien-magistrat`
- `@workplace` → `place-wien-printshop-winter`
- `@home` → `place-wien-leopoldstadt-tenement`
- `@market` → `place-wien-markthalle`

There is no port, no shipping office, no quay, no embarkation, and no ticket agent. A "port" scene happens in a Vienna print shop and tenement. This is a label, not a context. If the intended port is Trieste, it needs its own place set and travel cost; if the intended scene is a Vienna passport office, rename the context.

### 4.4 Suffrage and election

`civic.election-day` has age 21–70, no sex/citizenship condition, and contexts include `peace` and `reform`. In `ctx-vienna-1912` that permits a 21-year-old woman to vote. Pre-1918 Austrian elections were male, curial, and age-graded; women did not vote. The postwar variant correctly says women vote, but the base outcomes remain available in prewar contexts.

Fix: gate the base kernel to a postwar/reform context with universal suffrage, or add a `sex`/`citizenship`/`worldYear` condition; if the engine cannot express the curia, restrict the kernel to 1919+ and use the postwar variant.

### 4.5 Radio before radio

`culture.radio-broadcast` has contexts `['vienna','urban','culture','reform','postwar']`. `ctx-vienna-postwar-1920` runs from 1919. Austrian radio broadcasting began in 1924. A radio studio scene can therefore fire in 1919–1923. Gate it to 1924+ or to the reform context, and add a radio-set/ownership condition if the scene is about listeners.

### 4.6 Construction site inside a print shop

`work.construction-scaffold` has milieus `['factory']` and no `placeKind` condition. In `ctx-vienna-factory-1912`, the factory place is `place-wien-printshop-winter`. The text is a building site with scaffolding, bricks, and a site boss; the effect uses `$workplace` and `$subjectOrg`. The scene can occur in a print shop. Add a construction/place condition or a `@site` placeholder; otherwise this is a place mismatch, not just a metaphor.

### 4.7 Work and reform do not meet

`work-commerce` kernels list `reform` in contexts, but no work milieu matches `ctx-vienna-reform-1930`:

- `milieu-factory`: contextTags `vienna, industrial, factory, war, crisis` — no reform.
- `milieu-printshop`: `vienna, industrial, factory, war, postwar, crisis` — no reform.
- `milieu-shop`: `vienna, urban, industrial, peace, postwar` — no reform.

So factory/print/shop work kernels with `reform` can never compile in the reform context. Among the factory/print/shop work kernels, none can; the relief-desk kernel can via the tenement milieu, and some work tasks can via the government milieu. The context says "reform changes work," but the industrial work milieus are absent. This is a coverage hole that makes the reform context look more causal than it is.

The same pattern is milder in postwar: `milieu-factory` lacks `postwar`, so factory-specific work is unavailable after 1918; printshop and shop survive. That may be intentional (printshop as the default industrial milieu), but it narrows the work world to printing.

### 4.8 Legal assumptions

`family.separation.no-legal-form` says the office requires "通奸或遗弃的证据" before a separation, otherwise the couple can only live apart. This is a compressed and partly misleading account of Austrian marriage law: Catholic marriages were not dissoluble by civil divorce before 1918, and separation/annulment rules were confessional and class-specific. The scene is strong as a bureaucratic encounter, but the legal claim should be narrowed to "the office will not register a separation without evidence" rather than a general rule.

## 5. Context and milieu: how much causality is real?

The Phase 11 plan distinguishes three levels: A narrative variation, B situational variation, C causal variation. The pack is mostly **B**, with pockets of **C**.

### A — narrative variation is nearly absent

- **0** occurrences of `{context}` in kernel text.
- **0** occurrences of `{flavor}` in kernel text.
- **1** occurrence of `{milieu}` in all 686 outcome texts (`social.first-meeting` / `first-meeting.coal-basket`).

So the context/milieu names almost never appear in prose. A scene does not say "in the reform Vienna of 1930" or "in the printshop"; it says "at the window" and relies on place IDs. The beautiful `flavor` strings in `contexts.ts` are unused by the composer's text path because no kernel opts in.

### B — situational variation is real but narrow

Contexts do change:

- place IDs (printshop, tenement, hospital, magistrate, station, rural house, lyceum);
- `wageMultiplier` (0.7 crisis, 0.8 rural, 0.85 war, 0.9 postwar, 0.95 factory/port, 1.0 vienna, 1.05 reform/medical);
- eligibility tags and context conditions;
- which variants are available.

This is enough to change **where** a scene happens and **which** scenes are eligible. It is not enough to change **how the institution works**. The `causalNotes` are prose documentation; the engine does not read them. "Public health, workers' housing and education reform change access" is not a rule in the model; it is a note next to a place map.

### C — causal variation exists, but it is uneven and sometimes shadowed

There are 98 variants. The good ones genuinely replace outcomes and add roles/conditions/effects:

- `child.illness-clinic` (hospital admission vs home nursing vs quarantine);
- `work.proof-war-censorship` (censor role, red-pencil deletions, knowledge);
- `family.marriage-household-postwar` (subdivided flat vs shared kitchen);
- `family.marriage-household-war` (registry before departure vs unfinished papers);
- `culture.publication-postwar` (memoir cuts vs published war notes);
- `civic.exile-crisis` (false name vs stay).

But:

- **Only 1 of 98 variants keys on `milieuTags`** (the vineyard childhood variant). The rest key on context tags, process kinds, or legacy kinds. **Milieu variation is almost entirely eligibility and label, not causal variation.**
- The composer chooses one context per kernel+milieu by priority (`composer.ts`: contexts sorted by priority; `chosen` keyed by `kernel.id|milieu.id`). The effective order is war 100 > crisis 90 > postwar 80 > reform 70 > medical 60 > rural 50 > port 40 > university 30 > factory 20 > vienna 10.
- Therefore, when several contexts overlap, the higher-priority context compiles the base outcomes and the lower-priority context's variants never appear for that kernel+milieu. In 1925–1933, `ctx-vienna-postwar-1920` (priority 80) generally beats `ctx-vienna-reform-1930` (70) when both are active. Reform variants survive only for kernels whose context list excludes postwar (e.g. some civic kernels) or whose milieu is not chosen by postwar. This is why the "reform city" can feel like a label: its signature variants are often shadowed.
- `ctx-vienna-1912` (priority 10) is largely residual: `ctx-vienna-factory-1912` (20) wins for factory/home/market scenes, and `ctx-vienna-1912` remains for school/cafe/station/rural/university scenes. The prewar city is split into two competing contexts with nearly the same places.
- Milieu coverage holes further reduce variation: factory work unavailable in postwar/reform; printshop work unavailable in reform; shop work unavailable in reform/crisis/war; cafe unavailable in reform; union unavailable in postwar; school unavailable in war/crisis. These are not just missing labels; they make authored kernels unreachable in the contexts that claim to change them.

**Verdict:** Context variation is a real B-level system with some C-level war/crisis/reform/postwar variants. Milieu variation is mostly a filter plus a place label. The pack does not yet simulate institutions changing behavior; it simulates scenes being placed in institutional settings.

## 6. Rewrite queue (12 targeted fixes)

These are the highest-leverage edits. They are not full-pack rewrites; each is a focused change to one kernel cluster.

1. **`child.first-errand` — all three outcomes.** Replace `十字币` with period currency (`十赫勒` / `二十赫勒`, or kronen) and add a `cash` debit for the purchase. `edu-errand-good-change` currently grants `food +2` with no money spent; `edu-errand-loses-change` charges `-2` kronen for a lost coin; `edu-errand-buys-sweets` charges `-1` for two sweets. Rebase all three to the same small money scale so the change is meaningful.

2. **`child.gift` / `edu-gift-ration-black-market`.** The text says "两克朗" but the effect grants `+8` cash, then `+2` food for the bread bought with that money. Either change the text to eight kronen or change the effect to two; then remove the double credit (cash + food for the same transaction) or add an explicit `cash -2` purchase. This outcome is the clearest single fact/effect contradiction in the childhood file.

3. **`work.factory-speedup` — all three base outcomes and the electric variant.** Rebase adult monthly wages to the pack's own 1912 scale (roughly 100–140 for a skilled factory worker, not 26–36). If the intent is a weekly wage, make the unit explicit and convert all `cash` bonuses and rents. Apply the same scale pass to `work.hiring-trial` (28), `work.hiring-daywork` (22), `work.demotion-accepted` (24), `work.short-time-accepted` (18), and `work.unemployment-relief-municipal-job` (4.5). A 3-kronen bonus and a 14-kronen rent cannot coexist with a 26-kronen monthly wage.

4. **`work.strike-machine-hall` / `work-strike-joined`, `work-strike-mediated`, `work-strike-stayed`.** Add a real employment/wage/organization effect. The joined outcome should change the wage, the short-time list, or the union's recognized status; the mediated outcome should actually restore the old wage for a stated period or record a written settlement; the stayed outcome should record the foreman's promise and the workers' reaction. Without this, the text's "恢复原工价" is a lie. Apply the same standard to `civic.demonstration` (policy/repression effect) and `civic.petition-drive` (administrative response).

5. **`civic.election-day` — all outcomes.** Add a suffrage gate (sex, age, citizenship, and year/context), or restrict the base kernel to 1919+ and move the prewar version to a separate curia scene. Add an election result/party-seat/policy effect, or rename the kernel to "polling-station work" and remove the claim that an election has occurred. A vote that changes only the voter's flag is not an election.

6. **`civic.union-hall-meeting` / `civic-union-register`.** The dedicated `milieu-union` requires `hasRole: union_member`, so the "join the union" scene is normally only available to people who are already members. It can leak through `milieu-printshop` because that profile carries the `union` tag, but that is accidental. Add a public-meeting milieu or remove the membership condition from the joining variant; then decide whether `civic-union-register` is a first joining (no prior role) or a transfer (prior role), and write the text for that case.

7. **`civic.exile-departure` / `civic-exile-leave`.** Add an actual region/destination move and a household split (who stays, who goes, what is sold or left). If the intended scene is only "at the station, before departure," change the text and title to say so and remove "离开维也纳." A `move` to `@station` inside Vienna is not exile.

8. **`migrate.last-friend` / `civic-last-friend-funeral`, `civic-last-friend-missed`, `civic-last-friend-postwar-comrade`.** Add a `death` effect for `$friend` (and the war comrade where applicable), with a cause and, if relevant, an estate/bereavement consequence. The current outcomes end the relationship but leave the friend alive. This is a hard state contradiction, not a literary ambiguity.

9. **`family.pregnancy` + `family.childbirth`.** Add a durable pregnancy state with a due date/risk and require it in `childbirth`; or remove the pregnancy kernel until the state exists. Link miscarriage (`pregnancy.lost-child`) to the same state and make the birth outcomes clear it. Right now the two kernels are narratively sequential but mechanically independent.

10. **`migrate.retirement` / `civic-retirement-retire`, `civic-retirement-stay`.** Replace `unemployment` with a retirement/pension state and income, or add a monthly pension cash effect plus a contribution/tenure condition. The current retiree has no job and no pension; the text says "退休," the state says "unemployed." `civic-retirement-papers` should be the application path, not a flag-only scene.

11. **`civic.refugee-aid` / `civic-refugee-shelter`, `civic-refugee-postwar-found`.** Add a `household` effect for co-residence, a `residence`/`move` for the found refugee, and a cost/overcrowding condition. The text says the refugee sleeps in the kitchen; the state only changes location. Also add a refugee/status condition so any neighbor cannot be cast as a refugee.

12. **`edu.university-entrance` / `edu-university-matriculated`, `edu-university-provisional`.** Add a Matura/Gymnasium gate (not just `secondary`), map `@university` to a real university place (or add one), and add the pre-1918 sex/faculty restrictions where relevant. Fix the cash condition: `cash ≥ 25` cannot support a `-52` effect; either raise the condition or add a debt/ scholarship path. The same `@university` mapping error affects `ctx-vienna-medical-1930` and `ctx-vienna-university-1912`.

### Secondary queue (not counted in the 12)

- `work.promotion-accepted`: add tenure, skill, and vacancy conditions; otherwise a 26-year-old can become foreman.
- `work.dismissed-severance`: add a five-year tenure condition and make the severance equal one month at the actual wage.
- `culture.publication`: add literacy/education/writing-skill or a prior-manuscript condition.
- `health.pain-electric-belt`: change 25 Schilling to kronen unless the context is 1925+.
- `culture.radio-broadcast`: gate to 1924+ or reform.
- `family.separation` / `separation.deserted` and `family.household-violence` / `household-violence.reported`: replace the literal English `partner` in the knowledge proposition with `{partner}` or a Chinese role word.
- `health.wrong-diagnosis` / `wrong-diagnosis-nerves`: the knowledge proposition "第一家医院说这是神经衰弱..." is marked `trueInWorld: false`, but the fact that the hospital said it is true. Change the proposition to the false diagnosis itself, or set `trueInWorld: true`.
- `family.widowhood.missing-declared-dead`: the base outcome begins "战争结束两年" but can fire in `peace`/`reform` contexts; gate it to war aftermath or rewrite the opening.
- `work.unemployment-relief-desk`: the `employer` role is a state organization used as a funding source; rename it or remove it.
- `civic.reform-meeting` / `civic.union-reform`: delete one of the near-duplicate reform pairs.

## 7. Candid pass/fail

**Major-event threshold: FAIL.**

The pack does not clear 34/40 as a major-event system. Four of ten major/near-major samples pass, and even the charitable strict subset (significance ≥ 0.80) is only 4/7 with a mean of exactly 34.0 — a borderline aggregate that fails on a per-event threshold. The passes are concentrated in intimate family and health scenes, where a death, birth, marriage, or operation naturally produces typed effects. The failures are concentrated in work and civic scenes, where the pack wants to depict strikes, elections, unions, housing reform, exile, and retirement but supplies only personal flags.

This is not a reason to rewrite the prose wholesale. The prose is the pack's strongest asset: restrained, specific, and often very moving. The required work is narrower and harder:

1. fix the gender/casting contract;
2. fix the currency/wage scale and stop using debt as a metaphor without a debt state;
3. give collective events an institutional effect (wage, policy, organization, election, housing, pension);
4. link pregnancy → birth, retirement → pension, exile → region move, shelter → household, friend's death → death;
5. stop silently dropping effects when a context lacks a place;
6. make at least a few milieu variants actually change causality, not just eligibility.

Until then, the pack is a strong collection of **scenes about** a society, not yet a simulation **of** one.
