# ADR-017 — State Activation, Real Children, and History Seeds

Date: 2026-11-06  
Status: accepted for Phase 16  
Supersedes: none; extends ADR-016.

## Context

Phase 15 delivered a working State mechanism layer, but audit and the Phase 15 critique showed that definitions were not reaching lives:

- State content competed in a pool of thousands of ordinary scenes; a character could hold an office or a curse for decades without seeing the scene that consumes it.
- `raising-child` could be created on birth but its kernels used a `neighbor` role and a `childhood` stage for an adult subject; the child was not a durable participant.
- Multiple child states ticked the same state because authored `state_parameter` effects did not bind to the specific instance.
- Place-owned states such as `occupied-city-regime` never expired because `stateAnchorPerson` only handled person/household/organization owners.
- Position effects used the first open Position, so a character with several offices always acted through the oldest one.
- The history-fork pack had no seed path: its kernels required states that nothing created.

## Decision

1. **Keep the Phase 15 State abstraction.** Add a dedicated, bounded state/position opportunity lane in `runEventYear`. It pre-checks casting, applies a minimum rate of 0.35, weights by 1.5, attempts a small number of castable candidates, and resolves at most one state/position scene per person-year.
2. **State links are real roles.** State ticks and reactions append typed `links` (for example `child`) to text roles and event participants.
3. **Bind state effects to the instance being ticked.** `state_parameter` / `state_remove` effects authored with `$subject`, `$household`, `$subjectOrg` or `$subjectPlace` are bound to the current instance id before resolution.
4. **Add a generic `child` role kind** resolving `Person.parentIds` via the existing people index. Do not create a parallel child entity.
5. **Attach `raising-child` on real birth** through `StateDefinition.autoAttachOnBirth`; the state keeps a typed `child` link. Family content consumes that state rather than re-adding it.
6. **Resolve `$positionOrg` / `$positionId` / `$positionTitle` to the most recently acquired live Position.** Multiple offices are real; content should act through the current one.
7. **Deduplicate content by family, not compiled variant** in a person-year: `sceneUseKey = familyId ?? id`.
8. **Allow place/region state anchors** from living people at the place/region, so place-owned states can tick and expire. Add a liberation reaction that removes occupation; constrain occupation seeds to the 1938–1945 era.
9. **Keep historical review as similarity, not a timeline reset.** History seeds create bounded states and opportunities; they do not assert that every real event occurred.

## Alternatives rejected

- A separate “opportunity scheduler” or god-director: duplicates scheduling and weakens the existing weighted event contract.
- Per-wish TypeScript branches: not composable and not content-driven.
- A new persistent Child entity: duplicates `Person`, `Relation`, `Birth` and household authority.
- Rebuilding place states on every year: state instances are authoritative; expiry/reactions must be committed facts.
- Letting the LLM write world facts directly: remains forbidden; only validated definitions/proposals are accepted, runtime is the sole writer.

## Consequences

- State-gated content is reachable without flooding every person-year; execution success after selection improves, but availability/cast failures are now measured separately (`missingRole`).
- Family ticks can name and affect the correct child; multiple children no longer overwrite one progress meter.
- Occupation and purge history can create lived consequences and end; work permits still do not create employment (known limitation).
- The state lane and pre-cast add CPU cost; benchmarks and profiles are recorded in `phase-16-report.md`.
- Remaining failures are content-specific: widow/inheritance kernels are still unreachable, office follow-ups are rare, and wish archetypes other than power remain weak.
