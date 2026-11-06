# ADR 016 — State as a mechanism layer over the v4 scene engine

Date: 2026-11-05  
Status: accepted  
Phase: 15

## Context

Phase 14 had causal event tags, history references and long follow-ups, but a
scholarship, marriage, apprenticeship or curse was still an event rather than a
persisting object with obligations. The Phase 14 critique found education and
career resets, partners and children disappearing, and special abilities that
were narrative inserts rather than mechanics. More event recipes could not fix
that: nothing persisted long enough to be consumed.

Three options were considered:

1. Replace the v4 engine with a generic entity/state machine.
2. Keep adding event recipes and encode states as flags.
3. Add a typed mechanism layer consumed by the existing scene/task engine.

## Decision

Choose option 3. A `StateDefinition` is validated content; a `StateInstance`
is persisted world state owned by a Person, Organization, Household, Place,
Region or the World. Existing `Person.education`, `Person.employment`,
`Relation`, `Position`, `Project` and `HistoricalProcess` remain authoritative.
States supply duration, parameters, slots, modifiers, ticks, transitions and
reactions, and drive those authorities through ordinary typed effects.

The runtime is still the single writer. State facts are committed through
`EventFact.effects` and carry instance ids/versions so a reader can reconstruct
what happened. The LLM content factory may propose packs, but only the
validator/registry decides what reaches the runtime.

## Consequences

Positive:

- One new state can change eligibility, weight, checks and consequences for
  many existing scenes without engine branches.
- A real office is a `Position`; a stage king is a state with no authority.
- Organisation/place states can affect all people in scope through condition
  lookups and modifiers.
- Deterministic ticks/reactions are cheap and do not call a model.
- Existing saves remain loadable (`states` is optional; one additive table).

Negative / accepted:

- State instances need lifecycle maintenance and orphan handling.
- Critical state effects are preflighted; some older effect types still have
  weaker transactional guarantees.
- Per-tick history and state lookup indexes add bookkeeping.
- The 20k synthetic worst case with 5% state density is above the Phase 14
  runtime target; realistic 1% density is 6.41 s/year (8.29 s/year at 5%).
- Replay of onEnter/onExit effects is definition-derived rather than fully
  enumerated in the fact.

## Alternatives rejected

- **Generic entity rewrite**: duplicates the engine, breaks authored content
  and all existing saves.
- **Flags-only**: cannot carry parameters, duration, slots, ticks, transitions,
  typed links or reactions.
- **Model-generated arbitrary effect scripts**: violates the single-writer and
  untrusted-content constraints.

## Evidence

- `tests/v4-phase15-state.test.ts` — slots, transitions, typed links, checks,
  curse reaction, deterministic replay, real Position vs stage title.
- `tests/v4-phase15-content.test.ts` — every r15 kernel compiles across the
  century with no unresolved effect.
- `docs/v4/phase-15-experiments.json` — 6/6 controlled experiments pass.
- `docs/v4/phase-15-phase15-a.md` / `b.md` — 60-year lives with state ticks,
  reactions and transitions.
