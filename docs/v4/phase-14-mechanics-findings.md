# Phase 14 — Mechanics Audit Findings

**Date:** 2026-11-04
**Run snapshot:** `2026-11-04T14:28:26Z`, working tree at `a48c25f` plus uncommitted Phase 14 content.
**Constraint:** no tracked code or content was edited. All instrumentation was applied to a throwaway copy in `/tmp/opencode/p14`; the only file written to the repository is this report.

---

## 1. Bottom line

I ran the real Vienna 1912 world for **40 years (1912–1952)** with the standard stack: all Vienna scene packs, `ALL_EVENT_SCENES`, `ALL_TASKS`, `DEFAULT_COMPOSITION`, eight player-born focal children, economy, agency and event runtime.

| Metric | Current 40-year run |
|---|---:|
| Events committed | **9,969** |
| Named persons / alive at horizon | **281 / 163** |
| Relations | **7,702** |
| Blocked scenes | **2,606** |
| Warnings captured | **3,395** |
| `unresolved_effect_ref` | **1** |
| `invalid_relation` | **1** |
| `scheduled_event_expired` | **47** |
| `household_full` | **36** |
| `external_cash_inflow` | **704** |
| Runtime | **36.4 s** |

The old Phase 13 figures in the task context (**304 unresolved refs, 33 invalid relations, 20,472 blocked casts**) are **not reproduced in the current tree**. Those artifacts were 88-year runs; this audit is 40 years. In addition, two generated content packs were repaired while this audit was running, and the Phase 14 `batch14-*` kernels were filled in. The current run has only **1 unresolved effect and 1 invalid relation**. That is a real improvement, not a suppressed warning: the one unresolved effect is still a committed event and is listed below.

The remaining hard defects are different:

1. **Scheduled follow-ups overwrite the subject.** **36** committed events have two `subject` participants; prose/effects bind to different people. This includes Phase 14 content (`evt:...008531`, `evt:...008532`).
2. **Every authored cash debit is committed as a positive cash effect.** **3,448/3,448** negative authored cash effects were committed positive; household cash is still debited. The event fact and the ledger disagree.
3. **Scheduled follow-ups retry at their original due date and expire.** **47** targets expired after five years; 10 of them are `r14-edu.night-class`, 21 are `vienna-life-injury-recovery`.
4. **Employer relations can point at an arbitrary person.** **19/21** committed `employer` relations target a person with no `owner`/`employer` role; e.g. Franz Lechner's “东家” is recorded as Anna Bauer, an apprentice.
5. **History conditions can cite later-dated facts.** **3/35** real `historyRefs` point to an event dated *after* the consequence. A related `withRole` bug makes the documented “I was there with a comrade” condition never match for the subject.

Additionally, the Phase 14 contract has two verified failures: **`sharedHistoryTag` is bypassed by a follow-up's preferred cause participant** (`evt:...008532`), and **history/role date ordering allows 10 strict partner overlaps in the committed calendar**.

---

## 2. Method and limits

### 2.1 What was run

The probe was a copy of the repository at `/tmp/opencode/p14`, with a small audit patch that adds `action`, `sceneId`, `effect` and `detail` to warnings and records household cash/debt before and after each `cash` effect. The simulation itself is the real engine and real content; no rule was replaced.

Scene stack:

```
VIENNA_1912_SCENES
VIENNA_LIFE_SCENES
VIENNA_POSTWAR_SCENES
VIENNA_HISTORY_SCENES
VIENNA_DEVELOPMENT_SCENES
VIENNA_FAMILY_RUNTIME_SCENES
ALL_EVENT_SCENES
ALL_TASKS
DEFAULT_COMPOSITION
```

Options:

```
years: 40
focalCount: 8
maxOrdinaryEventsPerPerson: 4
maxScenesPerPerson: 1 (engine default)
economy: true
eventRuntime: true
agency: true
tasks: ALL_TASKS
composition: DEFAULT_COMPOSITION
```

The probe wrote `/tmp/opencode/p14-run3.json`. The full raw warning/event/relation/cash-audit data is there; this report quotes the committed facts.

### 2.2 Limitations

- One deterministic seed and one 40-year horizon. Counts are exact for that run, not population estimates.
- The named slice is audited; macro population and LLM worker behaviour are not.
- `scheduled_event_expired` warnings do **not** carry `causeEventId`, so the 47 expiries cannot all be tied to one source event from the artifact alone. The fixed-date mechanism is demonstrated by a synthetic reproduction and by the retry behaviour of real queue items.
- The cash audit uses the instrumented copy. The official `V4AdvanceDiagnostics` does not expose per-event household balance, so this is not independently verifiable from `docs/v4/playtest.json`.
- The working tree changed during the audit. The final run is the post-content snapshot; older Phase 13 artifacts are not the same code/content.

### 2.3 Exact commands and results

```bash
# Instrumented copy (no tracked files touched)
rsync -a --exclude .git --exclude .data --exclude dist --exclude node_modules \
  /home/rust1/projects/world-simulator/ /tmp/opencode/p14/
python3 /tmp/opencode/instrument-engine.py

# Real 40-year run
PROBE_YEARS=40 PROBE_OUT=/tmp/opencode/p14-run3.json \
  /tmp/opencode/p14/node_modules/.bin/tsx /tmp/opencode/p14-probe.ts

# Output:
# year 10/40 events=1174 warnings=340
# year 20/40 events=3255 warnings=974
# year 30/40 events=6418 warnings=2155
# year 40/40 events=9969 warnings=3395
# wrote ... 9969 events, 3395 warnings, 2606 blocked, 36777ms

# Phase 14 continuity tests in the tracked tree
pnpm exec vitest run tests/v4-continuity.test.ts
# 1 file passed, 9 tests passed
```

The 9 continuity tests pass; that does not contradict this report. They assert the happy path (`historyRefs` on a tagged event, shared-history reuse on a simple follow-up, goal reason, focus utility, compiler follow-up), not the failing cases above: cause-subject override, frozen due date, forward-dated history refs, arbitrary employer representative, or cash sign.

The raw capture has **3,395 warning rows** in `/tmp/opencode/p14-run3.json`. Every effect warning has `eventId`; the committed action was resolved by joining that id to `world.events`. Blocked-scene warnings have `sceneId` and `action` but no `eventId` (nothing committed). `scheduled_event_expired` has `sceneId` and `personId` but no `eventId`/`action`/`causeEventId` — a real audit gap, noted in §9.

---

## 3. Exact warning groups

### 3.1 Effect/queue warnings

| Code | Exact message | Count | Example |
|---|---|---:|---|
| `unresolved_effect_ref` | `effect health has unresolved personId` | **1** | `evt:world-vienna-1912:001763` |
| `invalid_relation` | `relation effect references a missing person` | **1** | `evt:world-vienna-1912:000496` |
| `scheduled_event_expired` | `scheduled follow-up expired` | **47** | scene `r14-edu.night-class` |
| `household_full` | `household move skipped because the target is full` | **36** | `evt:world-vienna-1912:001264` |
| `external_cash_inflow` | `external inflow <amount> recorded as: <reason>` | **704** (171 distinct messages) | `external inflow 0.01 recorded as: 被扣后只剩一赫勒` |
| `already_dead` | — | **0** | — |
| `effect_on_dead_or_missing` | — | **0** | — |
| `unfunded_cash` | — | **0** | — |
| `food_without_source` | — | **0** | — |
| `unknown_effect` / `effect_failed` | — | **0** | — |

`external_cash_inflow` is not itself an error: it means a positive cash effect had no funding organization and was accepted because it had a prose reason. It matters because the reason is not a ledger counterparty; see §5.

### 3.2 `scene_blocked` groups

**2,606** blocked scenes, **152 distinct messages**, **1,062 distinct message/action combinations** counting reasons with multiple role lists.

| Exact message | Count |
|---|---:|
| `missing_role:subject` | **661** |
| `missing_role:mother` | 297 |
| `missing_role:employer` | 239 |
| `missing_role:parent` | 211 |
| `missing_role:partner` | 192 |
| `missing_role:sibling` | 128 |
| `missing_role:child` | 90 |
| `missing_role:subject,mother` | 88 |
| `missing_role:doctor` | 71 |
| `missing_role:subject,parent` | 55 |
| `no_eligible_outcome` | 43 |
| `missing_role:neighbor` | 38 |
| `missing_role:subject,sibling` | 27 |
| `scheduled_missing_role:teacher` | 17 |
| `scheduled_missing_role:cousin` | 5 |
| `scheduled_missing_role:sibling` | 3 |

Top blocked scene ids:

| Scene | Blocks |
|---|---:|
| `vienna-childhood-friends.courtyard-race` | 39 |
| `vienna-early-childhood.fever-night` | 18 |
| `r2-rural.village-school::ctx-vienna-authoritarian-1934::milieu-tenement` | 12 |
| `r3-mig.child-sent-alone::ctx-vienna-authoritarian-1934::milieu-tenement` | 11 |
| `r1-child.pencil-betrayal::ctx-vienna-authoritarian-1934::milieu-tenement` | 11 |
| `r2-rural.child-farm-labor::ctx-vienna-authoritarian-1934::milieu-tenement` | 10 |
| `r1-child.midterm-transfer::ctx-vienna-authoritarian-1934::milieu-tenement` | 10 |

**661 `missing_role:subject` is not normal role scarcity.** At least **70** of them are scenes offered to a subject outside the scene's own `ageWindow`; the remaining 591 are composed scenes whose full definition was not in the static map, but the same mechanism applies. Example:

```
scene: vienna-childhood-friends.courtyard-race
date: 1915-01
subject: person-probe-focal-02 (Matthias, born 1912-01, age 3)
ageWindow: { min: 7, max: 12 }
role subject: minAge 7, maxAge 12
reason: missing_role:subject
```

`sceneEligiblePrepared` does not check `definition.ageWindow`; `indexedSceneFits` checks only the scene's explicit `age` condition (this scene has none). The subject passes the broad `stageForAge` check because childhood starts at age 3, then fails the role's `minAge` at cast time. The scene consumes a scheduling slot and is recorded as a blocked cast.

### 3.3 The two remaining effect errors

#### `unresolved_effect_ref` — 1

| Field | Value |
|---|---|
| Message | `effect health has unresolved personId` |
| Event | `evt:world-vienna-1912:001763` |
| Date | 1926.04 |
| Action | `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` |
| Subject | `person-materialized-world-vienna-1912-36` |
| Effect | `{ type: 'health', personId: '$worker', amount: -0.04, reason: '没有正规病假，只能靠药水撑着' }` |
| Committed effects | `mood -0.05`; `relation` to `person-materialized-world-vienna-1912-22` |
| Text | “止咳药水是褐色的……Hermann Moser看着工友把表折成小块……” |

The `worker` role was optional and uncast. The health consequence was dropped; the event still committed. **Recommendation: repair** — make `worker` required for this outcome, or make the health effect conditional on the role. It should not commit the scene while dropping the body consequence.

#### `invalid_relation` — 1

| Field | Value |
|---|---|
| Message | `relation effect references a missing person` |
| Event | `evt:world-vienna-1912:000496` |
| Date | 1917.01 |
| Action | `p9-work-career.reference/p9-work-career.reference.strong` |
| Subject | `person-friedrich-hofer` |
| Effect | `{ type: 'relation', a: 'person-friedrich-hofer', b: 'org-wien-magistrat', kind: 'employer', trust: 0.06, respect: 0.04 }` |
| Committed effects | `reputation +0.05`; `flag has_strong_reference` |
| Text | “Friedrich Hofer把新东家的信放在柜台上。Magistrat der k. k. Reichshaupt- und Residenzstadt Wien读完……” |

The relation was dropped, but the reputation/flag remained. **Recommendation: remove the relation effect** and replace it with an organization membership/employment/reference fact; a relation must be between people. The event still tells a coherent reference story without a person relation to the Magistrat. There is no missing/dead person in this group; the invalid participant is the organization itself.

**No current 304-ref group remains.** The old `$sister`, `$parent`, `$clerk`, `$workplace`, `$heirHouseholdId` groups from the Phase 13 artifact are not present in this snapshot; the generated packs were repaired.

---

## 4. Cash direction and ledger consistency — 10 samples

The source of the sign error is `packages/v4/engine.ts` → `applyCash`:

```ts
const amount = roundMoney(effect.amount);
if (amount < 0) {
  ...
  return { ...effect, amount: -amount, ... };
}
```

`amount` is already negative. `-amount` is positive. The household is correctly debited (`household.cash -= debit`), and a shortfall is correctly added to `household.debt`, but the **committed event effect** and the trace print the wrong direction.

Global audit (4,593 cash applications):

| Check | Count |
|---|---:|
| Authored negative cash effects | **3,448** |
| Authored negative → committed positive | **3,448 / 3,448** |
| Authored positive cash effects | 1,145 |
| Authored positive → committed negative | 0 |
| Cash change matches authored amount | 3,991 / 4,593 |
| Cash change matches committed amount | **1,145 / 4,593** |
| Applications that increased household debt | 602 |

### 4.1 Ten sampled events

| Event | Action | Text amount | Authored cash | Committed cash | Household cash Δ | Debt Δ | Verdict |
|---|---|---|---:|---:|---:|---:|---|
| `evt:...000366` (1916.01) | `vienna-family-childbirth/daughter-born` | 6 Kr | −6 | **+6** | −6 (595.70→589.70) | 0 | **sign inverted**; text says paid, fact says income |
| `evt:...000461` (1917.09) | `vienna-medical-treatment.toothache/dentist-pull` | 2.50 + 0.50 = 3 Kr | −3 | **+3** | 0 | +3 (25.50→28.50) | **sign inverted**; “payment” adds debt |
| `evt:...000457` (1917.08) | `vienna-market-debt.pawn-watch/pawn-chain-only` | 2.40 Kr | +2.4 | +2.4 | +2.4 | 0 | direction correct; no asset removal |
| `evt:...000829` (1920.06) | `vienna-market-debt.rent-arrears/rent-borrow-from-neighbor` | 4 Kr | +4 | +4 | +4 | **0** | inflow correct, but borrowed money creates **no liability** |
| `evt:...004479` (1937.11) | `r13-turn.starting-business.../signed-the-lease` | 18 Kr deposit + 3 months prepaid | −18 | **+18** | −18 | 0 | **sign inverted**; prepayment not modelled |
| `evt:...000261` (1915.03) | `vienna-tenement-neighbors.lost_room_key/key_stolen_by_stranger` | 6 Kr stolen | −6 | **+6** | −6 | 0 | **sign inverted**; theft becomes income |
| `evt:...001087` (1922.06) | `vienna-market-household.market-credit/market-credit.pay-later` | 3 Kr paid | −3 | **+3** | 0 | **+3** (13.08→16.08) | **sign inverted**; repayment increases debt |
| `evt:...004077` (1935.01) | `p9-gap-elderhood-care.join-aid/aid-joined` | 1.20 Kr dues | −1.2 | **+1.2** | −1.2 | 0 | **sign inverted** |
| `evt:...005986` (1941.01) | `r13-civ.new-district-lodging.../key-money-demanded` | 4 Kr key money | −10 | **+10** | −10 | 0 | **sign inverted + amount mismatch** (text 4, effect 10) |
| `evt:...009411` (1951.03) | `vienna-postwar-housing-1950s/private-sublet` | 30 shillings “key money” | −30 | **+30** | −30 (32.52→2.52) | 0 | **sign inverted + unit mismatch** (shillings vs kronen) |

**10/10** events have the committed cash effect in the opposite direction from the authored debit; 2 of the 10 (`000457`, `000829`) are genuine inflows and are correct in direction. The ledger state is usually debited correctly — the event fact is not.

### 4.2 Positive cash with no payer/source

`applyCash` accepts any non-empty `reason` as an external source and emits `external_cash_inflow`. There were **704** such warnings. The reason is prose, not a ledger account:

- `evt:...000829` borrows 4 Kr from a neighbour: cash +4, debt unchanged, no obligation or relation to the lender is created.
- `evt:...000457` pawns a watch chain for 2.4 Kr: cash +2.4, but no asset is removed and no redemption obligation is recorded.
- `evt:...004479` pays an 18 Kr deposit and three months' prepaid rent: only 18 Kr is recorded, in the wrong direction, and there is no prepaid-rent asset.

The engine has **0 `unfunded_cash` warnings** because every positive effect has a reason. That proves the reason field is populated; it does not prove a payer exists.

**Recommendation:** return the authored negative amount from `applyCash` (`amount`, not `-amount`), keep the shortfall note, and add a debt/obligation effect for borrowed inflows. Do not use the trace text as the only source of a positive inflow.

---

## 5. Relation effects — 10 samples

Global relation audit:

| Check | Result |
|---|---:|
| Committed relation effects | 9,993 |
| `relation_end` effects | 74 |
| Relation effects whose a/b is missing | **0** |
| Relation effects targeting a person already dead before the event | **0** |
| Relation effects targeting a person who dies in the same event/month | **41** |
| Committed relation effects whose a/b is an organization | **0** |
| `relation_end` effects with no matching closed relation at the event date | **0 / 74** |
| Partner relations | 175 |
| Partner interval strict overlaps | **10** |
| Partner interval same-month boundaries | 11 |
| `employer` relations | 21 |
| Employer relations whose target has no `owner`/`employer` role | **19 / 21** |

### 5.1 Ten sampled effects

| Event | Date | Effect | a / b at event time | Org? | Verdict |
|---|---|---|---|---|---|
| `evt:...000172` | 1914.07 | `relation partner` Luise Kral ↔ Berta Weiss | both alive | no | valid partner creation |
| `evt:...001212` | 1923.05 | `relation partner` Marie Huber ↔ materialized-17 | both alive | no | valid at creation; interval 1923.05–1925.11 |
| `evt:...001594` | 1925.01 | `relation partner` Mitzi Lechner ↔ Marie Huber | both alive | no | **calendar overlap** with Marie/materialized-17 until 1925.11 |
| `evt:...001231` | 1923.12 | `relation partner` materialized-23 ↔ Mitzi Lechner | both alive | no | **calendar overlap** with Mitzi/Marie from 1925.01 to 1925.09 |
| `evt:...001534` | 1925.11 | `relation_end partner` Marie ↔ materialized-17 | both alive | no | closes the active relation at 1925.11; **pass** |
| `evt:...001548` | 1925.09 | `relation_end partner` materialized-23 ↔ Mitzi | both alive | no | closes the active relation at 1925.09; **pass** |
| `evt:...000190` | 1914.07 | `relation kin` Mitzi Lechner ↔ probe-focal-02 | both alive | no | valid kin relation |
| `evt:...000236` | 1915.09 | `r3-teen.scholarship-interview/withdrawn` relation to Grete Stein | Grete dies in 1915.09 | no | alive when the effect applies; **same-month death**, not a post-death relation |
| `evt:...000496` | 1917.01 | employer relation to `org-wien-magistrat` | b is an organization | **yes** | invalid relation dropped; event still commits reputation/flag |
| `evt:...000865` | 1920.01 | employer relation Franz Lechner → Anna Bauer | both alive; b is an apprentice, not a participant | no | **person-as-employer**: “东家” is recorded as Anna Bauer |

### 5.2 Partner uniqueness is enforced in commit order, not calendar time

`applyRelation` refuses a new `partner` relation when either person already has an active partner. That guard is working in commit order. The committed calendar still contains **10 strict overlaps** because event dates are assigned months inside a year and events are committed out of date order:

- Marie Huber: `person-materialized-17` partner 1923.05–1925.11; Mitzi Lechner partner 1925.01–1925.11 → **10-month overlap**.
- Mitzi Lechner: `person-materialized-23` partner 1923.12–1925.09; Marie Huber partner 1925.01–1925.11 → **8-month overlap**.
- The relation-end events (`001534`, `001548`) are committed before the later-dated creation events (`001594`), so the guard sees the old relation as already ended; the final record still overlaps.

This is a hard journal-consistency failure, not a prose issue. A player reading the personal log sees a person enter a new partnership while the previous partnership's end is still months in the future.

### 5.3 Employer relations and organization representatives

`applyRelation` converts a legacy organization employer to a person representative:

```ts
const representative = holderId ?? memberId;
```

If the organization has no position holder, it picks the first living member who is not the subject. That member is not necessarily an employer. In this run, 19 of 21 `employer` relations target a person without `owner`/`employer` in their role list. Examples:

- `evt:...000865`: text “东家说少一个下午就是少一天生意”; effect `b: person-anna-bauer`, an apprentice.
- `evt:...000729`: “Wiener Psychoanalytische Vereinigung把工时表推回来”; effect `b: person-sigmund-freud`.
- `evt:...007406`: “Leopoldstädter Volksschule的手指在数字上敲了两下”; effect `b: person-marie-huber`.

The representative is not in the event participants (the organization was the role; `buildParticipants` only adds people), so the relation is invisible to the cast but still changes both people's relation state. **Fix:** only use an actual position holder/owner; otherwise do not create a person relation, or record an organization membership/employment fact.

---

## 6. Follow-up and scheduled events — 10 samples

### 6.1 Ten committed follow-ups

`cause` is present in every sampled event; `trace.causes` exactly matches `causes` in all 303 cause-bearing events (0 missing cause ids, 0 trace mismatches).

| Event | Date | Action | Cause | Matched roles / reused |
|---|---|---|---|---|
| `evt:...000641` | 1919.01 | `r14-edu.sibling-exam.../sibling-failed` | `evt:...000085` | 2 / 2 |
| `evt:...000897` | 1921.01 | `r14-edu.sibling-exam.../sibling-left-for-work` | `evt:...000297` | 2 / 2 |
| `evt:...001509` | 1925.01 | `r14-edu.sibling-favour.../sibling-fell-ill` | `evt:...000641` | 2 / **1** (sibling recast) |
| `evt:...001893` | 1927.01 | `r14-edu.sibling-favour.../sibling-paid-the-fees` | `evt:...000897` | 2 / 2 |
| `evt:...001894` | 1927.01 | `r14-edu.sibling-exam.../sibling-left-for-work` | `evt:...001006` | 2 / 2 |
| `evt:...004723` | 1938.01 | `r14-soc.secret-revealed.../preempted-at-dinner` | `evt:...002552` | 2 / 2 |
| `evt:...005039` | 1938.08 | `r14-soc.neighbor-rescue.../carried-through-smoke` | `evt:...003924` | 2 / 2 |
| `evt:...005353` | 1939.08 | `r14-soc.favor-obligation.../not-a-contract` | `evt:...005039` | 2 / 2 |
| `evt:...008531` | 1948.01 | `r14-edu.first-recital.../successful-recital` | `evt:...005008` | 4 / 3; **duplicate subject** |
| `evt:...008532` | 1948.05 | `r14-soc.public-humiliation.../lost-the-clerkship` | `evt:...008027` | 3 / 2; **duplicate subject + sharedHistory violation** |

There are **16 Phase 14 follow-up events** with causes. Five of the 16 have at least one role recast or duplicated. The two clearest failures are:

- `evt:...008531`: subject `person:evt:...002344:child`; participants contain a second `subject` `person:evt:...002572:child`; text names Alois Moser; effects (`cash`, `reputation`, `flag`, `role performer`) apply to `002344`.
- `evt:...008532`: subject `person:evt:...001092:child`; participants contain a second `subject` `person-probe-focal-05`; text calls the subject **Hedwig** and dismisses her; effects (`mood`, `reputation`, `flag`, `unemployment`) apply to `001092`.

Global duplicate-subject count: **36** committed events with more than one `participants[].role === 'subject'`.

### 6.2 Drops and expiry

| Check | Result |
|---|---:|
| Phase 14 follow-up events with `causes` | 16 |
| Cause id missing | 0 |
| Legacy exact follow-ups (`followupSceneIds`) | 61 |
| `scheduled_event_expired` | **47** |
| `scheduled_missing_role` blocks | 25 (17 teacher, 5 cousin, 3 sibling) |
| Pending queue at horizon | 41 |
| Pending queue items overdue by >5 years | **0** |

Expired targets by scene:

| Target scene | Expiries |
|---|---:|
| `vienna-life-injury-recovery` | 21 |
| `r14-edu.night-class` | **10** |
| `r14-edu.first-recital` | 3 |
| `r14-hist.prison-cell` | 2 |
| `r14-edu.reputation-repair` | 2 |
| others (10 scenes) | 1 each |

The mechanism is `processScheduledEvents`:

```ts
const date = item.due;
...
if (monthIndex(target) - monthIndex(item.due) <= 60) remaining.push(item);
else warnContext(context, 'scheduled_event_expired', ...);
```

An item that is due but ineligible is retried at the **same old date** every year. It never matures: a subject who fails an age/place/role gate at the due date is evaluated against that same date until the five-year window expires. The queue then drops the target after 60 months. The frozen date is the common failure path behind the 47 expiries; `r14-edu.night-class` (10) and `vienna-life-injury-recovery` (21) are the largest groups. `r14-edu.night-class` requires age 16–32 plus a teacher/place/history gate; if its due date lands before those gates can be met, the frozen date ensures it never matures.

**Recommendation:** evaluate at `date = max(item.due, target)` (or advance `item.due` on failure), and include `causeEventId`, `source` and the last block reason in the expiry warning. A dropped target should be visible as a failed causal link, not only a scene id.

---

## 7. Phase 14 mechanics verification

Content is now present: `KERNEL_LIBRARY` has **1,576** kernels; **193** kernels carry history conditions (194 conditions), **129** carry a `sharedHistoryTag` role, and **214** outcomes schedule follow-ups. The 40-year run committed **116** `r14-*` events.

| Mechanic | Result | Evidence |
|---|---|---|
| `event.tags` populated | **Partial** | 116/116 `r14-*` events have tags; **0** authored scene/task events have empty tags. But **8** player focal birth events have `tags: undefined`, and **740** system/project/interaction events have `tags: []` (677 system, 34 project, 29 interaction). |
| history condition matches only committed facts | **Partial/fail** | 24 events, 35 refs; **0** refs point to uncommitted/missing events. But **3** refs point to a committed event dated *later* than the consequence. |
| `historyRefs` recorded | **Pass where used** | 24 events carry refs; 35 refs all exist in `world.events`. Real examples: `evt:...000641` refs `000085`/`000297`; `evt:...004723` refs `002552`. |
| `sharedHistoryTag` never materializes a stranger | **Partial/fail** | 431 compiled defs have a shared-history role; only **4** events cast one. **1** casts a person who did not share the tag with the event subject. No new materialized person was observed in these four; the failure is a non-linked existing person. |
| goal history records a reason | **Pass** | 101 persons have agency; **206/206** history entries have a non-empty reason; 41 have `eventId`; 0 consecutive duplicate-goal entries. |
| task focus persists | **Pass** | 98 persons have `agency.focus`; **11** have `attempts > 1`; e.g. Anna Bauer `work` since 1924 attempts 3, Maria Moser `daily` since 1937 attempts 4. |
| follow-up kernel resolution | **Partial/fail** | 16 Phase 14 follow-ups carry cause ids; 5/16 have a role recast/duplicate; 47 scheduled targets expired; 25 scheduled role blocks. |

### 7.1 History refs that point forward

The real failures:

| Consequence | Date | Ref | Ref date | Ref action |
|---|---|---|---|---|
| `evt:...001641` `r14-work.claim-unemployment.../benefit-denied` | 1925.01 | `evt:...001525` | 1925.10 | `major-crisis.border-papers/papers-refused` |
| `evt:...003786` `r14-work.claim-unemployment.../benefit-denied` | 1934.01 | `evt:...003566` | 1934.02 | `p9-gap-adult-unemployed.soup-kitchen/soup-got-scoop` |
| `evt:...005983` `r14-work.claim-unemployment.../benefit-denied` | 1941.01 | `evt:...005709` | 1941.02 | `p9-gap-adult-unemployed.pawnshop/pawn-refused-halfprice` |

The consequence is dated before the fact it cites. This is the same annual-date ordering defect that produces the partner overlaps: the engine commits an event dated later in the year first, then commits an event dated earlier in the same year.

Synthetic control: seed event `evt:world:test:000001` at 1913.11 and echo `evt:world:test:000002` at 1913.01; the echo's `historyRefs` contains the seed. Three such pairs were found in 80 synthetic seeds.

### 7.2 `withRole` is checked against the subject's own role

`historyEntriesMatching` filters:

```ts
if (condition.withRole && entry.role !== condition.withRole) return false;
```

For a subject's own event, `entry.role` is `'subject'`. Therefore a condition like the authoring guide's example:

```ts
{ kind: 'history', tag: 'war_service', withRole: 'comrade', minCount: 1 }
```

**never matches the subject's war-service event that had a comrade participant.** Synthetic reproduction:

- Event `evt:war` subject Anna, participant Josef role `comrade`, tag `war_service`.
- Echo scene with `history tag: 'war_service', withRole: 'comrade'` did **not** fire.
- The same scene without `withRole` fired and recorded `historyRefs: ['evt:war']`.

This is latent in the current content (0 real `withRole` conditions), but it is a direct contradiction of the Phase 14 authoring contract. **Fix:** check the historical event's participants for the role, not the subject's entry role; or add `participantRole` semantics to the entry.

### 7.3 `sharedHistoryTag` is bypassed on follow-ups

Real event `evt:...008532`:

- Subject: `person:evt:...001092:child`
- Role `neighbor` has `sharedHistoryTag: 'rumor'`.
- The subject's earlier rumor event `evt:...004319` has a classmate `person:evt:...000584:child`.
- The cast neighbor is `person:evt:...001563:child`, who shared the rumor tag with the **cause** subject (`person-probe-focal-05`, event `evt:...008027`), not with the event subject.
- The event also has a duplicate `subject` participant `person-probe-focal-05`; the prose names Hedwig (focal-05), while effects apply to `001092`.

Cause: `castSceneRoles` first restricts candidates to the shared-history set, then `preferredRoles` from the cause event prepends the cause participant even if that person is not in the linked set. The synthetic reproduction (source mate Josef; earlier tagged event with Maria; echo role `sharedHistoryTag: 'other_tag'`) cast **Josef**, not linked Maria.

**Fix:** when `requirement.sharedHistoryTag` is set, intersect the preferred id with the linked set, or skip the preferred id entirely unless it is linked.

### 7.4 Goal and task focus

These two new agency mechanics work in the real run:

- Goal changes are recorded only when the goal actually changes; all 206 entries have a reason. Example `Josef Bauer`: family (1913, event `000006`) → care (1917) → family (1928, event `002346`).
- Focus survives the yearly agency rewrite: `Maria Moser` has `domain: daily`, `since: 1937`, `attempts: 4`; `Anna Bauer` has `domain: work`, `since: 1924`, `attempts: 3`.
- No duplicate consecutive goals were found.

One caveat: `eventId` is present only for 41/206 goal changes; need-based changes (sick kin, dependent, low health) have a reason but no event id, which is acceptable but should be understood by any UI that claims “this event caused the goal.”

---

## 8. Top 5 hard bugs by player-visible impact

All “real run” reproductions below use the seed and options in §2.1 (`vienna-1912-vertical-slice`, 40 years, 8 focal, max 4 ordinary events, `ALL_TASKS`, `DEFAULT_COMPOSITION`). Synthetic reproductions are marked.

### H1. Follow-up resolution writes the cause's subject as a second `subject`

**Impact:** 36 committed events; prose names one person, effects/ledger/trace bind another. This is the most direct wrong-person bug in the run.

**Minimal reproduction (real run):**

```
seed: vienna-1912-vertical-slice
years: 40
focalCount: 8
maxOrdinaryEventsPerPerson: 4
tasks: ALL_TASKS
composition: DEFAULT_COMPOSITION
action: vienna-life-injury-recovery/clinic-treatment
event: evt:world-vienna-1912:000119 (1914.01)
subject: person-josef-bauer
participants: [josef-bauer role subject, alois-lechner role subject, emil-weiss role doctor]
text: “Alois Lechner在受伤后的第三天去了诊所……”
effects: health/condition on josef-bauer; cash 8 on hh-bauer
```

Phase 14 version: `evt:...008531` and `evt:...008532`.

**Exact files/functions:**

- `packages/v4/engine.ts` → `processScheduledEvents`, `preferredRoles.set('subject', cause.subjectId)` (line ~3145).
- `packages/v4/engine.ts` → `castSceneRoles`, the preferred-role block that overrides `roles.subject` (line ~2380).
- `packages/v4/engine.ts` → `buildParticipants` (line ~2661) adds the chosen subject and then adds a second person with role `subject` because it only deduplicates by `personId + role`, not by role alone.

**Fix:** never put `subject` into `preferredRoles`; skip the preferred override when `requirement.kind === 'subject'`; and make `buildParticipants` enforce one `subject` role equal to `subject.id`.

### H2. Every authored cash debit is committed as a positive cash effect

**Impact:** 3,448/3,448 negative cash effects. Every “paid”, “stolen”, “fee”, “deposit”, “repayment” event prints as income in the trace/fact while the household is debited.

**Minimal reproduction (real run):**

```
action: vienna-family-childbirth/daughter-born
event: evt:world-vienna-1912:000366 (1916.01)
text: “接生的人收六克朗”
authored cash: -6
committed cash: +6
household cash: 595.70 -> 589.70
```

Also `evt:...000461` dentist: authored −3, committed +3, debt 25.50→28.50.

**Exact file/function:** `packages/v4/engine.ts` → `applyCash` (line ~5465), return at line ~5491: `amount: -amount`.

**Fix:** return the authored negative `amount` (the full cost, including the debt-funded part) and keep the debt note. Add a regression test that asserts a −6 effect remains −6 after commit.

### H3. Scheduled follow-ups retry at their original due date and then expire

**Impact:** 47 targets expired; 10 Phase 14 `r14-edu.night-class` consequences never happen; 21 `vienna-life-injury-recovery` targets disappear. Scheduled role blocks add 25 more dropped attempts.

**Minimal reproduction (synthetic):**

```
source scene event: 1913.05
followup target: test:echo, delayMonths: 12 -> due 1914.05
target requirement: age 14
subject age at due: 13
next years: subject ages, but item is still evaluated at 1914.05
after 60 months: scheduled_event_expired
```

Real analogue: `r14-edu.leaving-school` schedules `r14-edu.night-class` with a 36/48-month delay; 10 `r14-edu.night-class` expiries appear at ages/districts where the target can never satisfy its age/place/role conditions at the frozen due date.

**Exact file/function:** `packages/v4/engine.ts` → `processScheduledEvents` (line ~3109), `const date = item.due` and the 60-month expiry at lines ~3193–3200.

**Fix:** use `date = max(item.due, target)` or reschedule `item.due` on failure; log the cause and last failure reason on expiry.

### H4. Employer relations point at arbitrary organization members

**Impact:** 21 committed `employer` relations; 19 target a person without an `owner`/`employer` role. Example: Franz Lechner's “东家” is recorded as Anna Bauer, an apprentice, who is not even a participant in the event. The relation changes both people's relation state but is invisible in the cast.

**Minimal reproduction (real run):**

```
action: p9-work-jobsearch.negotiate-hours/negotiate-hours.longer-break-only
event: evt:world-vienna-1912:000865 (1920.01)
subject: person-franz-lechner
effect: relation a=franz-lechner b=person-anna-bauer kind=employer
text: “东家说少一个下午就是少一天生意”
```

Other examples: `evt:...000729` (Sigmund Freud as employer), `evt:...007406` (Marie Huber as employer).

**Exact file/function:** `packages/v4/engine.ts` → `applyRelation` (line ~6099), organization-representative fallback `const representative = holderId ?? memberId` (lines ~6113–6137).

**Fix:** resolve an organization employer only to a position holder (owner/manager); if none exists, do not create a person relation. Do not use an arbitrary member.

### H5. History conditions can cite later-dated committed events

**Impact:** 3 real consequences cite a fact dated after them; 3/35 refs are forward. This breaks replay causality even though every ref is a committed event.

**Minimal reproduction (real run):**

```
consequence: evt:world-vienna-1912:001641, 1925.01,
  r14-work.claim-unemployment::ctx-vienna-reform-1930::milieu-tenement/benefit-denied
ref: evt:world-vienna-1912:001525, 1925.10, major-crisis.border-papers/papers-refused
```

Also `evt:...003786` (1934.01) refs `003566` (1934.02), and `evt:...005983` (1941.01) refs `005709` (1941.02).

Synthetic control: seed 1913.11, echo 1913.01, echo.historyRefs includes seed.

**Exact file/function:** `packages/v4/engine.ts` → `historyEntriesMatching` (line ~393); the only lower bound is `monthIndex(entry.date) < earliest`, with no `monthIndex(entry.date) <= monthIndex(date)` upper bound.

**Fix:** add an upper date bound (and prefer strict `<` for “past”), and make annual event dates monotonic with commit order.

---

## 9. Other hard defects (not in the top 5)

| Defect | Evidence | Fix location |
|---|---|---|
| **Partner calendar overlaps** | 10 strict overlaps, 11 same-month boundaries. Marie Huber: 1923.05–1925.11 and 1925.01–1925.11. Mitzi Lechner: 1923.12–1925.09 and 1925.01–1925.11. | Event date assignment in `runEventYear`; `applyRelation`/`applyRelationEnd` use commit order, not calendar |
| **`sharedHistoryTag` bypass** | `evt:...008532` neighbor `001563` not linked to subject `001092`; linked to cause subject focal-05. | `castSceneRoles` preferred-role block, line ~2346–2390 |
| **`withRole` never matches subject events** | Synthetic: tag-only condition fires; `withRole: 'comrade'` does not. 0 real uses. | `historyEntriesMatching`, line ~426 |
| **Age-window scheduling** | 661 `missing_role:subject`; 70 proven outside scene `ageWindow`, e.g. 3-year-old offered `courtyard-race` (min 7). | `sceneEligiblePrepared` (line ~4247) / `indexedSceneFits` |
| **Focal birth events have no tags** | 8/8 `evt:...:birth:probe-focal-*` have `tags: undefined`; `createV4Birth` builds the EventFact directly. A history condition on `birth` cannot see a player-born child. | `packages/v4/birth.ts`, event object line ~174 |
| **`household_full` silently drops a move** | 36 warnings; event still commits. Text may say the character moved. E.g. `evt:...001264`, `vienna-elder-bereavement.empty-room/empty-room.lodger`. | `applyHousehold` / the move outcome |
| **Unresolved health effect** | `evt:...001763` drops a −0.04 health effect because `$worker` uncast. | `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet` role/effect contract |
| **Invalid employer relation to Magistrat** | `evt:...000496` relation dropped; reputation/flag commit. | `p9-work-career.reference` content |

### 9.1 Prose/visibility issues (separate from hard bugs)

- `evt:...004077` (1935.01, `p9-gap-elderhood-care.join-aid/aid-joined`): male **Hermann Kral** is called “她的名字” and “她把围巾”. Gender pronoun bug.
- `evt:...002974` (1931.01, same scene): male **Sigmund Freud** is called “她的名字” and “她把围巾”.
- `evt:...009411` (1951.03): text says **三十先令**, cash effect is 30 (kronen); unit mismatch.
- `evt:...005986` (1941.01): text says **四克朗** key money, cash effect is 10.
- `scheduled_event_expired` has `sceneId`/`personId` but **no causeEventId and no action**; the audit cannot tie the expiry to its source event from diagnostics alone.
- `household_full` warnings in this run have `committedAction` but the warning itself has no `action`; the audit has to join by eventId.
- 740 system/project/interaction events have empty `tags`. A history condition aimed at a system tag (`unemployment`, `birth`, etc.) will not match them unless the tag is effect-derived. This is a visibility/consistency gap for future content.

---

## 10. What is not proven

1. **This is one deterministic 40-year run.** The counts are exact for the seed and options above; they are not expected values.
2. **The old Phase 13 warning counts are not reproduced.** The working tree changed during the audit: Phase 14 `batch14-*` kernels were added and two generated packs were repaired. The 304/33/20,472 figures belong to the older artifact, not this snapshot.
3. **`withRole` has zero real uses** in the current content. Its failure is proven by a synthetic scene, not by a live Vienna event.
4. **`sharedHistoryTag` has only 4 real role participations.** The one violation is exact, but I cannot estimate its frequency in the full content library.
5. **The 47 expiry events cannot all be attributed to one source.** The warning lacks `causeEventId`; the fixed-date mechanism is proven synthetically and by repeated ineligibility in the queue, but not by a per-event trace for all 47.
6. **Cash ledger reconciliation is from the instrumented copy.** The official artifact does not expose per-event household cash/debt, so the audit cannot be reproduced from `docs/v4/playtest.json` alone.
7. **Partner overlap root cause is inferred from event ids and dates.** The relation guard is correct in commit order; the calendar overlap follows from out-of-order annual dates. I did not add a step-through debugger to prove each of the 10 overlaps individually.
8. **No 88-year run and no LLM/worker run** were performed in this audit. The focus is the 40-year named Vienna slice and the Phase 14 mechanics.

---

## 11. Summary table

| Area | Status |
|---|---|
| Current warning volume | 1 unresolved ref, 1 invalid relation, 47 expiry, 36 household-full, 2,606 blocked |
| Follow-up subject integrity | **broken** (36 duplicate-subject events; wrong-person prose/effects) |
| Cash direction | **broken** (3,448/3,448 authored debits committed positive) |
| Cash ledger | debits usually applied correctly; inflows often lack liability; 602 debt increments |
| Relation living targets | 0 dead-before-event; 41 same-month deaths (effect applies before death) |
| Partner uniqueness | **broken in calendar time** (10 strict overlaps) |
| Relation end | 74/74 close a matching active relation |
| Employer relation | **broken** (19/21 targets without owner/employer role) |
| Follow-up cause ids | 0 missing |
| Follow-up target retention | 47 expired after >5 years; 0 stale pending at horizon |
| Event tags | 116/116 Phase 14; 8 focal births undefined; 740 system/project/interaction empty |
| History refs | 24 events/35 refs; 0 missing; **3 forward-dated** |
| History `withRole` | **broken synthetically**; 0 real uses |
| Shared-history casting | **1 violation**; no new materialization observed |
| Goal history | 206/206 reasons; 41 eventIds; no consecutive duplicate goals |
| Task focus | 98 persons; 11 attempts >1; persists across years |
