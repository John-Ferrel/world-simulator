# ADR-015: Incident Trace as a projection of committed facts

- Status: accepted
- Date: 2026-11-04
- Phase: 12

## Context

Narration needs more than a template and more than an LLM's memory. It needs the
actual mechanism, participants, motives, conflict, response and settled effects
of an event. Reconstructing that from free text after the fact would let prose
drift away from the simulation.

## Decision

- Add an optional `IncidentTrace` to `EventFact`, built at commit time from the
  scene definition, resolved outcome, cast roles, place, date and applied
  effects.
- Add optional authored `trace: { motive, conflict, response }` to
  `SceneOutcome` / `KernelOutcome`, with a fallback to the subject's agency goal
  or private goal.
- Keep effects authoritative. The trace describes the applied effects; it never
  invents a consequence that the engine did not settle.
- The trace is a projection. It does not become an alternate state machine and
  does not drive future eligibility.

## Alternatives rejected

- **Asking the LLM to reconstruct an incident trace from a log line.** It could
  invent participants, motives or outcomes.
- **Storing only prose.** It cannot be audited against effects.
- **Building a second event object with duplicate state.** It would drift from
  `EventFact`.

## Consequences

- New recipes can author motive/conflict/response for stronger narration.
- Older recipes still get mechanism, place, subject, participants and effect
  descriptions; authored fields are simply absent.
- Event payloads grow modestly. The trace contains no world state beyond the
  names/roles already present in the event.
