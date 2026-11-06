# Phase 18 — Content Diversity & Creative Index

Date: 2026-11-07  
Baseline: Phase 17 `34783ec` — 79 states / 1,740 kernels / 15 packs; reviewed focal-event share of Phase 17 packs was 3.1%; repeatRate ~0.1965.

## 1. What the Creative Index is

`scripts/v4-creative-index.ts` builds a deterministic, offline author/editor index over the runtime library. It is **not** a registry and does not affect runtime behavior.

It derives:

- `premise`: title + first outcome;
- `situation`: conditions / tags;
- `motivation`: keyword families (power, love, money, survival, knowledge, freedom, revenge, faith, fame, belonging, adventure);
- `conflict`: betrayal, debt, illness, war, crime/legal, class, secrecy, bureaucracy, occupation, family duty, identity, supernatural;
- `twist`: outcome text with reversal/misunderstanding markers;
- `outcomePattern`: resource, relationship, status, knowledge, body, death, birth, institution, state change, mobility, career;
- `tone`: authored tags/domain/title, not every noun in the prose;
- `setting`: stage, domain, context, place/period tags;
- `motifs`: 26 motif families.

Search uses Chinese character bigrams/trigrams + Latin word tokens, TF-IDF cosine, with tag/outcome-pattern bonuses for kernel-to-kernel lookup. It is maintainable, incremental (rebuild is one command), deterministic and free. Embeddings were considered but not used: they add model/version/credential cost and tend to over-merge mood/setting; they are better as an optional editor recall layer later.

## 2. Calibration

Initial metadata used substring matching on the full prose. That made 1,137 kernels “warm” because “war” matched “warm” and family words appeared everywhere. The index now:

- uses word boundaries for Latin terms;
- derives tone from tags/domain/title rather than every sentence;
- reports high-similarity pairs at **0.20**, not 0.15.

Current index after calibration (final Phase 18 library):

- 1,973 records;
- 43 pairs at ≥0.20 (138 at ≥0.15 before the new packs and threshold recalibration);
- 0 cross-library new-kernel pairs at ≥0.20;
- top mechanical pairs:
  - `kernel-edu.attend-night-school` <> `kernel-work.task-evening-trade-course` (0.611);
  - `r15-love.forbidden-attachment` <> `r15-love.borrowed-room` (0.470);
  - `r1-fam.widowhood` <> `r13-turn.widowhood` (0.397);
  - `r13-edu.medical-study` <> `r14-edu.clinical-rounds` (0.369);
  - `r1-work.hotel-ring` <> `r2-leisure.hotel-letter` (0.314);
  - `office16-favor.private-sinecure` <> `ds17-office.archive-post` (0.238).

These are **editor candidates**, not automatic rejects. The `--duplicates` list is a recall aid; the editor reads the pair and asks whether premise, conflict, twist or outcome pattern differs.

## 3. Three kinds of repetition

| Kind | What is repeated | Detector | Response |
|---|---|---|---|
| **Same-kernel repetition** | The same kernel fires repeatedly for one person/world | per-life action count, event share, cooldowns/once-per-person, text equality | Raise cooldown, add stage/age gate, add state parameter advance, or change the tick to a decision |
| **Structural repetition** | Different IDs, same story shape | role topology, condition pattern, outcome-effect skeleton, motivation/conflict/twist similarity | Blind-read; require difference in ≥2 of premise/conflict/twist/outcome |
| **Prose-template repetition** | Same sentence frame or phrase | normalized placeholders, 5-gram Jaccard / repeated 12-grams, outcome text clusters | Rewrite, remove the skeleton, or cap it per pack |

Phase 17’s `repeatRate` mixes all three. A recurring institution or ritual may be legitimate; a flat repeat that changes only a mood is not. Future reports should report all three separately.

## 4. Multi-author workflow

```text
Main Agent gap brief
  → Author pitches (10–20 one-page concepts; no drafts shared)
  → Creative Index nearest-neighbour check
  → Editor selects / merges / rejects
  → Author produces one pack
  → Validator + compile
  → Catalog + Creative Index regenerate
  → Natural lives (3 seeds) + coverage funnel
  → Independent Critic / editor
  → Revise / expand
```

Key rules:

- Authors see the committed library and their brief, **not each other's drafts**, to reduce anchoring.
- Similarity is checked before prose, not after.
- Every accepted pitch records nearest existing kernels and a divergence claim.
- Rejected pitches are quarantined, not recycled into prompts.
- Validation is done by a different agent/model from production where practical.
- The runtime remains the sole writer; model text is untrusted input.

## 5. Coverage metrics

Raw kernel count is not coverage. The production report tracks:

- **Stage entropy** and effective number of stages; target an increase in childhood/infancy/elderhood share.
- **Domain/tone/motif entropy**; dominant tone share and top-kernel share.
- **Reachability funnel** per new state: creation path → external consumer → observed in ≥1 seed → focal-person event.
- **New-content focal share** (Phase 17 baseline 3.1%).
- **Outcome diversity**: branch patterns, multi-axis outcomes, refusal/postpone/ambiguous share.
- **Composition**: new→old and new→new conditions.
- **Repetition**: flat-repeat rate, identical-text rate, top-kernel share, top-state tick share.

## 6. Phase 18 production targets

- 10 packs, ~200–240 independent kernels, ~20 new states.
- At least 15% of new kernels outside adulthood.
- At least 4 packs with a distinct dominant tone not already dominant (absurd/comic/eerie/erotic/triumphant/suspense).
- Each new state has a player-subject creation path and an external consumer.
- At least 8 premise-level divergences from existing kernels with similar motifs.
- New-content focal share target ≥12% across 3 natural seeds; repeatRate not materially worse than 0.20.
- Independent Critic can name at least 8 new, specific, non-template scenes.

## 7. Acceptance rubric for a 200–400 kernel batch

Hard gates:

- 100% pack validation and compile; unique IDs; every new state has creation + consumer; every kernel ≥2 outcomes;
- no exact duplicate; ≥90% of kernels have no structural twin above the calibrated threshold; no prose skeleton used >2 times per pack;
- each batch closes named stage/domain/tone gaps;
- 3 natural seeds: ≥60% of new states observed, ≥75% of new kernels fire, new-content focal share ≥12%;
- no kernel >5% of events; repeatRate ≤ baseline + 0.01;
- Critic reads full lives and identifies specific new scenes.

A batch can validate and still fail the library test. If it does, return the nearest neighbours and a revision direction, not a larger count.

## 8. Production result

### 8.1 Library growth

Phase 18 added **10 packs, 233 kernels, 710 outcomes and 20 states**. The library moved from 79 / 1,740 / 15 to **99 / 1,973 / 25**.

| Stage | Phase 17 | Phase 18 | Change |
|---|---:|---:|---:|
| infancy | 2 | 4 | +2 |
| childhood | 63 | 82 | +19 |
| adolescence | 143 | 165 | +22 |
| adulthood | 1,511 | 1,669 | +158 |
| elderhood | 21 | 53 | +32 |

The stage distribution is still adulthood-heavy, but normalized stage entropy rose from **0.316 to 0.367** and the effective number of stages from **1.66 to 1.81**. 75 of 233 new kernels (32.2%) are outside adulthood, above the 15% target.

Tone also broadened. Using the calibrated index:

| Tone | Phase 17 | Phase 18 |
|---|---:|---:|
| dark | 880 | 895 |
| historical | 732 | 753 |
| warm | 455 | 547 |
| gritty | 331 | 340 |
| suspense | 104 | 154 |
| political | 126 | 144 |
| everyday | 102 | 139 |
| melancholy | 96 | 131 |
| absurd | 28 | 61 |
| romantic | 43 | 59 |
| triumphant | 20 | 33 |
| eerie | 18 | 30 |
| erotic | 10 | 25 |
| comic | 4 | 19 |

Normalized tone entropy rose from **0.731 to 0.781**; effective number of tones from **7.25 to 8.28**. This is a real broadening of register, not only more words.

### 8.2 Novelty audit

`pnpm v4:creative-index -- --pack <pack.json>` found:

- **8 kernels ≥0.20**, all inside their own pack and all part of a deliberate state arc (infant friend arc, youth runaway arc, odd-jobs cinema arc, elder archive/ghost adjacency);
- **0 cross-library new kernels ≥0.20**;
- highest cross-library neighbours 0.161 (infant), 0.148 (elder/dark fantasy), 0.139 (love-desire), 0.125 (history-street), 0.094 (money-luck).

This is still a lexical result. It does not prove originality, but it shows the themed briefs did not produce name-swapped copies of the nearest Phase 17 kernels. The editors' divergence notes are in the author reports and the pack rationales.

### 8.3 Natural-life result (A/B/C, 45 years each)

| Seed | Events | Persons | Distinct states | repeatRate | New-pack events | Share of all events | New focal events / focal events | Focal share |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `phase18-a` | 18,909 | 326 | 64 | 0.2257 | 1,672 | 8.84% | 109 / 1,469 | 7.42% |
| `phase18-b` | 20,759 | 359 | 61 | 0.2157 | 1,956 | 9.42% | 129 / 1,556 | 8.29% |
| `phase18-c` | 20,406 | 350 | 67 | 0.2191 | 2,168 | 10.62% | 186 / 2,042 | 9.11% |
| **Total** | **60,074** | — | — | **~0.220** | **5,796** | **9.65%** | **424 / 5,067** | **8.37%** |

Against Phase 17's **3.1%** focal share, this is a 2.7× improvement. It is still below the 12% target. Phase 18 is therefore a partial conversion success: new content is no longer NPC wallpaper, but it has not displaced the old family/medical/rent base as the main texture of a focal life.

Reachability:

- **20/20** new states were observed at least once across A/B/C; 19/20 in A and B, 20/20 in C. `em18-family-archive` was the only miss in A/B, which motivated the revision below.
- **185 of 232** pre-revision new kernels (79.7%) fired at least once; 130 fired in all three seeds, 28 in two, 27 in one.
- Only **113 of 232 (48.7%)** reached a focal person in A/B/C. The rest fired in the world/NPC layer. This is the most important reachability caveat: world-level activation is not player-facing coverage.
- Pack event totals across A/B/C: infant-wonder 1,306; youth-fire 878; money-luck 607; black-comedy 656; odd-jobs 521; small-mysteries 490; history-street 413; elder-memory 323; dark-fantasy 312; love-desire 290.
- Every focal subject had at least one Phase 18 event. Counts ranged from 2 (Mitzi) and 6 (Hedwig) to 19 (Emil/Lena); the new packs are concentrated in the active lives, not evenly distributed. Across A–D, elder-memory supplied 1 focal event, infant-wonder 30, small-mysteries 13, love-desire 58, youth-fire 155; aggregate focal share hides this variance.
- No new kernel exceeded 5% of world events in a seed. No exact-duplicate kernel IDs were found.

### 8.4 Revision based on evidence

`em18-family-archive` did not appear in A or B; it appeared three times in C only after a rare `lc17-empty-nest` branch. The pack's creation paths were too dependent on a death/empty-nest sequence.

Revision: added **`em18-setup.cellar-box`** (adulthood 45–70, no external state requirement), in which a landlord's sale forces a tenant to clear the cellar and a previous tenant's tin box enters the household archive. Three outcomes: keep and sort it, let the landlord scrap it while saving one ticket, or hide it after a neighbor recognizes the name. Cooldown 20 years.

Post-revision seed `phase18-d` (45 years):

- 21,114 events, 352 persons, 68 distinct states, repeatRate 0.2183;
- new-pack events 2,047 (9.69%); focal 135 / 1,550 = 8.71%;
- **20/20 new states observed**;
- `em18-family-archive` added once, ticked 9 times, reacted 6 times, consumed once;
- `em18-setup.cellar-box` fired once.

That is a small but real reachability repair: the state is no longer dependent on the C-seed's empty-nest coincidence.

## 9. Current limitations

- The index is lexical, not semantic embeddings; paraphrase and structural similarity are only partially captured.
- The metadata is derived, not authored sidecar; an editor should not treat tone/motif counts as ground truth.
- The index does not yet compute role topology or outcome skeletons; high similarity is a recall aid, not a duplicate proof.
- The library still has states absent from individual 45-year seeds; presence in the catalog is not reachability. In Phase 18, 19/20 new states appeared in two of three seeds; `em18-family-archive` needed a new setup kernel.
- The new-content focal share (8.37%) and repeatRate (~0.220) missed their targets. The report does not round these into a pass.
- 47 pre-revision kernels (20.3%) never fired in A/B/C; several are conditional on rare states or role combinations.
- Phase 17’s relationship/family slot-machine and horizon issues are outside this phase’s main scope but remain the largest life-quality blockers.
