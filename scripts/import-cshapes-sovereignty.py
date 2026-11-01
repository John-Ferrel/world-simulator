#!/usr/bin/env python3
"""Build a 1900 point-jurisdiction index from the official ETH Zurich CShapes 2.0 package.

The importer reads only one bounded TopoJSON member from the archive. It never extracts or
executes archive contents. Output is an attribution-bearing derived dataset; CShapes is
CC BY-NC-SA 4.0, so this output is not cleared for commercial redistribution.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import lzma
import math
import os
import sys
import tarfile
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

SOURCE_URL = "https://icr.ethz.ch/data/cshapes/cshapes_2.0.tar.gz"
SOURCE_PAGE = "https://icr.ethz.ch/data/cshapes/"
CODEBOOK_URL = "https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf"
SOURCE_SHA256 = "6708b263224888c368aab136cdcae8a24c220bd07929af10f8bd69cf53634caa"
TOPOJSON_MEMBER = "cshapes/inst/extdata/cshapes_2_gw.topojson.xz"
GEOGRAPHY_PATH = Path("packages/world-packs/earth/geography.json")
OUTPUT_PATH = Path("data/historical-sovereignty/cshapes-1900-jurisdictions.json")
BASELINE_DATE = "1900-01-01"
MAX_ARCHIVE_BYTES = 8 * 1024 * 1024
MAX_MEMBER_BYTES = 16 * 1024 * 1024
MAX_GEOGRAPHY_BYTES = 12 * 1024 * 1024
MAX_CITIES = 100_000
MAX_ARCS = 100_000
MAX_ARC_POINTS = 1_000_000
MAX_FEATURES = 10_000
MAX_OUTPUT_BYTES = 20 * 1024 * 1024
EPSILON = 1e-10


def fail(message: str) -> "NoReturn":
    raise ValueError(message)


def download_archive(url: str = SOURCE_URL) -> bytes:
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != "https" or parsed.hostname != "icr.ethz.ch":
        fail("CShapes downloads must use the official HTTPS ETH Zurich host")
    request = urllib.request.Request(url, headers={"User-Agent": "world-simulator-sovereignty-import/1"})
    with urllib.request.urlopen(request, timeout=45) as response:
        final = urllib.parse.urlparse(response.geturl())
        if final.scheme != "https" or final.hostname != "icr.ethz.ch":
            fail("Unexpected CShapes download redirect")
        chunks: list[bytes] = []
        total = 0
        while True:
            chunk = response.read(64 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_ARCHIVE_BYTES:
                fail("CShapes archive exceeds the download size limit")
            chunks.append(chunk)
    return b"".join(chunks)


def read_topology(archive_bytes: bytes) -> tuple[dict[str, Any], str]:
    if len(archive_bytes) > MAX_ARCHIVE_BYTES:
        fail("CShapes archive exceeds the size limit")
    digest = hashlib.sha256(archive_bytes).hexdigest()
    if digest != SOURCE_SHA256:
        fail(f"Unexpected CShapes archive SHA-256: {digest}")
    try:
        import io

        with tarfile.open(fileobj=io.BytesIO(archive_bytes), mode="r:gz") as archive:
            try:
                member = archive.getmember(TOPOJSON_MEMBER)
            except KeyError:
                fail("Official CShapes package does not contain the expected topology member")
            if not member.isfile() or member.size < 2 or member.size > MAX_MEMBER_BYTES:
                fail("Invalid or oversized CShapes topology member")
            stream = archive.extractfile(member)
            if stream is None:
                fail("Unable to read CShapes topology member")
            compressed_topology = stream.read(MAX_MEMBER_BYTES + 1)
            if len(compressed_topology) > MAX_MEMBER_BYTES or len(compressed_topology) != member.size:
                fail("Truncated or oversized CShapes topology member")
        decoder = lzma.LZMADecompressor()
        raw = decoder.decompress(compressed_topology, max_length=MAX_MEMBER_BYTES + 1)
        if len(raw) > MAX_MEMBER_BYTES or not decoder.eof or decoder.unused_data:
            fail("Invalid or oversized xz-compressed CShapes topology")
        data = json.loads(raw)
    except (tarfile.TarError, lzma.LZMAError, json.JSONDecodeError) as error:
        fail(f"Invalid CShapes archive contents: {error}")
    if not isinstance(data, dict) or data.get("type") != "Topology":
        fail("CShapes file is not a TopoJSON topology")
    if set(data.get("objects", {})) != {"cshapes_2_gw"}:
        fail("Unexpected CShapes topology object set")
    arcs = data.get("arcs")
    geometries = data["objects"]["cshapes_2_gw"].get("geometries")
    if not isinstance(arcs, list) or len(arcs) > MAX_ARCS or not isinstance(geometries, list) or len(geometries) > MAX_FEATURES:
        fail("CShapes topology exceeds geometry bounds")
    points = 0
    for arc in arcs:
        if not isinstance(arc, list) or not arc:
            fail("Malformed CShapes arc")
        points += len(arc)
        if points > MAX_ARC_POINTS:
            fail("CShapes topology exceeds point-count bound")
        for coord in arc:
            if not isinstance(coord, list) or len(coord) != 2 or any(not isinstance(v, (int, float)) or not math.isfinite(v) for v in coord):
                fail("Malformed coordinate in CShapes topology")
            if not -180.000001 <= coord[0] <= 180.000001 or not -90.000001 <= coord[1] <= 90.000001:
                fail("CShapes coordinate lies outside longitude/latitude bounds")
    return data, digest


def load_geography(path: Path) -> tuple[dict[str, Any], bytes]:
    raw = path.read_bytes()
    if len(raw) > MAX_GEOGRAPHY_BYTES:
        fail("Modern geography file exceeds the size limit")
    data = json.loads(raw)
    cities = data.get("cities") if isinstance(data, dict) else None
    if not isinstance(cities, list) or len(cities) > MAX_CITIES:
        fail("Invalid or oversized modern cities list")
    for city in cities:
        if not isinstance(city, dict) or not isinstance(city.get("id"), str) or not city["id"] or not isinstance(city.get("countryId"), str):
            fail("Malformed modern city record")
        lon, lat = city.get("lon"), city.get("lat")
        if not isinstance(lon, (int, float)) or not isinstance(lat, (int, float)) or not math.isfinite(lon) or not math.isfinite(lat):
            fail("Modern city has invalid point coordinates")
        if not -180 <= lon <= 180 or not -90 <= lat <= 90:
            fail("Modern city point lies outside longitude/latitude bounds")
    return data, raw


def iter_polygons(feature: dict[str, Any], arcs: list[list[list[float]]]):
    # The archive stores each GeometryCollection member directly as a topology geometry.
    geometry = feature
    kind, refs = geometry.get("type"), geometry.get("arcs")
    if kind == "Polygon":
        polygon_refs = [refs]
    elif kind == "MultiPolygon":
        polygon_refs = refs
    else:
        fail(f"Unsupported CShapes geometry type: {kind}")
    if not isinstance(polygon_refs, list):
        fail("Malformed CShapes polygon arcs")
    for polygon in polygon_refs:
        if not isinstance(polygon, list) or not polygon:
            continue
        rings = []
        for ring_refs in polygon:
            if not isinstance(ring_refs, list) or not ring_refs:
                fail("Malformed CShapes ring")
            ring: list[list[float]] = []
            for arc_ref in ring_refs:
                if not isinstance(arc_ref, int):
                    fail("Malformed CShapes arc reference")
                index = arc_ref if arc_ref >= 0 else ~arc_ref
                if index < 0 or index >= len(arcs):
                    fail("CShapes arc reference out of bounds")
                points = arcs[index] if arc_ref >= 0 else list(reversed(arcs[index]))
                ring.extend(points if not ring else points[1:])
            if len(ring) < 4:
                fail("CShapes polygon ring has fewer than four coordinates")
            rings.append(ring)
        if rings:
            yield rings


def point_on_segment(x: float, y: float, a: list[float], b: list[float]) -> bool:
    cross = (x - a[0]) * (b[1] - a[1]) - (y - a[1]) * (b[0] - a[0])
    if abs(cross) > EPSILON:
        return False
    return min(a[0], b[0]) - EPSILON <= x <= max(a[0], b[0]) + EPSILON and min(a[1], b[1]) - EPSILON <= y <= max(a[1], b[1]) + EPSILON


def point_in_ring(x: float, y: float, ring: list[list[float]]) -> bool:
    inside = False
    previous = ring[-1]
    for current in ring:
        if point_on_segment(x, y, previous, current):
            return True
        if (current[1] > y) != (previous[1] > y):
            crossing_x = (previous[0] - current[0]) * (y - current[1]) / (previous[1] - current[1]) + current[0]
            if x < crossing_x:
                inside = not inside
        previous = current
    return inside


def point_in_feature(x: float, y: float, polygons: list[list[list[list[float]]]]) -> bool:
    for rings in polygons:
        if not point_in_ring(x, y, rings[0]):
            continue
        if not any(point_in_ring(x, y, hole) for hole in rings[1:]):
            return True
    return False


def build_index(topology: dict[str, Any], geography: dict[str, Any], source_hash: str) -> dict[str, Any]:
    arcs = topology["arcs"]
    features = topology["objects"]["cshapes_2_gw"]["geometries"]
    active = []
    for feature in features:
        props = feature.get("properties")
        if not isinstance(props, dict):
            fail("CShapes feature lacks properties")
        if not isinstance(props.get("start"), str) or not isinstance(props.get("end"), str):
            fail("CShapes feature has invalid period")
        if props["start"] <= BASELINE_DATE <= props["end"]:
            status = props.get("status")
            code = props.get("gwcode")
            if not isinstance(code, int) or not isinstance(status, str):
                fail("CShapes unit lacks GW code or sovereignty status")
            owner_raw = props.get("owner")
            owner = int(owner_raw) if isinstance(owner_raw, str) and owner_raw.isdigit() else owner_raw if isinstance(owner_raw, int) else None
            polygons = list(iter_polygons(feature, arcs))
            if not polygons:
                fail(f"CShapes unit {code} has no polygon")
            xs = [coord[0] for polygon in polygons for ring in polygon for coord in ring]
            ys = [coord[1] for polygon in polygons for ring in polygon for coord in ring]
            active.append({
                "code": code,
                "name": props.get("country_name"),
                "status": status,
                "ownerCode": owner,
                "featureId": props.get("fid"),
                "start": props["start"],
                "end": props["end"],
                "borderDefined": props.get("b_def"),
                "capital": props.get("capname"),
                "bbox": [min(xs), min(ys), max(xs), max(ys)],
                "polygons": polygons,
            })
    if not 100 <= len(active) <= MAX_FEATURES:
        fail(f"Unexpected number of active 1900 units: {len(active)}")
    names = {unit["code"]: unit["name"] for unit in active}
    units = []
    for unit in active:
        owner_code = unit["ownerCode"]
        units.append({
            "gwCode": unit["code"],
            "name": unit["name"],
            "status": unit["status"],
            "sovereignGwCode": owner_code,
            "sovereignName": names.get(owner_code),
            "period": {"start": unit["start"], "end": unit["end"]},
            "borderDefined": unit["borderDefined"],
            "capital": unit["capital"],
            "featureId": unit["featureId"],
        })
    point_results = []
    by_settlement_id: dict[str, list[dict[str, Any]]] = {}
    for point_index, city in enumerate(geography["cities"]):
        x, y = float(city["lon"]), float(city["lat"])
        matches = []
        for unit in active:
            west, south, east, north = unit["bbox"]
            if west - EPSILON <= x <= east + EPSILON and south - EPSILON <= y <= north + EPSILON and point_in_feature(x, y, unit["polygons"]):
                matches.append(unit["code"])
        matches.sort()
        if len(matches) == 1:
            match_status = "unique-point-match"
        elif not matches:
            match_status = "unmatched"
        else:
            match_status = "ambiguous-overlap"
        mapping = {
            "settlementId": city["id"],
            "modernRegionId": city["countryId"],
            "sourcePointIndex": point_index,
            "point": [x, y],
            "matchStatus": match_status,
            "historicalUnitCode": matches[0] if len(matches) == 1 else None,
            "candidateHistoricalUnitCodes": matches if len(matches) != 1 else [],
        }
        point_results.append(mapping)
        by_settlement_id.setdefault(city["id"], []).append(mapping)

    source_id_collisions = []
    collision_point_count = 0
    for settlement_id, records in by_settlement_id.items():
        if len(records) < 2:
            continue
        collision_point_count += len(records)
        candidate_codes = sorted({code for record in records for code in (record["historicalUnitCode"], *record["candidateHistoricalUnitCodes"]) if code is not None})
        for record in records:
            record["matchStatus"] = "source-id-collision"
            record["historicalUnitCode"] = None
            record["candidateHistoricalUnitCodes"] = candidate_codes
        source_id_collisions.append({
            "settlementId": settlement_id,
            "modernRegionIds": sorted({record["modernRegionId"] for record in records}),
            "sourcePoints": [{"sourcePointIndex": record["sourcePointIndex"], "point": record["point"]} for record in records],
            "candidateHistoricalUnitCodes": candidate_codes,
        })
    mappings = point_results
    unmatched = sum(record["matchStatus"] == "unmatched" for record in mappings)
    ambiguous = sum(record["matchStatus"] == "ambiguous-overlap" for record in mappings)
    unique_matches = sum(record["matchStatus"] == "unique-point-match" for record in mappings)
    statuses: dict[str, int] = {}
    for unit in units:
        statuses[unit["status"]] = statuses.get(unit["status"], 0) + 1
    return {
        "schema": "historical-sovereignty-index/v1",
        "source": {
            "name": "CShapes 2.0 / ETH Zurich International Conflict Research",
            "sourceUrl": SOURCE_PAGE,
            "archiveUrl": SOURCE_URL,
            "codebookUrl": CODEBOOK_URL,
            "archiveSha256": source_hash,
            "dataLicense": "CC BY-NC-SA 4.0",
            "softwarePackage": "cshapes 2.0 R source package (GPL >= 2; package license is not a relicensing of the included dataset)",
            "citation": "Schvitz, Guy, Seraina Rüegger, Luc Girardin, Lars-Erik Cederman, Nils Weidmann, and Kristian Skrede Gleditsch. 2022. Mapping The International System, 1886–2019: The CShapes 2.0 Dataset. Journal of Conflict Resolution 66(1): 144–161. https://doi.org/10.1177/00220027211013563",
        },
        "baselineDate": BASELINE_DATE,
        "modernPointSource": {
            "name": geography.get("source"),
            "sourceUrl": geography.get("sourceUrl"),
            "license": geography.get("license"),
        },
        "method": {
            "unitOfMapping": "individual modern populated-place settlement point, not the whole modern country polygon",
            "spatialRule": "point-in-polygon against active CShapes GW geometry on 1900-01-01; no names or modern country codes were used to infer historical sovereignty",
            "statusSemantics": "preserve the source's status and owner; an independent unit owns itself, dependent unit owner is the recorded GW sovereignty code",
            "temporalSemantics": "snapshot only; later political change must be simulated by agency and political processes, not applied as a forced year schedule",
        },
        "coverage": {
            "historicalUnitCount": len(units),
            "settlementPointCount": len(mappings),
            "uniqueSettlementIdCount": len(by_settlement_id),
            "uniquelyMappedSettlementPoints": unique_matches,
            "unmatchedSettlementPoints": unmatched,
            "ambiguousSettlementPoints": ambiguous,
            "sourceIdCollisionPoints": collision_point_count,
            "sourceIdCollisionCount": len(source_id_collisions),
            "statusCounts": statuses,
        },
        "units": units,
        "settlements": mappings,
        "sourceIdCollisions": source_id_collisions,
    }


def atomic_json_write(path: Path, value: dict[str, Any]) -> int:
    encoded = (json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8")
    if len(encoded) > MAX_OUTPUT_BYTES:
        fail("Generated sovereignty index exceeds output size bound")
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    try:
        # mkstemp creates private files (0600); publish this public, attributed data index as 0644.
        os.fchmod(fd, 0o644)
        with os.fdopen(fd, "wb") as file:
            file.write(encoded)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temp_name, path)
    except BaseException:
        try:
            os.unlink(temp_name)
        except FileNotFoundError:
            pass
        raise
    return len(encoded)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-archive", type=Path, help="Use the pinned ETH source archive already on disk")
    parser.add_argument("--geography", type=Path, default=GEOGRAPHY_PATH)
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    args = parser.parse_args()
    try:
        archive_bytes = args.source_archive.read_bytes() if args.source_archive else download_archive()
        if len(archive_bytes) > MAX_ARCHIVE_BYTES:
            fail("CShapes archive exceeds the size limit")
        topology, digest = read_topology(archive_bytes)
        geography, _ = load_geography(args.geography)
        output = build_index(topology, geography, digest)
        output_bytes = atomic_json_write(args.output, output)
    except Exception as error:
        print(f"CShapes import failed: {error}", file=sys.stderr)
        raise SystemExit(2)
    coverage = output["coverage"]
    print(json.dumps({"output": str(args.output), "bytes": output_bytes, "coverage": coverage}, ensure_ascii=False))


if __name__ == "__main__":
    main()
