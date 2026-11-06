# Phase 15 — Mechanics Architecture Review

**Date:** 2026-11-05  
**Reviewer:** independent Mechanics Architect (adversarial review, not implementation)  
**Inputs read:** `AGENTS.md`, `docs/v4/phase-15-design.md`, `docs/v4/phase-14-report.md`, `docs/v4/phase-14-mechanics-critique.md`, `packages/v4/domain.ts`, `packages/v4/engine.ts`, `packages/v4/composition/types.ts`, `packages/v4/birth-contract.ts`, plus the current Phase 15 scaffolding (`packages/v4/state/*`, `packages/v4/wish-compiler.ts`, `infra/migrations/008_v4_states.sql`).  
**Constraint:** no simulations were run and no repository file was edited except this review. The working tree was mid-implementation during the review; code references below are evidence for design invariants, not a claim that the feature is finished.

---

## 0. Verdict

The direction is correct: a persisted mechanism layer over ordinary `SceneDefinition` / `TaskDefinition` / `EventFact` is cheaper and safer than a second entity engine. But the design is **not safe to freeze as written**. Three problems are load-bearing:

1. **Authority is still duplicated.** The proposed hooks (`onEnter`, `onExit`, ticks, wish compiler) can write `Person.education`, `Person.employment`, roles and positions outside the event’s recorded effect list. A university state can disagree with `Person.education`; a wish state can be written by a second code path; a state can be attached to an owner type its definition never allowed.
2. **The replay claim is false for the proposed shapes.** `state_add` does not carry the created instance id, `state_parameter` does not carry the old value, `state_remove` can remove several stacked instances with one effect, nested enter/exit effects are not in `EventFact.effects`, and expiry/exit transitions can happen without an identifying fact. A replay from `EventFact.effects` cannot reconstruct the state table.
3. **The hot path is O(all states) per person per scene.** `activeStates()` and `stateContextForPerson()` iterate `Object.values(world.states)`, and `v4EventRate()` calls state weighting for every eligible definition. At 20k persons this is not a micro-optimization problem; it is a different complexity class.

There are also concrete delivery blockers: the current `v4_states` writer does not populate its own `NOT NULL` columns, and the current `applyStateTransition()` ends the source state before proving the target state can be created.

I would freeze the **direction** now, but not the schema or the lifecycle contract.

### Evidence from the current scaffold (snapshot)

These are not hypothetical:

- `applyStateAdd()` returns `{...effect}` without `instanceId`, normalized parameters, `expiresAt` or `definitionVersion`.
- `applyNestedStateEntryEffects()` applies `education`, `role`, `flag`, etc. but does not append them to `EventFact.effects`; a failed nested effect does not fail the state creation.
- `applyStateTransition()` calls `endStateInstance(from)` before `createStateInstance(target)`. If the target is missing, the owner is wrong, or the target enter conditions fail, the source state is already ended.
- `applyDeath()` closes positions but does not end the dead person’s states.
- `stateExpired()` and `definition.exitWhen` are checked only in the annual `tickStates()` pass, not in `hasState` / `stateContextForPerson`; an expired or exit-satisfied state remains effective for the rest of the year.
- `stateContextForPerson()` only includes person, household, **employer** organization, current location and current location region. It ignores other memberships/positions, school, workplace, residence place and world-owned states.
- `stateAnchorPerson()` returns no anchor for `place`, `region` or `world`, so those states never tick or expire.
- `writeEntities()` inserts `v4_states(world_id, id, payload)` only, while migration `008_v4_states.sql` declares `owner_type`, `owner_id`, `definition_id` as `NOT NULL`; saving any world with a state fails. The generic `ON CONFLICT` also updates only `payload`, leaving the indexed `active` / owner columns stale.
- `wish-compiler.ts` writes `world.states[stateId]` and `world.events.push(event)` directly, bypassing `createStateInstance()` and the state slot/owner checks.
- `university-student` has `onEnter: [education: higher]`; `cursed-by-wish` targets `$betrayer`; `stage-king` writes flags through `onEnter`. None of these nested effects are recorded in the event.
- No content at the snapshot uses the new `position` effect. The `wish-power` state only grants mood/reputation/flags, not a Position.

---

## 1. Flaws and minimal fixes

Severity labels: **MUST** = fix before content factory / acceptance; **DEFER** = can follow, but must be explicitly accepted as a limitation.

### A. Atomicity and commit order

**A1 [MUST] A failed critical effect can still commit sibling critical effects.**  
`commitEvent()` applies critical effects first and aborts only when *no* critical effect applied. If a draft has two critical effects and one succeeds while the other fails, the event commits with the partial critical result. State effects increase the number of multi-critical drafts (`state_add` + `position`, `education` + `state_add`, `state_transition` + `position`, `birth` + `state_add`).  
**Minimal fix:** split each critical apply into `planEffect()` (pure validation/allocation) and `applyEffect()` (mutation guaranteed to succeed), then apply only planned critical effects. If splitting all effects is too large for this phase, add an undo journal for the specific critical types used by states (`state_*`, `position`, `organization_found`, `birth`, `death`, `education`, `employment`) and require **all** criticals to succeed; do not keep “at least one succeeded”. Add the synthetic test: `state_add(curse)` followed by a failing `death(already-dead)` must leave no state, no cash, no flag and no event.

**A2 [MUST] `state_transition` ends the source before the target is validated.**  
`applyStateTransition()` ends `from`, then calls `createStateInstance()`. Target missing, target owner mismatch, target enter conditions, or target slot conflict all fail after the source is gone. This is a silent state loss even when the event commits through another critical effect.  
**Minimal fix:** validate the target first (definition exists, `definition.owner === ownerType`, owner exists, enter conditions pass, slot can be occupied/replaced, parameters normalize, duration resolves), then end the source, then create the target. If any target validation fails, return `undefined` without touching `from`. On success, fill `toInstanceId` and `closedPositionIds` in the committed effect.

**A3 [MUST] `state_remove` and `state_parameter` have no exact instance selector.**  
A `state_remove` with `stateId` ends **all** active instances of that definition on the owner, including stacked instances with different parameters. A yearly expiry event for one curse can therefore remove every curse of that definition; the next expiry event finds nothing. `state_parameter` updates the first matching instance.  
**Minimal fix:** add `instanceId?: Id` to `state_remove`, `state_parameter` and `state_transition`; make `state_remove` require `instanceId` when more than one instance matches, and require `all: true` for multi-remove. On apply, record `instanceIds: Id[]` in the committed effect. Tick/expiry code must pass the specific `instance.id`.

**A4 [MUST] Nested `onEnter` / `onExit` effects are applied but not committed as effects.**  
`applyNestedStateEntryEffects()` applies `education`, `employment`, `role`, `position`, `death`, `birth`, `cash`, etc. directly. They are absent from `EventFact.effects`, absent from the critical-success check, and absent from replay. A nested critical failure still leaves the state created. This is the clearest “second authority” path in the current design.  
**Minimal fix (preferred):** remove `onEnter` / `onExit` from Phase 15 state definitions. Put all consequences in the scene/tick/reaction outcome effect list, beside `state_add` / `state_remove`, so the event records and validates them.  
**Minimal fix (if hooks must stay):** `state_add` must return `entryEffects?: EventEffect[]` and `state_remove` must return `exitEffects?: EventEffect[]`, containing the actually applied nested effects, and `commitEvent()` must (a) include them in `EventFact.effects`, (b) include them in the critical-success test, and (c) roll them back if the state effect fails. The current “apply and warn” is not acceptable.

**A5 [MUST] Tick bookkeeping is not atomic with the tick fact.**  
`stateTickFact()` commits the event first, then sets `lastTickAt` / increments `tickCount`. If the event fails, the tick is retried next year (good), but if a critical tick effect partially applies, the event commits with partial effects and the tick advances (bad). If the tick event is committed but the process crashes before the in-memory update is saved, the next run repeats the tick.  
**Minimal fix:** make the whole tick (effects + `lastTickAt` + `tickCount`) one committed transaction, or derive `lastTickAt` from the tick fact and do not treat `tickCount` as authoritative. If tick effects cannot be made atomic, restrict tick outcomes to texture effects and block the tick when a critical effect fails.

**A6 [MUST] A birth in a tick/reaction does not create a birth fact.**  
Child-birth fact emission currently lives in `resolveScene()`, not in generic `commitEvent()`. A `birth` effect authored in a state tick, reaction, project or macro event creates a `Person` and household changes but no child `birth` `EventFact`. The result is an invisible person with no personal log start and no birth cause chain.  
**Minimal fix:** move the post-commit birth handling into a shared `commitBirthFacts(context, event)` called by every `commitEvent()` path, or forbid `birth` in state ticks/reactions until that exists. Add a test that a tick-created child has a `birth` event with `causes: [tickEvent.id]`.

**A7 [MUST] `state_add` does not return the instance id or final values.**  
The committed effect has only the authored `stateId`, owner, requested parameters and reason. The created `StateInstance.id`, normalized parameters, actual duration and `expiresAt` are known only inside `createStateInstance()`. This makes the “every creation is recorded in `EventFact.effects`” claim false and makes stacked instances indistinguishable on replay.  
**Minimal fix:** fill `instanceId`, `definitionVersion`, `parameters` (normalized final), `durationMonths` (actual), `expiresAt`, and `replacedStateIds` on the returned `state_add` effect. Same principle for `state_parameter` (`previousValue`, final `value`) and `state_transition` (`instanceId`, `toInstanceId`).

### B. Double authority and lifecycle

**B1 [MUST] The university state duplicates `Person.education`.**  
`university-student` has `onEnter: education(status='higher', level=5)` and occupies `slot: 'education'`; `university-graduate` also occupies `education` for 120 months. If the state is created while `education` is `secondary`, the state and education disagree until the hidden `onEnter` effect runs. If another scene changes `education` to `none`, the state stays active and `hasState('university-student')` still reports a student. The state is being used as the education status, not as a mechanism around it.  
**Minimal fix:** `Person.education` remains the only answer to “is this person a student / what level”. The state stores only `progress`, `failures`, `scholarship`, `institutionId` and obligations. The entering scene outcome must contain both the `education` effect and `state_add`; no `onEnter` education write. `exitWhen` must include `{kind:'education', in:['none','secondary']}` and be evaluated at read time (B2). Do not use `slot:'education'` for a permanent “graduate” marker; use an `alumni`/`credential` slot or a flag, and never write education from it. Add a content test that no `education` state definition contains `education`/`status`/`level` in `parameters` or `onEnter`.

**B2 [MUST] Expired or exit-satisfied states remain effective until the next annual tick.**  
`hasState`, `stateContextForPerson`, `stateSceneWeightMultiplier` and `checkModifier` all use `instance.active` only. `stateExpired()` and `exitWhen` are only consulted in `tickStates()`, which runs after the year’s scenes. A state that expired in January still influences the whole year’s scenes, including tests that claim “expiry changes eligibility”.  
**Minimal fix:** add `stateEffective(instance, definition, world, date)` = `active && !expired && !exitWhenSatisfied`; use it in every read path. The annual tick still commits the `state_remove` fact, but the state stops influencing behavior immediately when its declared end is true. This is also the read-time guard that prevents a stale university/curse state from granting eligibility.

**B3 [MUST] `Person`-owned states survive death; organization states survive dissolution.**  
`applyDeath()` closes positions, employment and partner relations but leaves `world.states` untouched. A dead person can retain `cursed-by-wish`, `university-student` or a power state. `assertWorldV4()` does not require dead people to have no active states. An organization with `status:'dissolved'` can retain active states.  
**Minimal fix:** in `applyDeath()`, end all `ownerType:'person' && ownerId === person.id` states, close positions linked to those states, and record `endedStateIds` / `closedPositionIds` on the death effect. In the organization dissolution path, do the same for organization states, or explicitly mark them inert. Add the invariant to `assertWorldV4()`: no active person state for a dead person; no active state whose owner does not exist.

**B4 [MUST] `wish-compiler.ts` is a second state writer.**  
`applyWishState()` writes `world.states[stateId]`, pushes an `EventFact` directly, and reads the hard-coded `WISH_STATES` array. It bypasses `createStateInstance()` (owner checks, enter conditions, slot conflict, normalized parameters, `stateSequence`, `onEnter`), `commitEvent()` (critical checks, reaction scheduling, history indexing) and the content registry (versioning). A second wish, a changed state definition, or a slot conflict can produce an invalid world.  
**Minimal fix:** make wish compilation produce a normal `state_add` effect and submit it through the same `commitEvent()` path (or a shared `addStateToWorld()` used by both). Pass the active state library as an explicit input instead of importing `WISH_STATES`. Do not write `world.events` or `world.states` directly from `birth.ts`.

**B5 [MUST] A state can be attached to an owner type its definition never declared.**  
`createStateInstance()` checks that the owner exists, but not that `definition.owner === ownerType`. A person-defined university or curse state can be added to an organization, place or world, and `stateAnchorFor()` will then anchor it to an arbitrary leader/resident. This makes owner semantics meaningless and allows content bugs to become world facts.  
**Minimal fix:** require exact equality in `createStateInstance()` and in the `validateStateDefinition` / generated-pack validator for every `state_add`, `state_remove`, `state_parameter` and `state_transition` effect. If a mechanic truly needs multiple owner types, define separate state ids; do not add an `'any'` owner.

**B6 [MUST] State parameters are an unbounded attribute bag.**  
`StateParameterSpec` accepts any key and any number/string/boolean. Content can store `educationStatus`, `wage`, `alive`, `positionTitle`, etc., recreating the duplicate authority the design forbids. Validation only checks the type and numeric bounds.  
**Minimal fix:** add a reserved-key lint (`status`, `level`, `wage`, `employed`, `education`, `employment`, `alive`, `death`, `position`, `holder`, `owner`) and a definition-level `mechanismOnly: true` requirement for core slots. At minimum, reject parameter keys that mirror fields on `Person`, `Employment`, `Education` or `Position`, and document that parameters are mechanism inputs, not a second entity schema.

**B7 [MUST for power wish] `Position` is not yet real authority, and reassignment rewrites tenure.**  
`applyPosition()` creates a `Position` with free-string `authority`, and if a position with the same title already exists it simply replaces `holderId` and resets `start`, erasing the previous holder’s tenure. `Position.authority` is only read by `SceneCondition.position`; nothing enforces that a holder can actually do the named acts, and `organization.authorityRules` remains free text. No content at the snapshot uses `position`, so “a power wish creates a real Position” is unproven.  
**Minimal fix:** define a bounded `AuthorityKey` vocabulary (`command`, `appoint`, `budget`, `veto`, `enforce`, `legislate`, `tax`, `arrest`, `represent`) and use it in `Position.authority` and `SceneCondition.position`. On reassignment, close the old tenure (`end`, `holderId=undefined`) and create a new position id (or append to `Position.history`); never reset `start` in place. Add `Position.sourceStateInstanceId` and close linked positions when the granting state ends. A scene must require `position { authority: ... }` to exercise real power; a `stage-king` state must never satisfy that condition.

**B8 [MUST or remove] `check_bonus` state modifiers are not actually applied to checks.**  
`stateModifiersForPerson()` returns them, but `checkModifier()` only reads `check.stateBonus` from the scene/tick `CheckDefinition`. A state’s `check_bonus` modifier therefore does nothing unless content duplicates the same tag and bonus into every check. `university-student` declares a `check_bonus` for `education/knowledge/research`, but its own term check has no `stateBonus`, so the modifier is dead.  
**Minimal fix:** either merge matching `check_bonus` modifiers into `checkModifier()` automatically (bounded and deduped by tag/state id), or remove `check_bonus` from `StateModifier` and require explicit `check.stateBonus`. Do not keep a field that reads as a mechanic but has no runtime path. Add a test that a state with `check_bonus` changes a check result without editing the scene check.

### C. Determinism and replay

**C1 [MUST] Committed state effects do not identify instances.**  
As in A7, the effect list lacks `instanceId`/`toInstanceId`/`instanceIds`. This is the single biggest replay hole: two stacked curses, two scholarship states, or a remove of one of several states cannot be reconstructed from the log.  
**Minimal fix:** the exact `EventEffect` additions in section 2. Treat `instanceId` as required in committed facts even if optional in authored content.

**C2 [MUST] Parameter changes do not record old values or final normalized values.**  
`state_parameter` records only the authored `value`/`delta`; `applyStateParameter()` clamps and defaults silently. A replay that applies the effect cannot reproduce the stored parameter if the definition changed, if a default was used, or if the value was out of bounds.  
**Minimal fix:** fill `previousValue` and final `value` in the committed effect; also fill the final parameter map in `state_add` and `toInstanceId` parameters in `state_transition`. Replay applies recorded final values, not authored requests.

**C3 [MUST] Definition versions are stored on the instance but ignored at runtime.**  
`StateInstance.version` is written, but `stateDefinitionsFor(context)` indexes only by `definition.id`. A published state definition update changes the behavior of every existing instance mid-life, and replay under the new library no longer matches the old run.  
**Minimal fix:** index definitions as `Map<`${id}@${version}`, StateDefinition>`; resolve each instance by its recorded version. If that version is absent, mark the instance `orphaned`, make it ineffective, and warn; do not silently substitute the latest definition. Persist `definitionHash` in `state_add` and on the instance for audit.

**C4 [MUST] Missing definitions are handled inconsistently.**  
`hasState` with an exact `stateId` can match an instance whose definition is not loaded (it does not need the definition), while tag matching, modifiers, ticks and checks silently ignore it. A world loaded without the state library thus behaves differently from the same world with it, with no single failure signal.  
**Minimal fix:** state instances must resolve their definition on load. If missing, mark `orphaned`, exclude from all eligibility/weight/tick paths, and surface a diagnostic. `hasState` must not match an orphaned instance by id. Add a load test with one missing definition.

**C5 [MUST] Expiry/exit/transition facts do not identify the instance.**  
`stateTickFact()` uses `provenance.sourceId = definition.id`, and its `state_remove` effect has only `stateId`. With stacked instances, the fact does not say which instance expired. There is also no fact at all if a non-person state has no anchor (E1).  
**Minimal fix:** add `EventFact.stateRef?: { phase, instanceId, definitionId, definitionVersion, tickId?, reactionId?, triggerEventId? }` and fill it for every state lifecycle fact. Alternatively set `provenance.sourceId = instance.id`, but an explicit field is easier to audit. Expiry/exit/transition must be committed as a fact with the exact instance id; anchorless states may be frozen, but they must not silently change state.

**C6 [MUST] `loadV4World()` sorts events by date, not commit order.**  
State ticks/reactions are committed in a specific order, and death-date anchoring can make a later commit carry an earlier date. Loading events by `date_year, date_month` destroys commit order. Replay and cause resolution must use commit order.  
**Minimal fix:** add `EventFact.sequence?: number` (or derive the numeric suffix from the id) and load events by sequence, with a date fallback for legacy rows. Add a test where a 1983.12 death is committed before a 1983.08 state tick and replay still sees the death first.

**C7 [MUST] A failed scene check can fall through to a weighted success outcome.**  
In `selectOutcome()`, if the check band’s designated outcome ids are not eligible, the function warns `check_outcome_missing` and then continues to `outcomePolicy` / `weightedPick`. A failed check can therefore commit a success outcome, or a success check can commit a failure outcome.  
**Minimal fix:** if `definition.check` exists and no eligible outcome matches the selected band (with the documented critical-to-normal fallback), return `undefined` / block the scene. Do not continue to the weighted pick. Add tests for missing success/failure/critical ids.

**C8 [DEFER] `hasState` counts before applying the parameter filter.**  
`matchingStates.length < minCount` is checked before `parameter`/`min`/`max` filtering, so `minCount: 2` can be satisfied by two instances where only one has the requested parameter.  
**Minimal fix:** filter by parameter first, then apply `minCount`. Low risk, but the condition grammar should be unambiguous.

**C9 [MUST] Small RNG/order holes.**  
`stateDuration()` uses the same seed for stacked adds in one event, so two stacks get identical durations. `tickStates()` sorts by instance id (good), but transition checks use `date.year` only, and `everyMonths < 12` still runs at most once per annual pass. Reaction candidate ordering is sorted (good), but the action prefix exclusions mean the declared depth cap is not the effective policy (D3).  
**Minimal fix:** include the state sequence/stack ordinal in the duration seed; include `date.month` and `tick.id` in every tick seed; document that the annual runtime supports `everyMonths >= 12` or implement bounded catch-up ticks. Do not claim a depth limit that is not reached.

**C10 [MUST] State tick/reaction checks are not stored in a structured trace.**  
Scene checks can attach `IncidentTrace.check`, but `stateTickFact()` and the reaction commit path do not build a `trace`; they only interpolate the d20 result into `immediateText`. A reader cannot audit the attribute/skill/state/history breakdown for a tuition, curse, transition or reaction check, and replay cannot distinguish a passed check from a scripted outcome without parsing Chinese prose.  
**Minimal fix:** add `check?: CheckTrace` to `EventFact.stateRef` (die, modifier, total, dc, band, bounded breakdown) or build `IncidentTrace.check` for state facts. Store the selected tick/reaction id too. Add a test that a tick fact exposes the check breakdown and the tick outcome id.

### D. Reactions and recursion

**D1 [MUST] Reaction scope is not a declared property.**  
`runStateReactions()` uses `stateInstanceInvolved()`: person owner must be in the trigger cast, household by member, organization by member/position holder, place by `locationId`, region by participant, **world always true**. A world-owned curse therefore reacts to every event in the world. A place-owned school state does not react to a student whose `locationId` is home. The design says “active states whose reaction matches” without defining the audience.  
**Minimal fix:** add `StateReaction.scope?: 'owner_in_event' | 'owner_member_in_event' | 'owner_region' | 'world'` (default `owner_in_event`) and apply it before `reactionTriggered()`. For world states, require explicit `scope:'world'`; never make world scope the silent default.

**D2 [MUST] Trigger roles are overwritten by owner roles; the curse can silently miss its target.**  
`runStateReactions()` builds `roles = { subject: owner, owner: owner }` and then adds trigger participant roles only if the key is absent. If the betrayer is the trigger event’s subject (role `subject`), `$betrayer` is undefined. The `cursed-by-wish` reaction then applies a `health` effect with an unresolved target; `health` is an optional texture effect, so the reaction commits only mood/parameter changes and the curse never damages the betrayer. The text can also keep a literal `{betrayer}` token.  
**Minimal fix:** separate the two namespaces: `binding.state = { ownerType, ownerId, instanceId, parameters }`, `binding.triggerSubjectId`, `binding.triggerRoleIds`. Resolve `$owner`/`$subject` against the state owner, and `$triggerSubject` / `$triggerRole:<key>` against the trigger. Add `StateReaction.requiresRoles?: string[]`; if a required trigger role was not present, do not fire. Add a test where the betrayer is the trigger subject and where the betrayer is a separate participant.

**D3 [MUST decide] State tick/reaction facts are excluded from reactions, contradicting “after any committed fact”.**  
`commitEvent()` skips reactions for actions starting with `state_reaction:`, `state_tick:` and `state_expire`. This is a safe anti-loop policy, but the design claims reactions run after any committed fact and that recursion is depth-limited. The effective policy is “one reaction layer, then stop”, not a depth-2 chain.  
**Minimal fix (choose one and test it):** (a) keep state lifecycle facts terminal and update the design/acceptance to say so; or (b) allow one extra layer with `stateReactionDepth < 2`, a `causes` self-check, and a per-year budget. Do not leave the design text claiming a depth limit the code never reaches.

**D4 [MUST] No global reaction budget or self-trigger guard.**  
`maxPerYear` is per instance/reaction. A public betrayal event can trigger every cursed state in the world (especially with world/region scope), each committing a fact. There is no yearly cap, no “same state + same trigger” dedupe beyond the per-instance cooldown, and reaction events include the trigger’s tags plus the state’s own tags.  
**Minimal fix:** add a yearly reaction budget (e.g. 64 facts/year), a per-definition yearly cap, a `(stateInstanceId, triggerEventId, reactionId)` dedupe, and never let a reaction event carry its own state id as a trigger tag. Sort candidates by instance id before rolling. If the budget is exhausted, record a diagnostic, not a fact.

**D5 [MUST] State parameters cannot be referenced by effects.**  
`resolveRefKey()` knows only `$subject`, `$household`, `$workplace`, role ids, etc. `cursed-by-wish` stores `triggers` but cannot target a persisted `betrayerId` parameter; a long-term curse, debt, or office-holder reference cannot be expressed.  
**Minimal fix:** extend `EffectBinding` with the state context and add refs `$owner`, `$state:<key>`, `$triggerSubject`, `$triggerRole:<key>`; allow parameter values and `state_parameter.value` strings to use these refs. Bound the ref grammar and resolve only at apply time.

### E. Non-person owners and tick ordering

**E1 [MUST] Place/region/world states have no anchor and therefore never tick or expire.**  
`stateAnchorPerson()` returns `undefined` for `place`, `region` and `world`. `tickStates()` does `if (!subject) continue;`, so an `under_occupation` region state or a world famine state never evaluates `exitWhen`, never transitions and never expires. The design says “a state with no living anchor still changes conditions/weights but does not fabricate an event subject”; the current implementation silently freezes the lifecycle, and because read paths do not check expiry, the state remains effective forever.  
**Minimal fix:** define a deterministic anchor policy: organization = position holder sorted by position id, then member sorted by id; household = adult sorted by id; place = resident/worker/student at the place, sorted by id; region = adult in region, sorted by id; world = oldest/lowest-id adult. If none exists, freeze **and mark the state ineffective at `expiresAt` / `exitWhen`** and warn `state_unanchored`; do not silently keep it effective. If the product refuses “chronicler” subjects, add a `state_history` table for anchorless lifecycle changes and do not claim every removal is an `EventFact`.

**E2 [MUST] Anchor selection is not deterministic across date and save.**  
`stateAnchorPerson()` uses `world.date` rather than the date being evaluated, and uses array-order `positions[0]` / `members[0]`. A tick at 1912-12-31 can choose an anchor by the draft’s current date, not the fact date; a save/load with reordered arrays can choose a different leader.  
**Minimal fix:** pass `date` explicitly to `stateAnchorPerson(world, ownerType, ownerId, date)`; sort position ids and member ids; define a leader priority (holder of the highest-authority position, then lowest position id). Add a determinism test that runs the same year twice with shuffled organization arrays and gets the same tick fact subject.

**E3 [MUST] Tick order creates a one-year lag and ambiguous causality.**  
`tickStates(context, target)` runs after the year’s scenes and before historical processes. A state that expires in January still affects every scene in that year; a tuition tick that should make next year’s study harder does not affect the scenes that just ran. The design says “after the year’s scenes, before historical processes” but does not say how this interacts with statistical deaths, `reapVitalityZero`, repairs, or the start-of-year scene pass.  
**Minimal fix:** run state lifecycle at the **start** of `advanceV4Year` (after the macro/statistical state is expired, before the year-start scenes), or split: `expire/exitWhen` at year start, `ticks/transitions` at year end with an explicit one-year lag documented and tested. In either case, place the pass after `reapVitalityZero` and before `assertWorldV4`, and re-run `reapVitalityZero` after ticks if they can kill. Add a test that a state expiring in January is ineffective for the same year’s scenes.

**E4 [MUST] Tick/reaction effects cannot target the state owner generically.**  
A region-owned `strike_wave` tick may need `organization_funds`, a place-owned `under_occupation` tick may need `residence`/`move`, and an organization-owned purge may need `relation`/`health` on members. `EffectBinding` has no `ownerType`/`ownerId`, so `$owner` in an effect resolves through `roleIds.owner`, which is the anchor person, not the organization/place.  
**Minimal fix:** add `ownerType`, `ownerId`, `stateInstanceId`, `stateParameters` to `EffectBinding`; resolve `$owner` to the owner id (typed by the effect field) and `$state:<key>` to a parameter. For member-targeted effects, add `$member:<role>` only through an explicit participant map, not a free scan. Also stop hard-coding `stateTickFact.placeId = subject.locationId` and `participants = [subject]`: use the owner's place for organization/place/household states and include the actually affected people as participants (or emit one fact per affected person), otherwise a member killed by an organization tick has no fact in their own log.

**E5 [MUST decide] The domain requires a person subject for every event.**  
`EventFact.subjectId` is always a person and `assertWorldV4()` enforces it. The design wants non-person state facts but does not define a legal subject when no living anchor exists. “No event subject” is currently implemented as “no lifecycle at all”, which conflicts with the claim that every removal is recorded.  
**Minimal fix:** choose and document one: (a) every non-person lifecycle fact uses a real, deterministic anchor person and is labeled as a chronicle/observation; (b) anchorless states are frozen and only expire at read time, with a separate `state_history` row, and the “every removal is an EventFact” claim is removed; or (c) `EventFact.subjectId` becomes optional and all readers/assertions are updated (larger, not recommended for this phase).

### F. Slot semantics

**F1 [MUST] `maxStacks` is per definition, not per slot.**  
`createStateInstance()` checks `occupants` for the slot, but for `stack` it counts only `same` definition instances. Two different definitions in the same slot can each stack to `maxStacks`, so the slot does not actually bound conflict.  
**Minimal fix:** define `maxStacks` as the maximum number of active instances in the slot (including different definitions), or rename it `maxSameDefinition` and require different definitions in a `stack` slot to be explicitly listed. Add tests with two different state ids in one slot.

**F2 [MUST] `replace` does not record what it replaced.**  
`StateInstance.replacedStateId` exists but is never set. `replace` can end several occupants, and the committed `state_add` effect has no `replacedStateIds` and no exit effects for the replaced instances. The design claim “the committed event records both the removed and added instance ids” is false.  
**Minimal fix:** fill `replacedStateIds: Id[]` and `replaced: [{instanceId, exitEffects}]` on the `state_add` effect (and on the new instance), and include each ended instance’s `instanceId` and `endReason` in the effect/event trace. If `replace` is limited to one occupant, use `replacedStateId` singular consistently.

**F3 [MUST before content factory] Slots are arbitrary strings.**  
`slot?: string` lets one pack use `education` and another use `school`; no conflict is detected. `validateStateDefinition()` does not validate the slot vocabulary at all.  
**Minimal fix:** define canonical core slots (`education`, `employment`, `residence`, `legal`, `health`, `family`, `secret`, `power`, `wish`, `alumni`, `performance`) and namespaced extension slots (`x:<pack>:<slot>`). Reject/warn on unknown unnamespaced slots at pack publication.

**F4 [MUST] Multiple `state_add`s in one event are applied sequentially, not as one slot transaction.**  
If an outcome adds two states in the same slot, the first succeeds and the second blocks; `commitEvent()` still commits because one critical succeeded, so the authored “both” is half-true. Atomicity A1 covers the general case; slot preflight must specifically validate the whole draft’s `state_add` set before applying any.  
**Minimal fix:** preflight all state additions/removals/transitions in the draft against a simulated slot map; reject the event before any state mutation if the final set is inconsistent.

**F5 [MUST] Slot occupancy ignores orphaned instances.**  
`createStateInstance()` only counts occupants whose definitions are found. An orphaned state in the same slot is invisible, so a new state can be added while an active unknown occupant still exists.  
**Minimal fix:** if an active instance has no definition, treat its `definitionId` as an opaque slot key and block/replace only if the new definition explicitly declares that slot; otherwise surface `orphaned_state` and exclude it from slot counts with a diagnostic. Do not silently allow an unknown occupant.

### G. Performance

**G1 [MUST] `activeStates()` / `stateContextForPerson()` are full-table scans on the hot path.**  
`activeStates()` iterates every state; `stateContextForPerson()` iterates every state for every person. `v4EventRate()` calls `stateSceneWeightMultiplier()` for every definition × subject, and `conditionPasses()` calls `activeStates()` for every `hasState` condition. At 20k persons and hundreds of definitions this is `O(persons × definitions × states)` per year.  
**Minimal fix:** build a `StateInstanceIndex` once per annual draft:
```ts
type StateInstanceIndex = {
  byOwner: Map<string, StateInstance[]>;       // `${ownerType}:${ownerId}`
  byOwnerTag: Map<string, StateInstance[]>;    // `${ownerType}:${ownerId}:${tag}`
  byReactionTag: Map<string, StateInstance[]>; // tag -> active states with reactions
  active: StateInstance[];
};
```
Patch it in `rememberState`/`forgetState`/`endStateInstance`/`applyStateParameter` (parameter changes do not affect the index). `stateContextForPerson()` then performs at most ~10 owner-key lookups and dedupes by instance id; `activeStates()` uses `byOwner`, not `Object.values`. Add an instrumentation assertion that the hot path performs zero full scans of `world.states`.

**G2 [MUST] Ended states are retained forever and scanned forever.**  
`world.states` keeps every inactive instance. Over 88 years with many short curses, this can dwarf active states; `Object.values` and `structuredClone` pay for all of them every year.  
**Minimal fix:** maintain an active index (G1) and prune ended instances after a bounded retention (e.g. 10 years) or move them to a `state_history` payload/table. The `EventFact.effects` log remains the permanent audit. If pruning is deferred, at least never scan inactive instances in read paths and exclude them from `structuredClone` cost by keeping `states` as active-only plus a separate history map.

**G3 [MUST] Reaction matching scans every active state for every committed event.**  
`runStateReactions()` iterates all active states and calls `stateInstanceInvolved()` for each. With tens of thousands of states and tens of thousands of events, this is an event-loop-sized cost.  
**Minimal fix:** maintain `byReactionTag` for states whose definition has reactions; on commit, take `semanticEventTags` and look up only subscribed states, then apply `scope`. States with no reactions never enter this index. Cap the number of reaction candidates per event.

**G4 [MUST] “One state_tick fact per state-year” would double the event volume.**  
Most state-years have no observable tick. Committing a tick fact for every active state every year bloats the journal, the history index, the browser log and the 20k benchmark. The current `tickStates()` avoids this by only ticking when due, but the design text still says “per state-year”.  
**Minimal fix:** commit a tick fact only when a tick is due and its selected outcome produces at least one applied effect or a state transition/removal. Do not commit no-op ticks. If a check result must be auditable even with no effect, store it in a bounded `state.lastCheck` summary, not a new `EventFact`.

**G5 [MUST before untrusted content] No array/text bounds in state definitions.**  
A generated pack can declare unlimited ticks, reactions, transitions, modifiers, effects and text length. Validation currently checks a few numeric ranges but not counts or text lengths. This is a denial-of-service and prompt-injection surface once the content factory writes states.  
**Minimal fix:** cap ticks (8), reactions (12), transitions (8), modifiers (12), effects per outcome/reaction (8), tags (16), parameters (16), text lengths (tick/reaction text 400, reason 160), and total definition JSON size. Reject forbidden text patterns in all authored strings, not just title/description.

**G6 [DEFER] `structuredClone(world)` and `assertWorldV4` include all states.**  
This is acceptable if G1/G2 are fixed and active states are bounded. Do not add a second annual clone or per-state clone. Measure the clone/assert share in the same 20k benchmark.

### H. Persistence, migration and save compatibility

**H1 [MUST] The `v4_states` writer violates its own table constraints.**  
Migration `008_v4_states.sql` declares:
```sql
owner_type text NOT NULL,
owner_id text NOT NULL,
definition_id text NOT NULL,
active boolean NOT NULL DEFAULT true
```
but `writeEntities()` uses the generic `(world_id, id, payload)` insert. The first saved state fails with a `NOT NULL` violation. `seedV4World()` and `saveV4World()` both use this path.  
**Minimal fix:** special-case `v4_states` in `writeEntities()`:
```sql
INSERT INTO v4_states(world_id,id,owner_type,owner_id,definition_id,active,payload)
SELECT $1, item->>'id', item->>'ownerType', item->>'ownerId',
       item->>'definitionId', COALESCE((item->>'active')::boolean,true), item
FROM jsonb_array_elements($2::jsonb) AS item
ON CONFLICT(world_id,id) DO UPDATE SET
  owner_type=EXCLUDED.owner_type,
  owner_id=EXCLUDED.owner_id,
  definition_id=EXCLUDED.definition_id,
  active=EXCLUDED.active,
  payload=EXCLUDED.payload;
```
Do not add `v4_states` to the generic entity list.

**H2 [MUST] The generic upsert leaves the indexed columns stale.**  
Even after H1, the generic `ON CONFLICT DO UPDATE SET payload` would not update `active`, `owner_type`, `owner_id` or `definition_id`. Ending a state would leave the owner index saying it is active, and a state that changes owner (if ever allowed) would be indexed under the old owner.  
**Minimal fix:** H1’s update clause must update every indexed column. Add a persistence round-trip test that ends a state and verifies `SELECT active FROM v4_states` is false and the active index is empty.

**H3 [DEFER / verify] Table cleanup and benchmark lists.**  
`v4_worlds` has `ON DELETE CASCADE` to `v4_states`, so `DELETE FROM v4_worlds` and `TRUNCATE v4_worlds CASCADE` clean states. The explicit e2e `TRUNCATE` list does not mention `v4_states`, but CASCADE reaches it. Verify `scripts/v4-e2e-server.ts`, `scripts/v4-db-benchmark.ts`, `scripts/v4-macro-demo.ts`, `scripts/v4-phase4-demo.ts`, and the read-path tests after the migration. A hidden state table can otherwise leak across test worlds.

**H4 [MUST] State definitions are not persisted with the world and are not versioned in the registry.**  
`loadV4World()` loads instances only. The active definitions come from `V4AdvanceOptions.states` / hard-coded arrays (`WISH_STATES`, `CORE_STATES`). An old world loaded without the exact library becomes orphaned or silently uses the latest definitions. `v4_content_packs` stores generated packs, but `GeneratedPack` has no `states` field; `content-runtime-store.ts` cannot publish state definitions at all.  
**Minimal fix:** persist `definitionId@version` + hash on every instance and `state_add`; keep a versioned state registry (a `v4_state_definitions` table or a versioned pack payload) with all versions referenced by live instances; refuse to tick/weight an orphaned instance. Extend `GeneratedPack` with `states?: StateDefinition[]` and validate/compile them with the same `validateStateLibrary()`. Do not import `WISH_STATES` directly in `birth.ts`.

**H5 [DEFER] `historyMeta.stateSequence` can collide after import/merge.**  
`nextStateSequence()` increments the counter and uses it without checking whether `state:${world.id}:${n}` already exists. An imported world with states but a zero/missing counter can collide.  
**Minimal fix:** loop until the candidate id is free; validate the counter at load. This is cheap and prevents a rare but destructive overwrite.

**H6 [DEFER / verify] Backup, export and archive paths.**  
The v4 store is a set of tables plus `saveV4World()`. Any database dump/restore or archive path that enumerates v4 tables must include `v4_states`; test an archive/restore round-trip with an active state. Do not claim archive compatibility until that test exists.

---

## 2. Recommended minimal schema

The goal is to reuse `SceneCondition` and `EventEffect` and add only what replay, slots, owner scope and authority need. Nothing here is executable code, SQL, URL or arbitrary expression.

### 2.1 Owner, audience and slots

```ts
export type StateOwnerType =
  | 'person'
  | 'organization'
  | 'household'
  | 'place'
  | 'region'
  | 'world';

/**
 * Who receives the state's modifiers/checks/reactions.
 * Default: person=self, household=members, organization=members,
 * place=place_people, region=region_people, world=world.
 */
export type StateAudience =
  | 'self'
  | 'household_members'
  | 'organization_members'
  | 'organization_employees'
  | 'place_people'
  | 'region_people'
  | 'world';

export type CoreStateSlot =
  | 'education'
  | 'employment'
  | 'residence'
  | 'legal'
  | 'health'
  | 'family'
  | 'secret'
  | 'power'
  | 'wish'
  | 'alumni'
  | 'performance';

export type StateSlot = CoreStateSlot | `x:${string}`;
```

`place_people` means people whose residence, current location, workplace, school or organization place is the owned place. `organization_members` includes employees and position holders; `organization_employees` is the narrower factory/workshop case.

### 2.2 StateDefinition

```ts
export type StateDefinition = {
  id: string;                    // stable within a pack
  version: number;               // monotonic; instances pin this
  packId: string;
  title: string;
  description: string;
  owner: StateOwnerType;         // exact; no 'any'
  audience?: StateAudience;      // defaults by owner
  slot?: StateSlot;
  conflict?: 'block' | 'replace' | 'stack';
  maxStacks?: number;            // total active instances in the slot, not per id
  tags: string[];                // bounded, e.g. <= 16
  parameters?: Record<string, StateParameterSpec>;
  enterConditions?: SceneCondition[];
  /**
   * Read-time guard. While true, the state is ineffective immediately; the
   * next lifecycle fact commits its removal. Use this for "education is no
   * longer higher", not for "this state is temporarily quiet".
   */
  exitWhen?: SceneCondition[];
  durationMonths?: { min: number; max: number }; // 1..1200, min <= max
  modifiers?: StateModifier[];
  ticks?: StateTick[];
  transitions?: StateTransition[];
  reactions?: StateReaction[];
  /**
   * Prefer omitting onEnter/onExit. If kept, see A4: every applied effect must
   * be returned in state_add.entryEffects / state_remove.exitEffects and must
   * participate in the critical-success check. Never write education,
   * employment, position, birth or death from these hooks.
   */
  onEnter?: EventEffect[];
  onExit?: EventEffect[];
  historicalBasis?: string;
  sourceIds?: string[];
  provenance: StateProvenance;
};
```

`StateParameterSpec` keeps `type`, `default`, `min`, `max`, but `default` must match the declared type. Reserved key lint as in B6. `StateModifier` stays as in the design (`scene_weight` / `check_bonus`). No new expression language.

### 2.3 StateInstance

```ts
export type StateInstance = {
  id: Id;                        // stable; recorded in every committed effect
  definitionId: string;
  version: number;               // definition version; keep this JSON key
  definitionHash?: string;       // optional content hash for replay
  ownerType: StateOwnerType;
  ownerId: Id;
  slot?: StateSlot;              // snapshot for orphan/conflict handling
  since: WorldDate;
  expiresAt?: WorldDate;
  parameters: Record<string, StateParameterValue>; // final, normalized
  sourceEventId: Id;             // event that created it
  active: boolean;
  endedAt?: WorldDate;
  endedByEventId?: Id;           // exact lifecycle fact
  endReason?: string;
  lastTickAt?: WorldDate;
  tickCount: number;             // derived/audit only; never authoritative
  reactions?: Record<string, { lastAt: WorldDate; count: number; lastEventId: Id }>;
  replacedStateIds?: Id[];       // filled by a replacing state_add
};
```

### 2.4 SceneCondition addition

```ts
| {
    kind: 'hasState';
    stateId?: string;
    tag?: string;
    /**
     * Omit to mean "any effective state in this person's context"
     * (person + household + all memberships/positions + place(s) + region +
     * world). Specify to restrict the owner type. `ownerId` is optional; omit
     * to query all owners of that type in the person's context.
     */
    owner?: StateOwnerType;
    ownerId?: Id;
    parameter?: string;
    min?: number;
    max?: number;
    equals?: StateParameterValue;
    minCount?: number;
  }
```

Crucially, the read path must use `stateEffective()` (B2) and the person context (E1/G1), not a raw `active` flag or `subject.employment` only.

### 2.5 EventEffect additions

```ts
| {
    type: 'state_add';
    ownerType: StateOwnerType;
    ownerId: Id;
    stateId: string;
    /** Filled by createStateInstance; required in committed facts. */
    instanceId?: Id;
    definitionVersion?: number;
    definitionHash?: string;
    parameters?: Record<string, StateParameterValue | `$${string}`>;
    durationMonths?: number;     // requested
    expiresAt?: WorldDate;       // filled, actual
    replacedStateIds?: Id[];     // filled
    /** Filled when replace ends prior occupants; exit effects are replayable. */
    replaced?: { instanceId: Id; exitEffects?: EventEffect[] }[];
    /** Filled if onEnter is retained; otherwise absent. */
    entryEffects?: EventEffect[];
    reason: string;
  }
| {
    type: 'state_remove';
    ownerType: StateOwnerType;
    ownerId: Id;
    instanceId?: Id;             // exact selector
    stateId?: string;
    tag?: string;
    all?: boolean;               // required to remove more than one
    instanceIds?: Id[];          // filled
    closedPositionIds?: Id[];    // filled for Position.sourceStateInstanceId
    /** Filled if onExit is retained; otherwise absent. */
    exitEffects?: EventEffect[];
    reason: string;
  }
| {
    type: 'state_parameter';
    ownerType: StateOwnerType;
    ownerId: Id;
    /** Optional authored selector; filled by the engine when omitted. */
    instanceId?: Id;
    stateId?: string;            // optional consistency check
    key: string;
    value?: StateParameterValue | `$${string}`;
    delta?: number;              // numeric only
    previousValue?: StateParameterValue; // filled
    reason: string;
  }
| {
    type: 'state_transition';
    ownerType: StateOwnerType;
    ownerId: Id;
    /** Source instance; resolved from fromStateId when omitted, then filled. */
    instanceId?: Id;
    fromStateId: string;
    toStateId: string;
    toVersion?: number;
    toInstanceId?: Id;           // filled
    parameters?: Record<string, StateParameterValue | `$${string}`>;
    closedPositionIds?: Id[];    // filled
    entryEffects?: EventEffect[];
    exitEffects?: EventEffect[];
    reason: string;
  }
```

Add `position.sourceStateInstanceId?: Id` and `organization_found` remains as in the design. `Position` should gain:

```ts
export type Position = {
  // existing fields...
  /** The state that grants/keeps this office; ending it closes the office. */
  sourceStateInstanceId?: Id;
  /** Append-only tenure history; do not rewrite `start` on re-assignment. */
  history?: {
    holderId?: Id;
    start: WorldDate;
    end?: WorldDate;
    eventId: Id;
    reason: string;
  }[];
};
```

### 2.6 Effect binding and reference grammar

```ts
type EffectBinding = {
  eventId: Id;
  date: WorldDate;
  subjectId: Id;
  roleIds: Record<Id, Id>;
  fundingOrganizationIds: Id[];
  state?: {
    instanceId: Id;
    definitionId: string;
    definitionVersion: number;
    ownerType: StateOwnerType;
    ownerId: Id;
    parameters: Record<string, StateParameterValue>;
    tickId?: string;
    reactionId?: string;
    triggerEventId?: Id;
  };
  triggerSubjectId?: Id;
  triggerRoleIds?: Record<string, Id>;
  /** Set by applyStateAdd so a following position effect can link to it. */
  lastStateInstanceId?: Id;
};
```

Resolve only these bounded refs: `$owner`, `$state:<key>`, `$triggerSubject`, `$triggerRole:<key>`, `$lastState`, plus the existing `$subject`, `$household`, `$residence`, `$school`, `$workplace`, `$subjectOrg`, `$employerOrg` and role keys. Add `$world`, `$region` and `$place` for non-person owner effects (`state_add` on a world/region/place owner), because generated content cannot know those literal ids. Also include `sourceStateInstanceId` in `resolveEffectRefs`' ref-key list so `position` can link to `$lastState`. Do not resolve arbitrary text or execute expressions.

### 2.7 EventFact metadata

```ts
export type EventFact = {
  // existing fields...
  /** Commit order; load events by this, not by date. */
  sequence?: number;
  /** State lifecycle provenance; makes ticks/reactions/expiry auditable. */
  stateRef?: {
    phase: 'enter' | 'tick' | 'reaction' | 'transition' | 'exit';
    instanceId: Id;
    definitionId: string;
    definitionVersion: number;
    tickId?: string;
    reactionId?: string;
    triggerEventId?: Id;
    /** Structured d20 trace for tick/reaction checks. */
    check?: {
      die: number;
      modifier: number;
      total: number;
      dc: number;
      band: 'success' | 'failure' | 'critical_success' | 'critical_failure';
      blockedBy?: string;
    };
  };
};
```

`EventFact.stateRef` is not an `EventEffect`; it identifies which mechanism produced the fact. The actual mutations remain in `effects`.

### 2.8 Tick and reaction shapes

```ts
export type StateTick = {
  id: string;
  /** Annual runtime: 12..600. If <12 is needed, add bounded catch-up explicitly. */
  everyMonths?: number;
  conditions?: SceneCondition[];
  check?: CheckDefinition;      // shared with resolveCheck
  outcomes: StateTickOutcome[]; // at least success/failure coverage when check exists
};

export type StateReaction = {
  id: string;
  onTags?: string[];
  onActionPrefix?: string;
  /** Default owner_in_event; world must be explicit. */
  scope?: 'owner_in_event' | 'owner_member_in_event' | 'owner_region' | 'world';
  conditions?: SceneCondition[];
  chance?: number;
  check?: CheckDefinition;
  requiresRoles?: string[];     // do not fire if the trigger lacks these
  effects: EventEffect[];
  failureEffects?: EventEffect[];
  text: string;
  significance?: number;
  cooldownMonths?: number;
  maxPerYear?: number;
};
```

`CheckDefinition` should be the single shared type used by scene checks, ticks and reactions; `SceneCheckSpec` adds only the outcome-id arrays. This avoids the current duplicate `StateCheckSpec`/`SceneCheckSpec` drift.

### 2.9 Persistence

- `WorldState.states?: Record<Id, StateInstance>` (old saves optional).
- `historyMeta.stateSequence?: number`.
- `v4_states` table as in `008_v4_states.sql`, but the writer must fill `owner_type`, `owner_id`, `definition_id`, `active` and update them on conflict (H1/H2).
- `loadV4World()` must attach the state definitions by `id@version`; do not silently drop unknown instances.
- Add `EventFact.sequence` or load by id order (C6).

---

## 3. The five requested scenarios

### 3.1 A university state that must not duplicate `Person.education`

**Required behavior**

- `Person.education` answers: is the person enrolled, at what level, at which place, since when.
- `university-student` answers: progress, failed years, scholarship, tuition obligation, institution identity, expected completion. It must not store or write `status`/`level`.
- Entry is one scene outcome with two effects, in this order:
  ```ts
  [
    { type: 'education', personId: '$subject', status: 'higher', level: 5, placeId: '$university', reason: 'matriculated' },
    { type: 'state_add', ownerType: 'person', ownerId: '$subject', stateId: 'university-student', parameters: { institutionId: '$university' }, reason: 'matriculated' },
  ]
  ```
  Both are critical; A1 guarantees both or neither. No `onEnter` education write.
- `exitWhen: [{ kind: 'education', in: ['none', 'secondary'] }]`. `stateEffective()` stops the state from influencing scenes as soon as education leaves `higher`; the annual tick commits `state_remove` (and role removal) as a fact.
- Graduation is a tick/transition outcome containing `education(higher, level 6)` + `state_transition(to: 'university-graduate')` + role add. It is one event.
- `university-graduate` is not a 120-month `education` slot state. Use `slot:'alumni'` (or a flag/credential) with no education writes. A credential is a durable fact, not a temporary education status.

**Test**

1. Create a person with `education='higher'` and `state_add(university-student)`.
2. Change `education` to `none` via a normal scene, no state removal.
3. In the same year, `hasState(university-student)` and education-weighted scenes must be false/ineffective.
4. The next tick commits `state_remove` with the exact `instanceId`; the event trace shows no unresolved token.
5. Assert the state parameters contain no `status`, `level`, `education`, `employment`, `wage` keys.

### 3.2 A curse that reacts to betrayal and kills/damages the betrayer

**Required behavior**

- Curse on the victim: `ownerType:'person'`, `ownerId: victim`, `slot:'special'`, `reaction.scope:'owner_in_event'`.
- Trigger must be a committed event with tag `betrayal` and the victim in the cast. The reaction fires once per `(instance, trigger, reaction)`.
- Target resolution:
  - If the trigger has a participant role `betrayer`, `$triggerRole:betrayer` is the target.
  - Else if the trigger subject is not the curse owner, `$triggerSubject` is the target.
  - Else do not fire (`requiresRoles` or a condition).
- Use `check` and `failureEffects`; a failed check damages the curse holder, not a random person.
- Effects are `death` or `health` on the target. `health` is currently an optional texture effect; if the target is unresolved, the reaction must be blocked, not committed with only mood/parameter changes.
- The reaction event must have `causes:[trigger.id]`, `stateRef:{phase:'reaction', instanceId,...}`, and `tags` that do **not** include a tag that can re-trigger the same reaction.

**Test**

1. Betrayal event with roles `subject=betrayer`, `betrayer=betrayer`, `victim=victim`. Curse owner = victim. Fire; target = betrayer; health/death applied; target is not the victim.
2. Betrayal event with `betrayer` as a separate participant. Same result.
3. Trigger without a `betrayer` role and with owner as subject. Reaction must not fire.
4. Two cursed victims witness the same public betrayal. Each fires once; no global storm; no unresolved `{betrayer}` token.
5. A reaction event that itself carries `betrayal` must not re-trigger the same state (self-trigger guard).

### 3.3 A power wish that must create a real `Position`

**Required behavior**

- `wish-power` state may change weights/checks/reactions, but it must not satisfy `SceneCondition.position`.
- The power outcome must include a real `position` effect:
  ```ts
  [
    { type: 'state_add', ownerType: 'person', ownerId: '$subject', stateId: 'wish-power', reason: 'the wish takes an institutional form' },
    { type: 'position', organizationId: '$organization', holderId: '$subject', title: '部长', authority: ['appoint', 'budget'], sourceStateInstanceId: '$lastState', reason: 'appointed minister' },
  ]
  ```
  `applyStateAdd()` sets `binding.lastStateInstanceId`; `position` resolves it. Both effects are critical and atomic.
- `applyPosition()` closes the old holder (or creates a new tenure id), appends `Position.history`, and never rewrites the old `start`.
- `SceneCondition.position` with the required `authority` keys is the only gate for real power. A `stage-king` state has no `position` effect and cannot pass it.
- When the power state ends, `endStateInstance()` closes positions with `sourceStateInstanceId === instance.id` and records `closedPositionIds` in the committed effect.

**Test**

1. Wish power compiled: state exists but `SceneCondition.position` is false.
2. A scene with `position` creates a real Position; `SceneCondition.position` is true for the holder.
3. A second holder takes the office: old position has `end`/history; new tenure has a different id or a history entry; the old holder no longer passes.
4. End the power state: linked position closes, authority condition becomes false.
5. `stage-king` state never satisfies the position condition.

### 3.4 A state owned by an organization that affects many people

**Required behavior**

- `owner:'organization'`, `audience:'organization_members'` (or `organization_employees` for a factory).
- `stateContextForPerson()` gathers:
  - the person’s own states;
  - household states;
  - employment organization;
  - every organization where the person is a member or position holder (`personOrganizations()` already exists);
  - residence place, current location, workplace, school, and each organization’s place;
  - region (`regionIdForPerson`, with fallback);
  - world states.
- Deduplicate by instance id. A state owned by a union affects members who are not employees of the union; a state owned by a factory affects employees at that factory, not every person in the region.
- A non-person state with no living anchor still affects eligible people at read time but does not tick/expire until an anchor exists (E1). No fabricated person subject.

**Test**

1. `strike_wave` owned by a union, `audience:'organization_members'`. Member A’s scene weights change; non-member B’s do not.
2. `purge_ongoing` owned by a factory, `audience:'organization_employees'`. Employee A changes; a member who does not work there does not.
3. A school-owned state affects a student whose `education.placeId` is the school even if `locationId` is home.
4. A region-owned state affects a person whose `place.regionId` is absent but `regionIdForPerson` falls back correctly.
5. A world-owned state affects everyone only when `audience:'world'` is explicit.

### 3.5 Deterministic replay from `EventFact` effects

**Required behavior**

- Replay processes events in commit order (`sequence`/id, not date).
- `state_add` carries `instanceId`, version, normalized parameters, `expiresAt`, `replacedStateIds`, `entryEffects`.
- `state_parameter` carries `previousValue` and final `value`.
- `state_remove` carries `instanceIds`, `endedAt`/reason, `closedPositionIds`, `exitEffects`.
- `state_transition` carries `instanceId`, `toInstanceId`, final parameters, `closedPositionIds`.
- Expiry/exit/transition facts carry `stateRef.instanceId`.
- Missing definition versions are not silently substituted.

**Test**

1. Run a short world with a university state, a curse, an organization state and a power position.
2. Snapshot `world.states`, `world.positions`, `Person.education`, `Organization` membership and `Position` tenure.
3. Clear `world.states` and `world.positions`; replay the event log’s effects in commit order (plus the baseline `Person`/`Organization` facts).
4. Compare active instances, parameters, end reasons, linked positions, education and membership.
5. Include a tick-created birth; assert the child has a birth fact and a replayable state/position trail.
6. Run the same seed twice with a shuffled `Object.keys` order for states/organizations; assert identical event ids, state ids, tick subjects and reaction order.

**No LLM in ordinary ticks test:** instrument the model client with a counter; run ten `advanceV4Year` calls with states enabled and no `outcomePolicy`; assert zero model calls. The deterministic wish compiler is allowed at birth only.

---

## 4. Claimed benefits that are not yet proven

| Claim | Why it is unproven at this snapshot | Test that would prove it |
|---|---|---|
| “A state persists a role long enough to be consumed.” | Only wish states are actually added at birth; `university-student`, `cursed-by-wish`, `stage-king` have definitions but no scene outcome uses `state_add` for them. No multi-year eligibility test exists. | Seed a state at year 1; run 10 years; assert it changes scene eligibility/weights in years 2–10 and disappears on expiry. Same seed without the state must differ only through the recorded state facts. |
| “Content composes through states.” | `GeneratedPack` has no `states` field, and `v4_content_packs` cannot publish state definitions. Composition kernels can now reference `hasState`/`attribute`/`position` and a scene check, but nothing validates that a referenced state id is registered before the pack runs. | Author one generated pack with a `StateDefinition`, a kernel variant guarded by `hasState`, and a check; compile/publish/run; assert the branch changes. Reject an unknown `state_add` target at validation. |
| “The LLM can propose a bounded mechanic.” | There is no state definition in the generated-pack schema or `v4_content_packs`; the validator only accepts raw effects. | Adversarial generated pack: huge arrays, nested `state_*` in `onEnter`, unknown owner, foreign `definitionId`, code/URL text. Validator must reject all; a clean pack must publish and run with zero model calls at tick time. |
| “Replay derives from `EventFact` effects.” | Effects lack instance ids, old values and nested enter/exit effects; expiry may be anchorless. The current `loadV4World()` reorders by date. | The replay test in 3.5, including stacked states, a replace, a transition, expiry with no anchor, and a tick-created birth. |
| “An organization state affects many people.” | `stateContextForPerson()` only reads the employer organization; `audience` does not exist. | Union/factory/school state test in 3.4; count affected members vs strangers and verify no duplicate modifier. |
| “A university state does not duplicate `Person.education`.” | `university-student.onEnter` writes `education='higher'`; `university-graduate` occupies `education` for 120 months. | Test 3.1, plus a static check that no education-slot definition writes `education`/`status`/`level`. |
| “A curse reacts to betrayal and kills/damages the betrayer.” | `cursed-by-wish` uses `$betrayer`; if the betrayer is the trigger subject, the role key is occupied by the state owner and the health effect silently skips. The current test covers only a separate `betrayer` participant, not the trigger-subject shape. | Test 3.2 with both cast shapes; assert the exact target, effect magnitude, causes and no unresolved token. |
| “A power wish creates a real `Position`.” | The existing test proves `wish-power` compiles to a bounded state and not authority; no content uses the `position` effect, so real office creation is untested. `Position.authority` is a free string list. | Test 3.3; plus an authority-gated scene that fails for `stage-king` and succeeds for the position holder. |
| “No LLM in ordinary ticks.” | The tick/reaction code is deterministic, but there is no instrumentation test that a model client is not called. | Counter test described in 3.5. |
| “20k performance remains acceptable with states.” | No benchmark with states; current read path is O(all states) per person/scene. | 20k persons, 2 active states each, 500 scenes; assert ms/year within the Phase 14 5s target and record state-scan counts. Compare with states disabled. |
| “Failed state effects do not leak.” | `commitEvent` still commits if one of several critical effects succeeds; `state_transition` ends `from` before validating `to`. | Synthetic `[state_add, failing death]` and `[state_transition, failing position]` tests: no state, no position, no cash/flag, no event. |
| “Slot conflicts are real.” | `maxStacks` counts only the same definition; different definitions in the same slot stack freely; orphan occupants are invisible. | Tests F1–F5 with two different definitions, multiple adds in one event, replace, stack and an orphan. |

---

## 5. Top six must-fix items

1. **Make critical effects transactional.** All critical effects in an event must succeed or none may persist. Preflight `state_transition` targets before ending the source; do not rely on “at least one critical applied”.
2. **Record replay-grade state effects.** `state_add`/`state_remove`/`state_parameter`/`state_transition` must carry instance ids, versions, previous/final values, replaced/closed ids and entry/exit effects. Expiry/exit/transition must be committed facts with `stateRef.instanceId`.
3. **Index state instances by owner/tag/audience and fix person context.** Replace `Object.values(world.states)` hot-path scans with an active index; include all memberships/positions, school/workplace/residence/place, region fallback and world states. This is both correctness (“organization affects many”) and 20k viability.
4. **Separate reaction scope and trigger targets.** Add `scope`, `triggerSubjectId`/`triggerRoleIds`, `requiresRoles`, a per-year reaction budget and a self-trigger guard. Otherwise the curse can miss the betrayer or fire globally.
5. **Enforce one authority and a real lifecycle.** `Person.education` is the university authority; `stateEffective()` must honor expiry/exit at read time; death/org dissolution must end states; `state_add` must reject owner-type mismatch; `Position` must use bounded authority and never rewrite tenure. Non-person states need a deterministic anchor or an explicit freeze/no-fact policy.
6. **Fix persistence and the definition registry.** Special-case `v4_states` writes to fill/update `owner_type`, `owner_id`, `definition_id`, `active`; pin `definitionId@version`; load and validate definitions; make the wish compiler use the same path and registry. The current generic writer cannot save a world with any state.

Non-person anchor policy, tick ordering, slot vocabulary and content bounds are also must-fix before the content factory, but they can be implemented inside items 3 and 5.

---

## 6. Bottom line

Phase 15’s state layer is the right missing middle. The design’s own examples, however, already expose the failure modes: the university state writes education outside the log; the curse can miss the betrayer because trigger roles collide with owner roles; the power wish has no `position` content at all; and the organization state only reaches employees. The next iteration should not add more state content until atomicity, instance-level replay records, owner/audience indexing and non-person lifecycle are fixed. Content volume cannot make a second authority or an unreplayable state table safe.
