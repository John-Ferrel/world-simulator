# ADR-019 — Cross-Pack Opportunity Map, Story Shapes, and Bounded Collision Weighting

Date: 2026-11-07  
Status: accepted for Phase 19  
Supersedes: none; extends ADR-016, ADR-017 and ADR-018.

## Context

Phase 18 expanded the library to 99 states / 1,973 kernels / 25 generated packs, but the independent Critic found:

- new content was only 8.37% of focal events;
- 185/232 new kernels fired somewhere, but only 113/232 reached a focal person;
- `oj18-odd-apprenticeship` created 537 state instances across four seeds and two generic tick texts appeared 70/52 times;
- elder-memory had 171 state adds but one focal scene;
- several packs shared a structural story (“paperwork changes reality”, “job reveals secret”, “windfall is shaved by claimants”) despite lexical novelty.

The next step is not another parallel content pack. It is making existing and new states collide, and making life more continuous.

## Decision

1. **Build a Cross-Pack Opportunity Map from the runtime registry.** `scripts/v4-cross-pack-map.ts` derives state consumers/creators, open and already-covered cross-pack pairs, collision families and opportunity prompts. It is an author/editor aid, not a plot graph and not a runtime scheduler.
2. **Measure observed co-occurrence from committed dossiers.** `scripts/v4-phase19-cooccurrence.ts` reads state instances in life dossiers and counts pairs that were active on the same person/household at the same time. This distinguishes “possible pair” from “the world already puts these states together”.
3. **Add story-shape v2 for editorial recall.** `scripts/v4-story-editor.ts` computes role topology, exact state-condition skeleton, production targets (`state_add`/transition/position/organization), effect skeleton and branch count. It also emits state-core clusters and production clusters, so the known bureaucratic-ghost and odd-jobs families are recalled instead of hidden by exact-effect differences. The LLM Story Editor reads the packet; the tool never calls a model and never writes content.
4. **Produce collision packs, not isolated packs.** Four Phase 19 packs require at least eight kernels per pack with two `hasState` conditions from different packs. A shared motif is allowed; a name-swapped version is not.
5. **Add bounded cross-state affinity inside the existing state lane.** When a state-driven scene requires 2+ distinct standing states/positions, multiply its selection weight by `1 + 0.2 × min(3, n−1)` (1.2×–1.6×). The lane still resolves at most one state scene per person-year; there is no second scheduler, no full Cartesian product, and diagnostics count `crossStateCandidates` / `crossStateResolved`.
6. **Fix odd-jobs rhythm with content first.** Entry kernels require no active `oj18-odd-apprenticeship` or `oj18-workplace-legend`, cooldown is at least 6 years, `strange-year` ticks every 24 months instead of 12, progress deltas are doubled, and two extra tick outcomes reduce exact-text repetition. This preserves progression time and avoids a global state-runtime rewrite.
7. **Use existing seed persons for age cohorts.** `scripts/v4-phase15-lives.ts` accepts `--existing=<ids>` and `--existing-only`. Elder/teen/child cohorts use real 1912 persons; they do not fabricate births or set `ownerId`. Cohort evidence is reported separately from the newborn 45-year control.

## Alternatives rejected

- **Full state-pair Cartesian product.** Thousands of pairs are not stories; the map is a recall layer, not a content generator.
- **Embedding-only semantic review.** Useful later, but costly and unstable for a deterministic CI/editor loop; lexical + structural signatures are the current baseline.
- **A new collision director/scheduler.** Duplicates authority and scheduling; the existing state lane is the right place for a bounded weight.
- **Global same-state dedupe or `replace` semantics change.** Would affect all 99 states, relationships, offices and replay. Phase 19 uses content gates and tick rhythm instead.
- **Forced collision events in natural lives.** Controlled experiments may seed states; natural incidence must come from the normal engine.
- **Pretending a 45-year newborn cohort validates elderhood.** It does not; use an existing-person elder cohort and report it separately.

## Consequences

- Collision kernels get a modest selection advantage without changing ordinary event distribution.
- The map and co-occurrence tools make “which states already coexist?” inspectable and reproducible.
- Story-shape v2 recalls known structural families; it still cannot judge literary quality, so the LLM Editor and human reading remain necessary.
- Odd-jobs career churn and tick repetition fall, but a person can still change jobs after a state expires; this is not a full career system.
- Elder/child cohorts are observational, not player-owner lives; their event rates and focal shares must not be merged with the newborn control.
- Remaining family/partner slot-machine, horizon, and production LLM runtime issues are outside this ADR.
