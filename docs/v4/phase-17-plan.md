# Phase 17 — The Living Content Library: Plan

Date: 2026-11-06  
Baseline: `703500f` (Phase 16). Runtime remains the sole canonical writer.

## 1. Objective

Turn the existing State/Kernel/Outcome runtime into a **large, legible, reusable content library**:

- more states, events and outcomes across life stages and social worlds;
- a generated Content Catalog that authors can query;
- packs that consume existing underused states as well as add new ones;
- natural-life evidence that new content actually appears and combines;
- a repeatable author/review/integration loop for future expansions.

## 2. Critical path

| Step | Deliverable | Status |
|---|---|---|
| 1 | Audit current states/kernels, compute consumers/gaps | done: `docs/v4/content-catalog.md` |
| 2 | Content architecture + author brief | done: `docs/v4/phase-17-content-architecture.md` |
| 3 | Research summaries (storylet/simulation/emergent systems) | done: `docs/v4/phase-17-research.md` |
| 4 | 8 themed packs authored in parallel + 1 real Content Factory pack | done: 8 packs + `pack-factory-education` |
| 5 | Validate, de-duplicate, register packs | done: 15 packs validate; catalog 79/1,740 |
| 6 | Regenerate catalog, run typecheck/content tests | done: 89 files/526 pass; build pass |
| 7 | Natural 40–50 year lives with all packs; inspect activation/cross-combinations | done: final-f 45y/18,134 events/51 states; final-c/e |
| 8 | Independent Critic reads full lives; one revision round | done: 16/30 pre-revision; cash/slot/caregiver/muse/factory fixes |
| 9 | Final report + critique + plan/README updates | done |

## 3. Pack assignments

| Pack | Prefix | Theme | Primary existing states to consume | New states (suggested) |
|---|---|---|---|---|
| `pack-life-course` | `lc17-` | childhood promise, eldercare, empty nest, inheritance, late-life reinvention | `raising-child`, `university-student`, `apprenticeship-contract`, `grief`, `family-estate`, `chronic-illness`, `university-graduate` | `lc17-child-prodigy`, `lc17-caregiver`, `lc17-empty-nest` |
| `pack-desire-scandal` | `ds17-` | desire, secrecy, jealousy, reputation | `secret-lover`, `forbidden-attachment`, `known-affair`, `jealous-rival`, `public-scandal`, `office-*`, `raising-child` | `ds17-double-life`, `ds17-scorned-lover`, `ds17-kept-secret` |
| `pack-crime-justice` | `cj17-` | crime, debt, police, courts, prison, re-entry | `debt-bondage`, `under-investigation`, `detained`, `blacklisted`, `factory-employment`, `strike-committee` | `cj17-wanted`, `cj17-prison-term`, `cj17-protection-racket` |
| `pack-migration-belonging` | `mb17-` | borders, diaspora, remittance, return, belonging | `occupied-city-regime`, `political-suspect`, `raising-child`, `factory-employment`, `grief` | `mb17-newcomer`, `mb17-stateless`, `mb17-remittance-web` |
| `pack-faith-miracles` | `fm17-` | faith, cults, relics, healing, fraud, doubt | `grief`, `suspected-witchcraft`, `cursed-by-wish`, `under-investigation`, `public-scandal` | `fm17-cult-initiate`, `fm17-miracle-witness`, `fm17-saint-or-fraud` |
| `pack-fame-art` | `fa17-` | art, performance, media, plagiarism, celebrity | `fame`, `stage-sovereign`, `stage-king`, `public-scandal`, `office-patronage` | `fa17-starving-artist`, `fa17-plagiarist`, `fa17-muse` |
| `pack-absurd-fortune` | `af17-` | absurd luck, mistaken identity, inheritance, ironic wishes | `wish-wealth`, `wish-fame`, `wish-love`, `stage-king`, `office-*`, `curse-*` | `af17-lucky-idiot`, `af17-mistaken-heir`, `af17-cursed-luck` |
| `pack-work-craft` | `wc17-` | craft, factories, unions, class, career reinvention | `apprenticeship-contract`, `journeyman`, `factory-employment`, `strike-*`, `blacklisted`, `royal-chef` | `wc17-master-craftsperson`, `wc17-sweatshop-owner`, `wc17-machine-breaker` |

Each author creates 3 states + 8–10 kernels, validates, and does not edit shared files. Main Agent integrates and reviews.

## 4. Acceptance

- All 8 packs validate with `ok: true`; no duplicate state/kernel ids.
- `ALL_STATES` grows from 52 to roughly 72–76; generated pack kernels grow from 47 to roughly 110–125.
- At least 4 previously unconsumed/low-consumption states gain new consumers.
- At least 10 cross-pack state combinations appear in natural 40–50 year runs.
- A full life dossier shows new pack activation and readable causal chains.
- Tests/typecheck/build pass; catalog regenerated; report/critique written.
- No claim that “more content” automatically means better lives; Critic reads actual lives.

## 5. Risks

- Pack authors may duplicate concepts or invent overlapping states.
- New content may starve existing content; compare activation counts before/after.
- Adult-stage bias may worsen; life-course pack must actually reach childhood/elderhood.
- Many outcomes may be mood-only; validator and review must reject.
- LLM Content Factory may produce invalid JSON; subagent-authored packs are the primary path, factory result is reported separately.
- Content may be too clean/moralizing; dark humour and failure must survive integration.
