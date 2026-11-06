# Phase 15 — Historical Coverage Report

Date: 2026-11-05  
Index schema: `1.0.0`  
Data root: `packages/v4/history-db/data/`  
Status: **curated reference index delivered. Runtime loader/query (`packages/v4/history-db/index.ts`) and deterministic five-year review (`review.ts`) are now integrated; this report still covers only the data contents and their limits.**

This document reports the real contents of the new historical index and its limits. It is not a claim of complete historical coverage. The index is reference material for a game that may diverge; it is not a timeline script, not world state and not a substitute for primary-source research.

## 1. What was delivered

The index is a set of versioned JSON collections plus a versioned JSON Schema. Every country, city, person and event record carries:

- a stable `id` and `recordType`;
- a `date` range and precision;
- `countryCodes` and `regionCodes`;
- `title`, `sourceIds`, `sourceType` (`fact`, `inference` or `fiction`) and `confidence` in `0..1`;
- optional `causalTags`, plus type-specific fields;
- `curation: "curated_reference"` (or `"curated_fiction"` only in the separate fiction file).

The `sourceType` field means:

| Value | Meaning in this index | Count |
|---|---|---:|
| `fact` | A sourced identity, place, date or event attribution. The index records the attribution, not a claim of primary archival verification for every detail. | 428 |
| `inference` | An explicitly synthesized aggregate or period condition, not a discrete event; the `inferenceNote` states why. | 8 |
| `fiction` | A counterfactual hook that did **not** happen as described. Stored only in `fiction-hooks.json` with `confidence: 0`. | 10 |

Total content records: **446** (plus 517 citation records). All existing source files were left unchanged; this phase adds only the data files below and this report.

## 2. Files and checksums

All collections are sorted lexicographically by stable `id`. Countries sort by lowercase ISO3, cities/people/sources by slug, events by their ISO-date-prefixed id, and fiction hooks by slug. Strings are written as UTF-8 with two-space indentation and a trailing newline. `manifest.json` stores SHA-256 over the exact bytes of each collection and states the fixed file order. It does not checksum itself.

| File | Record type | Records | Bytes | SHA-256 (first 16 hex) |
|---|---|---:|---:|---|
| `countries.json` | country | 79 | 143,811 | `2769a115599c091a…` |
| `cities.json` | city | 166 | 190,317 | `2c97b848b0397636…` |
| `people.json` | person | 93 | 131,694 | `76b347e3df0adbd3…` |
| `events.json` | event | 98 | 105,597 | `ed9329f5fb981f6b…` |
| `fiction-hooks.json` | fiction_hook | 10 | 19,878 | `7ea2726036201bb4…` |
| `sources.json` | source | 517 | 238,570 | `cad03693fddc41c9…` |
| `manifest.json` | manifest | — | 9,608 | not self-checksummed |
| `historical-index.schema.json` | schema | — | 24,941 | schema document |

Machine-readable counts, cross-tabs and full checksums are in `manifest.json`. The schema is `historical-index.schema.json` with `$id` `https://world-simulator.local/schemas/historical-index/1.0.0/historical-index.schema.json`. The JSON files are checksummed byte-for-byte; reformatting them without regenerating the manifest will invalidate the checksums.

## 3. Exact counts by record type

| Record type | Records | `fact` | `inference` | `fiction` |
|---|---:|---:|---:|---:|
| country | 79 | 79 | 0 | 0 |
| city | 166 | 166 | 0 | 0 |
| person | 93 | 93 | 0 | 0 |
| event | 98 | 90 | 8 | 0 |
| fiction_hook | 10 | 0 | 0 | 10 |

`source` records are citations, not historical content records. They are counted separately: **517**.

## 4. Coverage by geography

### 4.1 Countries by region tag

A country can carry more than one region tag (for example Mexico is both `NORTH_AMERICA` and `LATIN_AMERICA`; Turkey is `EUROPE` and `WEST_ASIA`). The counts below are tag counts, so they sum to more than 79.

| Region code | Countries | Share of 79 |
|---|---:|---:|
| `EUROPE` | 38 | 48.1% |
| `ASIA` | 17 | 21.5% |
| `AFRICA` | 12 | 15.2% |
| `NORTHERN_EUROPE` | 9 | 11.4% |
| `LATIN_AMERICA` | 8 | 10.1% |
| `SOUTHEAST_EUROPE` | 8 | 10.1% |
| `CENTRAL_EUROPE` | 6 | 7.6% |
| `SOUTHEAST_ASIA` | 6 | 7.6% |
| `SOUTH_AMERICA` | 6 | 7.6% |
| `WESTERN_EUROPE` | 6 | 7.6% |
| `WEST_ASIA` | 5 | 6.3% |
| `EASTERN_EUROPE` | 4 | 5.1% |
| `EAST_AFRICA` | 4 | 5.1% |
| `EAST_ASIA` | 4 | 5.1% |
| `SOUTHERN_EUROPE` | 4 | 5.1% |
| `NORTH_AFRICA` | 3 | 3.8% |
| `NORTH_AMERICA` | 3 | 3.8% |
| `SOUTH_ASIA` | 3 | 3.8% |
| `WEST_AFRICA` | 3 | 3.8% |
| `AUSTRALASIA` | 2 | 2.5% |
| `OCEANIA` | 2 | 2.5% |
| `CARIBBEAN` | 1 | 1.3% |
| `CENTRAL_AFRICA` | 1 | 1.3% |
| `SOUTHERN_AFRICA` | 1 | 1.3% |

Europe has 38 countries, the Americas 10 country records with an Americas tag (the tag counts overlap), Asia 17, Africa 12 and Oceania 2.

### 4.2 Events by country

An event can involve several countries, so these are tag counts. 57 of 79 countries appear in at least one event.

| Code | Country | Events |
|---|---|---:|
| `AUT` | Austria | 37 |
| `DEU` | Germany | 37 |
| `RUS` | Russia | 29 |
| `FRA` | France | 28 |
| `USA` | United States | 28 |
| `GBR` | United Kingdom | 27 |
| `ITA` | Italy | 16 |
| `HUN` | Hungary | 12 |
| `SRB` | Serbia | 12 |
| `CZE` | Czech Republic | 10 |
| `SVK` | Slovakia | 9 |
| `BIH` | Bosnia and Herzegovina | 8 |
| `CHN` | China | 8 |
| `JPN` | Japan | 8 |
| `BEL` | Belgium | 7 |
| `TUR` | Turkey | 7 |
| `GRC` | Greece | 6 |
| `NLD` | Netherlands | 6 |
| `HRV` | Croatia | 5 |
| `POL` | Poland | 5 |
| `BGR` | Bulgaria | 4 |
| `BLR` | Belarus | 4 |
| `CAN` | Canada | 4 |
| `LUX` | Luxembourg | 4 |
| `UKR` | Ukraine | 4 |
| `DNK` | Denmark | 3 |
| `EST` | Estonia | 3 |
| `LTU` | Lithuania | 3 |
| `LVA` | Latvia | 3 |
| `MDA` | Moldova | 3 |
| `ROU` | Romania | 3 |
| `SVN` | Slovenia | 3 |
| `ALB` | Albania | 2 |
| `AUS` | Australia | 2 |
| `ESP` | Spain | 2 |
| `FIN` | Finland | 2 |
| `IND` | India | 2 |
| `KOR` | South Korea | 2 |
| `MKD` | North Macedonia | 2 |
| `NOR` | Norway | 2 |
| `PRT` | Portugal | 2 |
| `ZAF` | South Africa | 2 |
| `BRA` | Brazil | 1 |
| `CUB` | Cuba | 1 |
| `EGY` | Egypt | 1 |
| `IDN` | Indonesia | 1 |
| `IRL` | Ireland | 1 |
| `IRN` | Iran | 1 |
| `ISL` | Iceland | 1 |
| `ISR` | Israel | 1 |
| `MYS` | Malaysia | 1 |
| `NZL` | New Zealand | 1 |
| `PHL` | Philippines | 1 |
| `PRK` | North Korea | 1 |
| `SAU` | Saudi Arabia | 1 |
| `SGP` | Singapore | 1 |
| `THA` | Thailand | 1 |

Countries with no event tag in this index (22): `ARG` Argentina, `BGD` Bangladesh, `CHE` Switzerland, `CHL` Chile, `COD` Democratic Republic of the Congo, `COL` Colombia, `DZA` Algeria, `ETH` Ethiopia, `GHA` Ghana, `IRQ` Iraq, `KEN` Kenya, `MAR` Morocco, `MEX` Mexico, `NGA` Nigeria, `PAK` Pakistan, `PER` Peru, `SEN` Senegal, `SWE` Sweden, `TZA` Tanzania, `UGA` Uganda, `VEN` Venezuela, `VNM` Vietnam. This is a deliberate coverage gap, not an assertion that nothing happened there.

### 4.3 Cities by country

All 79 indexed countries have at least one city record. The distribution is deliberately uneven: Europe and the former Habsburg area are denser.

| Code | Country | Cities |
|---|---|---:|
| `DEU` | Germany | 10 |
| `AUT` | Austria | 7 |
| `ITA` | Italy | 7 |
| `GBR` | United Kingdom | 6 |
| `USA` | United States | 6 |
| `ESP` | Spain | 5 |
| `FRA` | France | 5 |
| `POL` | Poland | 5 |
| `AUS` | Australia | 4 |
| `CHE` | Switzerland | 4 |
| `CHN` | China | 4 |
| `IND` | India | 4 |
| `NLD` | Netherlands | 4 |
| `BEL` | Belgium | 3 |
| `CAN` | Canada | 3 |
| `CZE` | Czech Republic | 3 |
| `HUN` | Hungary | 3 |
| `JPN` | Japan | 3 |
| `TUR` | Turkey | 3 |
| `UKR` | Ukraine | 3 |
| `BGR` | Bulgaria | 2 |
| `BRA` | Brazil | 2 |
| `EGY` | Egypt | 2 |
| `GRC` | Greece | 2 |
| `HRV` | Croatia | 2 |
| `MAR` | Morocco | 2 |
| `NZL` | New Zealand | 2 |
| `PRT` | Portugal | 2 |
| `ROU` | Romania | 2 |
| `RUS` | Russia | 2 |
| `SRB` | Serbia | 2 |
| `SVK` | Slovakia | 2 |
| `SWE` | Sweden | 2 |
| `VNM` | Vietnam | 2 |
| `ZAF` | South Africa | 2 |
| `ALB` | Albania | 1 |
| `ARG` | Argentina | 1 |
| `BGD` | Bangladesh | 1 |
| `BIH` | Bosnia and Herzegovina | 1 |
| `BLR` | Belarus | 1 |
| `CHL` | Chile | 1 |
| `COD` | Democratic Republic of the Congo | 1 |
| `COL` | Colombia | 1 |
| `CUB` | Cuba | 1 |
| `DNK` | Denmark | 1 |
| `DZA` | Algeria | 1 |
| `EST` | Estonia | 1 |
| `ETH` | Ethiopia | 1 |
| `FIN` | Finland | 1 |
| `GHA` | Ghana | 1 |
| `IDN` | Indonesia | 1 |
| `IRL` | Ireland | 1 |
| `IRN` | Iran | 1 |
| `IRQ` | Iraq | 1 |
| `ISL` | Iceland | 1 |
| `ISR` | Israel | 1 |
| `KEN` | Kenya | 1 |
| `KOR` | South Korea | 1 |
| `LTU` | Lithuania | 1 |
| `LUX` | Luxembourg | 1 |
| `LVA` | Latvia | 1 |
| `MDA` | Moldova | 1 |
| `MEX` | Mexico | 1 |
| `MKD` | North Macedonia | 1 |
| `MYS` | Malaysia | 1 |
| `NGA` | Nigeria | 1 |
| `NOR` | Norway | 1 |
| `PAK` | Pakistan | 1 |
| `PER` | Peru | 1 |
| `PHL` | Philippines | 1 |
| `PRK` | North Korea | 1 |
| `SAU` | Saudi Arabia | 1 |
| `SEN` | Senegal | 1 |
| `SGP` | Singapore | 1 |
| `SVN` | Slovenia | 1 |
| `THA` | Thailand | 1 |
| `TZA` | Tanzania | 1 |
| `UGA` | Uganda | 1 |
| `VEN` | Venezuela | 1 |

Cities in Europe: 101 of 166; Africa 15; Asia 26; the Americas 18; Oceania 6.

### 4.4 People by country tag

A person can carry more than one country tag (for example exile or birth/activity countries), so these are tag counts.

| Code | Country | People |
|---|---|---:|
| `AUT` | Austria | 54 |
| `DEU` | Germany | 13 |
| `USA` | United States | 12 |
| `GBR` | United Kingdom | 10 |
| `CZE` | Czech Republic | 6 |
| `FRA` | France | 6 |
| `RUS` | Russia | 6 |
| `BIH` | Bosnia and Herzegovina | 3 |
| `CHE` | Switzerland | 3 |
| `HUN` | Hungary | 3 |
| `ITA` | Italy | 2 |
| `POL` | Poland | 2 |
| `SRB` | Serbia | 2 |
| `SWE` | Sweden | 2 |
| `ESP` | Spain | 1 |
| `HRV` | Croatia | 1 |
| `IRL` | Ireland | 1 |
| `NLD` | Netherlands | 1 |
| `SVK` | Slovakia | 1 |
| `SVN` | Slovenia | 1 |
| `TUR` | Turkey | 1 |

People in Europe: 91 of 93.

## 5. Coverage by time and event type

### 5.1 Events by decade

Decade is assigned by event start year. The `2000` bucket contains the single 2000 event.

| Decade | Events | Share of 98 |
|---|---:|---:|
| 1900s | 7 | 7.1% |
| 1910s | 21 | 21.4% |
| 1920s | 7 | 7.1% |
| 1930s | 10 | 10.2% |
| 1940s | 19 | 19.4% |
| 1950s | 7 | 7.1% |
| 1960s | 6 | 6.1% |
| 1970s | 3 | 3.1% |
| 1980s | 7 | 7.1% |
| 1990s | 10 | 10.2% |
| 2000 | 1 | 1.0% |

The 1910s and 1940s dominate because the index contains both world wars, their Austrian/Viennese consequences and the Holocaust. The 1970s are the thinnest decade (three events).

### 5.2 Event date precision

| Precision | Events |
|---|---:|
| `day` | 88 |
| `month` | 7 |
| `year` | 3 |

All 90 `fact` events use day or month precision. The three year-precision records are inference aggregates. 7 events use month precision because the exact day is disputed, unknown or the phenomenon is a wave/period.

### 5.3 Events by type

| Event type | Events |
|---|---:|
| `war` | 21 |
| `politics` | 18 |
| `economic` | 8 |
| `institution` | 7 |
| `revolution` | 7 |
| `treaty` | 6 |
| `cold_war` | 4 |
| `migration` | 4 |
| `persecution` | 4 |
| `diplomacy` | 3 |
| `epidemic` | 2 |
| `peace` | 2 |
| `reform` | 2 |
| `annexation` | 1 |
| `culture` | 1 |
| `disaster` | 1 |
| `genocide` | 1 |
| `justice` | 1 |
| `liberation` | 1 |
| `protest` | 1 |
| `science` | 1 |
| `social_movement` | 1 |
| `terrorism` | 1 |

War, politics, institutions, treaties and economic crisis dominate. Culture, science, disaster, protest and genocide are present but thin. That reflects the source selection and the Vienna/Austria/Europe focus, not a claim that other themes are unimportant.

## 6. Vienna, Austria and Europe depth

The depth target is real, not just a label:

- **Austria:** 7 city records, 37 event country tags, 54 people records with an `AUT` tag.
- **Vienna:** 29 event records are associated with `city:vie`, including cultural, political, economic, persecution, war, occupation, reconstruction and EU-accession material.
- **Europe:** 38 countries, 101 cities, 91 people and 83 events carry a `EUROPE` tag; 51 events carry `CENTRAL_EUROPE`.

### 6.1 Selected Vienna-associated events

The table lists every event whose `placeCityIds` includes `city:vie`. It is not a prescribed sequence: the runtime may use one, several, or none, depending on world state.

| Event id | Date | Source type | Title |
|---|---|---|---:|
| `event:1900-1910-vienna-population-growth` | 1900 → 1910 | inference | Rapid population growth in Vienna |
| `event:1902-wednesday-psychological-society` | 1902-10 | fact | Wednesday Psychological Society begins meeting in Vienna |
| `event:1907-austria-suffrage` | 1907-01-26 | fact | Universal male suffrage adopted in Cisleithania |
| `event:1914-july-crisis` | 1914-06-28 → 1914-08-04 | fact | July Crisis |
| `event:1914-wwi` | 1914-07-28 → 1918-11-11 | fact | World War I |
| `event:1916-franz-joseph-death` | 1916-11-21 | fact | Death of Emperor Franz Joseph I |
| `event:1918-1919-vienna-influenza-impact` | 1918-10 → 1919-03 | inference | Influenza reaches Vienna |
| `event:1918-german-austria` | 1918-11-12 | fact | Republic of German-Austria declared |
| `event:1919-1922-vienna-housing-crisis` | 1919 → 1922 | inference | Postwar housing crisis in Vienna |
| `event:1920-austrian-constitution` | 1920-10-01 | fact | Austrian Federal Constitution adopted |
| `event:1922-geneva-protocols` | 1922-10-04 | fact | League of Nations loan to Austria |
| `event:1927-july-revolt` | 1927-07-15 | fact | July Revolt in Vienna |
| `event:1930-1938-austrian-depression` | 1930 → 1938-02 | inference | Depression-era unemployment in Austria |
| `event:1931-creditanstalt` | 1931-05-11 | fact | Creditanstalt banking crisis |
| `event:1934-austrian-civil-war` | 1934-02-12 → 1934-02-16 | fact | Austrian Civil War |
| `event:1934-dollfuss-assassination` | 1934-07-25 | fact | Assassination of Engelbert Dollfuss |
| `event:1938-anschluss` | 1938-03-12 | fact | Anschluss: Austria annexed by Nazi Germany |
| `event:1938-kristallnacht` | 1938-11-09 → 1938-11-10 | fact | Kristallnacht pogrom |
| `event:1945-1947-vienna-food-fuel-crisis` | 1945-04 → 1947-12 | inference | Food and fuel crisis in occupied Vienna |
| `event:1945-vienna-offensive` | 1945-04-06 → 1945-04-13 | fact | Vienna Offensive |
| `event:1945-second-republic` | 1945-04-27 | fact | Second Austrian Republic proclaimed |
| `event:1948-marshall-plan` | 1948-04-03 → 1951-12-31 | fact | Marshall Plan |
| `event:1955-state-treaty` | 1955-05-15 | fact | Austrian State Treaty |
| `event:1955-austrian-neutrality` | 1955-10-26 | fact | Austrian Declaration of Neutrality |
| `event:1956-1957-hungarian-refugees-austria` | 1956-11 → 1957-12 | inference | Hungarian refugees arrive in Austria |
| `event:1968-1969-czechoslovak-refugees-austria` | 1968-08 → 1969-12 | inference | Czechoslovak refugees after the Prague Spring |
| `event:1989-1991-austrian-eastern-border-opening` | 1989-09 → 1991-12 | inference | Opening of Austria’s eastern borders |
| `event:1995-austria-eu` | 1995-01-01 | fact | Austria joins the European Union |
| `event:2000-fpo-coalition` | 2000-02-04 | fact | Austrian Freedom Party enters government |

### 6.2 Required major-event check

All requested major anchors are present with month precision where known. Some are represented by more than one record because a crisis, a war and a liberation are different candidate hooks.

| Requested anchor | Event id | Date | Precision |
|---|---|---|---|
| 1914 July Crisis / WWI | `event:1914-july-crisis` | 1914-06-28 → 1914-08-04 | day |
| 1914 July Crisis / WWI | `event:1914-wwi` | 1914-07-28 → 1918-11-11 | day |
| 1918 influenza pandemic | `event:1918-influenza` | 1918-03 → 1920-03 | month |
| 1929 Wall Street Crash | `event:1929-wall-street-crash` | 1929-10-24 → 1929-10-29 | day |
| 1938 Anschluss | `event:1938-anschluss` | 1938-03-12 | day |
| 1939–45 World War II | `event:1939-wwii` | 1939-09-01 → 1945-09-02 | day |
| 1945 liberation / end of war | `event:1945-vienna-offensive` | 1945-04-06 → 1945-04-13 | day |
| 1945 liberation / end of war | `event:1945-second-republic` | 1945-04-27 | day |
| 1945 liberation / end of war | `event:1945-germany-surrender` | 1945-05-08 | day |
| 1948 Marshall Plan | `event:1948-marshall-plan` | 1948-04-03 → 1951-12-31 | day |
| 1956 Hungarian uprising | `event:1956-hungarian-uprising` | 1956-10-23 → 1956-11-10 | day |
| 1968 Prague Spring | `event:1968-prague-spring` | 1968-01-05 → 1968-08-21 | day |
| 1968 Prague Spring | `event:1968-warsaw-pact-invasion` | 1968-08-20 → 1968-08-21 | day |
| 1989 fall of the Berlin Wall | `event:1989-berlin-wall-fall` | 1989-11-09 | day |

## 7. Sourced vs inferred vs fiction

### 7.1 Source types by record

| Type | Fact | Inference | Fiction |
|---|---:|---:|---:|
| Country | 79 | 0 | 0 |
| City | 166 | 0 | 0 |
| Person | 93 | 0 | 0 |
| Event | 90 | 8 | 0 |
| Fiction hook | 0 | 0 | 10 |

**Fact** here means the identity/date/place/event is attributed to a cited source and is not invented. Country existence periods are a curated periodization of sourced state changes; they are simplified to year boundaries and are not a polygon-level sovereignty claim. City coordinates are modern city-centre points from Wikipedia, rounded to four decimals. People dates are Wikidata values, accessed 2026-11-05.

**Inference** records are not disguised facts. They are aggregate conditions or periods where a precise event date would be false precision. All eight are marked with `sourceType: "inference"` and an `inferenceNote`.

| Event id | Date | Confidence | Why it is inference |
|---|---|---:|---|
| `event:1900-1910-vienna-population-growth` | 1900 → 1910 | 0.70 | Aggregate trend, not a single dated event. The exact population figures depend on census boundaries and are not asserted here. |
| `event:1918-1919-vienna-influenza-impact` | 1918-10 → 1919-03 | 0.58 | The global pandemic is documented; the precise Vienna wave timing and death toll are synthesized from secondary accounts and should be checked against local archives. |
| `event:1919-1922-vienna-housing-crisis` | 1919 → 1922 | 0.65 | A synthesized condition rather than a discrete event; exact dates of shortage peaks are uncertain. |
| `event:1930-1938-austrian-depression` | 1930 → 1938-02 | 0.72 | Aggregate condition; unemployment statistics for the period are contested and are not reproduced here. |
| `event:1945-1947-vienna-food-fuel-crisis` | 1945-04 → 1947-12 | 0.68 | A synthesized period condition; local supply varied by district and by occupation zone. |
| `event:1956-1957-hungarian-refugees-austria` | 1956-11 → 1957-12 | 0.75 | The refugee flow is well documented; the exact number assisted in Austria varies by source and period. |
| `event:1968-1969-czechoslovak-refugees-austria` | 1968-08 → 1969-12 | 0.62 | A synthesized migration period; precise counts and duration of stay require archival verification. |
| `event:1989-1991-austrian-eastern-border-opening` | 1989-09 → 1991-12 | 0.70 | Aggregate transition; exact dates differ by border crossing and by the collapse of the Hungarian and Czechoslovak regimes. |

**Fiction** hooks are in a separate file, have `confidence: 0`, and carry a disclaimer, `fiction: true`, `notHistoricalClaim: true`, anchor event ids and explicit constraints. They are not forecasts and must never be loaded by the reference path.

### 7.2 Fiction hooks (separate file)

| Hook id | Divergence date | Anchors | Premise |
|---|---|---|---|
| `fiction:1914-july-crisis-deescalation` | 1914-07-25 | `event:1914-july-crisis`, `event:1914-sarajevo-assassination` | The July Crisis is mediated |
| `fiction:1918-austria-hungary-federal-reform` | 1918-10-01 | `event:1918-czechoslovak-declaration`, `event:1918-austro-hungarian-armistice` | The Habsburg monarchy federalizes |
| `fiction:1931-vienna-banking-ring` | 1931-05-11 | `event:1931-creditanstalt`, `event:1929-wall-street-crash` | Vienna’s banks form a rescue ring |
| `fiction:1934-austria-avoids-civil-war` | 1934-02-12 | `event:1934-austrian-civil-war`, `event:1934-dollfuss-assassination` | Austria avoids civil war in 1934 |
| `fiction:1938-anschluss-referendum` | 1938-03-12 | `event:1938-anschluss`, `event:1938-kristallnacht` | Austria holds an independent referendum |
| `fiction:1945-vienna-four-sector-city` | 1945-04-13 | `event:1945-vienna-offensive`, `event:1945-second-republic` | Vienna is divided into four sectors |
| `fiction:1956-hungary-revolution-survives` | 1956-10-23 | `event:1956-hungarian-uprising` | The Hungarian Revolution survives |
| `fiction:1968-prague-spring-federation` | 1968-01-05 | `event:1968-prague-spring`, `event:1968-warsaw-pact-invasion` | The Prague Spring becomes a negotiated federation |
| `fiction:1989-berlin-wall-opens-early` | 1989-10-09 | `event:1989-berlin-wall-fall`, `event:1989-velvet-revolution` | The Berlin Wall opens earlier |
| `fiction:1991-yugoslavia-negotiated-dissolution` | 1991-06-25 | `event:1991-yugoslav-wars`, `event:1992-bosnian-war` | Yugoslavia dissolves by negotiation |

The fiction file is `packages/v4/history-db/data/fiction-hooks.json`. It is deliberately not part of `events.json`.

### 7.3 Confidence

| Record type | Min | Max | Mean |
|---|---:|---:|---:|
| Country | 0.96 | 0.99 | 0.974 |
| City | 0.94 | 0.98 | 0.980 |
| Person | 0.97 | 0.99 | 0.989 |
| Event | 0.58 | 0.99 | 0.960 |
| Fiction hook | 0.00 | 0.00 | 0.000 |

Confidence is an epistemic/date-attribution judgement, not a probability that the event will occur in a simulation. It should not be used as a game-event probability without calibration.

## 8. Known gaps and limitations

These are real gaps, not caveats to hide scope reduction.

1. **Not full coverage.** The index has 79 countries, 166 cities, 93 people and 98 events. It is a curated baseline, not a world gazetteer or a complete event catalogue.
2. **Geographic skew.** Europe has 38 countries, 101 cities, 91 people and 83 event tags. Africa has 12 countries, 15 cities and 2 events involving an African country; Asia has 17 countries, 26 cities and 14 events; Latin America has 8 country tags, 9 city tags and 2 events. 22 countries have no event in the index at all.
3. **Temporal skew.** The 1910s (21 events) and 1940s (19) dominate. The 1970s have 3 events; the 1900s have 7; 2000 has 1. Vienna in the 1950s–1980s is represented mainly through state treaty, neutrality, refugee and Cold War hooks, not everyday social history.
4. **Thematic skew.** High politics, war, diplomacy, institutions and economic crisis are over-represented relative to labour history, gender history, migration history, colonial history, education, health, sport, media and everyday life. Culture has one dedicated event (the 1902 Wednesday circle); science one (Apollo 11); disaster one (Chernobyl).
5. **Elite and canonical bias in people.** The 93 people are mostly famous politicians, artists, scientists and intellectuals. Workers, peasants, colonial subjects, women without famous public roles, Roma, and other marginalized groups are under-represented. The index does not give them scripted fates, but it also does not claim to represent them adequately.
6. **No primary archival verification.** Most citations are Wikipedia (tertiary) and Wikidata (structured data). The index does not reproduce archival documents, census records, police files or contemporary newspapers. Dates, especially month-level dates, should be checked against specialist literature before academic use.
7. **Sensitive and contested events.** The Armenian genocide, the Holocaust, the Srebrenica massacre, the Kosovo War and the Tiananmen Square crackdown are described with confidence below 1 and with explicit caveats where the historical record is contested or the legal characterization is disputed. The index does not adjudicate every historiographical debate.
8. **Simplified country periodization.** Existence periods use year boundaries and modern ISO3 codes. They do not model border polygons, competing sovereignties, colonial administration, military occupation zones or subnational autonomy. A country record is not a claim of continuous state identity.
9. **Modern city points.** Coordinates are modern city-centre points, not 1900 urban footprints. City boundaries, populations and names changed repeatedly.
10. **No calibrated game weights.** `causalTags` and `candidateHooks` are vocabulary for a runtime, not a causal model. The index does not assert that an event will happen, that it will have the same outcome, or that its real-world severity is the correct game weight.
11. **Fiction hooks are not forecasts.** They are ten bounded counterfactual premises for an explicit counterfactual mode; they are not predictions, not alternate-history canon and not evidence about real people.
12. **No runtime integration in this deliverable.** The index is data plus this report. No existing source file was modified. A loader, query API, candidate-weight calibration and engine integration remain future work.

## 9. How the runtime must avoid mixing real-world and simulated history

The index is **read-only reference material**. The simulator remains the sole canonical writer of world state, revisions, journals, historical events and outbox records. Recommended rules:

### 9.1 Separate loaders and modes

- A `reference` loader may load `historical-index.schema.json`, `countries.json`, `cities.json`, `people.json`, `events.json` and `sources.json`.
- It must **reject** `fiction-hooks.json`; fiction is not reference.
- A `counterfactual` loader may load `fiction-hooks.json` only after an explicit user/world-level opt-in. It must never merge fiction into the reference collections.
- A world should record which mode it uses (`historical_reference`, `pure_fiction` or `counterfactual`) and expose it in the UI.

### 9.2 Validate before use

- Validate every collection against the schema and verify the manifest SHA-256 values.
- Resolve every `sourceIds`, `capitalCityId`, `placeCityIds` and `anchorEventIds` reference before accepting the index.
- Reject unknown country codes, city ids, event ids or schema versions; do not guess or silently drop a reference.
- Reject `fiction` records in the reference path and reject `confidence: 0` records as factual candidates.

### 9.3 Never copy an index event as a committed event

An index event is a **candidate**, not a world event. When a world uses one, the simulator must create a new world-local record with:

- a new world event id;
- the actual world date, participants, causes and outcome;
- provenance pointing back to the index record, for example:

```json
{
  "kind": "historical_candidate",
  "indexId": "world-simulator-historical-index-1900-2000",
  "recordId": "event:1914-july-crisis",
  "sourceType": "fact",
  "usedAs": "weight_only"
}
```

The committed event's `sourceType` remains `fact`/`inference`/`fiction` metadata; it is not a claim that the real-world event happened in this world. The journal and replay must derive from committed world events, never from the index.

### 9.4 Dates are conditions, not schedules

- The index `date` is a reference date, not a trigger. A world may reach 1938 without an Anschluss, or never reach it.
- Candidate events should be filtered by actual world state: borders, alliances, organizations, public opinion, economic conditions, persecution, war exposure and prior divergences.
- A later real event must not rewrite an earlier committed divergence. If the world has already diverged, the index is a source of plausible pressures, not a reset button.
- A 4–6 year review may compare the world to the index and record divergences. It may add new candidates; it may not overwrite committed events or force the real timeline.

### 9.5 People are identities, not fates

- A person record supplies identity, dates, occupation and public activity, not a script.
- `notScriptedFate: true` is a hard rule: do not auto-assassinate Franz Ferdinand, auto-exile Freud, auto-imprison Havel or auto-elect anyone.
- Historical people may die earlier or later, change allegiance, fail, disappear or act against their real-world record. Their real-world death dates are metadata, not world physics.
- Do not place a player's newborn into a famous historical family; the existing Vienna content deliberately uses empty guardian ids for that reason.

### 9.6 Keep reference and world labels distinct

- UI labels should distinguish “reference history” from “this world”. A real-world event card must not look like a committed event in the player's journal.
- Hover/tap previews may show “real-world reference, not this world's history”.
- Replay/catch-up must read the committed journal; it must not reconstruct a timeline from the index or from generic LLM memory.

### 9.7 Fail closed

- If a source, country, city, person or anchor is missing, the loader should fail or skip with a visible diagnostic. It should not invent a replacement.
- If a model proposes a new historical candidate, it must compile to the same bounded record schema and pass validation; model prose alone is not a world event.
- If a model fails, deterministic fallback content keeps the clock running; the index is not a blocking external dependency.

## 10. Verification performed

- **JSON Schema:** all seven JSON files (`countries`, `cities`, `people`, `events`, `fiction-hooks`, `sources`, `manifest`) validate against `historical-index.schema.json` (JSON Schema draft 2020-12, Python `jsonschema` 4.10.3). Result: **OK**.
- **Structural validator:** 0 errors. It checked unique ids, required fields, date ranges, source resolution, country/city references, fiction anchors, existence-period coverage, manifest counts and SHA-256 checksums. Result: **0 errors**.
- **Wikipedia citations:** 414 Wikipedia citation records covering 413 unique URLs (79 country pages, 79 history pages, 166 city pages, 90 event pages; the Singapore country and city records cite the same page). All 413 unique URLs returned HTTP 200 on 2026-11-05 after following redirects. Three initially missing pages (`July Revolt`, `Federal Constitutional Law of 1920`, `Declaration of Neutrality (Austria)`) were replaced with the correct live titles before the final check.
- **Wikidata citations:** 93 unique QIDs; all resolved through the Wikidata API on 2026-11-05.
- **Special citations:** EU history, Federal Reserve History, NATO, UN and the CDC archived 1918 influenza page returned HTTP 200. The IAEA Chernobyl page returned HTTP 403 to the build environment; the four USHMM encyclopedia pages timed out under bot protection. Their URLs are retained as canonical citations with `verification: "blocked"` and a note, not silently treated as fetched.
- **Checksums:** the manifest SHA-256 values were recomputed from the exact file bytes and matched.
- **No production deployment, paid resource or external secret was used.**

## 11. Acceptance status

| Requirement | Status | Evidence |
|---|---|---|
| Versioned JSON Schema for countries, cities, people, events | **Done** | `historical-index.schema.json`, `$id` version `1.0.0` |
| At least 40 countries with ISO3-like codes and 1900–2000 existence notes | **Done** | 79 country records; existence periods cover 1900–2000 |
| At least 50 cities with country codes and coordinates | **Done** | 166 city records; all have coordinates |
| At least 25 real Vienna/Europe people with dates and Wikidata/URL sources | **Done** | 93 person records; all have Wikidata QIDs |
| Major events with month precision where known | **Done** | 98 event records; 90 fact, 8 inference; requested anchors listed in §6.2 |
| Events as candidate material, not forced timeline | **Done** | `candidateMaterial: true`, `candidateHooks`, usage note; no outcome scripts |
| 8–12 separate fiction hooks | **Done** | 10 hooks in `fiction-hooks.json`; `sourceType: "fiction"`, `confidence: 0` |
| Manifest with counts and checksum-friendly ordering | **Done** | `manifest.json`; SHA-256, fixed file order, sorted ids |
| Coverage document with counts and gaps | **Done** | This file |
| No invented people/events presented as fact | **Done** | Fact/inference/fiction separation; all content records have sourceIds; fiction is separate |
| Runtime loader/query API integration | **Not implemented** | Data-only deliverable; no existing source file was modified |
| Full global coverage | **Not claimed** | See §8 |
| Primary archival verification | **Not done** | Tertiary/structured sources; see §10 |
| Live URL check of every special source | **Partial** | 5 fetched; IAEA/USHMM blocked but retained as canonical citations |

The correct description of this phase is: a substantial, sourced, versioned reference index with strong Vienna/Austria/Europe depth and a broad but uneven global baseline. It is not a complete history of the world, and it should not be presented as one.
