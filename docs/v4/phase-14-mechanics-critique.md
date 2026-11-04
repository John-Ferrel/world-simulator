# Phase 14 — Mechanics Critique (second pass)

**Date:** 2026-11-04
**Artifact audited:** `docs/v4/playtest.json`, generated `2026-11-04T15:26:41Z` (local 23:26), 88 years, seed `vienna-1912-vertical-slice`.
**Code audited:** current working tree, `packages/v4/engine.ts`; the artifact was produced with the engine as of 23:17 local. The working tree was modified again at 23:48 during this audit, so line numbers below are from the 23:48 snapshot and the artifact counts remain the authoritative 23:17 run.
**Constraint:** no repository code or content was edited. Probe scripts and instrumented copies live under `/tmp/opencode/`; the only repository file written is this report.

---

## 1. Bottom line

Five of the seven claimed fixes hold up: the cash sign, task follow-up resolution, duplicate-subject removal, the minor-move guard, and the shared-history cause-participant rule. Two do not fully hold:

- **Partner uniqueness is only a year-end snapshot repair.** Active overlaps are gone, but the committed calendar still has **23 strict partner-interval overlaps** and **27 intervals whose `end` is before their `start`**; 76 partner closes happen at January with no event, and 20 more end in a non-January month with no event and no death.
- **Employer organisations still resolve to arbitrary people.** Of **70** committed `employer` relations in the 88-year run, **62** target a person whose persisted roles contain no owner/employer/master/foreman/leader/director/manager, and **55** target someone who is not even in the event cast.

The residual warnings are small in count but not all cosmetic. The single `unresolved_effect_ref` is a dropped employment effect; the single `effect_on_dead_or_missing` is a health consequence lost to out-of-order annual dates; the two `already_dead` warnings are duplicate death attempts. The larger residues — **35** expired scheduled targets and **102** blocked household moves — are lost follow-up content.

The most serious issue found in this pass is not in the seven claims at all: **`commitEvent` applies effects before checking whether a critical effect succeeded, and does not roll them back on failure.** A failed scene can therefore leave cash, flags, relation ends and other state changes in the world with no committed event. This is reproduced synthetically and is consistent with the 102 blocked divorce/cohabitation moves and the 20 unexplained non-January partner ends.

The birth verdict is also not a story about blocked births. It is a partnership-composition story: **63.9% of partnered woman-years in the final run are female–female partnerships**, which produce one birth in this engine; mixed partnerships produce 248 births in 483 partnered woman-years. The 40-year family control is unchanged from Phase 13 (97 births, 158 partner formations, 284 persons, 163 alive), so there is no evidence that Phase 14 content or family mechanics caused a general fertility collapse. The 88-year decline is a different partnership trajectory, dominated by same-sex partnerships that currently have no birth path.

| Area | Verdict |
|---|---|
| Negative cash commits negative with debt note | **PASS** |
| Scheduled events resolve task definitions | **PASS** |
| Duplicate subject participants removed | **PASS** |
| Partner overlaps closed at year end | **PARTIAL / FAIL for calendar uniqueness** |
| Minors cannot be moved into an adult-free household | **PASS** (orphan edge remains) |
| Employer organisations resolve to a real representative | **FAIL** |
| Follow-up keeps cause participant for shared-history role | **PASS** (specific rule) |
| Event commit is atomic | **FAIL** (new hard bug) |
| Birth/population decline explained | **Partnership composition, not birth capacity** |

---

## 2. Method and exact reproduction

The artifact retains only warning **counts**, not messages, actions or event ids. Its `warnings` array is seven `{ code, count }` rows, and its `excerpts` are five 15-event slices. To inspect the warnings I ran the current engine on the same seed, content stack and focal setup as `scripts/v4-playtest.ts`.

### 2.1 Fresh 88-year probe

```
PROBE_YEARS=88 PROBE_OUT=/tmp/opencode/p14-current-88.json \
  ./node_modules/.bin/tsx /tmp/opencode/p14-current-88.ts

# result:
# wrote /tmp/opencode/p14-current-88.json: 30493 events, 13644 warnings, 300877ms
```

This probe matched the artifact exactly on the headline totals:

| Metric | Artifact | Probe |
|---|---:|---:|
| Committed events | 30,493 | 30,493 |
| Named persons | 656 | 656 |
| Alive at horizon | 225 | 225 |
| Deaths | 429 | 429 |
| Warnings | 13,644 | 13,644 |
| `scene_blocked` | 10,742 | 10,742 |
| `external_cash_inflow` | 2,761 | 2,761 |
| `household_full` | 102 | 102 |
| `scheduled_event_expired` | 35 | 35 |
| `already_dead` | 2 | 2 |
| `effect_on_dead_or_missing` | 1 | 1 |
| `unresolved_effect_ref` | 1 | 1 |

The probe records 266 birth-effect events plus the eight player-born focal births, i.e. the artifact's **274 births**. It records 383 partner relations, 19 still active at the horizon.

### 2.2 Instrumented 40-year copy

For warning source metadata that the official diagnostics do not expose, I copied the tree to `/tmp/opencode/p14c`, added only diagnostic fields (`action` on warnings with an event id, `lastReason`/`causeEventId` on expiry warnings, target household/capacity on `household_full`), and ran a 40-year probe. This copy is **not** the 88-year artifact run and is used only to recover qualitative source actions and last-failure reasons. It was taken from the working tree after the 23:48 edit, so its event counts are not comparable to the artifact.

Exact commands in `/tmp/opencode/p14c-40.log`, `/tmp/opencode/p14c-88-warn.log`.

### 2.3 Synthetic repair checks

`/tmp/opencode/p14-synthetic-repairs.ts` builds a minimal valid world to isolate three behaviours: a minor move into an empty household, two active partner bonds at year end, and a scheduled shared-history role with a linked vs unlinked cause participant. The rollback checks are `/tmp/opencode/p14-rollback-test.ts` and `/tmp/opencode/p14-rollback-cash.ts`.

Targeted tests in the tracked tree also pass:

```
pnpm exec vitest run tests/v4-continuity.test.ts tests/v4-phase14.test.ts tests/v4-timeline.test.ts
# 3 files, 16 tests passed
```

The tests cover the cash-sign/shortfall path, the employer fixture, the scheduled-task follow-up, and the timeline invariant. They do **not** cover partner calendar overlaps, minor-household repair, duplicate subject participants, or failed-commit rollback.

---

## 3. Fix verification

### 3.1 Negative cash effects commit negative and note debt — PASS

**Code:** `applyCash()` returns the authored negative `amount`, not `-amount`:

```ts
// packages/v4/engine.ts, applyCash()
if (amount < 0) {
  const debit = roundMoney(Math.min(household.cash, -amount));
  const shortfall = roundMoney(-amount - debit);
  if (debit > 0) household.cash = roundMoney(household.cash - debit);
  if (shortfall > 0) household.debt = roundMoney(household.debt + shortfall);
  return {
    ...effect,
    amount,
    reason: shortfall > 0 ? `${effect.reason}（其中${shortfall}克朗记入债务）` : effect.reason,
  };
}
```

**Artifact/probe evidence:** 10,423 committed negative cash effects, 3,890 positive, **zero sign inversion**. 3,828 of the negatives carry the `（其中N克朗记入债务）` note. Examples:

- `evt:world-vienna-1912:004489` (1937.01, `vienna-family-childbirth/daughter-born`): authored/midwife cost 6; committed `cash -6`, reason `midwife fee（其中6克朗记入债务）`; text says “接生的人收六克朗”.
- `evt:world-vienna-1912:004923` (1939.01, `r14-soc.favor-obligation/you-owe-me-a-life`): committed `cash -12`, reason `藤箱底下的麦粒（其中12克朗记入债务）`; text says the doctor wants twelve kronen and Maria pays.
- `evt:world-vienna-1912:000409` (1917.01, `r14-edu.first-post/lost-to-rival`): committed `cash -2`, debt note; text says “往返车费两克朗”.

The regression test `tests/v4-continuity.test.ts:585` also asserts `-5` stays `-5`, cash 40→35 and debt 0, then a poor household 0 cash / +5 debt. **Pass.**

Caveat: positive inflows are still accepted on a prose reason alone. 2,761 `external_cash_inflow` warnings remain; e.g. `evt:...000615` pays three hellers for laundry with no funding account. That is a separate ledger-counterparty limitation, not a sign bug.

### 3.2 Scheduled events resolve task definitions — PASS

**Code:** `advanceV4Year` passes `[...definitions, ...context.tasks]` to `processScheduledEvents`; the function builds `byId` over both and resolves a kernel target by `kernel:${item.sceneId}` when there is no exact id. The targeted test `resolves a due task follow-up even though it has no statistical rate` passes.

**Real-run evidence:** 16 committed task-kernel events carry explicit causes and occur months/years after their cause, e.g.:

| Event | Date | Task kernel | Cause |
|---|---|---|---|
| `evt:...000409` | 1917.01 | `r14-edu.first-post` | `evt:...000286`, 1915.01 |
| `evt:...001176` | 1923.01 | `r14-edu.seminar` | `evt:...000975`, 1921.06 |
| `evt:...010112` | 1954.01 | `r14-edu.boarding-letter` | `evt:...009602`, 1952.05 |

This proves the task path exists. It does **not** prove every scheduled target resolves; 35 still expire (section 4.3).

### 3.3 Duplicate subject participants removed — PASS

**Code:** the preferred-role override explicitly refuses to override `subject`:

```ts
const preferredId =
  requirement.kind === 'subject' ? undefined : preferredRoles?.get(requirement.key);
```

and `buildParticipants()` starts with the subject and skips any role whose id is the subject:

```ts
const participants: EventParticipant[] = [{ personId: subject.id, role: 'subject' }];
for (const [role, id] of Object.entries(roles)) {
  if (!world.persons[id] || id === subject.id) continue;
  ...
}
```

`commitEvent` additionally deduplicates participants by `personId`.

**Probe evidence:** **0 / 30,493** events have more than one `subject` participant; **0** events have duplicate participant ids. The old 36-event duplicate-subject group is gone. The historical `preferredRoles.set('subject', cause.subjectId)` line remains in `processScheduledEvents` but is dead because of the guard; it should be deleted to avoid future regressions.

### 3.4 Partner overlaps closed at year end — PARTIAL, FAIL for calendar uniqueness

`repairPartnerUniqueness()` runs at every year end and keeps the highest `trust + affection` partner, closing the rest at the kept relation's start (or at the year-end date if that start is in the future):

```ts
const closeAt = monthIndex(keep.start) <= monthIndex(date) ? { ...keep.start } : { ...date };
for (const relation of partners.slice(1)) relation.end = { ...closeAt };
```

**What passes:** the final 88-year state has **0 people with two active partner relations**. If the only claim is “no active overlap at the horizon”, this passes.

**What fails:** the journal still contains calendar overlaps because the repair only sees relations that are still active at year end. In the final relations I count **23 strict interval overlaps** and **27 relations with `end < start`**. Exact examples:

- **Josefine Hofer:** `Friedrich Hofer` 1896.04–1913.06 and `Otto Winter` 1913.01–1914.04 → five-month overlap.
- **Anna Bauer:** `materialized-27` 1926.01–1926.07 and `materialized-20` 1926.01–1927.01 → six-month overlap.
- **Marie Huber:** `materialized-30` 1923.05–1925.11 and `Mitzi Lechner` 1925.01–1925.11 → ten-month overlap.
- **Hermann Berg:** a 1942.09–1942.06 relation (end before start), plus a 1943.01–1945.01 relation.

The repair also changes relationship state **outside the event log**: 96 ended partner relations have no `relation_end` event at their end month and no death at that month. 76 end in January (consistent with the year-end repair), and 20 end in a non-January month with no event/death at all. A player can see a partnership disappear with no event explaining it. This is a causality failure, not just a calendar bookkeeping issue. See also section 5.1: a failed divorce move can leave the relation ended with no event.

### 3.5 Minors cannot be moved into an adult-free household — PASS

**Code:** `applyHousehold()` checks the destination before moving:

```ts
const minor = ageAt(person, binding.date) < 18;
const targetHasAdult = household.memberIds.some((id) => {
  const member = world.persons[id];
  return Boolean(member && !member.died && ageAt(member, binding.date) >= 18);
});
if (minor && !targetHasAdult) {
  warnContext(context, 'minor_without_guardian', 'minor household move skipped', ...);
  return undefined;
}
```

**Synthetic proof:** a 10-year-old subject with a `household` effect to an empty `household:empty` produced:

```json
{
  "eventCommitted": false,
  "warnings": [{ "code": "minor_without_guardian", "message": "minor household move skipped", "personId": "person:anna" }],
  "annaHousehold": "household:huber"
}
```

**Probe evidence:** 0 `minor_without_guardian` warnings and 0 adult-free minor households at the 88-year horizon.

**Caveat:** the repair is a best-effort repair, not a guarantee. In a different 40-year trajectory (the earlier 40-year probe), three adult-free minor households remained: one 9-year-old alone, and two minors whose living guardian was in a 16-person household at/over capacity, so `repairMinorHouseholds()` skipped the move. The rule “cannot be *moved into* an adult-free house” passes; “no minor is ever left without an adult” does not.

### 3.6 Employer-role organisations resolve to a real representative — FAIL

**Code:** `applyRelation()` now looks for a position holder, then a role member (`owner/employer/master/foreman/leader/director/manager`), then any employed member, then any living member:

```ts
const representative = holderId ?? roleMember?.id ?? employedMember?.id ?? livingMembers[0]?.id;
```

The ordering is better than the old `holderId ?? memberId`, but the last two fallbacks still produce arbitrary people. In the 88-year run:

| Check | Count |
|---|---:|
| Committed `employer` relation effects | 70 |
| Target has a persisted owner/employer/master/foreman/leader/director/manager role | **8 / 70** |
| Target has no such role | **62 / 70** |
| Target is not in the event's participant list | **55 / 70** |

Examples:

- `evt:...002044` (1927.01, `p9-work-jobsearch.negotiate-hours/longer-break-only`): text says “东家说少一个下午就是少一天生意”; the `employer` relation targets **Victor Adler**, a party chairman, who is not in the cast.
- `evt:...003451` (1933.01, `p9-work-career.security-or-independence/halves`): text names the Free Trade Union; the relation targets **Alois Lechner**, a printer, not a union representative in the event.
- `evt:...004050` (1935.01, `p9-work-jobsearch.request-raise/leaked-wages`): text is about a factory director; the relation targets **Sigmund Freud**, who is not in the cast.

The continuity test `repairs an employer-role organization by using its representative person` passes, but its fixture organisation has only one member, so the fallback is the only possible person. That test does not prove a real representative was selected.

The one improvement is that an organisation is no longer stored as a relation endpoint: `invalid_relation` is 0 in the 88-year run. But replacing “organisation” with “arbitrary member” is not the claimed fix. **Fail.**

### 3.7 Follow-up keeps cause participant when a shared-history role is required — PASS

**Code:** the shared-history linked set is built first, and the cause-preferred id is only prepended if it is in that set:

```ts
const preferredId =
  requirement.kind === 'subject' ? undefined : preferredRoles?.get(requirement.key);
if (
  preferredId &&
  preferredId !== subject.id &&
  (!linkedHistory || linkedHistory.has(preferredId))
) { ... }
```

**Synthetic proof:** with two linked candidates (`mate`, `stranger`) and a cause participant `mate`, the follow-up cast `mate`; with a cause participant `outsider` who is not linked, the follow-up cast a linked person, not `outsider`:

```json
"sharedHistoryLinkedCause":   { "castMate": "person:mate",    "causeMate": "person:mate",    "committed": true },
"sharedHistoryUnlinkedCause": { "castMate": "person:mate",    "causeMate": "person:outsider","committed": true }
```

**Real-run evidence:** 82 shared-history role casts; 70 of them are on events with explicit causes. All 70 cause-event casts are in the subject's tag-linked set (tag-level check, not formal proof). This specific follow-up rule passes.

**Broader caveat:** across all 82 shared-history casts, 3 are not tag-linked. One is a true stranger: `evt:...018743` (1974.01, `r14-fam.sunday-rota/child-sets-the-terms`) casts `person:evt:...004132:child` as `formerPartner`, but the two have no partner relation. Two others (`013287`, `024791`) are actual former partners but are not linked through a `separation`-tagged shared event. The tag check is a proxy, not proof of relationship identity.

---

## 4. Residual warnings in the final run

The artifact does not retain warning messages. The counts were reproduced exactly by the fresh 88-year probe. The **official** warning rows still lack `action` and `causeEventId`; the source metadata below comes from the instrumented copy and must be read as mechanism evidence, not as a per-row artifact join.

### 4.1 `unresolved_effect_ref` — 1

**Exact message:**

```
effect employment has unresolved workplaceId:
{"type":"employment","personId":"person:evt:world-vienna-1912:013194:child",
 "organizationId":"person-materialized-world-vienna-1912-183",
 "occupation":"细木学徒","wage":0,"workplaceId":"$workplace",
 "reason":"头一年只管饭，无工钱"}
```

**Event:** `evt:world-vienna-1912:022749`, 1983.01, `p10-edu-work-tasks.seek-apprenticeship/p10-edu-work-tasks.seek-apprenticeship.accepted`, subject `person:evt:...013194:child` (Gustav 2).

The authored employment effect has two problems: `organizationId` is a **person** (`Berta Berg 2`, the master), and `workplaceId` is the unresolved `$workplace` role token. The effect is dropped before `applyEmployment` can resolve the master's workplace. The event still commits because the `education` effect (critical) applied; the committed effects are education, skill and an `employer` relation. The final person has `education.status = apprenticeship` but **no `employment` record**. The prose says the workshop accepted him and the relation says the master took him on; the job fact is missing.

This is a content/engine contract failure, not a cosmetic warning. The effect should either provide a concrete workplace/organisation or fail the event before education/relation commit.

### 4.2 `effect_on_dead_or_missing` — 1

**Exact message:** `health effect skipped`.

**Event:** `evt:world-vienna-1912:022664`, 1983.08, `vienna-legacy-worklife.sick-fund/sick-fund.keep-quiet`, subject `person:evt:...014460:child` (Franz Bauer), worker `person:evt:...014441:child` (Mitzi Kral).

Mitzi Kral dies in `evt:world-vienna-1912:022663` (1983.12, `major-crisis.press-accident/press-kills`). The press accident is committed **before** event 022664 in journal order, although 022664 is dated 1983.08. When 022664 is committed, the worker is already marked dead, so the health effect is skipped. The final event participants exclude her, but the event's trace still lists her as `worker` and the text names a “工友”. The mood/relation effects remain; the health consequence does not.

This is the out-of-order annual-date problem showing up as a lost effect. It is not a post-death *dated* event — the event date is before the death — but it is a post-death *commit-order* event. The timeline test only checks event date, so it passes.

### 4.3 `scheduled_event_expired` — 35

**Exact message:** `scheduled follow-up expired`.

The official warning has `personId`, `sceneId` and `year`, but no `causeEventId`, action, due date or last failure reason. Groups in the final run:

| Target scene | Expiries |
|---|---:|
| `vienna-life-injury-recovery` | 15 |
| `r14-edu.sibling-favour` | 5 |
| `r14-soc.protege-surpasses` | 3 |
| `r14-edu.sibling-exam` | 2 |
| `vienna-1912-school-continuation` | 1 |
| `r14-edu.self-taught-examination` | 1 |
| `r14-edu.first-recital` | 1 |
| `r14-edu.thesis` | 1 |
| `r14-soc.public-humiliation` | 1 |
| `r14-work.wage-arrears` | 1 |
| `r14-edu.graduation` | 1 |
| `r14-edu.reputation-repair` | 1 |
| `r14-edu.archive-search` | 1 |
| `r14-edu.certificate-exposed` | 1 |

The old frozen-date bug is fixed: `processScheduledEvents` now evaluates a retry at the **current** target year when the original due date is in the past:

```ts
const date =
  item.firstDue && monthIndex(item.due) < monthIndex(target) ? { ...target } : item.due;
```

These 35 are genuine five-year ineligibility, not a target frozen at 1913 being evaluated forever. The instrumented 40-year copy records the last failure:

- `vienna-life-injury-recovery` and `vienna-1912-school-continuation`: `subject_ineligible`. `vienna-life-injury-recovery` requires `health.max = 0.9` and age 18–60; a person who heals above 0.9 can never satisfy the scene again, but the queue retries for 60 months. In the 40-year probe, the last reasons were `subject_ineligible` for this scene and for `r14-edu.retake-examination`, `r14-hist.prison-cell` and `r14-soc.public-humiliation`.
- `r14-edu.police-questioning`: `missing_role:comrade`.
- `r14-edu.first-recital`: `missing_role:teacher`.
- `r14-edu.thesis`: `missing_role:mentor`.

The 88-year warning set is consistent with those categories. A later instrumented 88-year snapshot (33,505 events; **not** the artifact run, because the tree changed after the artifact) produced 54 expiries: 46 `subject_ineligible`, 3 `missing_role:sibling`, 2 `missing_role:professor`, 1 `missing_role:mentor`, 1 `missing_role:subject,professor,classmate`, and 1 `no_matching_definition`. The same categories dominate the artifact's 35.

The expiry itself is an explicit drop after 60 months; it is not an unresolved template token. But the warning is an audit gap: it should carry `causeEventId`, action and the last block reason. A dropped causal link is currently indistinguishable from a scene that was never due.

At the horizon, 14 scheduled items remain, all due 2000–2006; they are not stale.

### 4.4 `household_full` — 102

**Exact message:** `household move skipped because the target is full`.

`applyHousehold()` refuses a move when the target has `livingHouseholdMemberCount >= householdCapacity`. For a partnered move it first tries `splitOverflowHousehold()`; otherwise it warns and returns `undefined`. In the instrumented 40-year run, the source actions were:

| Source action | Count |
|---|---:|
| `vienna-family-divorce/partner-moves-to-shared-housing` | 32 |
| `vienna-housing-move.sublet-room/sublet-full` | 4 |
| `r13-rel.affair-discovery/.../packed-and-left` | 2 |
| `r13-fam.foster-child/.../child-taken-in` | 1 |

All 39 target `household:shared-tenement`, all at **12 living / capacity 12**. The 88-year final run has 102 warnings; the same capped shared tenement is the dominant target. A later instrumented 88-year snapshot (33,505 events; not the artifact run) produced 112 `household_full` warnings: **94** are `vienna-family-divorce/partner-moves-to-shared-housing`, 11 are `vienna-housing-move.sublet-room/sublet-full`, and **108/112** target `household:shared-tenement` at 12/12. That is the same mechanism at larger scale.

The important interaction is with `vienna-family-divorce/partner-moves-to-shared-housing`, whose effect order is:

1. `relation_end` for the partner bond,
2. `household` move of the partner to `household:shared-tenement`,
3. cash, mood and role effects.

When step 2 fails because the shared tenement is full, step 1 has already been applied, step 3 never runs, and `commitEvent` returns `undefined` because no critical effect applied. The result is a **silent divorce**: the partner relation ends, no event is committed, and the household move does not happen. This is the most likely source of the 20 non-January partner ends that have neither a death nor a `relation_end` event. The synthetic rollback test proves the general mechanism (section 5.1).

The official warning does not carry the action, target household or capacity, and its `eventId` cannot be trusted: failed event attempts reuse the next sequence id. In the 88-year probe, all 102 `household_full` warnings join to committed events that have **no** household effect; the joined `committedAction` is therefore not the source. This is an auditability failure separate from the move loss.

### 4.5 `already_dead` — 2

**Exact messages:**

```
death effect ignored for person-materialized-world-vienna-1912-34
death effect ignored for person-materialized-world-vienna-1912-28
```

- `person-materialized-world-vienna-1912-34` (Maria Hofer) died 1947.10 in `evt:...007692` (`r1-child.grandfather-watch/...`, 1947.10). The warning's `eventId` is `evt:...007702`, which is a 1947.05 courtyard-race event with no death effect. That id was reused after the failed death attempt.
- `person-materialized-world-vienna-1912-28` (Maria Winter) died 1963.08 in `evt:...013995` (`r13-turn.parent-death/died-at-home`, 1963.08). The warning's id `evt:...014087` is a 1963.01 picture-outing event with no death effect.

These are duplicate death effects for already-dead people, not committed post-death events. The failed death scene does not produce a false death fact. But the warning's id is not the source, and any non-death effects in the failed scene can still leak (section 5.1). The exact source action is not recoverable from the artifact.

### 4.6 Why the warning ids are unreliable

`nextEventIdentity()` returns `historyMeta.sequence + 1`, but `historyMeta.sequence` is only advanced at the end of a successful `commitEvent` (`context.world.historyMeta.sequence = identity.sequence`). A failed event attempt writes effects, returns `undefined`, and does not advance the sequence; the next successful event reuses the same id. Consequences:

- A warning with `eventId = X` can refer to a failed attempt, while `world.events` contains a different event with id X.
- `committedAction` joins are not proof of source.
- The `already_dead` ids (007702/014087) and all 102 `household_full` ids join to committed events with no matching effect, exactly as this mechanism predicts.

This is not just an audit inconvenience. It means the journal cannot answer “which scene caused this warning?” from diagnostics alone. The instrumented copy had to add `action` at warning time.

---

## 5. Remaining hard bugs

These are separate from prose quality. They change state, causality or replay.

### 5.1 Failed events leak partial effects (transaction/atomicity failure)

**Severity: highest in this pass.**

`commitEvent()` applies every effect to `context.world` first, then checks whether a critical effect succeeded:

```ts
const applied: EventEffect[] = [];
for (const effect of draft.effects) {
  const result = applyEffect(context, effect, binding);
  if (result) applied.push(result);
}
const authoredCritical = draft.effects.filter((effect) => criticalTypes.has(effect.type));
if (authoredCritical.length > 0 && !applied.some((effect) => criticalTypes.has(effect.type))) {
  return undefined;
}
```

There is no rollback. A failed commit leaves every effect that ran before the failing critical effect in the world.

**Reproduction (synthetic):** a scene with a `household` move into an adult-free house (fails) followed by a `cash -5` and a flag:

```json
{
  "eventCommitted": false,
  "warnings": [{ "code": "minor_without_guardian", "message": "minor household move skipped" }],
  "annaHousehold": "household:huber",
  "householdCash": 35,
  "householdDebt": 0,
  "annaFlags": ["partial_effect_survived"]
}
```

The household did not move and no event exists, but the household lost 5 kronen and Anna gained a flag. This directly violates the “one transaction” rule and the “no fake success” rule.

**Real-run analogue:** the divorce move order above. `relation_end` runs before the failing `household`; 20 non-January partner ends have no event/death at that month. I did not tag each of the 20 to a specific failed attempt, but the content order, the 102 `household_full` warnings, and the synthetic proof make this the most plausible mechanism. It also means any `already_dead`, `unresolved_effect_ref`, or `effect_on_dead_or_missing` path can leave cash/mood/relation/flag changes without a fact.

**Fix direction:** apply effects to a cloned draft and merge only on success, or record an effect journal with undo on failure. Do not apply to the live world before the critical check.

### 5.2 Partner calendar uniqueness is still broken, and repair is unlogged

- 23 strict partner interval overlaps, including Josefine Hofer 1913.01–1913.06 and Marie Huber 1925.01–1925.11.
- 27 relations with `end < start`, caused by `closeAt = keep.start` when the kept relation started before the closed one.
- 96 ended partner relations have no `relation_end` event/death at the end month; 76 close in January (repair) and 20 in other months (likely partial effects).
- 19 active partner relations at the horizon; 0 active overlaps.

The repair is a state mutation outside the event log. Even if the active-overlap invariant is what the claim meant, the player-visible calendar and the journal still disagree.

### 5.3 Employer relations still name arbitrary people

62/70 targets lack an owner/employer role; 55/70 are not in the event cast. The code fallback `livingMembers[0]` is exactly the old arbitrary-member behaviour. The relation is a person-to-person fact, so a wrong target changes both people's relation state while the cast/story names an organisation. This is a hard semantic bug, not just a missing role label.

### 5.4 Post-death effect ordering / commit-order date inversion

Event `022664` is dated 1983.08 but committed after the 1983.12 death of its worker; the worker's health effect is skipped and the trace still names her. The timeline test checks event dates, not commit order, so this passes CI. The two `already_dead` warnings are the same class: a death effect attempted after the person is already dead.

### 5.5 Employment effect can be dropped while education/relation commit

Event `022749`: `$workplace` unresolved, employment effect dropped, education/skill/employer relation applied. The person is an apprentice in education and has an employer relation but no `employment` record. This is a hard effect-visibility gap; the prose says he was accepted.

### 5.6 History causality is still not clean

- **12 forward-dated `historyRefs` out of 221 refs** in the 88-year run. Example: `evt:...001645` (1925.01, `r14-work.claim-unemployment/benefit-denied`) refs `evt:...001522` dated 1925.10 (`major-crisis.border-papers/papers-refused`). The consequence predates the fact it cites.
- `historyEntriesMatching()` still has no upper date bound; it relies on committed order as “past”.
- `withRole` still compares the subject's own history entry role (`entry.role` is `'subject'`), so a condition such as `withRole: 'comrade'` never matches the subject's event that had a comrade participant. Code still at `engine.ts:426`; the prior synthetic reproduction stands.
- `sharedHistoryTag` has 3 non-linked casts outside the cause-follow-up case, including the 1974 `formerPartner` stranger.

These are not cosmetic; a replay can cite a fact that had not happened yet, and a role condition can silently never fire.

### 5.7 Birth/history visibility gaps

- The eight player focal birth events still have `tags: undefined`; a history condition on `birth` cannot see them without effect-derived tags.
- 1,993 system/project/interaction events have `tags: []` in the 88-year probe. A history condition aimed at an event tag will not match them unless the tag is derived from an effect.
- 42 stillbirth events are committed without a child; that is content, but it means “births” and “pregnancy outcomes” are different counts. Any population claim must say which one it means.

### 5.8 Scheduled follow-up retention is too long for one-shot scenes

35 targets expire after five years of ineligibility. `vienna-life-injury-recovery` is the clearest: its `health.max = 0.9` condition means a healed person can never satisfy it, but the queue retries for 60 months. The result is 15 warnings and 15 lost follow-up slots. The queue should drop a target when its condition becomes monotonic-false (health recovered, age window passed), or reschedule with a reason.

---

## 6. Fifteen-event re-sample

Ten events are from the artifact's five excerpts; five are composed/`r14` events from the same 88-year run. All fifteen have a single subject and no duplicate participant id. I checked the subject/protagonist, Chinese pronoun use, whether the prose consequence is visible in effects, money sign/amount, and the birth/family chain where relevant.

| # | Event (date) | Subject / identity | Money and effects | Family/birth chain | Verdict |
|---|---|---|---|---|---|
| 1 | `birth:playtest-focal-06` (1912.01) | Anton; child/mother/father participants | no effects | parents Josefine + Friedrich; child exists | **FLAG** — `tags` undefined; otherwise pass |
| 2 | `...000615` (1918.01) laundry | Anton; Grete/Gustav cast | `cash +0.03` matches three hellers; `health -0.03` matches cut | — | **PASS** (external inflow, no funding account) |
| 3 | `...000584` (1918.04) r14 oath | Anton; Franz cast | mood/flag/skill/friend relation visible | — | **PASS** |
| 4 | `...000841` (1920.07) courtyard fall | Anton; Anna Moser cast | prose has scraped knee/bandage; effects only relation | — | **FLAG** — injury not persisted |
| 5 | `...001126` (1922.05) washhouse fever | Anton; Josefine cast | prose has fever; effects only `condition peeling_lips` + kin relation | — | **FLAG** — illness not persisted |
| 6 | `...004489` (1937.01) daughter-born | Hedwig; Otto partner, midwife cast | `cash -6`, debt note, text six kronen | child Luise Kraus, parents Hedwig/Otto, date matches | **FLAG** — birth fact/tag says `death` on a live birth; cash/birth core pass |
| 7 | `...006593` (1944.10) hours-ledger | Hedwig; worker cast | `cash -1`, debt note; text does not name amount | — | **PASS** — sign correct |
| 8 | `...013136` (1961.09) strike-vote | Mitzi; steward/blackleg cast | `cash +2`, text says “多了一克朗”; reputation/flag | — | **FLAG** — amount mismatch 2 vs 1; two Mitzi names |
| 9 | `...014346` (1964.11) fatal accident | Mitzi; only subject cast | death + estate, `cash +30` matches thirty kronen | — | **PASS** — thin participant list (no employer/co-workers) |
| 10 | `...003242` (1933.01) injury recovery | Lena; only subject | health −0.03, cash −2, condition; cause 002700 | — | **PASS** |
| 11 | `...000409` (1917.01) r14 first-post | Franz Lechner; headmaster/rival/oldTeacher cast | cash −2 debt note, text two kronen fare; cause/historyRef 000286 | — | **PASS** |
| 12 | `...000630` (1919.01) r14 police-questioning | Anna Bauer; official/comrade cast | comrade Luise becomes `rival -0.1` while text is sympathetic | — | **FLAG** — relation/effect mismatch |
| 13 | `...001681` (1926.01) r14 graduation | Mitzi Lechner; classmate cast | text says classmates pooled the 3-kronen ticket; effect debits subject household −3 | — | **FLAG** — money attribution |
| 14 | `...004923` (1939.01) r14 favor-obligation | Maria Winter; Berta cast | cash −12 debt note, text twelve kronen; rival matches tension | — | **PASS** |
| 15 | `...008183` (1949.01) r14 sibling-exam | Emil Bauer; Mitzi sibling cast | cash −2, text says Mitzi paid; pooled household | — | **PASS** — attribution is family-pooled, not personal |

**Sample totals:** subject identity 15/15; single subject/participant dedupe 15/15; pronoun errors 0/15 in this sample (the global pronoun issue is not proven by this sample); cash sign 10/10; amount/attribution flags 3 (strike-vote 2 vs 1; graduation ticket payer; sibling-exam family pool); birth/family chains 2/2 pass. Seven of fifteen carry at least one flag, mostly prose/effect visibility rather than simulation state corruption.

Global birth-chain check: all **266** simulation birth effects have an existing child, existing living parents at the event date, matching `parentIds`, and a child birth month equal to the event month. The eight player births are separate and also have the expected parents. There is no broken birth chain in the final run.

---

## 7. Birth and population verdict

### 7.1 The numbers

| Metric | Phase 13 (88y) | Phase 14 (88y) | Delta |
|---|---:|---:|---:|
| Births | 375 | 274 | **−101** |
| Deaths | 449 | 429 | −20 |
| Named persons | 757 | 656 | −101 |
| Alive at 2000 | 306 | 225 | **−81** |

In the Phase 14 run: 25 initial persons + 275 birth-provenance persons + 352 materialized + 4 historical = 656. The artifact's birth count is **274** (266 run birth facts + 8 player births); the extra birth-provenance person is seed person Elisabeth Bauer. Named births (274) are below deaths (429) by 155. The named cast is not replacing itself; materialization still supplies over half the cast (352/656).

### 7.2 What is not the cause

- **Blocked births:** `birth_household_full = 0`. The 102 `household_full` warnings are moves, not births.
- **Stillbirths alone:** 42 stillbirth events occurred; even if every one had been a live birth, the gap to Phase 13 would not close. There is no Phase 13 raw stillbirth count for comparison, so this is a bound, not a full decomposition.
- **A general family-mechanics regression:** the 40-year controlled family experiment (`phase13-family` seed, current engine and content) reproduces the archived Phase 13 result **exactly**: 97 births, 158 partner formations, 284 persons, 163 alive, partnered-woman share 0.4437, 0.1104 births per woman-year, 0.2487 births per partnered woman-year. The 40-year control is unchanged.

### 7.3 The arithmetic driver: partnership composition

In the 88-year run:

| Group | Woman-years 16–49 | Births | Births / woman-year |
|---|---:|---:|---:|
| Partnered with a man | 483 | 248 | 0.513 |
| Partnered with a woman | 855 | 1 | 0.001 |
| No active partner | 5,292 | 17 | 0.003 |
| Total | 6,630 | 266 | 0.040 |

63.9% of all partnered woman-years are female–female partnerships, and those partnerships produce essentially no births under the current childbirth rule. Mixed partnerships produce almost all births. The 1970s make the pattern visible: 32 mixed partnered woman-years vs 139 same-sex partnered woman-years, and only 12 births.

Content counts explain where the same-sex bonds come from: `vienna-family-same-sex-female` contributes 85 female–female partner effects and `vienna-family-same-sex-male` contributes 64 male–male effects; general courtship scenes also produce same-sex bonds. These are real relationships, not a casting error, but the birth system has no path for them.

The 20.2% partnered-woman share over 88 years is also far below the 40-year family control's 44.4%, so both **partnership formation composition** and **lower duration/exposure of mixed partnerships** matter. The per-partnered-woman-year fertility in the 88-year run (0.199) is in the same range as the family control (0.249), but the composition is very different.

### 7.4 Content competition

Composed actions rose from 6,227 (Phase 13) to 6,752 (Phase 14) while total events fell from 31,830 to 30,493, so composed content takes a larger share. But the controlled 40-year family run is byte-for-byte identical on the family metrics, so there is no evidence that Phase 14 composed content crowded out births under that seed. I cannot rule out trajectory effects in the 88-year focal run; the partnership-composition decomposition is the stronger explanation.

### 7.5 Verdict

**The decline is primarily a partnership-composition and mixed-partnership-exposure effect, not more blocked/aborted births and not a demonstrated content-competition effect.** Same-sex partnerships are a legitimate part of the world, but the current birth mechanic only reads a male partner, so a large share of partnered woman-years cannot produce a birth. If the product wants a stable named population, it needs a deliberate adoption/fostering or donor path, or a partnership-formation balance that leaves more mixed couples; simply adding more birth scenes will not fix the arithmetic.

---

## 8. Prose and visibility limitations (not hard simulation bugs)

These are real player-facing issues but should not be conflated with state corruption:

- **Injury/illness prose without body effects:** `evt:...000841` describes a scraped knee and bandaging but only creates a relation; `evt:...001126` describes fever and cracked fingers but only adds `peeling_lips` and a kin relation.
- **Money amount/attribution:** `evt:...013136` gains 2 kronen while the text says one; `evt:...001681` says classmates pooled the 3-kronen ticket but debits the subject's household; `evt:...008183` says Mitzi paid a 2-kronen fee from a pooled household.
- **Relation tone mismatch:** `evt:...000630` has Luise Kral as a sympathetic comrade but commits a `rival` relation with negative trust.
- **Tag semantics:** `evt:...004489` is a live daughter birth but carries the `death` tag; live-birth and stillbirth alternatives share a scene.
- **Pronouns:** the 15-event sample has none, but the broader run still contains sentences such as `evt:...000009` where Anna Bauer's wrist is referred to as `他的手腕`; this is a prose-generation issue, not proof of a global rate.
- **Cash counterparties:** 2,761 `external_cash_inflow` warnings still accept a prose reason as the source. `evt:...000615` is a neighbour paying three hellers; there is no lender/funding account, but the household is credited.
- **Thin casts:** `evt:...014346` describes co-workers and an employer but has only the dying subject in the participant list; the 30-kronen employer benefit is still credited.
- **Warning visibility:** the official warnings do not carry the scene/action/last reason for the residual errors, so an operator cannot tie most of them to a source without rerunning with instrumentation.

---

## 9. What is not proven / limits

1. **One deterministic 88-year run.** Counts are exact for this seed and content, not population estimates. The fresh probe matched the artifact exactly, but the working tree changed after the artifact; a rerun on the 23:48 engine may differ.
2. **The 40-year instrumented copy is not the 88-year artifact run.** It is used for source actions and last-failure reasons, not for exact 88-year counts. Its focal wishes/trajectory differ and its engine snapshot is later.
3. **The 96 unlogged partner ends are a mix.** 76 January ends are consistent with the year-end repair; 20 non-January ends are consistent with partial effects from failed commits, but I did not tag every one to a specific failed event.
4. **The 102 `household_full` rows cannot be attributed from the artifact.** The warning lacks action/target, and failed attempts reuse ids. The instrumented 40-year source distribution (and the later instrumented 88-year snapshot, 94/112 divorce moves) is mechanism evidence, not a per-row artifact join for the 102.
5. **Birth attribution is arithmetic + a controlled 40-year family run, not a counterfactual Phase 13 88-year rerun.** I did not rebuild the Phase 13 tree and rerun 88 years with the old content, so “same-sex composition caused the 101-birth difference” is a strong decomposition, not a formal counterfactual proof.
6. **Shared-history and pronoun checks are tag/keyword checks on a sample.** They are not formal proofs of global prose quality. The 15-event sample is a hand review, not a statistical sample.
7. **No LLM/worker run.** This audit is the deterministic named slice; it says nothing about model output quality or worker fallback.

---

## 10. Candid bottom line

The Phase 14 mechanics are materially better than the first audit: cash signs are fixed, task follow-ups resolve real task definitions, the wrong-person duplicate-subject bug is gone, minor moves are guarded, and a follow-up no longer overrides a shared-history role with an unlinked cause participant. Those are real fixes, not just suppressed warnings.

But the run is not mechanically clean. The partner repair fixes the snapshot while leaving 23 calendar overlaps, 27 impossible intervals and dozens of unlogged closures. The employer fix still writes arbitrary people into employer relations. The residual warnings are small in number but include a dropped employment effect, a lost health consequence from out-of-order annual dates, 35 expired causal links and 102 dropped moves. Most importantly, a failed `commitEvent` can leave cash, flags and relation ends in the world without any event — the opposite of the “one transaction” invariant. That is the first thing I would fix; the partner and employer repairs are second and third.

The birth decline is not a mystery of “too much content” or “blocked births”. It is mostly arithmetic: 63.9% of partnered woman-years are female–female partnerships with one birth, while mixed partnerships produce nearly all 248 births. The 40-year family control is unchanged, so this is a trajectory/composition problem, not a family-mechanics regression. The named cast is below replacement (274 births vs 429 deaths, 225 alive), and materialization is doing most of the population work. Any claim that the world is demographically healthy would be false.
