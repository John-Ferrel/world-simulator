# Phase 17 — Content Coverage View

Date: 2026-11-06  
Generated catalog: `docs/v4/content-catalog.json` / `.md`  
Natural-life evidence: `docs/v4/phase-15-phase17-final-f.md` / `.json` (45 years, 18,134 events, 347 persons), with `final-c`/`final-e` as 50-year checks.

## 1. Library size

| Metric | Phase 16 baseline | Phase 17 final |
|---|---:|---:|
| State definitions | 52 | **79** |
| Kernels | 1,652 | **1,740** |
| Generated packs | 6 | **15** |
| Generated states | 16 | **43** |
| Generated kernels | 47 | **135** |
| Distinct state definitions observed in a 50-year run | 30–32 | **43–52** (seed-dependent) |

The increase is not only volume: 24 new states and ~88 new generated kernels were added across eight themed packs plus one real Content Factory pack.

## 2. Stage coverage

| Stage | Kernels (Phase 17) |
|---|---:|
| infancy | 2 |
| childhood | 63 |
| adolescence | 143 |
| adulthood | 1,511 |
| elderhood | 21 |

Childhood and elderhood improved slightly (from 61/17) but remain thin. The life-course pack is the main elderhood/childhood producer; `pack-factory-education` and the existing education content still dominate adolescence.

## 3. Pack activation in final-d

| Pack | Kernel events | State adds |
|---|---:|---|
| `pack-love-secrecy` | 13 | forbidden-attachment 11, known-affair 2, jealous-rival 5 |
| `pack-family-continuity` | 89 | raising-child 122 |
| `pack-history-fork` | 103 | occupation 13, purge 7, strike-committee 5 |
| `pack-absurd-power` | 23 | stage-sovereign 14 |
| `pack-curse-betrayal` | 81 | suspected-witchcraft 1 |
| `pack-office-influence` | 107 | office-patronage 3, office-under-siege 15 |
| `pack-factory-education` | 17 | night-school 6, scholarship-holder 9 |
| `pack-fame-art` | 37 | starving-artist 19, muse 10, plagiarist 3 |
| `pack-migration-belonging` | 63 | newcomer 19, remittance-web 19 |
| `pack-absurd-fortune` | 44 | lucky-idiot 15 |
| `pack-life-course` | 129 | child-prodigy 33, caregiver 6, empty-nest 3 |
| `pack-crime-justice` | 7 | wanted 2 |
| `pack-desire-scandal` | 14 | kept-secret 1 |
| `pack-work-craft` | 10 | master 2, machine-breaker 1 |
| `pack-faith-miracles` | 35 | cult-initiate 1, miracle-witness 3, saint-or-fraud 1 |

The final-f seed is weaker than final-c for desire/office/crime; natural variance is substantial. final-c showed 52 distinct states, 40 child-prodigy states, 10 caregiver states, 97 office events, 29 scholarship holders, and 29 newcomers. Do not treat one seed as the library average.

## 4. State reachability

**Created and consumed in natural runs (final-c/final-d):**

- `lc17-child-prodigy`, `lc17-caregiver` (after the caregiver entry kernel), `lc17-empty-nest`
- `fa17-starving-artist`, `fa17-muse` (after the fame state-add fix), `fa17-plagiarist` (rare)
- `mb17-newcomer`, `mb17-remittance-web`
- `af17-lucky-idiot`
- `fs17`/`fm17-miracle-witness`, `fm17-saint-or-fraud`, `fm17-cult-initiate` (after the séance fix)
- `wc17-master-craftsperson`, `wc17-sweatshop-owner`, `wc17-machine-breaker`
- `cj17-wanted`
- `ds17-kept-secret` / `ds17-scorned-lover` (rare)
- `night-school`, `scholarship-holder`
- `strike-committee`, `occupied-city-regime`, `institution-purge`

**Still rare or unobserved in the final 50-year samples:**

- `ds17-double-life` (the entry gate remains too narrow; only a rare affair branch creates it)
- `af17-mistaken-heir`, `af17-cursed-luck` (depend on wish-wealth / curse-bargain)
- `cj17-prison-term`, `cj17-protection-racket` (court/racket branches are rare or role-blocked)
- `mb17-stateless` (papers-retained branch not selected)
- `thesis-candidate` / `university-graduate` from the factory school branch (graduation transition was added but remains rare)
- `family-estate`, `war-widow-with-children` from the old family pack (still 0)

These are not necessarily bugs: a 40–50 year sample with 300–400 people can miss rare chains. But they are the next conversion targets.

## 5. Cross-pack composition

final-f `crossPack.counts` shows new packs consuming old/base states:

- `life-course -> base` 33; `life-course -> family-continuity` 2
- `fame-art -> base` 14; `fame-art -> absurd-power` 7
- `faith-miracles -> base` 13
- `desire-scandal -> love-secrecy` 8
- `migration-belonging -> family-continuity` 6
- `crime-justice -> base` 7
- `work-craft -> base` 6
- `absurd-fortune -> office-influence` 3

This is real old→new composition: new packs read `fame`, `public-scandal`, `office-patronage`, `cursed-by-wish`, `strike-committee`, `chronic-illness`, `raising-child`, `forbidden-attachment`, etc.

**Gap:** there is almost no new→new composition. New packs mostly consume the old library and their own states; no Phase 17 pack reads another Phase 17 pack’s state as a required condition. The next conversion pass should add 3–5 collision kernels (e.g. `lc17-caregiver` + `cj17-wanted`, `mb17-newcomer` + `wc17-master-craftsperson`, `fa17-muse` + `ds17-kept-secret`).

## 6. Unconsumed states

The catalog still lists `city-under-occupation` and the 12 `wish-*` states.

- `wish-*` are intent/archetype states, not ordinary event libraries; their consumers are the wish ticks and generic weight modifiers. They do not need forced event consumers.
- `city-under-occupation` is an orphan base state; `occupied-city-regime` is the active history state. Either retire the duplicate or add one consumer.
- `chronic-illness`, `debt-bondage`, `university-graduate`, `family-estate` are now consumed by Phase 17 content, closing four of the Phase 16 orphan gaps.

## 7. Repetition and event volume

final-f: 18,134 events, 1,715 state ticks, 850 reactions, repeatRate 0.1965.  
final-c: 21,173 events, 1,840 ticks, 883 reactions, repeatRate 0.1892; final-e: 20,790 / 1,712 / 844 / 0.1843.

The new state ticks add texture but also volume: `raising-child` remains the largest tick source (~640–1,045), and new `fa17-starving-artist`, `mb17-remittance-web`, `mb17-newcomer` add 50–130 ticks each before pacing changes. The library is richer, but it is not yet a low-repetition literary engine.

## 8. Next expansion priorities

1. Convert pressure parameters into gates: `ds17-double-life.exposure`, `fa17-plagiarist.exposure` (done), `cj17-protection-racket.exposure`, `mb17-stateless.exposure`, `fa17-muse.credit/autonomy`.
2. Add player-subject entries for `ds17-double-life` and `af17-mistaken-heir`; the caregiver entry is now fixed.
3. Add new→new collision kernels between Phase 17 packs.
4. Replace write-only flags/roles (`owns_bookshop`, `kept_the_rooms`, `association_member`, `registered_resident`) with organizations/positions/states.
5. Repair the factory school branch’s economy/graduation and the crime escape/child-move effects.
6. Reduce family/school tick volume and add age-gated school-leaver outcomes.
7. Keep generating the catalog after every pack; treat every state with no consumer or no player-subject creation path as unfinished content.
