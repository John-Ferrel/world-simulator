import { useEffect, useMemo, useRef, useState } from 'react';

type LonLat = [number, number];
type City = {
  id: string;
  name: string;
  lon: number;
  lat: number;
  placeId?: string;
  major?: boolean;
};

type PoliticalLeader = { role: string; title: string; name: string };
type PoliticalPolity = {
  id: string;
  name: string;
  englishName: string;
  kind: string;
  capital: string;
  government: string;
  leaders: PoliticalLeader[];
  approximate?: boolean;
  notes?: string;
  color: string;
};
type PoliticalSnapshot = {
  date: { year: number; month: number };
  polities: PoliticalPolity[];
  viennaPolity?: PoliticalPolity;
  map: Record<
    string,
    { iso: string; polityId: string; name: string; color: string; approximate: boolean; capital: string }
  >;
  note: string;
};

const W = 720;
const H = 360;

const CITIES: City[] = [
  { id: 'wien', name: '维也纳', lon: 16.3738, lat: 48.2082, placeId: 'place-wien', major: true },
  {
    id: 'klosterneuburg',
    name: '克洛斯特新堡',
    lon: 16.3255,
    lat: 48.3049,
    placeId: 'place-klosterneuburg',
    major: true,
  },
  { id: 'london', name: '伦敦', lon: -0.1278, lat: 51.5074 },
  { id: 'paris', name: '巴黎', lon: 2.3522, lat: 48.8566 },
  { id: 'berlin', name: '柏林', lon: 13.405, lat: 52.52 },
  { id: 'rome', name: '罗马', lon: 12.4964, lat: 41.9028 },
  { id: 'istanbul', name: '伊斯坦布尔', lon: 28.9784, lat: 41.0082 },
  { id: 'moscow', name: '莫斯科', lon: 37.6173, lat: 55.7558 },
  { id: 'cairo', name: '开罗', lon: 31.2357, lat: 30.0444 },
  { id: 'new-york', name: '纽约', lon: -74.006, lat: 40.7128 },
  { id: 'tokyo', name: '东京', lon: 139.6503, lat: 35.6762 },
  { id: 'buenos-aires', name: '布宜诺斯艾利斯', lon: -58.3816, lat: -34.6037 },
  { id: 'nairobi', name: '内罗毕', lon: 36.8219, lat: -1.2921 },
  { id: 'mumbai', name: '孟买', lon: 72.8777, lat: 19.076 },
  { id: 'sydney', name: '悉尼', lon: 151.2093, lat: -33.8688 },
];

const project = ([lon, lat]: LonLat): [number, number] => [
  ((lon + 180) / 360) * W,
  ((85 - lat) / 170) * H,
];

type GeoFeature = {
  type: 'Feature';
  properties?: { name?: string; id?: string };
  geometry:
    | { type: 'Polygon'; coordinates: LonLat[][] }
    | { type: 'MultiPolygon'; coordinates: LonLat[][][] };
};

let geoPromise: Promise<GeoFeature[]> | undefined;

function ringPath(ring: LonLat[]): string {
  if (ring.length === 0) return '';
  return ring
    .map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ')
    .concat(' Z');
}

function featurePath(feature: GeoFeature): string {
  if (feature.geometry.type === 'Polygon') {
    return feature.geometry.coordinates.map(ringPath).join(' ');
  }
  return feature.geometry.coordinates
    .flatMap((polygon) => polygon.map(ringPath))
    .join(' ');
}

function settlementFor(locationId?: string): string | undefined {
  if (!locationId) return undefined;
  if (locationId.startsWith('place-klosterneuburg')) return 'klosterneuburg';
  if (locationId.startsWith('place-wien')) return 'wien';
  return undefined;
}

export default function WorldMap({
  people,
  selectedId,
  activePlace,
  onPlace,
  politicalWorld,
  year,
}: {
  people: { id: string; locationId: string; name: string; died?: unknown }[];
  selectedId: string | null;
  activePlace: string | null;
  onPlace: (id: string) => void;
  politicalWorld?: PoliticalSnapshot;
  year?: number;
}) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [failed, setFailed] = useState(false);
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [pinnedIso, setPinnedIso] = useState<string | null>(null);
  const [view, setView] = useState({
    cx: project([16.3738, 48.2082])[0],
    cy: project([16.3738, 48.2082])[1],
    zoom: 2.35,
  });
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    geoPromise ??= fetch('/earth/countries.geojson')
      .then((response) => response.json())
      .then((data) => data.features as GeoFeature[]);
    geoPromise.then(setFeatures).catch(() => setFailed(true));
  }, []);

  const selected = people.find((person) => person.id === selectedId && !person.died);
  const personSettlement = settlementFor(selected?.locationId);
  const activeSettlement = settlementFor(activePlace ?? undefined);
  const activeCity = CITIES.find((city) => city.id === activeSettlement);
  const personCity = CITIES.find((city) => city.id === personSettlement);
  const vw = W / view.zoom;
  const vh = H / view.zoom;

  const paths = useMemo(
    () =>
      features.map((feature) => {
        const iso = feature.properties?.id ?? '';
        return { feature, d: featurePath(feature), entry: politicalWorld?.map[iso] };
      }),
    [features, politicalWorld],
  );
  const graticule = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
    for (let lon = -180; lon <= 180; lon += 30) {
      const [x] = project([lon, 0]);
      lines.push({ x1: x, y1: 0, x2: x, y2: H, key: `lon-${lon}` });
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y] = project([0, lat]);
      lines.push({ x1: 0, y1: y, x2: W, y2: y, key: `lat-${lat}` });
    }
    return lines;
  }, []);

  const legend = useMemo(() => {
    if (!politicalWorld) return [];
    const counts = new Map<string, number>();
    for (const entry of Object.values(politicalWorld.map)) {
      counts.set(entry.polityId, (counts.get(entry.polityId) ?? 0) + 1);
    }
    const ranked = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([polityId, count]) => ({
        polity: politicalWorld.polities.find((entry) => entry.id === polityId),
        count,
      }))
      .filter(
        (entry): entry is { polity: PoliticalPolity; count: number } => Boolean(entry.polity),
      );
    const current = politicalWorld.viennaPolity;
    if (current && !ranked.some((entry) => entry.polity.id === current.id)) {
      return [{ polity: current, count: 0 }, ...ranked.slice(0, 6)];
    }
    return ranked.slice(0, 7);
  }, [politicalWorld]);

  const activeIso = hoveredIso ?? pinnedIso;
  const hoveredEntry = activeIso ? politicalWorld?.map[activeIso] : undefined;
  const hoveredPolity = hoveredEntry
    ? politicalWorld?.polities.find((polity) => polity.id === hoveredEntry.polityId)
    : undefined;
  const focusPolity = hoveredPolity ?? politicalWorld?.viennaPolity;
  const focusLeader = focusPolity?.leaders.find((leader) => leader.role === 'head_of_state');
  const focusGovernment = focusPolity?.leaders.find(
    (leader) => leader.role === 'head_of_government',
  );

  function focus(zoom: number, city?: City) {
    const [x, y] = project([city?.lon ?? 16.3738, city?.lat ?? 48.2082]);
    setView({ cx: x, cy: y, zoom });
  }

  function onWheel(event: React.WheelEvent<SVGSVGElement>) {
    event.preventDefault();
    setView((current) => ({
      ...current,
      zoom: Math.max(1, Math.min(12, current.zoom * (event.deltaY < 0 ? 1.18 : 0.85))),
    }));
  }

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    if (!svg.current) return;
    svg.current.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, cx: view.cx, cy: view.cy };
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!drag.current || !svg.current) return;
    const rect = svg.current.getBoundingClientRect();
    const dx = ((event.clientX - drag.current.x) / rect.width) * vw;
    const dy = ((event.clientY - drag.current.y) / rect.height) * vh;
    setView((current) => ({
      ...current,
      cx: Math.max(0, Math.min(W, drag.current!.cx - dx)),
      cy: Math.max(0, Math.min(H, drag.current!.cy - dy)),
    }));
  }

  function onPointerUp() {
    drag.current = null;
  }

  return (
    <div className="world-map">
      <div className="world-map-toolbar">
        <span>
          {politicalWorld ? `政治地图 · ${year ?? politicalWorld.date.year}` : '真实地理 · 世界'}
          {politicalWorld && <small>近似政权归属</small>}
        </span>
        <div>
          <button type="button" onClick={() => setView({ cx: W / 2, cy: H / 2, zoom: 1 })}>
            全球
          </button>
          <button type="button" onClick={() => focus(2.8, CITIES[0])}>
            欧洲
          </button>
          <button type="button" onClick={() => focus(5, personCity ?? CITIES[0])}>
            人物
          </button>
        </div>
      </div>
      <svg
        ref={svg}
        className="world-map-svg"
        viewBox={`${view.cx - vw / 2} ${view.cy - vh / 2} ${vw} ${vh}`}
        role="img"
        aria-label={
          politicalWorld
            ? '历史政治地图：政权归属叠层、城市与人物当前位置'
            : '真实世界地图：欧洲、地中海、城市与人物当前位置'
        }
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <rect x="0" y="0" width={W} height={H} fill="#0b171b" />
        <g className="world-map-graticule">
          {graticule.map((line) => (
            <line {...line} key={line.key} />
          ))}
        </g>
        {failed && (
          <g className="world-map-fallback">
            <path
              d="M70 120 C110 70 190 60 245 95 C300 120 330 100 370 115 C420 132 440 180 410 220 C380 255 320 250 285 225 C250 250 190 250 160 220 C120 235 80 200 70 160 Z"
              fill="#263a31"
              stroke="#4b5d4b"
            />
            <path d="M470 100 C520 70 590 80 610 120 C630 160 590 210 540 205 C500 200 470 170 470 100 Z" fill="#263a31" stroke="#4b5d4b" />
            <path d="M500 235 C540 220 580 235 585 270 C570 300 520 300 500 270 Z" fill="#263a31" stroke="#4b5d4b" />
          </g>
        )}
        <g className="world-map-countries">
          {paths.map(({ feature, d, entry }) => (
            <path
              key={feature.properties?.id ?? d.slice(0, 24)}
              d={d}
              className={entry ? 'political' : undefined}
              fill={entry?.color}
              fillOpacity={entry ? 0.62 : undefined}
              data-polity={entry?.polityId}
              onMouseEnter={() => setHoveredIso(feature.properties?.id ?? null)}
              onMouseLeave={() => setHoveredIso(null)}
              onClick={() => setPinnedIso(feature.properties?.id ?? null)}
            >
              <title>
                {entry
                  ? `${entry.name}${entry.approximate ? '（近似）' : ''} · ${feature.properties?.name ?? ''}`
                  : feature.properties?.name ?? ''}
              </title>
            </path>
          ))}
        </g>
        <g className="world-map-cities">
          {CITIES.map((city) => {
            const [x, y] = project([city.lon, city.lat]);
            const active = activeSettlement === city.id;
            const isPerson = personSettlement === city.id;
            const showLabel = city.major || view.zoom > 2.2 || active || isPerson;
            return (
              <g
                key={city.id}
                className={`world-city ${city.major ? 'major' : ''} ${active ? 'active' : ''} ${isPerson ? 'person' : ''}`}
                transform={`translate(${x} ${y})`}
                onClick={() => city.placeId && onPlace(city.placeId)}
                role={city.placeId ? 'button' : undefined}
                tabIndex={city.placeId ? 0 : undefined}
                onKeyDown={(event) => {
                  if (city.placeId && (event.key === 'Enter' || event.key === ' ')) onPlace(city.placeId);
                }}
              >
                <circle className="world-city-dot" r={city.major ? 2.5 : 1.3} />
                {isPerson && <circle className="world-city-person-ring" r={6} />}
                {showLabel && (
                  <text className="world-city-label" x={4} y={2.5}>
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      {politicalWorld && (
        <div className="world-map-legend">
          {legend.map(({ polity }) => (
            <button
              key={polity.id}
              type="button"
              className="world-map-legend-item"
              onMouseEnter={() => {
                const iso = Object.values(politicalWorld.map).find(
                  (entry) => entry.polityId === polity.id,
                )?.iso;
                if (iso) setHoveredIso(iso);
              }}
              onMouseLeave={() => setHoveredIso(null)}
              onClick={() => {
                const iso = Object.values(politicalWorld.map).find(
                  (entry) => entry.polityId === polity.id,
                )?.iso;
                if (iso) setPinnedIso(iso);
              }}
            >
              <span style={{ background: polity.color }} />
              {polity.name}
            </button>
          ))}
        </div>
      )}
      {politicalWorld && focusPolity && (
        <div className="world-map-polity-card" data-polity-card={focusPolity.id}>
          <div className="world-map-polity-head">
            <strong>{focusPolity.name}</strong>
            <small>{focusPolity.englishName}</small>
          </div>
          <div className="world-map-polity-meta">
            <span>{focusPolity.capital}</span>
            <span>{focusPolity.approximate ? '近似边界' : '政权归属'}</span>
          </div>
          <p>{focusPolity.government}</p>
          <div className="world-map-polity-leaders">
            {focusLeader && (
              <span>
                {focusLeader.title}：{focusLeader.name}
              </span>
            )}
            {focusGovernment && (
              <span>
                {focusGovernment.title}：{focusGovernment.name}
              </span>
            )}
          </div>
          {focusPolity.notes && <small>{focusPolity.notes}</small>}
        </div>
      )}
      <div className="world-map-caption">
        <span>{personCity ? `人物在 ${personCity.name}` : '人物位置未知'}</span>
        <span>
          {politicalWorld
            ? `${politicalWorld.note.slice(0, 42)}…`
            : activeCity
              ? `查看 ${activeCity.name}`
              : '点击维也纳 / 克洛斯特新堡'}
        </span>
      </div>
      <div className="world-map-zoom">
        <button type="button" onClick={() => setView((v) => ({ ...v, zoom: Math.min(12, v.zoom * 1.25) }))}>
          +
        </button>
        <button type="button" onClick={() => setView((v) => ({ ...v, zoom: Math.max(1, v.zoom / 1.25) }))}>
          −
        </button>
      </div>
    </div>
  );
}
