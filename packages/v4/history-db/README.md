# Historical reference index (Phase 15)

This package is **read-only reference material**, not world state and not a
scripted timeline.

- `data/*.json` — 79 countries, 166 cities, 93 people, 98 events (90 `fact`, 8
  `inference`), 10 clearly separated `fiction` hooks, 517 citation records.
- `index.ts` — validation/loading and query functions.
- `review.ts` — deterministic five-year comparison against committed events.

## Mixing rules

1. A reference record never creates a Person, EventFact, Organization or
   HistoricalProcess by itself.
2. `fiction` hooks are loaded only by explicit counterfactual tools. They are
   not in `queryHistoricalEvents` unless the caller asks for fiction.
3. A review may say "no committed analogue". It may not say "the real event
   happened" or "the world has diverged" from similarity alone.
4. `matched` means a committed event shares a candidate hook or title term; it
   is evidence of familiarity, not historical proof.
5. The simulator never resets a fork to the real timeline. A real person's
   reference death date is metadata, never a death command.
6. Current-world facts live in `WorldState.events` / `Person` / `Organization` /
   `HistoricalProcess`, never in this package.

## Commands

```bash
pnpm exec tsx scripts/v4-validate-state-pack.ts path/to/pack.json
pnpm v4:phase15-lives -- 60 phase15-a
```

Coverage and source limitations: `docs/v4/phase-15-history-coverage.md`.
