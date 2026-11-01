# Historical sovereignty starting point research

## Finding

The Earth pack currently stores modern Natural Earth regions as separate `polityId` values. That makes the present-day country outline serve as both geographic identity and political sovereignty in a 1900 start. These are different concepts: a modern populated-place settlement can be kept as a stable location while its 1900 jurisdiction was a colony, protectorate, occupied territory, or independent state.

The best verified global open source found for a 1900 baseline is the ETH Zurich International Conflict Research group's **CShapes 2.0**. Its official page describes state and dependent-territory boundaries from 1886 to 2019 and links raw CSV, GeoJSON, shapefile, SQL, and R package downloads. The dataset uses the Gleditsch and Ward (GW) state list for the GW variant. The accompanying codebook describes interval rows and `gwcode`, `status`, and sovereignty-holder (`owner`/`ruledby`) fields. It explicitly distinguishes independent states, colonies, protectorates, leased territories and occupied territories. [Official CShapes page](https://icr.ethz.ch/data/cshapes/), [CShapes 2.0 codebook](https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf).

The source page states **CC BY-NC-SA 4.0** for CShapes. The CRAN R package itself declares GPL (>= 2), but that is the software package's license and does not override the dataset license stated by the authors. The generated jurisdiction index therefore retains attribution and the CShapes CC BY-NC-SA license. It is suitable for non-commercial research and testing; this source is **not cleared for commercial redistribution**. Seek permission from the dataset authors or replace it with a suitably licensed source before commercial release. [CShapes license](https://icr.ethz.ch/data/cshapes/), [CRAN `cshapes` package license](https://stat.ethz.ch/CRAN/web/packages/cshapes/index.html).

The data itself is not a complete or unquestionable account of sovereignty. The authors describe it as **de jure** changes, document coding judgments, and note that sources can provide default first-of-month/year dates. The codebook also lists excluded small changes, some unrecognized de facto secessions, temporary wartime possession, and territories whose boundaries were undefined or disputed. Accordingly, this is a sourced baseline reference, not a mandate to force every later real-world border or independence date into the simulation. [Codebook: periods and coding notes](https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf), [CShapes 2.0 paper](https://doi.org/10.1177/00220027211013563).

## Reproducible import and generated coverage

Run from the repository root:

```sh
python3 scripts/import-cshapes-sovereignty.py
```

The importer downloads the official ETH Zurich `cshapes_2.0.tar.gz` package over HTTPS, checks its pinned SHA-256, reads only `cshapes_2_gw.topojson.xz`, and writes atomically to `data/historical-sovereignty/cshapes-1900-jurisdictions.json` with public data-file mode `0644`. It does not extract or execute archive files. Input bytes, expanded TopoJSON, geometry/point counts, and output size are bounded. An existing pinned source archive may be supplied with `--source-archive PATH` to reproduce the import offline.

The index is a point-based join from every current Natural Earth populated-place point in `packages/world-packs/earth/geography.json` to the CShapes polygons active on 1900-01-01. It records the modern region ID separately from the historical GW territorial-unit code, political status, and sovereignty-holder code. It does not infer authority from place or country names, and it does not pretend a point match proves that the entire modern country polygon had one 1900 status.

Imported official-source snapshot:

| Measure                            |           Result |
| ---------------------------------- | ---------------: |
| CShapes units active on 1900-01-01 |              149 |
| Units marked independent           |               52 |
| Units marked colony                |               73 |
| Units marked protectorate          |               21 |
| Units marked occupied              |                3 |
| Modern settlement points checked   |            7,280 |
| Unique settlement IDs in geography |            7,280 |
| Unambiguous settlement-ID mappings |    7,011 (96.3%) |
| Unmatched points                   |       269 (3.7%) |
| Overlapping/ambiguous matches      |                0 |
| Conflicting duplicate-ID points    | 0 points / 0 IDs |
| Generated JSON                     |  1,559,017 bytes |

Examples from the generated index: Mumbai (`IND`) is a colony unit (`gwCode=750`) under the United Kingdom (`sovereignGwCode=200`); London (`GBR`) is an independent unit under `gwCode=200`; Beijing (`CHN`) maps to independent China (`gwCode=710`). These are examples of the source's encoded snapshot, not claims that current country codes equal GW codes.

The 269 unmatched points are preserved as `matchStatus: "unmatched"`; no nearest-border guess fills them. Many lie in Antarctica, loosely defined frontiers, or small/isolated point geometries. A unit with `borderDefined: 0` must be treated as a lower-confidence boundary even when the city point resolves uniquely. The source reports no confidence score for individual polygons, so the index does not fabricate one.

The Earth geography importer corrected the duplicate Niamey identity before this snapshot: legacy `earth-city-60` is the 2.11471, 13.518652 point, while Natural Earth point `ne_id=1159149391` is retained separately as `earth-ne-1159149391` at 7.096404, 13.491643. The CShapes importer was rerun after that repair. Both point IDs now map uniquely (to units 430 and 4784 respectively), and the source-ID-collision count is zero. They remain points in modern region `NER`; the point match is not a claim that all of modern Niger shared those 1900 boundaries.

## Recommended simulation model and integration boundary

Keep three identities distinct:

1. **Geographic settlement / modern region**: stable Natural Earth settlement IDs and the `modernRegionId` used for display and coordinate lookup.
2. **Historical territorial unit**: a CShapes GW unit ID, with its baseline political status and source provenance.
3. **Sovereign polity**: the 1900 authority identified by `sovereignGwCode`; for an independent state, it is its own `gwCode`; for dependencies it is the dataset's recorded owner.

At an eligible fresh 1900 Earth-world creation, the sovereignty package maps each settlement point to a historical unit and resolves its sovereignty-holder code. CShapes codebook defines `status` values 1–5 (independent, colony, protectorate, leased territory, occupied) and says `ruledby` gives the GW code of the state holding sovereignty for dependencies; its examples identify British colonies as ruled by GW 200. Thus Cuba's 1900 occupied record (GW 40) is controlled by the United States (GW 2), and occupied Bosnia/Herzegovina (GW 3461/3462) by Austria-Hungary (GW 300)—the modern local region ID is not a substitute controller. [CShapes 2.0 codebook](https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf). Sovereignty holders are initialized only when their crosswalk target exists. A small set of four 1900 independent authorities without one-to-one modern ISO polity identities is explicitly materialized as `historical-gw-300/563/564/730`, using source unit names, no leader identity, zero treasury and no invented population. Other unrepresented successors remain unknown rather than receiving a neighboring or name-based guess. Existing or later worlds receive reference-only records and keep current control. The package keeps dependent territorial status beside sovereign authority; it does not rewrite `Settlement.polityId`, which remains the modern geography/controller key for existing systems. GW numeric codes are not ISO3 country codes.

After initialization, the simulator should own all political changes. The baseline status can affect institutions, rights, tax extraction, representation, local organization, resistance and secession pressures, but it should not schedule independence or border changes by year. If a real-world CShapes transition is useful to the player, treat it as a conditional historical reference/pressure whose preconditions can fail. Autonomous agency, negotiations, reform, rebellion, conquest, or dissolution must determine actual outcomes. CShapes' 1901–2019 rows should not be replayed as forced updates.

The package exports `materializeHistoricalAuthorities`, `initializeSovereignty`, `applyHistoricalStartControl`, `authorityAt`, `foreignAuthority`, `remitSovereignRevenue`, `diplomacyDecision`, `diplomaticCamp`, `enforceDependentDiplomacy`, `synchronizeSovereigntyControl`, and the crisis/organization/cost-validated `requestSovereigntyTransition`. The fresh-world factory should call `applyHistoricalStartControl` before initializing geopolitics, industry, or leadership: it sets `Settlement.regionId` to the source modern region, sets `Settlement.polityId` to a known current historical authority, stores the original modern polity registry, distributes existing treasury by source-city cohort population, computes military/research as population-weighted capability indices (never sums them as inventories), and removes empty modern polities whose money was transferred. It conserves treasury and creates no new people; unmatched or unmapped settlements retain their local controller and region. Month-positive worlds receive reference-only data and are never retagged. Authority is persisted on the runtime world in the package-owned `sovereignty` extension; integration must arrange serialization, apply remittances from the fiscal system, and call dependent-diplomacy enforcement before combat. Queries derive uncommitted changes from the live `Settlement.polityId` without mutating the stored baseline. After each committed capture/recapture event, the canonical writer should call `synchronizeSovereigntyControl(world, [settlementId], event.id)`; this records current controller provenance and allows a location to return to its original modern polity without falling back to its 1900 sovereign. Historical authority polities are included by `diplomaticCamp` with modern regions whose complete known point authority matches; the current geopolitics and supply systems still need to decide how to represent mixed modern regions such as Transvaal plus Orange Free State. Autonomy changes local administration/controller while keeping the old sovereign for foreign diplomacy; this module's sovereign-remittance API sends the entire requested sovereign tax to the parent, with any local retention share left to a separate fiscal rule. Independence needs local crisis, organization support/cost and parent-authority collapse (legitimacy <= 0.2 or a six-month active war with parent supply fulfillment <= 0.15); a legal-consent route is not yet modeled. A missing target can only be reactivated from the preserved registry and starts without duplicated treasury, military, research or leader identity. The transition updates actual settlement owner and source event/control-change provenance; it never follows a calendar schedule. Existing independent APIs/core control remain the integration caller's responsibility. Historical units with overlapping administrative authority and contested borders require additional review before finer-grained map interaction.

## Source and license record

- Dataset authors: Guy Schvitz, Seraina Rüegger, Luc Girardin, Lars-Erik Cederman, Nils Weidmann, Kristian Skrede Gleditsch.
- Dataset page and downloads: <https://icr.ethz.ch/data/cshapes/>.
- Official archive URL used by importer: <https://icr.ethz.ch/data/cshapes/cshapes_2.0.tar.gz>.
- Official codebook: <https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf>.
- Paper DOI: <https://doi.org/10.1177/00220027211013563>.
- CShapes dataset license stated by authors: **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International**.
- Current Earth modern settlement points: Natural Earth, declared in the source `geography.json` as public domain. That license does not alter CShapes' license.
