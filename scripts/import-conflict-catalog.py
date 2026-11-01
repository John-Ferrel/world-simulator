#!/usr/bin/env python3
"""Build a deduplicated episode catalog from the openly licensed UCDP conflict termination CSV."""

from __future__ import annotations

import argparse
import csv
import json
import re
import urllib.request
from collections import defaultdict
from pathlib import Path
from typing import Any, Iterable

SOURCE_URL = "https://ucdp.uu.se/downloads/monadterm/UCDPConflictTerminationDataset_v4_2024_Conflict.csv"
SOURCE_DATASET = "UCDP Conflict Termination Dataset v4-2024 (conflict-level)"
LICENSE = "CC BY 4.0"
CITATION = "Kreutz, Joakim (2010) How and When Armed Conflicts End: Introducing the UCDP Conflict Termination Dataset. Journal of Peace Research 47(2):243-250."

# Modern ISO-3166-1 territory labels. Each historical label is an explicit crosswalk,
# not a claim that the listed modern state existed in the episode year.
LOCATION_TO_ISO3 = {
    "Afghanistan": "AFG", "Albania": "ALB", "Algeria": "DZA", "Angola": "AGO",
    "Argentina": "ARG", "Australia": "AUS", "Azerbaijan": "AZE", "Bangladesh": "BGD",
    "Benin": "BEN", "Bolivia": "BOL", "Bosnia-Herzegovina": "BIH", "Brunei": "BRN",
    "Burkina Faso": "BFA", "Burundi": "BDI", "Cambodia (Kampuchea)": "KHM",
    "Cameroon": "CMR", "Central African Republic": "CAF", "Chad": "TCD", "Chile": "CHL",
    "China": "CHN", "Colombia": "COL", "Comoros": "COM", "Congo": "COG",
    "Costa Rica": "CRI", "Croatia": "HRV", "Cuba": "CUB", "Cyprus": "CYP",
    "DR Congo (Zaire)": "COD", "Djibouti": "DJI", "Dominican Republic": "DOM",
    "Ecuador": "ECU", "Egypt": "EGY", "El Salvador": "SLV", "Eritrea": "ERI",
    "Ethiopia": "ETH", "France": "FRA", "Gabon": "GAB", "Gambia": "GMB",
    "Georgia": "GEO", "Ghana": "GHA", "Greece": "GRC", "Grenada": "GRD",
    "Guatemala": "GTM", "Guinea": "GIN", "Guinea-Bissau": "GNB", "Haiti": "HTI",
    "Honduras": "HND", "Hungary": "HUN", "India": "IND", "Indonesia": "IDN",
    "Iran": "IRN", "Iraq": "IRQ", "Israel": "ISR", "Ivory Coast": "CIV",
    "Jordan": "JOR", "Kenya": "KEN", "Kuwait": "KWT", "Kyrgyzstan": "KGZ",
    "Laos": "LAO", "Lebanon": "LBN", "Lesotho": "LSO", "Liberia": "LBR",
    "Libya": "LBY", "Madagascar (Malagasy)": "MDG", "Malaysia": "MYS", "Mali": "MLI",
    "Mauritania": "MRT", "Mexico": "MEX", "Moldova": "MDA", "Morocco": "MAR",
    "Mozambique": "MOZ", "Myanmar (Burma)": "MMR", "Nepal": "NPL", "Netherlands": "NLD",
    "Nicaragua": "NIC", "Niger": "NER", "Nigeria": "NGA", "North Korea": "PRK",
    "North Macedonia": "MKD", "Oman": "OMN", "Pakistan": "PAK", "Panama": "PAN",
    "Papua New Guinea": "PNG", "Paraguay": "PRY", "Peru": "PER", "Philippines": "PHL",
    "Romania": "ROU", "Rwanda": "RWA", "Saudi Arabia": "SAU", "Senegal": "SEN",
    "Sierra Leone": "SLE", "Somalia": "SOM", "South Africa": "ZAF", "South Korea": "KOR",
    "South Sudan": "SSD", "Spain": "ESP", "Sri Lanka": "LKA", "Sudan": "SDN",
    "Suriname": "SUR", "Syria": "SYR", "Taiwan": "TWN", "Tajikistan": "TJK",
    "Tanzania": "TZA", "Thailand": "THA", "Togo": "TGO", "Trinidad and Tobago": "TTO",
    "Tunisia": "TUN", "Turkey": "TUR", "Uganda": "UGA", "Ukraine": "UKR",
    "United Kingdom": "GBR", "United States of America": "USA", "Uruguay": "URY",
    "Uzbekistan": "UZB", "Venezuela": "VEN", "Zimbabwe (Rhodesia)": "ZWE",
    # Explicit successor-territory cases documented by the UCDP data/codebook.
    "Hyderabad": "IND", "South Vietnam": "VNM", "Vietnam (North Vietnam)": "VNM",
    "South Yemen": "YEM", "Yemen (North Yemen)": "YEM",
}


def parse_locations(value: str) -> tuple[list[str], list[str]]:
    names = [part.strip() for part in value.split(",") if part.strip()]
    codes = sorted({LOCATION_TO_ISO3[name] for name in names if name in LOCATION_TO_ISO3})
    unknown = sorted({name for name in names if name not in LOCATION_TO_ISO3})
    return codes, unknown


def valid_year(value: str) -> int | None:
    try:
        year = int(value)
    except (TypeError, ValueError):
        return None
    return year if 1900 <= year <= 2200 else None


def participants(rows: Iterable[dict[str, str]]) -> list[str]:
    names: set[str] = set()
    for row in rows:
        for field in ("side_a", "side_a_2nd", "side_b", "side_b_2nd"):
            value = (row.get(field) or "").strip()
            if value:
                names.add(value)
    return sorted(names)


def build_catalog(rows: Iterable[dict[str, str]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]], dict[str, Any]]:
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    source_rows = 0
    for row in rows:
        source_rows += 1
        record_id = (row.get("c_epid") or "").strip()
        if record_id:
            grouped[record_id].append(row)

    catalog: list[dict[str, Any]] = []
    excluded: list[dict[str, Any]] = []
    for record_id, episode_rows in grouped.items():
        starts = [valid_year(r.get("c_ep_startyear", "")) for r in episode_rows]
        starts = [year for year in starts if year is not None]
        if not starts:
            excluded.append({"sourceDataset": SOURCE_DATASET, "sourceRecordId": record_id, "reason": "missing_or_invalid_episode_start_year"})
            continue
        locations = sorted({(r.get("location") or "").strip() for r in episode_rows if (r.get("location") or "").strip()})
        if len(locations) != 1:
            excluded.append({"sourceDataset": SOURCE_DATASET, "sourceRecordId": record_id, "reason": "missing_or_inconsistent_location", "locations": locations})
            continue
        location = locations[0]
        country_codes, unknown = parse_locations(location)
        if unknown or not country_codes:
            excluded.append({"sourceDataset": SOURCE_DATASET, "sourceRecordId": record_id, "reason": "unmapped_or_ambiguous_location", "location": location, "unmappedNames": unknown})
            continue
        start_year = min(starts)
        active_years = [valid_year(r.get("year", "")) for r in episode_rows]
        active_years = [year for year in active_years if year is not None]
        duration_years = max((int(r["c_ep_durcount"]) for r in episode_rows if r.get("c_ep_durcount", "").isdigit()), default=1)
        duration_months = max(1, min(180, duration_years * 12))
        intensity_values = [int(r["intensity_level"]) for r in episode_rows if r.get("intensity_level", "").isdigit()]
        # UCDP intensity level 1 indicates 25+ battle deaths in an active year; level 2 is 1,000+.
        severity = 0.45 if max(intensity_values, default=1) <= 1 else 0.82
        first = min(episode_rows, key=lambda r: (valid_year(r.get("year", "")) or 9999, r.get("side_a", "")))
        side_a = (first.get("side_a") or "Conflict party A").strip()
        side_b = (first.get("side_b") or "Conflict party B").strip()
        title = f"{side_a} and {side_b} armed conflict in {location}"
        catalog.append({
            "id": f"ucdp-ct-{re.sub(r'[^A-Za-z0-9_-]', '-', record_id)}",
            "date": f"{start_year:04d}-01",
            "precision": "year",
            "kind": "war",
            "title": title,
            "countries": country_codes,
            "duration": duration_months,
            "severity": severity,
            "url": SOURCE_URL,
            "sourceDataset": SOURCE_DATASET,
            "sourceRecordId": record_id,
            "sourceCitation": CITATION,
            "participants": participants(episode_rows),
            "territoryMapping": {"scheme": "ISO 3166-1 alpha-3 modern territory index", "historicalLocation": location, "basis": "explicit location crosswalk; not a claim of historical sovereignty"},
            "license": LICENSE,
            "sourceType": max((r.get("type_of_conflict", "") for r in episode_rows), default=""),
            "activeYears": [min(active_years), max(active_years)] if active_years else [start_year, start_year],
        })
    catalog.sort(key=lambda item: (item["date"], item["id"]))
    excluded.sort(key=lambda item: item["sourceRecordId"])
    years = [int(item["date"][:4]) for item in catalog]
    report = {
        "sourceDataset": SOURCE_DATASET,
        "license": LICENSE,
        "citation": CITATION,
        "downloadUrl": SOURCE_URL,
        "sourceRows": source_rows,
        "uniqueEpisodeIds": len(grouped),
        "includedEpisodes": len(catalog),
        "excludedEpisodes": len(excluded),
        "onsetYearCoverage": [min(years), max(years)] if years else None,
        "sourceCoverageNote": "The downloaded CSV itself contains episode start years through 2024. The companion v4-2024 codebook describes its period as 1946-2023, so 2024 is retained based on the CSV record but is not independently reconciled here.",
        "coverageLimitation": "This episode catalog starts in 1946. COW 1816+ files were not copied because the official download page inspected for this import did not state a redistribution license; pre-1946 events are left uncovered rather than fabricated.",
    }
    return catalog, excluded, report


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        required = {"c_epid", "c_ep_startyear", "c_ep_durcount", "location", "intensity_level", "side_a", "side_b"}
        if not reader.fieldnames or not required.issubset(reader.fieldnames):
            raise ValueError(f"Unexpected UCDP CSV headers; missing {sorted(required - set(reader.fieldnames or []))}")
        return list(reader)


def download(destination: Path) -> None:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "world-simulator-conflict-catalog-import/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response, destination.open("wb") as output:
        output.write(response.read())


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Use an already downloaded UCDP conflict-level CSV")
    parser.add_argument("--output", type=Path, default=Path("packages/world-packs/earth/conflict-catalog.json"))
    parser.add_argument("--excluded", type=Path, default=Path("packages/world-packs/earth/conflict-catalog-excluded.json"))
    parser.add_argument("--report", type=Path, default=Path("packages/world-packs/earth/conflict-catalog-report.json"))
    args = parser.parse_args(argv)
    temporary = args.input is None
    source = args.input or args.output.with_suffix(".source.csv")
    try:
        if temporary:
            download(source)
        catalog, excluded, report = build_catalog(read_csv(source))
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        args.excluded.write_text(json.dumps(excluded, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(report, ensure_ascii=False))
        return 0
    finally:
        if temporary:
            source.unlink(missing_ok=True)


if __name__ == "__main__":
    raise SystemExit(main())
