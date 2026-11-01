#!/usr/bin/env python3
"""Import Pantheon 2.0's 2025, globally notable biography catalogue.

The official Pantheon download is CC BY-SA 4.0. We keep QIDs and source fields,
map its explicitly birthplace-based modern country through the installed Natural Earth
country table, and retain date precision instead of inventing January birthdays.
Python 3 standard library only; no model/API credits are used.
"""
import argparse
import bz2
import csv
import datetime as dt
import io
import json
import os
import re
import sys
import tempfile
import urllib.request

DATASET_URL = "https://storage.googleapis.com/pantheon-public-data/person_2025_update.csv.bz2"
DATA_PAGE = "https://pantheon.world/data/datasets"
LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/"
GEOGRAPHY_PATH = "packages/world-packs/earth/geography.json"
MAX_COMPRESSED_BYTES = 32 * 1024 * 1024
MAX_CSV_BYTES = 96 * 1024 * 1024
MAX_SOURCE_ROWS = 150_000
MAX_IMPORTED = 150_000
MIN_LANGUAGE_EDITIONS = 30
QID = re.compile(r"^Q[1-9][0-9]{0,11}$")
ISO3 = re.compile(r"^[A-Z]{3}$")

ALIASES = {
    "United States": "USA", "Türkiye": "TUR", "Turkey": "TUR",
    "The Bahamas": "BHS", "Myanmar (Burma)": "MMR", "Burma": "MMR",
    "Cabo Verde": "CPV", "Cape Verde": "CPV", "The Gambia": "GMB", "Gambia": "GMB",
    "Democratic Republic of the Congo": "COD", "Republic of the Congo": "COG",
    "Bosnia and Herzegovina": "BIH", "United Republic of Tanzania": "TZA",
}


def load_country_map():
    with open(GEOGRAPHY_PATH, encoding="utf-8") as f:
        geography = json.load(f)
    countries = geography.get("countries")
    if not isinstance(countries, list) or len(countries) > 500:
        raise ValueError("invalid bounded Natural Earth geography file")
    mapping = {c["english"]: c["id"] for c in countries
               if isinstance(c, dict) and isinstance(c.get("english"), str)
               and isinstance(c.get("id"), str) and ISO3.fullmatch(c["id"])}
    valid_ids = set(mapping.values())
    for name, code in ALIASES.items():
        if code in valid_ids:
            mapping[name] = code
    return mapping, valid_ids


def download(url):
    req = urllib.request.Request(url, headers={"User-Agent": "world-simulator Pantheon importer/1.0"})
    with urllib.request.urlopen(req, timeout=60) as response:
        data = response.read(MAX_COMPRESSED_BYTES + 1)
    if len(data) > MAX_COMPRESSED_BYTES:
        raise ValueError("compressed Pantheon input exceeds 32 MiB")
    return data


def read_source(raw):
    if len(raw) > MAX_COMPRESSED_BYTES:
        raise ValueError("compressed input exceeds 32 MiB")
    with bz2.BZ2File(io.BytesIO(raw), "rb") as stream:
        csv_data = stream.read(MAX_CSV_BYTES + 1)
    if len(csv_data) > MAX_CSV_BYTES:
        raise ValueError("expanded Pantheon CSV exceeds 96 MiB")
    return csv.DictReader(io.StringIO(csv_data.decode("utf-8-sig")))


def year_value(text):
    if not isinstance(text, str) or not re.fullmatch(r"-?\d{1,6}", text.strip()):
        return None
    year = int(text)
    return year if -10000 <= year <= 3000 else None


def date_parts(text):
    """Return full calendar components only for an explicitly complete AD date."""
    if not isinstance(text, str):
        return None
    match = re.fullmatch(r"(\d{4})-(\d{2})-(\d{2})", text.strip())
    if not match:
        return None
    year, month, day = map(int, match.groups())
    if not 1 <= month <= 12 or not 1 <= day <= 31:
        return None
    return year, month, day


def row_record(row, country_map):
    qid = (row.get("wd_id") or "").strip()
    name = (row.get("name") or "").strip()
    if not QID.fullmatch(qid) or not name or len(name) > 160 or any(ord(c) < 32 for c in name):
        return None
    if (row.get("is_group") or "").strip().upper() == "TRUE":
        return None
    try:
        language_editions = int(row.get("l") or "0")
    except ValueError:
        return None
    if language_editions < MIN_LANGUAGE_EDITIONS:
        return None
    birth_year = year_value((row.get("birthyear") or "").strip())
    if birth_year is None:
        return None
    country_label = (row.get("bplace_country") or "").strip()
    country_id = country_map.get(country_label)
    # The person may remain in the catalogue if a future geography revision maps this country.
    # Current activation requires a country represented by an Earth polity.
    if not country_id:
        return None
    birthdate = date_parts(row.get("birthdate") or "")
    birth_month = None
    birth_precision = "year"
    if birthdate and birthdate[0] == birth_year:
        _, month, day = birthdate
        birth_month = (birth_year - 1900) * 12 + month - 1
        birth_day = day
        birth_precision = "day"
    else:
        birth_day = None
    death_year = year_value((row.get("deathyear") or "").strip())
    deathdate = date_parts(row.get("deathdate") or "")
    death_month = None
    death_precision = "year" if death_year is not None else None
    if deathdate and death_year == deathdate[0]:
        _, month, day = deathdate
        death_month = (death_year - 1900) * 12 + month - 1
        death_day = day
        death_precision = "day"
    else:
        death_day = None
    record = {
        "qid": qid, "name": name, "birthYear": birth_year,
        "birthPrecision": birth_precision, "countryId": country_id,
        "countryLabel": country_label, "countryBasis": "birthplace-modern-country",
        "languageEditions": language_editions,
        "sourceUrl": DATA_PAGE, "wikidataUrl": f"https://www.wikidata.org/wiki/{qid}",
    }
    if birth_month is not None:
        record["birthMonth"] = birth_month
        record["birthDay"] = birth_day
    if death_year is not None:
        record["deathYear"] = death_year
        record["deathPrecision"] = death_precision
    if death_month is not None:
        record["deathMonth"] = death_month
        record["deathDay"] = death_day
    if row.get("occupation"):
        record["sourcedOccupation"] = row["occupation"][:100]
    return record


def parse(raw):
    country_map, _ = load_country_map()
    reader = read_source(raw)
    expected = {"wd_id", "name", "l", "birthyear", "birthdate", "deathyear", "deathdate", "bplace_country", "is_group"}
    if not reader.fieldnames or not expected.issubset(reader.fieldnames):
        raise ValueError("unexpected Pantheon CSV schema")
    records = {}
    source_rows = passed_popularity = skipped_unmapped = skipped_missing_country = skipped_other = 0
    for row in reader:
        source_rows += 1
        if source_rows > MAX_SOURCE_ROWS:
            raise ValueError("Pantheon source exceeds 150,000 row bound")
        try:
            meets_popularity = int(row.get("l") or "0") >= MIN_LANGUAGE_EDITIONS
        except ValueError:
            meets_popularity = False
        if meets_popularity:
            passed_popularity += 1
            raw_country = (row.get("bplace_country") or "").strip()
            if not raw_country:
                skipped_missing_country += 1
            elif raw_country not in country_map:
                skipped_unmapped += 1
        rec = row_record(row, country_map)
        if not rec:
            if meets_popularity and (row.get("bplace_country") or "").strip() in country_map:
                skipped_other += 1
            continue
        prior = records.get(rec["qid"])
        if prior is None or rec["languageEditions"] > prior["languageEditions"]:
            records[rec["qid"]] = rec
    people = sorted(records.values(), key=lambda p: (p["birthYear"], p["birthMonth"] if "birthMonth" in p else -1, p["qid"]))
    if len(people) > MAX_IMPORTED:
        raise ValueError("imported records exceed 150,000 cap")
    stats = {"sourceRows": source_rows, "rowsMeetingPopularityThreshold": passed_popularity,
             "uniqueImported": len(people), "minimumLanguageEditions": MIN_LANGUAGE_EDITIONS,
             "missingBirthCountry": skipped_missing_country, "unmappedBirthCountries": skipped_unmapped,
             "otherRejectedRows": skipped_other, "mappedCountries": len({p["countryId"] for p in people})}
    return people, stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", help="local Pantheon .csv.bz2 file; defaults to official 2025 download")
    ap.add_argument("--output", default="packages/worldlines/historical-people.json")
    args = ap.parse_args()
    try:
        raw = open(args.input, "rb").read(MAX_COMPRESSED_BYTES + 1) if args.input else download(DATASET_URL)
        people, stats = parse(raw)
        envelope = {
            "source": "Pantheon 2.0 Person Dataset (2025 release)", "sourceUrl": DATA_PAGE,
            "downloadUrl": DATASET_URL, "license": "CC BY-SA 4.0",
            "licenseUrl": LICENSE_URL, "attribution": "Pantheon by Datawheel; see Pantheon data descriptor and permissions page",
            "retrievedAt": dt.datetime.now(dt.timezone.utc).isoformat(), "stats": stats, "people": people,
        }
        target = os.path.abspath(args.output)
        temp_path = None
        try:
            with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=os.path.dirname(target),
                                             prefix=".historical-people-", suffix=".tmp", delete=False) as f:
                temp_path = f.name
                json.dump(envelope, f, ensure_ascii=False, separators=(",", ":"))
                f.write("\n")
                f.flush()
                os.fsync(f.fileno())
            os.replace(temp_path, target)
        finally:
            if temp_path and os.path.exists(temp_path):
                os.unlink(temp_path)
        print(f"Imported {len(people)} unique Wikidata-linked people from {stats['sourceRows']} Pantheon rows; {stats['mappedCountries']} mapped countries")
    except Exception as exc:
        print(f"Import failed: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
