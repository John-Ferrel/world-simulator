#!/usr/bin/env python3
"""Build the bounded Earth pack geography from Natural Earth public-domain assets."""
import json
import math
import os
from collections import defaultdict
from pathlib import Path

ROOT = Path('.')
OUT = ROOT / 'packages/world-packs/earth'
OUT.mkdir(parents=True, exist_ok=True)

def read_json(path):
    return json.loads(path.read_text())

def atomic_json(path, value):
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')))
    os.replace(temporary, path)

def haversine(a_lon, a_lat, b_lon, b_lat):
    rad = math.pi / 180
    dlon = (b_lon - a_lon) * rad
    dlat = (b_lat - a_lat) * rad
    h = math.sin(dlat / 2) ** 2 + math.cos(a_lat * rad) * math.cos(b_lat * rad) * math.sin(dlon / 2) ** 2
    return 6371 * 2 * math.asin(min(1, math.sqrt(h)))

countries = read_json(ROOT / '.data/assets/countries.geojson')['features']
cities = read_json(ROOT / '.data/assets/cities-10m.geojson')['features']
previous = read_json(OUT / 'legacy-cities.json')
translated = {
    str(f['properties']['NE_ID']): f['properties'].get('NAME_ZH')
    for f in read_json(ROOT / '.data/assets/cities-10m-full.geojson')['features']
}

# Resolve source-name collisions against original legacy coordinates before assigning IDs.
# A legacy ID is assigned only to the single Natural Earth point nearest that legacy point.
legacy_by_key = defaultdict(list)
for legacy in previous:
    legacy_by_key[(legacy['countryId'], legacy['english'])].append(legacy)
raw_by_key = defaultdict(list)
for feature in cities:
    props = feature['properties']
    raw_by_key[(props['adm0_a3'], props['name'])].append(feature)
legacy_matches = {}
claimed_ne_ids = set()
for key, legacy_rows in legacy_by_key.items():
    candidates = raw_by_key.get(key, [])
    pairs = []
    for old in legacy_rows:
        for feature in candidates:
            props = feature['properties']
            dist = haversine(old['lon'], old['lat'], props['longitude'], props['latitude'])
            pairs.append((dist, int(props['ne_id']), old['id'], old, feature))
    used_legacy = set()
    for _, ne_id, old_id, old, feature in sorted(pairs, key=lambda item: (item[0], item[1], item[2])):
        if ne_id in claimed_ne_ids or old_id in used_legacy:
            continue
        legacy_matches[ne_id] = old
        claimed_ne_ids.add(ne_id)
        used_legacy.add(old_id)

country_rows = []
for feature in countries:
    props = feature['properties']
    country_rows.append({
        'id': props['ADM0_A3'],
        'name': props.get('NAME_ZH') or props['NAME'],
        'english': props['NAME'],
        'population': max(0, round(props['POP_EST'])),
        'populationYear': props.get('POP_YEAR', 2019),
        'gdpMillions': props.get('GDP_MD', 0),
        'continent': props['CONTINENT'],
        'lon': props['LABEL_X'],
        'lat': props['LABEL_Y'],
        'geometry': feature['geometry'],
    })
valid_countries = {row['id'] for row in country_rows}
city_rows = []
zh = {
    'Beijing':'北京','Shanghai':'上海','Tokyo':'东京','London':'伦敦','Paris':'巴黎','New York':'纽约',
    'Washington, D.C.':'华盛顿','Singapore':'新加坡','Seoul':'首尔','Hong Kong':'香港','Taipei':'台北',
    'Moscow':'莫斯科','Kyiv':'基辅','Kiev':'基辅','Istanbul':'伊斯坦布尔','Cairo':'开罗','Delhi':'德里',
    'Mumbai':'孟买','Bangkok':'曼谷','Jakarta':'雅加达','Sydney':'悉尼','Melbourne':'墨尔本','Berlin':'柏林',
    'Rome':'罗马','Madrid':'马德里','Toronto':'多伦多','Mexico City':'墨西哥城','Lagos':'拉各斯',
    'Nairobi':'内罗毕','São Paulo':'圣保罗','Buenos Aires':'布宜诺斯艾利斯','Dubai':'迪拜','Karachi':'卡拉奇',
    'Ankara':'安卡拉','Manila':'马尼拉','Dhaka':'达卡','Cape Town':'开普敦','Los Angeles':'洛杉矶',
    'San Francisco':'旧金山','Osaka':'大阪','Chongqing':'重庆','Guangzhou':'广州','Shenzhen':'深圳',
    'Wuhan':'武汉','Chengdu':'成都'
}
for feature in cities:
    props = feature['properties']
    country_id = props['adm0_a3']
    if country_id not in valid_countries:
        continue
    name = props['name']
    old = legacy_matches.get(int(props['ne_id']))
    duplicated_source_name = len(raw_by_key[(country_id, name)]) > 1
    city_rows.append({
        'id': old['id'] if old else f"earth-ne-{props['ne_id']}",
        'name': old['name'] if old else name if duplicated_source_name else zh.get(name, translated.get(str(props['ne_id'])) or name),
        'english': name,
        'countryId': country_id,
        'lon': props['longitude'],
        'lat': props['latitude'],
        'population': max(1000, props.get('pop_max') or 1000),
        'capital': bool(props.get('adm0cap')),
    })
for country in country_rows:
    if country['id'] == 'ATA':
        continue
    if not any(city['countryId'] == country['id'] for city in city_rows):
        city_rows.append({
            'id': f"earth-capital-{country['id']}",
            'name': country['name'],
            'english': country['english'],
            'countryId': country['id'],
            'lon': country['lon'],
            'lat': country['lat'],
            'population': country['population'],
            'capital': True,
        })
known_ids = {city['id'] for city in city_rows}
for old in previous:
    if old['id'] not in known_ids and old['countryId'] in valid_countries:
        city_rows.append(old)
        known_ids.add(old['id'])
city_ids = [city['id'] for city in city_rows]
if len(city_ids) != len(set(city_ids)):
    duplicates = sorted({city_id for city_id in city_ids if city_ids.count(city_id) > 1})
    raise ValueError(f'duplicate Earth city IDs: {duplicates}')

# Raster derived from original country geometry; country membership is shared by map and simulation.
width, height = 360, 160
grid = [0] * (width * height)
def inside(x, y, ring):
    hit = False
    j = len(ring) - 1
    for i, point in enumerate(ring):
        other = ring[j]
        if (point[1] > y) != (other[1] > y) and x < (other[0] - point[0]) * (y - point[1]) / (other[1] - point[1]) + point[0]:
            hit = not hit
        j = i
    return hit
for index, country in enumerate(country_rows):
    geometry = country['geometry']
    polygons = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    for polygon in polygons:
        ring = polygon[0]
        xs = [point[0] for point in ring]
        ys = [point[1] for point in ring]
        for yy in range(max(0, int(85 - max(ys))), min(height, int(85 - min(ys)) + 1)):
            lat = 85 - yy - 0.5
            for xx in range(max(0, int(min(xs) + 180)), min(width, int(max(xs) + 180) + 1)):
                lon = xx - 180 + 0.5
                if inside(lon, lat, ring) and not any(inside(lon, lat, hole) for hole in polygon[1:]):
                    grid[yy * width + xx] = index + 1

metadata = {
    'source': 'Natural Earth countries 1:110m; populated places 1:10m',
    'sourceUrl': 'https://www.naturalearthdata.com/',
    'license': 'public domain',
    'baselineYear': 2020,
    'populationDataYear': 2019,
    'countries': country_rows,
    'cities': city_rows,
}
atomic_json(OUT / 'geography.json', metadata)
public = ROOT / 'apps/web/public/earth'
public.mkdir(parents=True, exist_ok=True)
atomic_json(public / 'terrain.json', {
    'width': width, 'height': height, 'north': 85, 'south': -75, 'west': -180, 'east': 180,
    'cells': grid, 'countries': [{'id': c['id'], 'name': c['name']} for c in country_rows],
})
atomic_json(public / 'countries.geojson', {
    'type': 'FeatureCollection',
    'features': [
        {'type': 'Feature', 'properties': {'id': c['id'], 'name': c['name']}, 'geometry': c['geometry']}
        for c in country_rows
    ],
})
print({'countries': len(country_rows), 'cities': len(city_rows), 'terrainCells': len(grid)})
