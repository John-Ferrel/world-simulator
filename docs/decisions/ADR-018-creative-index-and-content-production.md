# ADR-018 — Deterministic Creative Index and Multi-Author Content Production

Date: 2026-11-07  
Status: accepted for Phase 18  
Supersedes: none; extends ADR-016 and ADR-017.

## Context

Phase 17 reached 79 states / 1,740 kernels / 15 generated packs and introduced a structural Content Catalog. The Catalog could answer “which states are consumed?” and “which stages are thin?”, but not the author’s question:

> Has this story already been written, and what nearby ideas are still unused?

The result was predictable duplication: night-school kernels, widowhood variants, patron-age jobs, care-for-parent scenes. Phase 18 needed to add 200–400 independent kernels without a parallel director, without embeddings in the runtime, and without turning similarity into a prohibition on classic motifs.

## Decision

1. **Build a derived, deterministic Creative Index.** `scripts/v4-creative-index.ts` reads the same runtime registry (`ALL_STATES`, `KERNEL_LIBRARY`, `GENERATED_STATE_PACKS`) and writes `docs/v4/creative-index.json` / `.md`. It is an author/editor aid, not a registry and not a runtime dependency.
2. **Use character n-gram TF-IDF, not embeddings.** Chinese bigrams/trigrams plus Latin word tokens, cosine similarity, tag Jaccard and outcome-pattern overlap. This is free, offline, deterministic and maintainable for a 1–5k kernel library. Embeddings remain a future optional editor-recall layer, not a CI/runtime gate.
3. **Calibrate the similarity threshold.** Use **0.20** for high-similarity recall; 0.15 is retained only as a historical/recall threshold. A scored pair is an **editor candidate**, never an automatic reject.
4. **Derive creative metadata instead of adding runtime schema.** `premise`, `situation`, `motivation`, `conflict`, `twist`, `outcomePattern`, `tone`, `setting`, `motifs` are derived fields. They do not become State/Kernel/Outcome schema and do not affect execution.
5. **Fix classification noise before using counts.** Latin terms use word boundaries (`war` must not match `warm`); tone is derived from authored tags/domain/title, not every noun in the outcome prose. Outcome patterns are reported as branch capabilities, not as proof that every branch is reachable.
6. **Organize production by themed briefs, not raw counts.** Ten authors received a stage/tone/motif brief, a list of existing states to reuse, forbidden near-clones, a kernel/outcome budget and a validation command. Authors saw the committed library and their own brief, not each other’s drafts.
7. **Require a divergence note before production.** Each author ran 2–3 Creative Index queries and recorded the nearest existing kernels plus a premise/conflict/twist/outcome divergence statement. A shared motif is allowed when the engine differs; a name-swapped clone is not.
8. **Validate and integrate centrally.** Authors wrote only their pack file. The Main Agent ran the existing pack validator, registered the pack, regenerated Catalog and Index, ran QA/typecheck/tests and natural-life seeds. Model output remains untrusted static content; the simulator remains the sole canonical writer.
9. **Use natural-life evidence to revise content, not the engine.** In Phase 18, `em18-family-archive` was absent from two of three seeds because its creation paths depended on death/empty-nest sequences. The fix was a new adult setup kernel (`em18-setup.cellar-box`), not a new director or a forced event. A post-revision seed confirmed the state could be added and consumed.

## Alternatives rejected

- **Embedding index in CI/runtime.** Adds model/version/credential cost, sends unpublished text to a provider, produces unstable thresholds and over-merges mood/setting; not needed for 2k kernels.
- **LLM judge as the only duplicate detector.** Expensive, nondeterministic and hard to regression-test; better as a later editorial layer over a deterministic shortlist.
- **Extending the runtime State/Kernel schema with creative metadata.** The runtime does not need premise/tone/motif fields, and adding them would make an authoring aid look canonical.
- **Rejecting every high-similarity motif.** Love, betrayal, inheritance and mistaken identity are legitimate recurring human patterns; the target is mechanical sameness, not shared themes.
- **Parallel content director or runtime scheduler.** Duplicates scoring, authority and persistence; Phase 18 is content expansion, not a new engine.
- **Generating variants until the count is met.** The target was 200–240 independent kernels; a smaller honest pack is better than mechanical inflation.

## Consequences

- Authors can query “what is nearby?” before writing, and editors can audit a whole pack for novelty.
- The index rebuild is one command and has no external dependency; it is easy to run in CI or locally.
- Lexical similarity misses paraphrase and structural sameness. A 0.161 pair can be a real duplicate, and a 0.25 pair can be a legitimate variant. The divergence note and editor reading remain necessary.
- The threshold is corpus- and language-dependent; it must be recalibrated when the library or tokenizer changes.
- The workflow adds editorial overhead (queries, divergence notes, catalog/index regeneration), but it caught duplicate titles and unresolved `{link:...}` tokens during Phase 18 QA.
- No claim is made that 233 kernels automatically improve life quality. Natural-life focal share, repeatRate and Critic reading remain separate acceptance evidence.
