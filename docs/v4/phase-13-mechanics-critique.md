# Phase 13 — Mechanics Critique

**Date:** 2026-11-04
**Artifacts read:** `docs/v4/playtest.json` (`generatedAt 2026-11-04T11:29:00.532Z`, seed `vienna-1912-vertical-slice`, 1912–2000, 88 years), `docs/v4/phase-13-lives.md` (regenerated 19:29 local), `docs/v4/phase-13-scheduling.json` (`generatedAt 2026-11-04T11:13:47.752Z`, 40 years), `docs/v4/phase-13-family.json` (`generatedAt 2026-11-04T11:14:49.239Z`, 40 years), `docs/v4/phase-12-mechanics-critique.md`.
**Code read:** `packages/v4/engine.ts`, `packages/v4/content/vienna-family.ts`, `packages/v4/content/generated/vienna-illness-household.json`, `packages/v4/content/generated/vienna-courtship-courtyard.json`, selected `packages/v4/content/kernels/recipes/*.ts`, `scripts/v4-playtest.ts`, `scripts/v4-phase13-family.ts`, `scripts/v4-phase13-scheduling.ts`, `packages/v4/store.ts`.
**Constraint:** no code or content was edited. Only this file was written.

---

## 1. Bottom line (the four requested answers)

| Question | Answer |
|---|---|
| 20-event sample | **13 pass / 7 flag**, multi-label. 6 composed (including 1 task), 5 family/relationship, all drawn from the 75 current excerpt events. |
| Phase 12 hard bug 1: subject-role cache collision | **Does not remain.** 64/64 traced excerpt events have exactly one `role: subject`, equal to `trace.subject.id`; 0 duplicates; 0 effect-type mismatches. The regression test passes. The previous narration-protagonist examples (`006337`, `005520`) are gone from the current excerpts. |
| Phase 12 hard bug 2: stranger father | **Does not remain as a literal stranger.** Childbirth cannot materialize a new partner; the current Hedwig births use **Otto Hofer**, her recorded partner, and the current family sample families use actual parent pairs. But the **courtship → partner → childbirth chain is still globally incoherent**: the 40-year scheduling audit blocks **109 childbirth attempts** (more than its 94 births), plus 92 divorces and 69/61 same-sex scenes. |
| Birth/population path | **Locally coherent, globally still starved.** For Hedwig/Otto, courtship → partner → 1931 and 1932 births works, with the six-Kroner midwife fee committed. But 84 births vs 107 deaths in the family run, 351 vs 440 in the playtest, 8,876 vs 19,537 in the macro state; 47.9% of the playtest cast and 58.1% of the family cast are materialized. Fertility per *active* couple is plausible (~4 births per couple over 40 years); partnership/cohabitation formation is the bottleneck. |
| Remaining hard failures | Post-death participant events (4 canonical facts), missing money (5 sampled events; 234 `unresolved_effect_ref` warnings), the family-path deadlock (109 childbirth / 92 divorce blocks), a “young man” pronoun for female Mitzi, an organisation-as-actor with an unbooked 2-Kroner deduction, two zero-effect scenes, and the false “longest-lived = Hedwig (27)” label. Details in §6. |

---

## 2. Method and limits

- The playtest exposes **75 event texts** (5 lives × 15). The other **33,949** events are counts only. The 20-event sample is therefore necessarily drawn from those 75; it is a judgment sample, not a random sample of the whole run.
- Checks were manual readings of the Chinese prose plus:
  - trace-role checks over all 75 excerpts (subject-role count and identity, effect-type equality, participant duplication);
  - name/pronoun keyword checks (explicitly **not** a formal proof of reference);
  - code inspection of casting, effect application and family-scene paths;
  - read-only supplementary probes on the same code (`phase13-probe`, `phase13-probe2`, `phase13-probe3`, `phase13-probe4`) to reproduce the family mechanism. The probes use different seeds and are not the official playtest; they are only used where the official scheduling shows the same symptom.
- No claim rests on a keyword check alone. The strongest findings rest on committed effects, person IDs, trace roles, or code paths.

### 2.1 What the artifact checks do and do not establish

- `textAudit.unresolvedTemplateTokenEvents = 0`, `literalNoneEvents = 0`, `emptyParticipantEvents = 0`: shape checks. They confirm no token leaked in the sampled text; they do not prove the prose refers to the right person.
- `compositionAudit.traceCoverageOfComposed = 1`: every composed event has a trace; it does not prove the trace's roles, effects or prose agree.
- `anomalies.anyEventAfterSubjectDeath = false`: checks **`event.subjectId` only**, not dead participants. It is a false negative for §6.1.
- `schedulingAudit` base counters are zero (`ordinary.draws.base = 0`, `ordinary.preparedPass.base = 0`); the base/composed rate comparison is invalid.
- `phase-13-lives.md` says “每人抽取 15 条事件” but does not disclose that 21/64 traced events are participant-only and 12/75 do not name the focal person at all.

---

## 3. The 20-event sample

All events are from the current `docs/v4/playtest.json` excerpts. “Pass” means: subject identity is consistent with the trace, the prose's material claims have committed effects in the right direction, no effect contradiction, no post-death date, and (for composed events) kernel/context/milieu are present. “Flag” means at least one of those failed. A separate focal-attribution note is given where the event is in a life dossier but is not about that focal person; that is a presentation issue, not counted as an event-level failure.

| # | Event | Action | Verdict | Main issue |
|---:|---|---|---|---|
| 1 | `evt:...000673` 1918.01 Anton | `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` | **pass** | Subject Anton; food/mood/skill/relation present. Relation target Alois Huber is offstage in the prose. |
| 2 | `evt:...001278` 1922.04 Anton | `vienna-childhood-street.market-errand/errand-lost-coin` | **pass** | Trace subject Franz, prose Franz; cash −0.3 exactly matches three 10-Kreuzer coins. Focal-attribution issue: this is in Anton's dossier, not Franz's. |
| 3 | `evt:...002995` 1930.01 Hedwig | `vienna-family-courtship/ask-to-share-a-home` | **pass** | Subject Hedwig; the outcome creates a pending `interaction` and an acquaintance relation to Otto Hofer. The proposal is not yet a partner relation, correctly. |
| 4 | `evt:...003253` 1931.01 Hedwig | `vienna-family-childbirth/daughter-born` | **pass** | Subject Hedwig, partner **Otto Hofer**, birth + health −0.08 + cash −6. The father is the recorded partner; the six-Kroner midwife fee is committed. |
| 5 | `evt:...003534` 1932.01 Hedwig | `vienna-family-childbirth/son-born` | **pass** | Same pair, second birth; birth + health −0.08 + cash −6. The chain courtship (1930) → partner → births (1931/1932) is coherent for this couple. |
| 6 | `evt:...004628` 1936.01 Hedwig | `r2-law.rent-contract::ctx-vienna-authoritarian-1934::milieu-tenement/signed-with-repair-clause` | **pass** | Subject Hedwig; cash −6, flag, relation, knowledge. Composed metadata complete. Relation to the landlord is only `acquaintance`; the cash amount is not narrated. |
| 7 | `evt:...005468` 1939.10 Hedwig | `major-crisis.press-accident/press-kills` | **pass** | Subject Hedwig; condition, relation, death. The prose explicitly names Hedwig and describes the fatal press accident. No post-death date. |
| 8 | `evt:...001822` 1925.08 Mitzi | `r1-fam.schooling-decision::ctx-vienna-reform-1930::milieu-tenement/school.apprenticeship` | **pass** | Subject Mitzi; cash +2, flag, role `apprentice`, relation, knowledge, education, relation. Composed metadata complete; prose names Rosa Huber/Alois Huber/Friedrich/Mitzi. |
| 9 | `evt:...005216` 1938.11 Mitzi | `vienna-market-household.market-credit/market-credit.delay` | **flag** | Prose says Mitzi pays **2.20 Kroner** next week (“两个克朗二十个十字币”); committed effects are food +3, reputation −0.05, relation. **No cash effect.** |
| 10 | `evt:...007394` 1945.01 Mitzi | `p10-migration-tasks.move-district/move-share-smaller-room` | **pass** | Subject Mitzi (“她” correct); residence, food +2, relations. The move and food are committed; rent is mentioned but no exact cash claim. |
| 11 | `evt:...012514` 1959.01 Mitzi | `p9-work-jobsearch.ask-trial/ask-trial.accepted` | **flag** | Subject Mitzi is female and 47; the prose calls her **“这后生”** (“this young man”) and says Gustav Bauer 4 vouches for “him”. Gender/age mismatch. |
| 12 | `evt:...015690` 1967.02 Mitzi | `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` | **flag** | Trace subject Helene Huber 3; prose says **six Kroner** of coal money was stolen; committed effects are relation + mood only. **No cash −6.** |
| 13 | `evt:...017213` 1970.07 Mitzi | `r13-turn.widowhood::ctx-vienna-postwar-1945::milieu-hospital::postwar-pension-queue/consumption-at-home` | **pass** | Composed; subject Friedrich Winter, death effect on Mitzi as `$partner`. The prose explicitly names Mitzi and her TB death. Cash +2 “双人床空出的那一半” is not narrated, but the death is. Attribution caveat: the focal death is a participant effect in the survivor's event. |
| 14 | `evt:...003528` 1932.01 Lena | `vienna-family-divorce/reconcile-for-now` | **pass** | Subject Emil; prose Emil/Lena; partner relation + mood. The couple stays together for practical reasons; the relationship state is committed. |
| 15 | `evt:...005448` 1939.01 Lena | `vienna-family-divorce/separate-under-one-roof` | **flag** | Subject Hermann Stein 2; relation_end + mood ×2. The authored cash −3 for separate goods is **absent**; the prose mentions the split bed but no money. |
| 16 | `evt:...005751` 1940.10 Lena | `p9-social-tenement-neighbors.evicted-neighbours/evicted-neighbours.store-boxes` | **flag (soft)** | Subject Hermann Stein 2; committed effects are **empty**. The text is a domestic vignette (bed frame in the kitchen, a child with a cup), not a material transaction. A text-only scene was persisted. |
| 17 | `evt:...007342` 1945.12 Lena | `r1-hc.juvenile-delinquency::ctx-vienna-authoritarian-1934::milieu-factory/coal-run-parent-called` | **flag** | Subject Alois Bauer; the parent Lena is called to the coal office. Effects reputation/flag/role/relations/knowledge; the authored **cash −1** for the coal is absent. Prose does not mention money, but the ledger cost is dropped. |
| 18 | `evt:...002517` 1928.03 Emil | `vienna-apprentice-printshop.lead-type-drop/lead-type-drop.scolded` | **flag** | Subject Emil; prose says the print shop **“扣下两个克朗”**; committed effects are two relations only. **No cash −2**, and `Buchdruckerei Winter & Söhne` is used as a person (“敲着桌沿骂人”). |
| 19 | `evt:...003845` 1933.01 Emil | `kernel-health.task-pharmacy-hunt::ctx-vienna-reform-1930::milieu-tenement/pharmacy-last-bottle` | **pass** | Composed **task**; subject **Emil Weiss** (not focal Emil), cash −25, health +0.04, condition, role, knowledge. The cash is committed; the same pharmacy-hunt scene had no cash in the Phase 12 `002781` example. |
| 20 | `evt:...004083` 1934.06 Emil | `kernel-health.street-accident::ctx-vienna-authoritarian-1934::milieu-tenement/accident-fatal` | **pass** | Composed; subject Emil; health, condition, death, cash +12 compensation. Prose explicitly names Emil and the fatal collision; the compensation matches “赔偿金刚好够一副棺材”. |

**Counts:** **13 pass / 7 flag.**
- By path: base/scene 8 pass / 6 flag; composed 5 pass / 1 flag; family/relationship 4 pass / 1 flag.
- Composed events in the sample: 6 (`004628`, `001822`, `017213`, `007342`, `003845`, `004083`), including one task (`kernel-health.task-pharmacy-hunt`). All 6 carry kernel/context/milieu (and variant where applicable).
- Family/relationship events: 5 (`003253`, `003534`, `017213`, `003528`, `007342`).

### 3.1 Focal attribution in the dossier

Of the current 75 excerpt events:

- **43/64 traced (67.2%)** have the focal person as `trace.subject`; **21/64 traced (32.8%)** are events where the focal person is only a participant.
- **63/75 (84%)** name the focal person somewhere in the text; **12/75 (16%)** do not.
- The remaining 11 events are untraced birth/statistical/interaction-response events and are not classified by subject.
- 13/75 (17.3%) are composed.
- Per life, subject-is-focal among traced events: Anton 7/12, Mitzi 9/14, Lena 6/13, Hedwig 10/11, Emil 11/14. The Lena dossier is the least focused.

Examples: in Anton's dossier, `evt:...000641` (1918.11) is **Franz's** water-and-coal errand; in Hedwig's dossier, `evt:...000962` (1920.06) is **Mitzi's** market errand; in Mitzi's dossier, `evt:...008311` (1948.10) is the senior colleague's story and `evt:...009693` (1952.06) is **Grete Lechner's** sublet; in Lena's dossier, `evt:...003983` (1934.08) is **Mitzi Moser's** sick-fund advice and `evt:...007193` (1944.02) is **Grete Lechner's** tooth extraction; in Emil's dossier, `evt:...002288` (1927.07) is **Hedwig's** return to school.

The document's heading “五段真实人生” and the per-person “共 N 条记录” overstate how much of each dossier is that person's own life. A reader looking for Anton's life gets Franz's 1918 water errand; a reader looking for Hedwig's life gets Mitzi's 1920 market errand. This is a **presentation/attribution defect**, not a state bug. The selection is “personal events” (subject or participant), not “subject events”; the reading note should say so, or the excerpt should filter to subject events and show participant events only as context.

Also false in the current `phase-13-lives.md`:

- **“最长寿者 — Hedwig”** is assigned to Hedwig, who died at **27** (1939.10), while **Mitzi died at 58** (1970.07). The selection basis says “oldest remaining focal person; shows the end of a long life” — Hedwig is the oldest *remaining* candidate after the first three are used, but she is not the longest-lived, and 27 is not a long life. The label should be “remaining focal person”, not “最长寿者”.
- The “长寿的成年人 — Mitzi” is the actual longest-lived focal adult (58), so the heading is inverted relative to the “最长寿者” one.

---

## 4. Phase 12 hard bugs: status

### 4.1 Subject-role cache collision — fixed

Evidence:

- Across **64/64** traced excerpt events, there is exactly **one** participant with `role: subject`, and its `personId` equals `trace.subject.id`. 0 mismatches, 0 duplicate subject roles, 0 duplicate person entries.
- Across the same 64 events, `trace.effects` types exactly equal committed `event.effects` types (0 mismatches, 0 length mismatches).
- `npx vitest run tests/v4-composition.test.ts` → **12 tests passed, 38 ms**; the test “casts the subject role to the actual event subject, not a cached neighbor” passes.
- The cache key includes `subject.id` for `kind: 'subject'` (`packages/v4/engine.ts:2098-2126`), and `roleCandidates` returns `[subject.id]` for the subject role (`packages/v4/engine.ts:1613-1620`).

**Verdict: the Phase 12 cache collision does not remain.** The old failure examples (`006337` Hedwig-as-Gustav's-key, `005520` Anna-as-Lena's-funeral-society) are not in the current excerpts. The current 75 has 60 events that name the subject; 4 do not, of which three use a pronoun or second person (`007394`, `004621`, `002083`) and one does not mention the subject at all (`008311`, Mitzi's apprentice-wage vignette is about the senior colleague while the effects bind to Mitzi). One of the four names another participant (Anton Moser in `002083`). `008311` is a residual prose-identity issue, not the cache; the old two-example pattern is gone.

Two identity caveats remain, neither the cache:

- `evt:...005312` (Hedwig 1939.01 `interaction_response`) has **no trace**. The text names **Ferdinand Kraus**; the participants list is `person:evt:...000774:child` + Hedwig. The child may be Ferdinand, but without a trace/subject the counterparty and role cannot be verified. This is the acceptance step of a courtship; it is the most important relationship event to audit, and it has no trace.
- The `interaction_response` path (264 events) has no entry in the composed trace coverage; the sampled `005312` has no trace, so the artifact cannot show whether the proposal's counterparty is the person named in the text.

### 4.2 Stranger father — fixed as a literal stranger; the chain is still not coherent

Evidence for the fix:

- `vienna-family-childbirth` is not a courtship/marriage/wedding/family-formation scene (`tags: ['family','childbirth','death']`; id does not match the `allowNewPartner` predicate at `packages/v4/engine.ts:2025-2032`). Its `partner` role therefore only gets the subject's existing active partner (`packages/v4/engine.ts:1660-1677`), or the scene blocks.
- `applyRelation` refuses a new `partner` relation if either person already has an active partner (`packages/v4/engine.ts:5610-5625`). A 40-year read-only probe (`phase13-probe4`) found **0 persons with more than one active partner**.
- The current sampled births are coherent:
  - `evt:...003253` (Hedwig 1931) and `evt:...003534` (Hedwig 1932): mother Hedwig, partner **Otto Hofer**, cash −6 each. The 1930 courtship proposal is also to Otto; the 1931 role list includes `partner`. The father is the recorded partner.
  - `evt:...004085` (1934 birth event): child Emil Hofer, participants Hedwig and Otto; the household grows to 4.
- The `phase-13-family` sample families show male-female parent pairs; no child has a newly met acquaintance as father.

**Verdict: the literal stranger-father bug is fixed.** The chain is not globally coherent, however:

1. **Childbirth is blocked more often than it fires.** The 40-year `phase-13-scheduling.json` run records **94 births** and **109 blocked `vienna-family-childbirth`** attempts, plus **92 blocked `vienna-family-divorce`**, **69 blocked same-sex-male**, **61 blocked same-sex-female**. This is the top family cluster after `vienna-illness-household.mother-falls` (129 blocks). The birth scene is not starving because of fertility; it is losing the scheduling competition/role cast.
2. **The partner relation can be casual and non-cohabiting.** The generated `vienna-courtship-courtyard` scenes (`sunday-walk/second-bridge-promise`, `letter-answer/reply-at-bakery`, `family-table/*`) have a `partner` role with **no sex requirement** and **no household effect**; a second date or a letter reply creates a full `partner` relation. A read-only 40-year probe (`phase13-probe3`, 318 persons, 131 births) found **11/14** young (16–49) active couples non-cohabiting and **5/14** female-female. The current official scheduling's 109 childbirth blocks and 92 divorce blocks are consistent with this mechanism.
3. **Female-female and non-cohabiting couples deadlock.** `vienna-family-childbirth` requires a male `partner`; a female-female couple passes `hasRelation partner` but fails the role cast. `vienna-family-divorce` requires `sameHousehold: true`; a non-cohabiting couple passes `hasRelation partner` but fails the role cast. The female-female pair cannot reproduce; the non-cohabiting pair cannot separate; both are counted as partnered in the family metrics.
4. **The family metrics count those couples as “partnered”.** `phase-13-family.json` reports `partneredWomanShare 0.4021` and `birthsPerPartneredWomanYear 0.1976`. “Partnered” includes casual, non-cohabiting and same-sex relations. The 0.1976 is not a fertility rate of co-resident heterosexual couples; the effective couple stock is smaller than the denominator suggests.

**Verdict on the chain:** for Hedwig/Otto, courtship → partner → 1931/1932 births is coherent and the midwife fee is booked. For the population, the partner layer is semantically too weak (a date can become a partner), sex-ungated (generic scenes create same-sex couples), and the divorce layer assumes cohabitation the courtship layer did not create. The chain is **locally working, globally incoherent**.

---

## 5. Birth / population analysis

### 5.1 Playtest decomposition

The current artifact gives `totalPersons 731`, `births 351`, `playerBirths 8`, `deathEvents 438`, `deadPersons 440`, `alive 291`. The seed has **30** persons (verified by a read-only import of `VIENNA_1912_SEED` + `applyViennaHistoricalWorld`); the 8 focal births are included in the 351 birth facts. The provenance arithmetic is:

| Component | Count | Share |
|---|---:|---:|
| Seed / activated persons | 30 | 4.1% |
| Birth-provenance persons (including 8 player-created focal births) | 351 | 48.0% |
| Materialized persons (`provenance.kind = materialized_population`) | **350** | **47.9%** |
| **Total** | **731** | 100% |

Check: 30 + 351 + 350 = **731**; 731 − 440 = **291 alive**. The 438 death events vs 440 dead persons is a 2-person provenance gap (two dead persons without a counted death event); it does not change the balance. Without materialization the named population would be 30 + 351 − 440 = **−59**, so materialization is load-bearing.

The birth/death balance is negative in all three layers:

| Layer | Births | Deaths | Ratio |
|---|---:|---:|---:|
| Playtest named layer | 351 | 440 | **0.80** |
| Family experiment (40 years) | 84 | 107 | **0.79** |
| Macro state, final year | 8,875.8 | 19,536.9 | **0.45** |

The macro figure is a steady-state year (2000), not a war year; across Phase 8–13 playtests the macro ratio stays around 0.45–0.46. The artifact does not expose the macro population denominator, so I cannot convert this to a CBR/CDR; the ratio itself is a hard deficit signal, not a calibrated rate.

### 5.2 Family experiment: fertility per couple is plausible; formation is the bottleneck

`phase-13-family.json` (seed `phase13-family`, 40 years):

- **272 persons**, **84 births**, **165 alive**, **107 dead**; by provenance arithmetic, ~**158 (58.1%)** are materialized (272 − 30 seed − 84 births).
- **127 partner formations**, but only **21 active partner relations** at the end. 38 interactions accepted, 40 rejected, **80 pending** at the horizon (the pending tail is a snapshot; it is not dated, so it is not proof of a permanent leak).
- **425 partnered woman-years / 1,057 woman-years = 0.4021** partnered share; **17/37** living women 16–49 were partnered at the end (**45.9%**).
- **0.0795 births per woman-year**, **0.1976 per partnered woman-year**.
- **5 child deaths under 5 / 84 births = 6.0%** — low for 1912 Vienna, which suggests child mortality is under-modelled rather than over-modelled.
- **Nine calendar years with zero births** (1913, 1915, 1919, 1920, 1928, 1934, 1936, 1938, 1940), but no 5-year drought; the birth rate recovers after 1941 (4–7 births/year in 1947–1952).
- 84 births over 40 years from ~21 active couples is **~4.0 births per active couple**, which is plausible. The headline 0.1976 per partnered woman-year is not a fertility rate of co-resident heterosexual couples: “partnered” includes casual, non-cohabiting and same-sex relations. The probe found 11/14 young couples non-cohabiting and 5/14 female-female; if that share is representative, the effective couple stock is smaller than 21, and fertility per effective couple is higher.

The sample families confirm the pedigree problem: of 10 sampled children, **5 have at least one materialized parent** and **3 have two materialized parents**; 8/20 parent slots are materialized. The family tree usually starts at the materialized adult, not at a grandparent born in the world.

### 5.3 Scheduling: the family path is the main blocked cluster

`phase-13-scheduling.json` (40 years, 284 persons, 9,275 events):

- 6,157 base scenes, 1,630 composed events, 554 composed tasks; 94 births.
- 2,987 blocked scenes (1,357 base + 1,630 composed); 2,948 of the reasons are `missing_role`.
- Top blocked: `vienna-illness-household.mother-falls` 129, `vienna-family-childbirth` 109, `vienna-family-divorce` 92, `vienna-life-wwii-conscription` 81, `vienna-illness-household.child-fever` 73, `vienna-family-same-sex-male` 69, `vienna-family-same-sex-female` 61.
- Childbirth blocks (109) exceed births (94) in the same run. This is the strongest single indicator that the birth path is still scheduling-starved.
- **Instrumentation defect:** `ordinary.draws.base = 0` and `ordinary.preparedPass.base = 0`, while the composed path records 19,607 draws and 748 prepared passes. The exact-scan path (`pickOrdinaryCandidate` vs the exact loop at `packages/v4/engine.ts:4225-4250`) does not increment the base counters. The base/composed selection-rate comparison is therefore invalid; only the resolved/blocked totals are usable.

### 5.4 Birth-path verdict

**Locally coherent for an eligible couple; globally still starved.**

- For Hedwig/Otto, the chain works: 1930 courtship proposal → partner role by 1931 → daughter 1931 → son 1932 → third child 1934. The midwife fee (−6 Kroner) is committed for both sampled childbirths. The father is the recorded partner, not a stranger.
- The population is sustained by materialization, not births: 47.9% of the playtest cast and 58.1% of the family cast are materialized. Births are fewer than deaths in every layer.
- The bottleneck is **partnership/cohabitation formation**, not fertility inside active couples: 109 childbirth blocks vs 94 births; 92 divorce blocks; 69/61 same-sex blocks; 0.4021 partnered woman-years; 11/14 young couples non-cohabiting in the probe.
- The `phase-13-family` metric “births per partnered woman-year” overstates the exposure denominator because it counts casual/non-cohabiting/same-sex partners as “partnered”. The path is less starved per *effective* couple than the headline suggests, and more starved at the *formation* layer than the headline shows.
- The current artifact fixes the old **birth cash** failure in the sampled births: both Hedwig births commit cash −6. The missing-money problem is now visible in other scenes (market credit, stolen coal money, divorce goods, lead-type fine), not in the childbirth scene.

---

## 6. Remaining hard failures

### 6.1 Hard engine / journal-integrity bugs

**H1. Post-death participant events (4 canonical facts).**
`focalLives` exposes `eventsAfterRecordedDeath` = **3** for Emil and **1** for Anton; Mitzi/Hedwig/Lena have 0. At least two explicitly name/act the dead person:

- Anton died 1923.08; `evt:...001436` (1923.12) text: “Anton 提着菜篮过来…”. Anton acts four months after death.
- Emil died 1934.06; `evt:...003953` (1934.08) text: “Emil 来还盘子” — Emil acts two months after death; `evt:...004124` (1934.07) and `evt:...004095` (1934.12) are participant-only post-death events (the text does not name Emil).

The excerpt generator hides these (`excludedPostDeathEvents`), and `anomalies.anyEventAfterSubjectDeath` misses them because it checks only `event.subjectId` (`scripts/v4-playtest.ts:663-670`). `commitEvent` filters participants only for existence, not for `died`/`aliveAt(date)` (`packages/v4/engine.ts:4735-4745`), so a participant who dies between casting and commit, or a scheduled event with a dead participant, still commits. The store hides post-death events from the dead person's own view (`packages/v4/store.ts:690-700`), but they remain in the canonical world journal and in other participants' logs. **This is a hard journal-integrity failure and an audit false negative.**

**H2. Missing money / effect drops (5 sampled events; 234 unresolved refs).**
`applyCash` caps a debit at `household.cash`; if the household has no cash, it returns `undefined` and the effect is dropped (`packages/v4/engine.ts:5046-5068`). `resolveScene` calls `commitEvent(..., true)`, so the scene is still persisted with the remaining effects or with none (`packages/v4/engine.ts:4590-4620`). Sampled consequences:

- `evt:...005216` (Mitzi 1938): prose says she pays **2.20 Kroner** next week; effects are food/reputation/relation; no cash.
- `evt:...015690` (Helene Huber 3 1967): prose says **six Kroner** of coal money was stolen; effects are relation/mood; no cash.
- `evt:...005448` (Hermann Stein 2 1939): authored cash −3 for separate household goods; committed effects are relation_end/mood ×2; no cash.
- `evt:...007342` (Alois Bauer 1945): authored cash −1 for the coal; committed effects have no cash (the theft is captured by reputation/flag/role/knowledge).
- `evt:...002517` (Emil 1928): prose says the print shop **“扣下两个克朗”**; committed effects are two relations; no cash.

The artifact also reports **234 `unresolved_effect_ref`** warnings (up from 67 in the Phase 12 post-fix run, and 206 in the immediately previous Phase 13 run) and **38 `invalid_relation`**. These are not attributed to individual events in the artifact, but they are the systemic counterpart of the sampled drops. There is no debt/arrears effect when a household cannot pay; the prose can claim a payment or loss that never enters the ledger. **This is a hard economic-causality failure, not a prose omission.**

**H3. Family-path deadlock (same-sex / non-cohabiting couples).**
This is the mechanism behind the 109 childbirth blocks and 92 divorce blocks. It is a content+engine contract failure:

- `vienna-family-childbirth` condition: `hasRelation partner, minTrust 0.05`; role: `partner, sex: male` (`packages/v4/content/vienna-family.ts:185-215`).
- `vienna-family-divorce` condition: `hasRelation partner`; role: `partner, sameHousehold: true` (`packages/v4/content/vienna-family.ts:640-675`).
- Generic courtship scenes create `partner` without a household effect and without sex gating (`vienna-courtship-courtyard` `letter-answer/reply-at-bakery`, `sunday-walk/second-bridge-promise`).
- Result: a female-female or non-cohabiting couple passes the condition, fails the role cast, and cannot use the other scene to exit the state. The current official 40-year run blocks childbirth 109 times and divorce 92 times; the `phase13-probe` 20-year run blocks childbirth 45 times and divorce 27 times, all `missing_role:partner`, all observed childbirth blocks female-female.

This is not merely “scene blocked”; it is a **state deadlock**: a female-female pair cannot reproduce, a non-cohabiting pair cannot separate, and both remain counted as partnered in the family metrics.

**H4. Zero-effect scenes are persisted.**
`evt:...005751` (evicted-neighbours/store-boxes) has empty effects; the text is a domestic vignette. `evt:...003797` (Lena 1933.06 recruitment/read-and-decline) and `evt:...005751` are the current examples; the previous run also had `read-and-decline`. `resolveScene` commits with `force = true` even when `applied.length === 0`; a text-only fact is written to the canon. Some zero-effect vignettes are harmless, but the engine cannot distinguish a deliberate slice-of-life from a failed effect application. This is a **soft hard failure**: it weakens the “every committed event has a consequence” contract and hides effect drops. It should be either blocked or explicitly tagged as a vignette.

**H5. `effect_on_dead_or_missing` remains.**
One warning in the current playtest (the `already_dead` code is gone, replaced by `effect_on_dead_or_missing`). This is a small count but a hard integrity signal; the artifact does not expose the event ID, so it cannot be tied to the 20 sample.

### 6.2 Hard content/role-contract failures (not engine.ts bugs)

**C1. Female Mitzi called “这后生” (“this young man”).**
`evt:...012514` (Mitzi 1959.01 `ask-trial.accepted`): the subject is female and 47; the prose says “Gustav Bauer 4…插了一句这后生看着手稳” and the foreman hires “him” for a trial. The gender/age is wrong. This is a current sampled pronoun/role-sex failure, not a trace issue. The `ask-trial` template likely assumes a male youth; it needs a sex/age-neutral phrase or a sex-gated scene.

**C2. Male Franz Lechner called “她”.**
`evt:...004905` (Lena 1937.12 key-found): “Franz Lechner 把…铜钥匙拍在桌上…Lena 摸出两块方糖谢她，她收了一块”. Franz Lechner is male in the seed; the pronoun is female. This is outside the 20 but inside the 75. It is the same class as the Phase 12 pronoun failures, reduced but not gone.

**C3. Mother role still sex-neutral (latent, and the top blocked scene).**
`vienna-illness-household.mother-falls` declares `mother` as `kind: 'parent'` with **no `sex: 'female'`** (`packages/v4/content/generated/vienna-illness-household.json:198-230`). The current 40-year scheduling blocks this scene **129 times** (the top block), so the current run does not sample a cast; the old Phase 13 run did cast **Friedrich Hofer (male)** as “母亲” and applied the mother's health effect to him. The authoring defect is unchanged: if a father is cast, the title/text/effect will call him the mother. The current artifact's dominant symptom is blocking, not a sampled misgender, so this is a **latent hard content contract failure** rather than a current sampled event.

**C4. Organisation-as-actor, with an unbooked fine.**
`evt:...002517`: `Buchdruckerei Winter & Söhne` “敲着桌沿骂人，扣下两个克朗”. A print shop is used as a person, and the 2-Kroner deduction has no cash effect. This is one event with two failures: a prose/entity error and a missing-money ledger error.

**C5. “Longest-lived” label is false.**
`phase-13-lives.md` labels Hedwig (died at 27) “最长寿者” and says “shows the end of a long life”. Mitzi died at 58, the actual longest-lived focal adult. The selection logic picks the oldest *remaining* candidate after the first three, not the oldest focal person. This is a reporting/selection defect, not a simulation state bug, but it misrepresents the life dossier.

### 6.3 Audit and measurement defects

**A1. Post-death check is subject-only.** `scripts/v4-playtest.ts:663-670` only checks `event.subjectId`, so the 4 dead-participant events are reported as 0. The excerpt generator itself records `excludedPostDeathEvents`, so the artifact contains the contradiction: 0 in `anomalies`, 4 in `focalLives`.
**A2. Base scheduling counters are zero.** `ordinary.draws.base = 0` and `ordinary.preparedPass.base = 0`; the exact-scan path does not increment them. The base/composed pass-rate comparison in `phase-13-scheduling.json` is invalid.
**A3. Text audit is a shape check.** 0 unresolved tokens, 0 empty participants, 0 literal `None`/`undefined` — useful, but not a semantic proof. The sample shows missing money and a gender error with all shape checks green.
**A4. Composition coverage is presence-only.** `traceCoverageOfComposed = 1` means every composed event has a trace, not that the trace's roles/effects match the prose. The sample has composed events with correct kernel/context/milieu and a missing cash effect (`007342`).
**A5. Interaction responses have no trace.** `evt:...005312` (Hedwig 1939.01) changes household/role/partner state but has no `trace`; the participants list shows a child ID while the text names Ferdinand Kraus. The courtship acceptance step—the hinge of the birth chain—is not auditable from the event record. The `interaction_response` action appears 264 times (current `textAudit.topRepeatedActions`); the artifact does not expose its subject/role mapping.
**A6. Family metric denominator is not “effective partnership”.** `partneredWomanYears` includes casual, non-cohabiting and same-sex partner relations. The 0.1976 births/partnered-woman-year is not a fertility rate for co-resident heterosexual couples; the probe's 11/14 non-cohabiting and 5/14 female-female share shows why the headline and the mechanism diverge.
**A7. `scenePrefixRepeat` is high.** 79 offenders, max 79 (`Grete Bauer` / `vienna-life-school-day`), 76 (`Grete Bauer` / `p9-gap-childhood-chores.stay-after-school`), 52 (school-slate), 46 (school-enrolment), 45 (hidden-book); 39 (`Friedrich Weiss` / `vienna-legacy-worklife.sick-fund`). The top repeated text appears 144 times. This is a content-variety issue, not a hard engine bug, but it weakens the “life” claim.

### 6.4 Prose/effect omissions that are not hard bugs

- Offstage relation targets: `evt:...000673` creates an acquaintance with Alois Huber, who is not in the prose.
- Cash amounts often not narrated even when committed (e.g. `evt:...004628` cash −6; `evt:...017213` cash +2).
- `evt:...003845` gives Emil Weiss a cash −25 quinine purchase (good), but the event is in focal Emil's dossier and the prose does not name focal Emil; focal attribution, not a state error.
- `evt:...005312` interaction response has a child participant and no trace (see A5); the text names Ferdinand Kraus. If the child is Ferdinand, the participant is right; the trace gap is the audit problem.
- The current `phase-13-lives.md` includes participant-only events as if they were the focal life; 21/64 traced are participant-only and 12/75 do not name the focal person at all.

---

## 7. What is actually fixed, and what is not

### Fixed / improved

- The Phase 12 subject-role cache collision is fixed: 64/64 current traced events have one subject role equal to the trace subject; the regression test passes.
- The literal stranger-father bug is fixed: childbirth cannot materialize a new partner; the current Hedwig births use Otto Hofer, her recorded partner; the 1931/1932 midwife fees are committed.
- The old focal-death narration failure is fixed for Mitzi: the current 1970.07 widowhood event names Mitzi and her TB death; the old anonymous rescue death is gone.
- The old birth-cash failure is fixed in the sampled births: both Hedwig 1931/1932 births commit cash −6; the current pharmacy-hunt event (`003845`) commits cash −25, unlike the Phase 12 pharmacy-hunt example that had no cash effect.
- Composed metadata is complete on all 13 composed excerpt events; kernel/context/milieu (and variant) parse correctly.
- No unresolved template tokens, no empty participant lists, no literal `None`/`undefined` in the 75 excerpt texts.
- No multi-partner persons in the 40-year probe; `applyRelation` enforces one active partner.
- Household capacity is respected: max living 12, 0 overfull living households.

### Not fixed / newly exposed

- **Post-death participants:** 4 canonical events (Emil 3, Anton 1); the anomaly check does not see them.
- **Missing money/effects:** 5 sampled events with authored/claimed money absent; 234 unresolved refs; no debt/arrears; zero-effect scenes persisted.
- **Family-path deadlock:** 109 childbirth blocks vs 94 births; 92 divorce blocks; 69/61 same-sex blocks; non-cohabiting/same-sex partners cannot reproduce or separate.
- **Pronoun/gender:** female Mitzi called “这后生”; male Franz Lechner called “她”; the mother-falls role remains sex-neutral.
- **Organisation-as-actor and unbooked fine:** the 1928 lead-type-drop event.
- **False “longest-lived” label:** Hedwig (27) labelled over Mitzi (58).
- **Demographic deficit:** 351 vs 440 births/deaths; 84 vs 107; macro 8,876 vs 19,537; 47.9%/58.1% materialized.

---

## 8. Limitations

1. The 20-event sample is a judgment sample from 75 current excerpt texts. The artifact does not retain the other 33,949 event texts, so a random sample of the full ledger would require a new run, which I did not perform.
2. Name/pronoun checks are keyword-assisted manual readings, not formal proofs. The count “13/7” and the two pronoun failures are sample observations, not population estimates.
3. The probes (`phase13-probe`, `phase13-probe2`, `phase13-probe3`, `phase13-probe4`) are read-only supplementary runs with seeds different from the official playtest. They reproduce the family mechanism; they are not the official artifact and their demographic totals are not directly comparable. The current official scheduling's 109 childbirth blocks and 92 divorce blocks are the primary evidence; the probe is corroboration.
4. The `unresolved_effect_ref` (234), `invalid_relation` (38) and `effect_on_dead_or_missing` (1) warnings are counts without event IDs; they are not attributed to the 20 sampled events except where the committed effects themselves show the drop.
5. The macro birth/death ratio is presented without a population denominator; it is a deficit signal, not a calibrated CBR/CDR.
6. The `phase-13-family.json` and `phase-13-scheduling.json` were generated at 11:14/11:13Z; the playtest at 11:29Z. They are independent runs of the same code, not a single snapshot; their seeds differ.
7. No code or content was edited. The line references are to the current repository state at the time of reading; they may drift.

---

## 9. Recommended fixes, in priority order (for the implementer, not applied here)

1. **Enforce participant liveness at commit.** In `commitEvent`, reject or drop participants with `person.died` or `!aliveAt(person, event.date)`. Add an anomaly check over participants, not only `subjectId`. Add a regression test using the four named post-death events.
2. **Make family roles/conditions agree.** Either sex-gate `vienna-family-childbirth` to a male partner in the condition (so same-sex female couples are not offered it), or add a same-sex family path; add `sameHousehold: true` to the divorce condition or remove it from the role. Add a regression test that a non-cohabiting couple can separate and that a female-female couple does not produce `missing_role:partner` every year.
3. **Stop casual courtship from creating durable `partner` relations.** Split “courtship interest” from “partner”; require a household/engagement step before `kind: partner`, and sex-gate generic courtship roles or route same-sex formation through the dedicated scenes.
4. **Do not commit zero-effect scenes.** If `applied.length === 0`, block or rewrite the scene; do not persist a text-only fact. Add debt/arrears for cash debits that exceed household cash, or block the outcome and narrate the failure.
5. **Fix the mother-falls role.** Add `sex: 'female'` to the `mother` role, or change the prose/effect to match a sex-neutral parent.
6. **Fix the pronoun/gender templates.** Make `ask-trial` sex/age-neutral (or sex-gate it), and fix the `key-found` narration that uses `她` for male Franz Lechner.
7. **Fix the lead-type-drop scene.** Do not use the print shop as an actor; commit the 2-Kroner deduction as cash.
8. **Trace interaction responses.** Give `interaction_response` a trace with subject, counterparty and role, so the courtship acceptance step can be audited. At minimum, expose subject/counterparty IDs in the excerpt.
9. **Fix the base scheduling counters** so base and composed pass rates are comparable, and add event IDs/samples to the warning aggregates.
10. **Fix the “最长寿者” selection label** and disclose participant-only events in `phase-13-lives.md`; or filter the dossier to subject events and show participant events only as context.

---

**Summary:** The two Phase 12 hard bugs are fixed in their original form: the subject role is the real subject, and the birth father is the recorded partner. The current artifact still contains hard money, gender, post-death and family-path failures; the 20-event sample shows the money and gender ones, and the global `focalLives`/scheduling data show the post-death and family-path ones. The birth path is demographically starved: births are fewer than deaths in all three layers, about half the cast is materialized, and the 40-year scheduling run blocks 109 childbirths against 94 births. The bottleneck is partnership/cohabitation formation, not fertility inside active couples.

---

## 10. Final mechanics re-audit (post-fix artifact)

**This section supersedes §1–§9 where the artifact changed.** It is based on the final `docs/v4/playtest.json` (`generatedAt 2026-11-04T12:00:54.620Z`), the regenerated `docs/v4/phase-13-lives.md` (20:01 local), and `docs/v4/phase-13-family.json` (`generatedAt 2026-11-04T11:53:32.243Z`, 40 years). No code or content was edited.

### 10.1 Final artifact snapshot

| Metric | Value |
|---|---:|
| Events | **35,554** |
| Composed actions | **7,096** (4,199 scenes + 2,897 tasks) |
| Distinct kernels | **711** |
| Births | **406** |
| Deaths / dead persons | **465 / 467** |
| Persons / alive | **787 / 320** |
| `eventsAfterParticipantDeath` | **0** |
| `eventsAfterSubjectDeath` | **0** |
| Unresolved template tokens / empty participants | **0 / 0** |
| `scene_blocked` | **20,124** (19,902 `missing_role`) |
| `unresolved_effect_ref` | **304** |
| `invalid_relation` | **35** |
| `already_dead` / `effect_on_dead_or_missing` | **1 / 1** |
| `external_cash_inflow` | **3,163** |

The regenerated lives are **subject-only**: 63/63 traced excerpt events have exactly one `subject` role equal to `trace.subject.id`, 0 role mismatches, 0 duplicate person entries, 0 effect-type mismatches. 72/75 texts name the focal person; the 3 unnamed are pronoun/second-person or a baby described as “这孩子” (`000075`, `003249`, `007832`). The old participant-only dossier problem is fixed.

### 10.2 Fix verification

| Fix | Status | Evidence |
|---|---|---|
| Subject-role cache collision | **Fixed** | 63/63 traced events, one subject role = trace subject; 0 mismatches. |
| Stranger father | **Fixed** | `003491` Hedwig 1932: `partner` **Franz Berg**, text names him; `006803` Lena 1943: `partner` **Matthias**, text names him. Childbirth has `partnerSex: 'male'`. No sampled birth casts a new acquaintance. |
| Phase 13 deadlock (same-sex / non-cohabiting) | **Structurally fixed** | `vienna-family-childbirth` condition includes `partnerSex: 'male'`; `vienna-family-divorce` partner role no longer has `sameHousehold: true`; same-sex scenes may create partners. The family run’s partner share rose to **0.4875**, and no same-sex/cohabitation block appears in the sampled family events. |
| Zero-effect scenes | **Fixed for authored effects** | `resolveScene` passes `force = outcome.effects.length === 0`; an authored outcome whose effects all fail no longer commits an empty fact. No non-birth/statistical empty event remains in the 75 excerpts. |
| Post-death events | **Fixed** | `eventsAfterParticipantDeath = 0`, `eventsAfterSubjectDeath = 0`; all `focalLives.eventsAfterRecordedDeath = 0`. |
| Participant death dates cover all participant events | **Fixed** | No post-death participant fact in the final artifact. |
| Subject-only excerpt lives | **Fixed** | 0 participant-only events; all five dossiers are subject events. |
| Cash shortfall → debt | **Partially fixed, but sign-regressed** | Shortfalls are added to `household.debt` (birth events show “其中6克朗记入债务”), but `applyCash` returns `amount: -amount` after `amount` is already negative, so the committed `cash` effect is **positive** while the household was debited. See §10.4. |

### 10.3 15-event sample (10 excerpt + 5 composed)

| # | Event | Action | Verdict | Issue |
|---:|---|---|---|---|
| 1 | `evt:...000647` 1918.01 Anton | `p9-gap-childhood-chores.market-line/line-sold-out-potatoes` | **pass** | Subject Anton; food/mood/skill/relation present. |
| 2 | `evt:...001374` 1923.05 Anton | `vienna-childhood-street.market-errand/errand-lost-coin` | **flag** | Text loses 0.3 Kroner of coppers; trace says **“现金 0.3 克朗：铜板掉进下水道”** (positive). The cash sign is inverted. |
| 3 | `evt:...005515` 1939.05 Hedwig | `vienna-legacy-worklife.apprentice-wage/apprentice-wage.hand-to-family` | **pass** | Cash +3 is income handed to the family; food +1 and colleague relation present. The prose’s “够用” matches a wage handover. |
| 4 | `evt:...003491` 1932.01 Hedwig | `vienna-family-childbirth/son-born` | **flag** | Partner **Franz Berg** is correct; birth/health present. But the text says “数出六克朗给接生的人” (paid), while the trace says **“现金 6 克朗：midwife fee（其中6克朗记入债务）”**: positive cash and a 6-Kroner debt. Sign and debt/text disagree. |
| 5 | `evt:...001767` 1925.01 Mitzi | `vienna-adolescence.workshop-apprentice/apprenticeship-rejected` | **flag** | `Buchdruckerei Winter & Söhne` is the `employer` role and is used as a person (“捏了捏Mitzi的虎口…转身去搬木料”). Organisation-as-actor. |
| 6 | `evt:...017790` 1968.03 Mitzi | `vienna-women-housework.piecework-bundle/piecework.dispute-rate` | **pass** | Cash +0.6 is income; reputation/relation present; the prose’s “少了十五赫勒” is consistent with a reduced piece rate. |
| 7 | `evt:...005052` 1938.01 Lena | `interaction_response` | **flag** | The rejection is narrated (“Matthias没有答应…”), effects relation/interaction present, but there is **no trace**; subject and counterparty roles cannot be verified. |
| 8 | `evt:...006803` 1943.01 Lena | `vienna-family-childbirth/son-born` | **flag** | Partner **Matthias** is correct; birth/health present. Same cash sign/debt problem: text pays six Kroner; trace says cash +6 with 6 debt. |
| 9 | `evt:...007832` 1946.03 Lena | `vienna-market-debt.rent-arrears/rent-sell-furniture-move` | **flag** | Cash +2.8 is a correct furniture-sale inflow, but the prose narrates a move to a cheaper flat (“城南有更便宜的屋子…你蹲在地上把最后几件衣服塞进布袋”) and there is **no move/residence effect**. |
| 10 | `evt:...007157` 1944.04 Matthias | `vienna-housing-move.rent-notice/rent-notice-pay` | **flag** | Text pays two extra Kroner rent; trace says **“现金 2 克朗：按月多付两克朗房租（其中2克朗记入债务）”** — positive cash plus debt. Inverted sign. |
| 11C | `evt:...000075` 1913.04 Anton | `r1-child.foundling-wheel::ctx-vienna-1912::milieu-tenement/left-at-the-wheel` | **pass** | Composed; condition/flag/role/knowledge/**move**/guardian relation all present. The baby is “这孩子”, not named; the subject is still Anton. |
| 12C | `evt:...004079` 1934.05 Mitzi | `r2-rural.farm-servant::ctx-vienna-authoritarian-1934::milieu-tenement/wages-withheld` | **flag** | Text says she ends up owing the employer **3 Kroner**; effects are cash **+1**, condition `servant_debt`, flag, rival relation. The 3-Kroner debt is a condition, not a numeric cash/debt effect. |
| 13C | `evt:...010047` 1952.11 Mitzi | `r13-turn.starting-business::ctx-vienna-postwar-1945::milieu-tenement::postwar-empty-shops/signed-the-lease` | **flag** | Text pays an 18-Kroner deposit plus three months’ prepaid rent; trace says **“现金 18 克朗：租下街角的空铺”** (positive) and has no prepayment effect. Inverted sign and missing rent. |
| 14C | `evt:...013780` 1960.01 Mitzi | `kernel-social.lending::ctx-vienna-postwar-1945::milieu-tenement/lending.coal-money` | **flag** | Text lends five Kroner; trace says **“现金 5 克朗：lent five kronen”** (positive). The cash should be a −5 outflow or a loan asset, not an inflow. |
| 15C | `evt:...011901` 1956.09 Hedwig | `kernel-crisis.task-rescue-neighbor::ctx-vienna-postwar-1945::milieu-tenement/rescue-too-late` | **flag** | The death narration is fixed: the text names **Ferdinand Winter 5** and the death effect is on him. But the bandage cost is committed as **“现金 3 克朗”** (positive) while the text says “包扎花了三克朗” (paid). Sign inverted. |

**Counts: 4 pass / 11 flag.**
- Composed: 1 pass / 4 flag. All 5 composed sample events carry kernel/context/milieu (and variant where applicable); 20/20 composed excerpt actions parse.
- Money/sign: 7 flags (`001374`, `003491`, `006803`, `007157`, `010047`, `013780`, `011901`).
- Numeric debt absent: 1 (`004079`).
- Organisation-as-actor: 1 (`001767`).
- Missing move effect: 1 (`007832`).
- Untraced interaction: 1 (`005052`).

### 10.4 The cash-sign regression

`applyCash` now handles a shortfall by adding it to `household.debt` and keeping the full authored cost (`packages/v4/engine.ts:5077-5105`). But the return is:

```ts
return { ...effect, amount: -amount, ... }
```

`amount` is already negative for a debit, so `-amount` is positive. The household cash is debited (`household.cash -= debit`) and the debt is added, but the committed `EventEffect` has a **positive cash amount**. The trace prints `现金 6 克朗` rather than `现金 -6 克朗`. The text says “数出六克朗” / “花了三克朗” / “借出五克朗” / “付了十八克朗押金”. The event fact and the prose disagree on direction. This is a **hard engine/money bug**, introduced by the debt change; it is not a prose omission.

The birth events also reveal a debt/text contradiction: if six Kroner are “记入债务”, the family did not pay six Kroner from the sugar jar; the text’s “从糖罐里数出六克朗” is the pre-debt narration. The debt amount is present, but the narrative variant was not updated. This affects the two sampled births (`003491`, `006803`) and other debt events.

### 10.5 Birth path: 406 / 465 / 88 years / 787 persons

| Layer | Births | Deaths | Ratio | Materialized | Notes |
|---|---:|---:|---:|---:|---|
| Playtest named layer | **406** | **465** (467 dead persons) | **0.87** | **351 / 787 = 44.6%** | 30 seed + 406 births + 351 materialized = 787; 787 − 467 = 320 alive. Without materialization: 30 + 406 − 467 = **−31**. |
| Family run (40 years) | **59** | **114** | **0.52** | **158 / 247 = 64.0%** | 30 seed + 59 births + 158 materialized = 247; 133 alive. |
| Macro final year | **8,642.4** | **18,643.7** | **0.46** | — | Steady-state 2000; no population denominator exposed. |

The playtest is **closer to replacement** than the prior 351/440 run (0.80 → 0.87), but it is still below 1 and depends on 351 materialized persons. The family run is **not close**: 59 births against 114 deaths, 64% of persons materialized, and **7/10 sampled children have at least one materialized parent; 14/20 parent slots are materialized (70%)**. The family run is a separate seed (`phase13-family`), so its 59 vs 114 is not a controlled A/B against the playtest; it is the family-mechanism measurement. The family’s 20 active couples produced 59 births over 40 years (~2.95 per couple), which is not zero, but the population is shrinking without materialization. The 42 pending interactions (80 created, 16 accepted, 22 rejected) are a snapshot, not proof of a permanent leak, but the acceptance rate is low.

**Verdict: still globally starved.** The playtest named slice is near but below replacement; the family run and macro are clearly below. It is **not acceptable as a self-sustaining closed population**. It is acceptable only as a sampled tenement slice if materialization is explicitly presented as in-migration/external population, which the artifact currently calls “materialized population” and does not narrate as migration. The birth chain is locally coherent (actual partner, birth, debt, child), but the demographic path is not self-sustaining.

### 10.6 Remaining hard failures after the final fixes

1. **Cash sign inversion (new, hard):** 7/15 sampled events; `applyCash` returns positive `amount` for every debit (`packages/v4/engine.ts:5077-5105`). Exact events: `001374`, `003491`, `006803`, `007157`, `010047`, `013780`, `011901`.
2. **Numeric debt not persisted in `004079`:** text says 3 Kroner owed; only a `servant_debt` condition, no numeric cash/debt amount. The cash +1 is a partial wage, not the 3-Kroner debt.
3. **Organisation-as-actor in `001767`:** `Buchdruckerei Winter & Söhne` is an `employer` organization but is narrated as a person.
4. **Untraced interaction response in `005052`:** rejection has no trace/subject/counterparty roles; the relationship effect is committed but the identity is not auditable.
5. **Missing move effect in `007832`:** prose moves to a cheaper flat; effects only cash +2.8 and relation.
6. **Global effect/relations warnings remain:** 304 `unresolved_effect_ref`, 35 `invalid_relation`, 1 `already_dead`, 1 `effect_on_dead_or_missing`; 20,124 `scene_blocked` (19,902 `missing_role`). The specific same-sex/cohabitation deadlock is fixed, but scheduling starvation remains.
7. **Latent mother-role sex bug:** `vienna-illness-household.mother-falls` still declares `mother` as `kind: 'parent'` with no `sex: 'female'`. The final 15 does not sample a cast; the content defect remains, and if a father is cast the text/health effect will call him “母亲”.
8. **“最长寿者 — Matthias (58)” is false:** Mitzi and Hedwig both died at 69 (1981.12 / 1981.01); Matthias died at 58 (1970.01). The selection is “oldest remaining”, not “longest-lived”. This is a reporting defect, not a state bug.
9. **Birth debt/text mismatch:** the two sampled births add 6 Kroner debt but retain the pre-debt “paid from the sugar jar” narration. The debt amount is present; the prose should branch on debt.

### 10.7 Final bottom line

- **Phase 12 subject-role cache:** fixed. 63/63 traced subject roles; 0 mismatches; subject-only excerpts.
- **Phase 12 stranger father:** fixed. `003491` uses Franz Berg; `006803` uses Matthias; childbirth is male-partner-gated; no stranger birth.
- **Phase 13 deadlock:** structurally fixed (male-partner condition, divorce without cohabitation, same-sex new-partner path). Remaining high global blocking is not the same deadlock.
- **Zero-effect:** fixed for authored outcomes; no empty non-birth/statistical event in the 75.
- **Post-death:** fixed; 0 participant and 0 subject post-death events.
- **New hard regression:** the cash sign inversion in `applyCash`; 7/15 sampled events, and it makes the birth debt narration contradictory.
- **Birth verdict:** still globally starved (0.87 playtest, 0.52 family, 0.46 macro; 44.6%/64% materialized). Locally coherent, globally not self-sustaining.

**Final sample counts: 4 pass / 11 flag.** The two Phase 12 bugs and the Phase 13 deadlock/zero-effect/post-death failures are fixed; the new cash-sign regression and the demographic deficit are not.
