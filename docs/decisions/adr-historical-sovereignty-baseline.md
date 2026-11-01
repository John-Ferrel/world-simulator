# ADR: Separate geographic regions, 1900 source authority and simulated control

- Status: accepted and integrated for new Earth pack 3.0.0 worlds; existing later-world history is preserved.
- Date: 2026-10-30; integration update: 2026-10-31.

## Context

The Earth's 175 modern regions are geographic indices. Treating every region as an independent state in 1900 erases colonial and protectorate authority. Replaying real-world borders every year would instead erase the open simulation's consequences. Both errors must be avoided.

## Decision

Use ETH Zurich ICR CShapes 2.0 GW coding at 1900-01-01 as a sourced initialization of modern populated-place points. Keep `Settlement.regionId` as immutable modern geography, historical unit/status/GW authority in the source index, and `Settlement.polityId` as canonical current simulated control. The source baseline remains reference material after initialization.

The new-world factory calls `applyHistoricalStartControl` before population leadership, governments and industry initialization. The explicit GW crosswalk includes historical authorities that have no valid modern successor; uncertain points retain local fallback rather than guessed historical control. Treasury is apportioned conservatively by population; capability indices are population-weighted means rather than summed bonuses. No source-year schedule changes later control.

Only the simulator commits occupation, recapture, autonomy or independence, followed by `synchronizeSovereigntyControl` with actual event evidence. Later saves load the baseline reference without rewriting old control. A WeakMap index reads live object references without changing canonical state during queries.

Dependencies retain parent foreign authority; autonomy permits local government and scenario tax retention (65% local / 35% parent), not unfettered diplomacy. Independence requires actual local organization/support/funding and parent collapse or sustained wartime supply collapse. Autonomy requires weakened parent control or a participating reform coalition plus material support. Movement support tags are bounded aggregate participation abstractions, not added population or survey results. Industry capacity, government records and existing fronts reconcile after real transitions; inventory is not copied into a new state.

CShapes data is licensed **CC BY-NC-SA 4.0**. Current local noncommercial research/testing use retains attribution and share-alike provenance. Commercial distribution needs appropriate authorization or a replacement source; the R package's software GPL does not relicense the data.

## Alternatives considered

- Modern regions as 1900 independent states: rejected because it misstates sovereignty and dependencies.
- Small hand-authored empire list: rejected as the broad baseline because coverage and point provenance would be weak.
- Inferring historical GW codes from modern ISO codes or nearest polygon: rejected because those identities and borders differ; uncertainty is retained.
- Replaying CShapes year-by-year: rejected because it would overwrite simulated agency.
- Rewriting the current world's past on upgrade: rejected; baseline applies only at a fresh 1900 start.

## Consequences and limits

The reproducible importer pins the source checksum, bounds archive/input sizes and writes atomically. The 7,280-point source join has 7,011 unique matches and 269 unmatched points. The duplicated legacy Niamey ID is repaired by deterministic source IDs and an idempotent canonical old-save migration, not silently collapsed.

A point jurisdiction is not a complete historical border reconstruction. Modern geographic outlines, city existence dates, disputed/de facto control and source coding exclusions remain limitations. The roughly 97 active initial simulation entities include unresolved local administrations and must not be described as 97 historical independent countries. Source details and licenses are in [the research note](../historical-sovereignty-research.md).
