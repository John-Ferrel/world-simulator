# Phase 10 Critique Addendum — P0 Re-Review

**Reviewer:** Critic & Rewrite subagent  
**Date:** 2026-11-03  
**Scope:** Re-read of the revised nodes in `packages/v4/content/major-education-work.ts`, `major-family.ts`, `major-crisis.ts`, `major-life-tasks.ts`  
**Method:** Same ten-dimension rubric and major-event threshold of **36/50**. Scores are editorial. I did not edit content, run tests, use git, or use an LLM. Citations are scene/outcome ids.

## Bottom line

**Required nodes: 8 pass, 3 fail.** The P0 pass is genuinely present in most prose/effect pairs, but not all of it. The two hard duplicate pairs (press accident vs work injury; police raid vs strike meeting) now have real role-based exclusion. The effect-text contract is only **partially** fixed: the big advance/serum/stamp/beating repairs are there, but several effects still describe a different event than the prose.

The three required nodes still below 36 are:

- `major-work-retirement/pension-granted` — **35/50** (old 24). Much better disease and date logic; still not gated to 1909+, still passive.
- `major-crisis.front-wound/abdomen-wound` — **31/50** (old 31). The medal is gone, but the replacement — a half-eaten bread in a military mail envelope — is a new decorative absurdity, and the cash effect still fires immediately while the text says “寄往.”
- `major-task.relocation-klosterneuburg/moved-with-promise` — **34/50** (old 27 for `moved-with-work`). The outcome no longer lies about work, but the title says train, the text uses a handcart, tension is still low, and `move-blocked` still duplicates the border-papers scene.

## Revised scores

| # | Node / outcome | Old | New | Verdict | What changed | Remaining issue |
|---|---|---:|---:|---|---|---|
| 1 | `major-work-retirement` / `pension-granted` | 24 | **35** | **FAIL** | “尘肺” → lead poisoning signs (“铅线、腹绞痛、手抖”); “提前退休” → “病退”; pork-fat/coal detail retained | No `worldYear >= 1909` gate; “病退” institution/timing still unverified; subject remains passive; low tension |
| 2 | `major-family.child-death` / `child-death.diphtheria` | 33 | **39** | **PASS** | White powder → serum in an ice box, half dose; `bereaved_parent` → `bereaved_guardian`; death/health/mood/cash effects align | `child` is still `kind: 'neighbor'`, not guaranteed to be the subject’s child; no parent/guardian condition |
| 3 | `major-crisis.police-raid` / `held-overnight` | 35 | **38** | **PASS** | “警车” → “分局囚车”; “市政府附属讯问室” → “区公所讯问室”; `police_record` → `detained_activist`; exclusion roles added | `names-taken` still uses `role: police_record`; cash `-5` “legal advice/work book” is not in the text; `back-stairwell` still claims later surveillance not shown |
| 4 | `major-crisis.front-wound` / `abdomen-wound` | 31 | **31** | **FAIL** | Medal and death-benefit envelope removed; now soldier ID, pay slip and half bread in a military mail envelope; death reason clarified | Doctor packing a mail envelope is still implausible; “半块面包” in an envelope is absurd; cash `+25` immediate while text says “寄往”; no act of bravery to justify any medal (now gone) |
| 5 | `major-crisis.front-wound` / `leg-amputated` | not separately scored (scene 31) | **37** | **PASS** | “换弹匣” → “压弹夹”; amputation/field-surgery detail retained | Cash `+10` credited to household while text says the allowance is “塞进内衣口袋”; “战地津贴” and disability payment are conflated |
| 6 | `major-crisis.border-papers` / `papers-refused` | 35 | **37** | **PASS** | “洗礼簿” → “登记簿”; passport stamp → application stamp “驳回” + separate “限期离境的回执”; legal logic repaired | Title says “北站行李房” but scene is at the magistrate; “限期离境” needs a nationality/residence condition; quitting job/flat still has no agent promise |
| 7 | `major-task.strike-meeting` / `meeting-broken-up` | 32 | **40** | **PASS** | Prose now includes the boots to the ribs and the 10-kroner fine; health/condition/cash effects now match; exclusions added | Still structurally close to the police-raid scene, though role exclusions now block the hard double-fire; “巡警/分局” register is fine |
| 8 | `major-task.relocation-klosterneuburg` / `moved-with-promise` | 27 (`moved-with-work`) | **34** | **FAIL** | Renamed from “with work” to “with promise”; added rent-increase push; text now says “不一定留下”; effect matches promise, not employment | Title says “装上……火车” but text uses a handcart and never mentions a train; tension still low; `move-blocked` still duplicates `border-papers/papers-refused` |
| 9 | `major-education-withdrawal` / `withdrawn-to-printshop` | 35 | **41** | **PASS** | Age 12–13 → 14–15; factory → `household_firm` workshop; text “街角印刷作坊/师傅”; legal age issue fixed | `kept-home-to-mind-children` still assigns `child_minder` while the text says the neighbor watches the youngest; employer `household_firm` vs `workplaceId: P.printshop` may mismatch the named Winter printshop |
| 10 | `major-family.proposal-accepted` / `registry-office` | not separately scored (P0) | **37** | **PASS** | Civil-only wedding → church first, then civil registration; “正月” → “圣烛节” in the sibling outcome | Effect reason still says “civil marriage at the magistrate”; outcome id still `registry-office`; “盖过章的收据换了半公斤咖啡” is odd |
| 11 | `major-task.marriage-proposal` / `proposal-accepted` | not separately scored (P0) | **40** | **PASS** | `spouse` roles → `engaged`; reasons now say “engaged and moved in before the wedding”; no false marriage claim | Cohabitation before wedding may need a social/period consequence; `proposal-refused` still charges coffee not present in the bench scene |

## Score breakdown (new)

| Node | S | M | C | T | Sty | Tw | N | P | F | Mem | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `major-work-retirement/pension-granted` | 5 | 3 | 4 | 2 | 4 | 2 | 4 | 3 | 4 | 4 | **35** |
| `major-family.child-death/diphtheria` | 5 | 3 | 4 | 5 | 4 | 2 | 4 | 4 | 3 | 5 | **39** |
| `major-crisis.police-raid/held-overnight` | 5 | 4 | 4 | 4 | 3 | 3 | 4 | 4 | 3 | 4 | **38** |
| `major-crisis.front-wound/abdomen-wound` | 5 | 2 | 3 | 4 | 3 | 2 | 3 | 3 | 2 | 4 | **31** |
| `major-crisis.front-wound/leg-amputated` | 5 | 2 | 4 | 5 | 4 | 2 | 4 | 4 | 3 | 4 | **37** |
| `major-crisis.border-papers/papers-refused` | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 3 | 4 | 4 | **37** |
| `major-task.strike-meeting/meeting-broken-up` | 5 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 5 | 3 | **40** |
| `major-task.relocation-klosterneuburg/moved-with-promise` | 4 | 4 | 4 | 3 | 3 | 2 | 4 | 3 | 4 | 3 | **34** |
| `major-education-withdrawal/withdrawn-to-printshop` | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 4 | 4 | **41** |
| `major-family.proposal-accepted/registry-office` | 4 | 4 | 4 | 3 | 4 | 3 | 4 | 4 | 3 | 4 | **37** |
| `major-task.marriage-proposal/proposal-accepted` | 5 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 4 | 4 | **40** |

## Node notes

### 1. `major-work-retirement` — 病退申请表

The rewrite is substantive. The old “尘肺” is gone; the doctor now finds a blue gum line, colic and tremor, which is the right trade disease for a compositor. “病退” is a better label than “提前退休.” The hardcoded “1907年到1909年” is gone, and `reduced-pension` no longer claims a thirty-year tool for a 56–59-year-old; it now says “从学徒时用到现在,” which fits.

But the scene still has `worldYear: min 1900`, and no condition distinguishes 1900–1908 from the pension era. The official says “缴费年数够” and “按病退办,” but the text does not name the fund or the legal basis. The subject also remains a case file: the doctor and official decide; there is no stake, resistance or cost beyond the pension amount. It is a near-miss rather than a pass. Add a `worldYear` floor, or make the early years a sickness-fund/厂内救济 scene, and give the subject one concrete stake (a rent due, a grandchild in the household, a promised last week at the bench).

### 2. `major-family.child-death` — 小棺材

The diphtheria treatment is now serum in an ice box, half a dose; that is a real period fix and a much better scene. The role change from `bereaved_parent` to `bereaved_guardian` is honest: it no longer claims the subject is the biological parent. The death, health, mood and cash effects line up.

The remaining issue is casting. `child` is still `kind: 'neighbor'`, `sameHousehold: true`, with no condition that the subject is the child’s parent or guardian. The prose says “孩子,” the partner registers the death and buries the child, and the subject gets `bereaved_guardian`. That can work as a household death, but it is not guaranteed to be the subject’s child. Add a parent/guardian relation condition, or rewrite the scene as a neighbor’s/landlord’s child and remove the guardian role. The scene now passes as a household death; it does not yet guarantee the parent death it implies.

`child-death.scalded` still has a real effect-text mismatch: `trust -0.06` with reason “blamed each other after the accident,” while the text says “谁也没有先开口.” `child-death.measles` is unchanged and still strong.

### 3. `major-crisis.police-raid` / `held-overnight`

The period error is fixed: “分局囚车” is period-safe, and “区公所讯问室” is more concrete than “市政府的附属讯问室.” `detained_activist` is a better role than `police_record`. The scene now excludes `strike_organizer` and `blacklisted_worker`, and the strike task excludes `detained_activist` and `police_record`; the hard duplicate is closed.

Remaining: `names-taken` still adds `role: police_record`, which is a record, not a social role. The `-5` cash reason says “legal advice, tram fare and a replacement work book,” but the prose only says he was released and the toolbox was cleared. `back-stairwell` still claims “later watched at the works” and “continued organising,” neither of which is shown. The specific `held-overnight` node passes; the scene is not fully clean.

### 4. `major-crisis.front-wound` / `abdomen-wound`

The medal and death-benefit envelope are gone, which fixes the worst institutional error. But the replacement is worse as prose: a doctor at the dressing station puts the soldier’s ID, pay slip and “那半块面包” into a military mail envelope. A half-eaten bread would not be mailed; it is a decorative detail replacing the event core. The cash effect still credits `+25` immediately while the text says the envelope is “寄往维也纳.” There is also no act of bravery, so the scene no longer has a medal to justify — but it also has no action that makes the death more than an accident.

This remains a fail. If the scene wants a home-front envelope, let the neighbor take the pay book and a letter; keep the bread in the trench, not in the mail. Delay the death benefit or model it as a later claim.

### 5. `major-crisis.front-wound` / `leg-amputated`

“压弹夹” fixes the rifle anachronism. The amputation, tourniquet, field surgery and “麻药不够” are strong and period-plausible. The node passes.

Remaining: the text says the disability certificate and “一小叠战地津贴” go into the subject’s inner pocket, but the effect credits `+10` to the household with reason “sent home.” Either have him hand the envelope to a comrade for posting, or make the cash a later home-front effect. The “战地津贴” and disability payment are also conflated; separate pay from disability compensation.

### 6. `major-crisis.border-papers` / `papers-refused`

The document logic is repaired: the application is stamped “驳回,” and a separate “限期离境的回执” is issued. That is much better than stamping a refused passport with “退回原籍.” “登记簿” replaces the universal baptism book, which is also correct.

Remaining: the title still says “北站行李房” but the scene is at the magistrate. “限期离境” implies the subject is a foreign resident; the scene has no nationality/residence condition, so a Vienna-born subject can be ordered to leave for a name mismatch. The motive is still thin: quitting job and flat before the passport is reckless without an agent’s promise. Add the agent promise or make the quit a consequence of a forged receipt, not pure imprudence.

### 7. `major-task.strike-meeting` / `meeting-broken-up`

The prose now includes the beating and the fine: “在走廊里被靴尖踢了两下，肋骨疼了半个月；分局还罚了十克朗.” The health, `bruised ribs` and `-10` cash effects now match. The duplicate exclusion is present: the task excludes `detained_activist`, `police_record` and `blacklisted_worker`; the police raid excludes `strike_organizer` and `blacklisted_worker`. This is the cleanest effect-text fix in the P0 set. Pass at 40.

Remaining: it is still the same dramatic shape as the police raid, and `strike-vote-deferred` can be followed by a separate raid because it adds no exclusion role. That is arguably a different meeting, but if the intent is one political arrest per life, add a shared flag.

### 8. `major-task.relocation-klosterneuburg` / `moved-with-promise`

The rename and the rent increase are real improvements. The outcome no longer claims “with work”; the effect is unemployment plus `vineyard_work_promised`, and the prose says “天亮先去问，不一定留下.” That is honest.

But the title still says “把行李装上开往克洛斯特新堡的火车,” while the text uses a handcart and never mentions a train. The scene still has low tension: after the papers are issued, the only obstacle is a maybe. `move-blocked` still uses the same “出生登记与洗礼名对不上” mechanism as `border-papers/papers-refused`; the P0 duplicate request was only partly applied. It fails at 34, narrowly. Fix the transport/title and replace the `move-blocked` obstacle; the core effect fix is present.

### 9. `major-education-withdrawal` / `withdrawn-to-printshop`

The legal error is fixed: age 14–15, `household_firm`, a “街角印刷作坊” and a master, not a factory. The wage and education effects match. This is now a strong scene and passes at 41.

Remaining: `kept-home-to-mind-children` still adds `child_minder` / “minding younger siblings,” but the text says the youngest sibling is watched by a neighbor and the subject watches the stove, carries water and gleans at the market. Change the role to `household_helper` or restore actual child-minding. Also check `workplaceId: P.printshop` against the named Winter printshop; the employer is now a `household_firm`, so the place should be a workshop, not a factory printshop.

### 10. `major-family.proposal-accepted` / `registry-office`

The civil-marriage problem is fixed in the prose: the couple marries in the parish church first, then registers at the magistrate. At least it no longer presents a civil-only marriage as the normal Catholic form. The “正月” / “圣烛节” fix is also present in `uncle-tavern-debt`.

Remaining: the effect reason still says “civil marriage at the magistrate,” which contradicts the church-first text. The outcome id `registry-office` also overemphasizes the civil step. Change the reason to “church wedding registered at the magistrate,” and either rename the outcome or make the registry visit the main event. “用盖过章的收据换了半公斤咖啡” is an unmotivated detail; if this is wartime, say so, otherwise cut it.

### 11. `major-task.marriage-proposal` / `proposal-accepted`

The spouse overclaim is fixed: the roles are now `engaged`, and the reasons say “engaged and moved in before the wedding.” The proposal → engagement → move-in sequence is coherent, and the effect no longer says they are married. Pass at 40.

Remaining: cohabitation before marriage in Catholic Vienna may need a social consequence (landlord, family, parish), or the text should make clear this is a pragmatic engagement. `proposal-refused` still charges `-2` for “tram fare and coffee at the riverside,” but the scene is on a bench and no coffee appears. That is a small effect-text leak.

## Duplicate-exclusion verification

**Present and effective for the hard pairs:**

- `major-work-injury` and `major-crisis.press-accident` now both exclude `disabled_worker`, `injured_worker` and `light_duty_worker`. A person who loses fingers in one scene cannot lose them again in the other. This is a real fix.
- `major-crisis.police-raid` excludes `strike_organizer` and `blacklisted_worker`; `major-task.strike-meeting` excludes `detained_activist`, `police_record` and `blacklisted_worker`. The hard “meeting → detention → dismissal” double-fire is closed.
- `major-education-scholarship-examination` and `major-education-teacher-recommendation` both now require `notHasRole scholarship_holder`. The double-award path is closed.
- `major-education-apprenticeship-exam` and `major-task.trade-qualification` both require `notHasRole journeyman`; a second *success* is guarded. Failure/retake paths can still produce two exam narratives, which is plausible but should be checked for narrative repetition.

**Still open:**

- `strike-vote-deferred` adds no exclusion role; a later police raid can still occur. That is arguably a different meeting, but if the design intent is one political arrest per life, add a shared `politically_arrested` flag.
- `back-stairwell` adds `union_activist`, which the strike task does not exclude. A person can escape a raid and later attend a strike meeting; again plausible, but it is not a full one-event lock.
- `major-crisis.press-accident/press-kills` has no `disabled_worker` role because the subject dies; no future event can fire. Fine.

**Verdict:** duplicate-exclusion is **actually present** for the two hard pairs; it is **partial** for the adjacent police/strike paths.

## Effect-text verification

**Fixed and present:**

- `major-work-injury/injury-compensation-granted` and `major-crisis.press-accident/hand-crushed`: the prose now says “厂里先垫……六周后保险结算,” so the immediate cash is an advance, not a future payment. The effect reason still says “accident insurance payment,” which is a stale label, but the timing no longer contradicts the prose.
- `major-family.child-death/diphtheria`: serum in an ice box replaces the white powder; `bereaved_guardian` replaces `bereaved_parent`.
- `major-crisis.police-raid/held-overnight`: “分局囚车,” “区公所,” `detained_activist`.
- `major-education-withdrawal/withdrawn-to-printshop`: age 14–15 and a workshop; legal age fixed.
- `major-family.proposal-accepted/registry-office`: church first, civil registration second.
- `major-task.marriage-proposal/proposal-accepted`: engaged roles, not spouse roles.
- `major-task.strike-meeting/meeting-broken-up`: beating and fine now in the prose; effects match.
- `major-task.relocation-klosterneuburg/moved-with-promise`: outcome no longer claims employment; effect matches the promise.

**Still wrong or incomplete:**

- `major-crisis.front-wound/leg-amputated`: text puts the allowance in the subject’s pocket; effect credits the household.
- `major-crisis.front-wound/abdomen-wound`: text says the envelope is sent; effect credits `+25` immediately. The half bread in the envelope is a new decorative absurdity.
- `major-crisis.border-papers/ticket-and-transit`: the agent “收了八十二克朗，其中三十二克朗是定金,” but the effect is only `-32`. Either the agent collected 82 (effect should be `-82`) or the text should say “票价八十二，先收三十二定金.” The total fare also still needs a period check.
- `major-family.proposal-accepted/registry-office`: effect reason still says “civil marriage at the magistrate,” despite the church-first text.
- `major-education-withdrawal/kept-home-to-mind-children`: `child_minder` role does not match the stove/water/market text; the neighbor watches the youngest.
- `major-family.child-death/scalded`: `trust -0.06` “blamed each other” still has no line of blame in the prose.
- `major-task.marriage-proposal/proposal-refused`: `-2` “tram fare and coffee” still has no coffee on the bench.
- `major-work-retirement`: no `worldYear >= 1909` gate; “病退” institution/timing still needs a source check.
- `major-task.relocation-klosterneuburg/move-blocked`: still uses the baptism-name mismatch already used by `border-papers/papers-refused`.

**Verdict:** effect-text fixes are **partial**, not complete. The P0 repaired the most visible contradictions but left several smaller ones and introduced one new one (the 82/32 ticket).

## What still needs rewriting first

1. `major-work-retirement/pension-granted` — add the 1909+ gate or a pre-1909 sickness-fund variant; give the subject a stake; name the fund.
2. `major-crisis.front-wound/abdomen-wound` — remove the bread from the mail envelope; move the death benefit to a later claim; let the neighbor carry the pay book and letter.
3. `major-task.relocation-klosterneuburg/moved-with-promise` — fix the train/handcart/title mismatch; add a real obstacle after the papers; replace `move-blocked`’s name-mismatch duplicate.
4. `major-crisis.border-papers/ticket-and-transit` — fix the 82/32 cash contradiction; check the fare; make the deposit/balance explicit.
5. `major-family.child-death` — add the parent/guardian condition; fix the `scalded` blame effect.
6. `major-crisis.front-wound/leg-amputated` — align the `+10` cash with the pocket/envelope text.
7. `major-family.proposal-accepted/registry-office` — fix the effect reason and outcome id.
8. `major-education-withdrawal/kept-home-to-mind-children` — replace `child_minder` with `household_helper` or restore actual child-minding.

## Pass/fail summary

Counts below are for the outcomes reviewed in this addendum, not every outcome in each scene.

| Node group | Pass | Fail | Notes |
|---|---:|---:|---|
| Required nodes (11) | **8** | **3** | retirement, abdomen, relocation |
| `major-work-retirement` | 0 | 1 | `pension-granted` 35; siblings improved but still ungated |
| `major-family.child-death` | 3 | 0 | diphtheria 39; scalded 38 with blame leak; measles 40 |
| `major-crisis.police-raid` | 1 | 0 | `held-overnight` 38; `names-taken`/`back-stairwell` still have minor leaks |
| `major-crisis.front-wound` | 1 | 1 | leg 37 passes; abdomen 31 fails; shoulder unchanged |
| `major-crisis.border-papers` | 1 | 1 | papers-refused 37 passes; ticket-and-transit 28 fails |
| `major-task.strike-meeting` | 1 | 0 | meeting-broken-up 40 |
| `major-task.relocation-klosterneuburg` | 0 | 1 | moved-with-promise 34; move-blocked still duplicates |
| `major-education-withdrawal` | 1 | 0 | withdrawn-to-printshop 41; kept-home role leak |
| `major-family.proposal-accepted` | 1 | 0 | registry-office 37 |
| `major-task.marriage-proposal` | 1 | 0 | proposal-accepted 40 |

**No tests were run and no git commands were used.** This addendum is based on a read-only review of the four content files.

---

# Final Re-Review — Three Remaining Nodes

**Date:** 2026-11-03  
**Scope:** `major-work-retirement/pension-granted`, `major-crisis.front-wound/abdomen-wound`, `major-task.relocation-klosterneuburg/moved-with-promise`, plus five ancillary text/effect pairs.  
**Method:** Same rubric, same major threshold of 36/50. Read-only; no content edits, tests, git, or LLM.

## Result

**3 pass, 0 fail — but two are narrow 36/50 passes, not clean bills of health.** This supersedes the previous 8/3 split for the required set: all 11 required nodes now meet 36/50, with retirement and the abdomen wound at the floor.

| Node / outcome | Previous addendum | New | Verdict | What changed | Remaining issue |
|---|---:|---:|---|---|---|
| `major-work-retirement` / `pension-granted` | 35 | **36** | **PASS (narrow)** | `worldYear` floor is now **1909**; lead-poisoning diagnosis and “病退” retained | The fund is still unnamed; the subject is still a passive case file; low tension. It passes because the period error is fixed, not because the scene has a strong stake. |
| `major-crisis.front-wound` / `abdomen-wound` | 31 | **36** | **PASS (narrow)** | Doctor’s mail envelope is gone; a paymaster takes 25 kroner back pay from the soldier’s book and gives it to the neighbor to carry home; the half bread is returned to the neighbor, not mailed | Effect reason still says “death benefit and back pay,” but the prose gives only 25 kroner欠饷; no death benefit is shown. The 25-kroner cash still lands immediately while the neighbor is carrying it home. |
| `major-task.relocation-klosterneuburg` / `moved-with-promise` | 34 | **39** | **PASS** | Transport sequence fixed: handcart to North Station → train → borrowed handcart uphill → aunt’s attic; title now matches the prose | `move-blocked` still reuses the baptism-name mismatch from `border-papers/papers-refused`; `moved-without-work` remains a separate near-duplicate. The node itself is honest: unemployment plus a promise, not a job. |

## Score breakdown (new)

| Node | S | M | C | T | Sty | Tw | N | P | F | Mem | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `major-work-retirement/pension-granted` | 5 | 3 | 4 | 2 | 4 | 2 | 4 | 4 | 4 | 4 | **36** |
| `major-crisis.front-wound/abdomen-wound` | 5 | 2 | 4 | 4 | 4 | 2 | 4 | 4 | 3 | 4 | **36** |
| `major-task.relocation-klosterneuburg/moved-with-promise` | 5 | 4 | 4 | 3 | 4 | 2 | 4 | 4 | 5 | 4 | **39** |

## Ancillary fixes

| Item | Status | Verification |
|---|---|---|
| Ticket deposit | **Fixed for the deposit amount; partial overall** | `ticket-and-transit` now says “先收三十二克朗定金，余款上船前补齐,” and the effect is `-32`. The old 82/32 contradiction is gone. Remaining: the effect reason still reads as a full “steamship ticket … and an agent fee,” not a deposit; the “余款上船前补齐” balance has no flag/obligation. |
| Leg cash | **Partial** | `leg-amputated` now says “十克朗战地津贴交给同乡带回家里,” and the effect credits `+10` to the household. Destination is fixed. Remaining: effect reason still says “field allowance **and disability payment**,” while the prose only hands over 10 kroner field allowance; the disability certificate is not cash. |
| Registry reason | **Fixed** | `proposal-accepted.registry-office` effect reason is now “church wedding followed by civil registration,” matching the church-first prose. The outcome id is still `registry-office`, but the reason no longer contradicts the text. |
| Scalded blame | **Fixed** | `child-death.scalded` now says “两人都怪对方没看好孩子,” and the `trust -0.06` reason is “blamed each other after the accident.” The blame is now in the prose. |
| Kept-home role | **Partial** | `kept-home-to-mind-children` now assigns `household_helper` / “keeping the household while adults worked,” matching the stove/water/market text. Remaining: the `education` effect reason still says “kept home to mind younger children,” and the outcome id still says child-minding, while the prose says the neighbor watches the youngest. |

## Bottom line

The three P0 nodes now clear 36/50. Retirement and the abdomen wound are **narrow passes**: the factual/period errors that caused the previous fails are gone, but one stale effect label remains in each. Relocation is a solid pass on its own outcome; its sibling `move-blocked` still carries the old duplicate-paper problem.

**Remaining targeted fixes, in order:**

1. `major-crisis.front-wound/abdomen-wound` — change the effect reason to “25 kroner back pay” or add an explicit death-benefit effect; do not call the same 25 kroner both.
2. `major-education-withdrawal/kept-home-to-mind-children` — change the `education` effect reason from “mind younger children” to “kept home for household work”; optionally rename the outcome id.
3. `major-crisis.border-papers/ticket-and-transit` — change the effect reason to “deposit on steamship ticket” and add a balance-due flag/obligation.
4. `major-crisis.front-wound/leg-amputated` — change the effect reason to “field allowance” or separate the disability payment.
5. `major-task.relocation-klosterneuburg/move-blocked` — replace the baptism-name mismatch with a different obstacle; it still duplicates `border-papers/papers-refused`.
6. `major-work-retirement/pension-granted` — name the fund/institution and give the subject one concrete stake; 36 is a floor, not a strong pass.

No tests were run and no git commands were used. No content files were edited.
