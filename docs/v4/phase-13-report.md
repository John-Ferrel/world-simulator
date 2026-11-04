# Phase 13 — Living Stories

Date: 2026-11-04  
Baseline: Phase 12 HEAD `44614c5`

## 1. Verdict

Phase 13 was meant to turn the existing 1,011-kernel library into actual lives,
not to build another architecture. The three loops are now materially connected:

- **World facts → opportunity → event.** The final 88-year playtest contains
  **31,830 committed events**, of which **6,227 are composed actions**
  (**3,573 composed scenes + 2,654 composed tasks**) from **661 distinct
  kernels**. Phase 12 had 443 composed actions / 203 kernels. That is a
  **14.1× increase in composed actions** and a **3.3× increase in distinct
  triggered kernels** on a comparable 88-year Vienna run.
- **Goal → turning point → later life.** 200 new active Task recipes and 100
  relationship/turning-point Event recipes were added. Task events rose from
  3,438 (Phase 12) to **6,011** (3,357 base + 2,654 composed). Births rose from
  100 to **375**; named persons from 482 to **757**; living persons from 237 to
  **306**.
- **Fact → resolution → literature.** Incident Trace is now post-application,
  interpolated and carried by composed events with **1.00 coverage**. 1,357
  narration variants exist across the base library; 484 of them were added or
  rewritten by this phase's literary agents. A five-life dossier renders actual
  committed facts, not sample prose.

**Literary quality improved substantially but only just clears the proposed
threshold.** Phase 12's final excerpt sample was **3/12 (25%), mean 30.50**.
Phase 13's first 20-event sample was **10/20 (50%), mean 30.55**. After the
narration/casting/cash/debt/pronoun fixes, the final 15-event sample is
**12/15 (80%), mean 33.67/40** — exactly at the requested 75% line, with **zero
margin**. It is not a comfortable pass, and three base-scene cast/POV failures
would drop it to 11/15.

**Performance remains inside the 20k target.** 20,000 synthetic persons run at
**3.61 s/year** in the composed-only benchmark and **4.48 s/year** in the
original Phase 11 benchmark, with 378–465 MB heap. Phase 12 was faster
(2.5/2.76 s), but Phase 13 carries 300 more recipes, many more tasks, eight
contexts and a much higher composed-event share.

## 2. What changed

### 2.1 Runtime: four opportunity sources, not one random pile

The engine already had statistical facts, Agency plans, TaskDefinitions and
scene events. Phase 13 made their relationship explicit and measurable:

- **Statistical facts** continue through the monthly/statistical model.
- **Active behaviour** enters through Agency; `maxAgencyActorsPerYear` rose from
  48 to **96**, and children 6+ and elders up to 80 can now be actors. 200 new
  Task recipes compete on goal-aligned utility; composed tasks get a modest
  1.25 selection weight so a 1,311-kernel library is not permanently drowned by
  the older base task pool.
- **Natural encounters** now choose a source pool (legacy base vs composed
  Recipe) by the number of structurally eligible definitions, then select within
  that source. This was the key fix for the old pattern where a handful of
  high-rate base scenes consumed almost every ordinary slot.
- **Continuing affairs** (projects, interactions, scheduled/followup scenes,
  historical processes) keep their existing paths.

Legacy base scenes with repeatable rates above **0.12** are capped, except
once-per-person milestones and `lifecycle` scenes. This reduced the old
`vienna-social-movement`/medical/laundry repetition without suppressing
courtship or birth.

Lightweight scheduling diagnostics now report candidate-pool size, ordinary
draws, rate passes, selected/resolved counts and block reasons per source. They
are written to `docs/v4/playtest.json` and exposed by
`scripts/v4-phase13-scheduling.ts`.

### 2.2 Late-century contexts

Phase 12's active contexts ended in 1933–1935, so composed content vanished from
later life even though the playtest runs to 2000. Phase 13 adds:

- `ctx-vienna-authoritarian-1934` (1934–1945)
- `ctx-vienna-postwar-1945` (1945–1989)
- `ctx-vienna-late-1990` (1990–2000)

At 1950, the composer now produces **2,557 scenes + 673 tasks**; at 1995,
**2,323 scenes + 664 tasks**. Late life is no longer a base-content-only zone.

### 2.3 Causal corrections

- The subject-role cache key now includes `subject.id` for `kind: 'subject'`;
  the Phase 12 wrong-person collision is fixed at the role/trace layer.
- Partner casting looks up an existing partner directly. New partners are
  allowed only for courtship/marriage/family-formation or a same-sex formation
  scene; childbirth is gated on a **male partner**, so a female-female couple is
  not offered an impossible birth and then blocked every year.
- Divorce no longer requires cohabitation; the “separate under one roof”
  outcome is separately conditioned on `sameHousehold`.
- Named persons are never reused for two person-roles in one incident.
- A cash shortfall becomes household **debt**, and the committed effect keeps the
  full negative cost plus a debt note, instead of silently dropping the midwife
  fee or hospital deposit.
- An authored outcome whose effects all fail no longer commits an empty fact.
- Death dates include **all participant events**, not only events where the
  person was subject; final playtest has **0 post-death participant events**
  except the death event itself.
- `IncidentTrace.effects` is rebuilt from post-application effects and its text
  is interpolated. Major outcomes use the authored causal text; narration
  variants are only used when they are long enough to carry the scene. This
  fixed the Phase 12 “beautiful fragment with no cause” failure.

### 2.4 Log as a life

The personal log now labels each year with age and life chapter
(幼年/童年/少年/青年/成年/中年/晚年/老年), and each of the five dossier lives is
built from **subject events**, not participant-only events. The old 45%
participant drift in excerpts is gone: final excerpts are **75/75 subject
events**, with participant-only passages explicitly marked if they ever appear.

## 3. Content production

Six content subagents produced **300 new recipes**:

| Batch | Kind | Recipes | Focus |
|---|---|---:|---|
| `batch13-education-tasks` | Task | 50 | school, exams, apprenticeship, university, night class, scholarship |
| `batch13-work-tasks` | Task | 50 | job search, wages, union, shop, contracts, bankruptcy, retirement |
| `batch13-family-social-tasks` | Task | 50 | friendship, courtship, care, inheritance, separation, adoption |
| `batch13-civic-health-tasks` | Task | 50 | clinic, surgery, welfare, press, party, protest, migration paperwork |
| `batch13-major-turns-events` | Event | 50 | school leaving, jobs, marriage, birth, death, exile, prison, fame |
| `batch13-relationship-events` | Event | 50 | meeting, friendship, courtship, proposal, cohabitation, conflict, widowhood |

Plus two literary subagents rewrote **86 base scenes** and added **274 + 210 =
484 narration variants** to childhood/adolescence and adult family/illness/
courtship/daily-life packs.

Final library:

- **1,311 kernels**: 1,060 event + **251 task**
- **5,290 authored outcome texts**
- **914 kernels with variants**; **1,047 outcomes with person conditions**
- **31 domains**
- content files: **98,824 lines**, of which **26,597 lines** are Phase 13 batches

Validation: all six checkers pass; 0 duplicate titles/texts; 0 unresolved text
tokens in the final playtest; 0 empty participant lists; 0 post-death subject
events; 0 post-death participant events outside the death event.

## 4. Five counts, measured

| Count | Phase 12 | Phase 13 |
|---|---:|---:|
| Event mechanisms | 1,011 kernels | **1,311 kernels** |
| Causal branches | 740 variants / 692 person branches | **914 variants / 1,047 person branches** |
| Compiled scenes (Vienna 1912) | 2,551 scenes + 191 tasks | **2,938 scenes + 726 tasks** |
| Distinct compiled scene IDs across scenarios | 5,960 | **8,084** (late contexts add 2,500+ per late year) |
| Eligible person×scene×outcome situations | 1,073,786 | **1,174,428** |
| Actual executed events | 20,186 / 443 composed / 203 kernels | **31,830 / 6,227 composed / 661 kernels** |
| Narrative realizations | 4,065 outcomes | **5,290 outcomes + 1,357 narration variants** |

The 1,174,428 figure is measured over 3,000 synthetic profiles across
peace/war/reform using the real candidate audit (451,230 scene candidates +
126,199 task candidates). It is not a naive product and not a count of played
events. The naive upper bound is not used as a success claim.

## 5. Experiment A — same recipe, different worlds

`kernel-civic.leaflet-night` under controlled rate 1:

| Scenario | Compiled scenes | Actual events | Outcome | Effects |
|---|---:|---:|---|---|
| peace-1912 | 5 | 3 | `civic-leaflet-police` ×3 | condition, flag, relation, reputation −0.03, knowledge |
| war-1915 | 3 | 3 | `civic-leaflet-war-ration` ×3 | ration flag, 2 relations, cash −2, knowledge |
| reform-1930 | 1 | 0 | no eligible event in this sample | — |

The same mechanism produces a police-warning leaflet in peace and an illegal
ration-cut print run in war. Full artifact: `docs/v4/phase-13-experiment-a.json`.

## 6. Experiment B — same world, different people

Candidate pools on the Vienna seed:

| Profile | Scene candidates | Task candidates |
|---|---:|---:|
| child in a tenement | 29 | 10 |
| adult print worker | 690 | 164 |
| employed woman | 176 | 63 |
| municipal official | 252 | 73 |
| oldest living person | 18 | 12 |

The print worker sees 6.9× the child's task opportunities; the official sees
paperwork/politics; the elder sees care/retirement. Facts change access.

Person-branch control on `r1-work.market-stall-allotment`:

| Household cash | Events | Outcome | Visible effects |
|---:|---:|---|---|
| 0 | 12 | `pushed-the-cart-to-the-corner` | denied-stall flag, pushcart role, neighbour relation |
| 100 | 12 | `bought-the-middle-place` | cash −5, reputation loss, bribe flag, relation |

Artifacts: `phase-13-experiment-b.json`, `phase-13-person-branches.json`.

## 7. Experiment C — content growth

The new 300 recipes are not reskins: education tasks encode fees, exams,
recommendations and school-to-work; work tasks encode wages, union funds,
contracts and bankruptcy; family tasks write health/education to the cared-for
person; relationship events create real partner/interaction/household states;
major-turn events commit education/employment/birth/death/estate/move.

Result in play:

- composed actions **443 → 6,227**
- distinct composed kernels **203 → 661**
- composed scene share of ordinary scenes **~2.2% of all events in Phase 12**;
  **3,573 / 22,310 ordinary scene events = 16.0%** in Phase 13
- composed tasks **2,654 / 6,011 task events = 44.2%**
- total composed share **19.6%** of all committed events

This is the requested “many times larger real use of composed content”, not a
theoretical combination count.

## 8. Experiment D — million-scale capacity

`scripts/v4-phase12-capacity.ts 1000` (now writes a Phase 13 artifact):

- 3,000 synthetic valid profiles × peace/war/reform
- **451,230 scene candidates**
- **126,199 task candidates**
- **1,174,428 eligible person × scene × outcome situations**
- **106,343 conditional-outcome situations**

Artifact: `docs/v4/phase-13-capacity.json`. It is candidate capacity, not
executed events.

## 9. Experiment E — long lives

Final 88-year playtest (`docs/v4/playtest.json`):

- **31,830 events**, 361.7/year
- **6,227 composed actions** — 3,573 scenes + 2,654 tasks — from **661 kernels**
- **757 named persons**, **306 alive**, 375 births, 449 deaths
- **28,406 distinct texts**, reuse ratio **0.1076**
- 0 unresolved tokens, 0 literal None/undefined, 0 empty participants
- 0 post-death subject events; 0 post-death participant events outside the
  death event
- 80 scene-prefix offenders, max 31 (Phase 12: 382/86, then 152/60)
- 8 active contexts, 9 milieus

The five full lives are in `docs/v4/phase-13-lives.md`: Anton (short-lived
child), Hedwig (long adult), Emil (working adult), Mitzi (remaining elder), Lena
(parent life). Each is 15 subject events from the committed log.

## 10. Birth and population

Phase 12 had **100 births / 482 persons**. Phase 13 has **375 births / 757
persons**; 306 alive at 2000, 449 deaths. This is a 3.75× increase and clearly
above the Phase 12 starvation level; it is close to, but below, Phase 11's 237
births with a smaller cast.

The 40-year controlled family run:

- 59–84 births depending on seed/content revision
- 247–272 persons, 133–165 alive
- partnered-woman share ~40–51%
- 0.13–0.20 births per partnered woman-year
- 3–6 child deaths (age <5)
- materialized persons remain a large share of the cast (44.6% in the measured
  mechanics run; higher in the family run)

What is fixed:

- childbirth uses the actual male partner, not a new stranger;
- same-sex female couples are not offered an impossible birth and then blocked;
- divorce works for non-cohabiting partners;
- the court→partner→childbirth chain commits the midwife cost (as cash or debt).

What is not fixed:

- births (375) are still below deaths (449) over 88 years;
- the family run and macro population are below replacement;
- a substantial part of population growth is materialization/in-migration, not
  endogenous birth;
- same-sex couples have adoption/fostering tasks but no dedicated birth path.

This is honest progress, not a closed demographic model.

## 11. Literary review

Independent Critic, actual committed events:

| Sample | Pass | Mean | Note |
|---|---:|---:|---|
| Phase 12 final excerpts | 3/12 | 30.50 | baseline |
| Phase 13 first 20 | 10/20 | 30.55 | subject drift, narration fragments, money |
| after 12+10 rewrites | 10/20 → 12/20 | 32.75 | subject/cash improvements |
| final 15 after casting/cash/pronoun fixes | **12/15 (80%)** | **33.67** | exactly 75%, zero margin |

Dimension means in the final sample: specificity 8.87, drama 7.47,
character/period 8.93, causality 8.40. The previous 25% pass rate is no longer
representative; subject drift in excerpts is fixed (63/75 own-subject, 0
other-subject). Remaining failures are now mostly **base-content cast/POV
discipline** (a hardcoded “玛尔塔/汉斯/来者” outside the declared cast), one
variant leak, and effect visibility. They are no longer wholesale narration
replacement.

The mechanics Critic found and we fixed the two Phase 12 hard bugs (subject-role
cache collision, stranger father) and the Phase 13 deadlock/zero-effect/
post-death failures. Residual hard issues: 304 `unresolved_effect_ref`, 33
`invalid_relation`, 20,472 blocked scene casts (19,902 missing roles), one
post-death participant edge excluded only if it is the death event itself, and
money sometimes visible as debt rather than paid cash.

Full reports: `docs/v4/phase-13-critique.md`,
`docs/v4/phase-13-mechanics-critique.md`.

## 12. Performance

Final idle-machine benchmark, 3 years:

| Population | composed-only | Heap |
|---:|---:|---:|
| 1,000 | 407 ms/year | 159 MB |
| 5,000 | 896 ms/year | 233 MB |
| 20,000 | **3,611 ms/year** | 465 MB |

Original Phase 11 benchmark at 20,000:

- **4,475 ms/year**
- 378 MB heap
- 34,670 events over 3 years

Target **<5 s/year** is met in both measurements. Phase 12 was faster because
it had fewer recipes, tasks and late contexts; the Phase 13 overhead is real but
still inside budget.

## 13. Tests and browser evidence

```text
pnpm test
  83 files passed / 7 skipped; 481 tests passed / 36 skipped
  187.55s

pnpm exec vitest run tests/v4-*.test.ts
  34 files passed / 2 skipped; 201 tests passed / 8 skipped
  35.62s

pnpm build
  pass; 3.14s

pnpm test:e2e --config playwright.v4.config.ts
  1 passed; 14.5s (test 9.8s)
```

Browser evidence:

- `docs/v4/phase-13-browser.png`
- `docs/v4/phase-13-incident-trace.png` — event modal with “因果链 / 机制”
- Personal log now shows “1913 · 1 岁 · 幼年” chapter labels and the five-life
  dossier.

## 14. Content-production cost

- 6 content subagents, 50 recipes each = 300 recipes
- 2 literary subagents: 86 base scenes rewritten, 484 narration variants added
- integration: duplicate-title cleanup, 10 critic rewrites + manual targeted
  fixes, foundling gate, union-fee alignment, pronoun repairs
- approximately 26,600 lines of new recipe code, plus 484 prose realizations
- one main agent for engine/scheduler/family/performance integration and
  repeated 88-year playtests

## 15. What is still not done

1. **Literary pass is exactly at the line, not comfortable.** 12/15 (80%) with
   zero margin; one more base-scene failure would fail the threshold. The
   sample is 15 events, not the whole library.
2. **Births still trail deaths** over 88 years (375 vs 449); the family run and
   macro are below replacement and depend on materialization/in-migration.
3. **Blocked casts remain high**: 20,472 blocked scene attempts, 19,902 missing
   roles. Many base family/organization scenes are authored around actors the
   current cast does not have. This is the main remaining content-conversion
   bottleneck.
4. **Residual warnings**: 304 unresolved effect refs, 33 invalid relations, 1
   already-dead effect, 1 dead-or-missing effect over 88 years.
5. **Base-content cast discipline**: hardcoded names outside the cast, one
   variant leak, and a small number of effect/money visibility gaps.
6. **No production PostgreSQL/API load test**, no multi-city world pack, no
   runtime LLM narrative adapter. The model worker exists but live prose was not
   generated during acceptance.
7. **No claim of 1M played events.** 1,174,428 is eligible candidate capacity;
   31,830 events were actually committed.

The repository is runnable with `pnpm dev`, and no active/archived world was
reset during this work.
