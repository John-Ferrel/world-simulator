# ADR-014: Event Recipe Kit and bounded candidate retrieval

- Status: accepted
- Date: 2026-11-04
- Phase: 12

## Context

Phase 11 introduced `PlotKernel`, context/milieu profiles and a composer, but
content authoring was extremely verbose. A single kernel often occupied one
hundred lines, which made a thousand-recipe library impractical. Runtime
profiling also showed that casting and ordinary-event eligibility were O(n) in
the named population: every event that needed a `worker`, `partner` or
`neighbor` scanned all 20,000 people.

## Decision

1. Add a compact authoring kit (`packages/v4/content/kernels/recipes/kit.ts`)
   that expands concise specs into ordinary `PlotKernel`, `KernelOutcome` and
   `EventEffect` objects. It is authoring sugar, not a second runtime.
2. Compile person-level `KernelOutcome.when` into `SceneOutcome.conditions`
   using existing `SceneCondition` kinds. World-level `when` fields remain
   compile-time context/milieu/process gates.
3. Index the named population once per year for role casting. Partner and
   neighbor pools use deterministic sampling with a full-scan fallback only
   when a narrow constraint finds no candidate.
4. Build prepared scene candidate pools per person signature (age, stage,
   employment, education, roles, cash, health, household size, skills,
   capability, relations, place kinds). Static conditions are checked once per
   signature; residual world/process conditions and cooldown history are checked
   per candidate.
5. Split milestone and lifecycle pools from ordinary scenes. When an ordinary
   pool exceeds 240 definitions, select a deterministic weighted sample instead
   of scanning every definition per person. The chosen event is still settled
   by the existing engine and weighted by authored scene weight.

## Alternatives rejected

- **A second recipe executor.** It would duplicate effect, casting, history and
  persistence semantics. The kit must compile into the existing contracts.
- **Precomputing every recipe × person binding.** It would become stale after
  every birth, death, job change and relationship change.
- **Changing event probability constants globally.** It hides the retrieval
  problem and distorts authored content.
- **Using the naive Cartesian product as the capacity claim.** It is not a set
  of valid, executed situations.

## Consequences

- Content authors can write a concrete recipe in roughly 30–50 lines.
- Person and world facts can change actions and outcomes through ordinary
  conditions; no new simulation layer is introduced.
- Large pools are approximate samples. Small libraries and all tests retain
  the exact exhaustive path. This trades a small amount of sampling precision
  for bounded per-person cost as the library grows.
- Candidate pools are keyed by a person signature. A state change recomputes the
  signature after a resolved event; prepared eligibility still checks residual
  conditions and history before committing.
