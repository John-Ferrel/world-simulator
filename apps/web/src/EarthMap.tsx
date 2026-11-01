import { useEffect, useRef, useState } from 'react';
import { random } from '../../../packages/simulation-core/random';
let terrainPromise: Promise<any> | undefined;
export default function EarthMap({
  map,
  personId,
  onPlace,
}: {
  map: any;
  personId?: string;
  onPlace: (id: string) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    container = useRef<HTMLDivElement>(null),
    drag = useRef<any>(undefined);
  const [zoom, setZoom] = useState(1),
    [offset, setOffset] = useState({ x: 0, y: 0 }),
    [hover, setHover] = useState<any>(),
    [layer, setLayer] = useState<'geography' | 'society' | 'risk'>('geography');
  const [query, setQuery] = useState('');
  const [terrain, setTerrain] = useState<any>();
  useEffect(() => {
    terrainPromise ??= fetch('/earth/terrain.json').then((r) => r.json());
    terrainPromise.then(setTerrain);
  }, []);
  const project = (s: any) => ({ x: ((s.lon + 180) / 360) * 1440, y: ((85 - s.lat) / 160) * 640 });
  useEffect(() => {
    if (!map || !terrain || !canvas.current) return;
    const ctx = canvas.current.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#122735';
    ctx.fillRect(0, 0, 1440, 760);
    ctx.save();
    ctx.translate(720 + offset.x, 350 + offset.y);
    ctx.scale(zoom, zoom);
    ctx.translate(-720, -320);
    const polityColors = new Map<string, string>(map.polities.map((p: any) => [p.id, p.color]));
    const places = new Map<string, any>(map.settlements.map((s: any) => [s.id, s]));
    const activeRisk = new Set<string>(
      (map.shocks ?? [])
        .filter(
          (q: any) => q.ends > map.month && !['innovation', 'peace', 'reform'].includes(q.kind),
        )
        .flatMap((q: any) => q.locationIds),
    );
    for (let y = 0; y < terrain.height; y++)
      for (let x = 0; x < terrain.width; x++) {
        const cell = terrain.cells[y * terrain.width + x];
        if (!cell) {
          if (random('sea', x, y) < 0.025) {
            ctx.fillStyle = '#274452';
            ctx.fillRect(x * 4, y * 4, 3, 1);
          }
          continue;
        }
        const lat = 85 - y;
        const n = random('earth', x, y);
        const colors =
          Math.abs(lat) > 60
            ? ['#adbbb3', '#94a79e', '#b9c7c0']
            : Math.abs(lat) < 26 && ((x > 155 && x < 235) || (x > 80 && x < 100))
              ? ['#aa9d70', '#b1a177', '#9b966c']
              : ['#55785e', '#5f8062', '#6b8968', '#648365'];
        ctx.fillStyle = layer === 'society' ? '#526957' : colors[Math.floor(n * colors.length)];
        ctx.fillRect(x * 4, y * 4, 4, 4);
        if (
          (x > 0 && terrain.cells[y * terrain.width + x - 1] !== cell) ||
          (y > 0 && terrain.cells[(y - 1) * terrain.width + x] !== cell)
        ) {
          ctx.fillStyle = '#172f3170';
          ctx.fillRect(x * 4, y * 4, 1, 4);
        }
      }
    const selected = map.settlements.find((s: any) => s.id === map.locations?.[personId ?? '']);
    if (selected && zoom > 1.5) {
      for (const route of map.routes ?? []) {
        if (route.from !== selected.id && route.to !== selected.id) continue;
        const a = map.settlements.find((s: any) => s.id === route.from),
          b = map.settlements.find((s: any) => s.id === route.to);
        if (!a || !b) continue;
        const p = project(a),
          q = project(b);
        if (Math.abs(p.x - q.x) > 700) continue;
        ctx.strokeStyle = route.status === 'restricted' ? '#c47862' : '#c8bb8e80';
        ctx.lineWidth = 0.6 / zoom;
        ctx.setLineDash(route.mode === 'air' ? [3, 3] : []);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    if (layer === 'society' || layer === 'risk')
      for (const f of map.fronts ?? []) {
        const a = places.get(f.from),
          b = places.get(f.to);
        if (!a || !b) continue;
        const p = project(a),
          q = project(b);
        if (Math.abs(p.x - q.x) > 700) continue;
        ctx.strokeStyle = f.control > 0.6 ? '#cf9f6b' : f.control < 0.4 ? '#bf7f75' : '#d9b579';
        ctx.lineWidth = 1.3 / zoom;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    const occupied = new Set<string>();
    const ordered = [...map.settlements].sort(
      (a: any, b: any) => (b.population ?? 0) - (a.population ?? 0),
    );
    for (const s of ordered) {
      const p = project(s);
      const screenX = (p.x - 720) * zoom + 720 + offset.x,
        screenY = (p.y - 320) * zoom + 350 + offset.y;
      if (screenX < -30 || screenX > 1470 || screenY < -30 || screenY > 790) continue;
      const key = `${Math.floor(screenX / 12)}:${Math.floor(screenY / 12)}`;
      if (occupied.has(key) && s.id !== selected?.id) continue;
      occupied.add(key);
      const active = activeRisk.has(s.id);
      if (layer === 'risk' && (active || s.scarcity > 0.1)) {
        ctx.fillStyle = active ? '#cf80655a' : '#d7b27850';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle =
        s.id === selected?.id
          ? '#ffe3a7'
          : layer === 'society'
            ? (polityColors.get(s.polityId) ?? '#d3d4b0')
            : active
              ? '#db9b78'
              : '#d3d4b0';
      ctx.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 2, 2, 3);
      if ((zoom > 2 && (s.population > 1500000 / zoom || zoom > 8)) || s.id === selected?.id) {
        ctx.font = `${Math.max(4, 9 / zoom)}px "Noto Sans SC",sans-serif`;
        ctx.fillStyle = s.id === selected?.id ? '#ffe5af' : '#d1d7bd';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, p.x, p.y + 9 / zoom);
      }
    }
    if (selected) {
      const p = project(selected);
      ctx.strokeStyle = '#f4d69b';
      ctx.lineWidth = 1.5 / zoom;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7 / zoom, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }, [map, terrain, zoom, offset, layer, personId]);
  function hit(event: React.PointerEvent) {
    if (!canvas.current || !map) return;
    const rect = canvas.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * 1440) / rect.width,
      y = ((event.clientY - rect.top) * 760) / rect.height;
    const world = { x: (x - 720 - offset.x) / zoom + 720, y: (y - 350 - offset.y) / zoom + 320 };
    let nearest: any,
      dist = Infinity;
    for (const s of map.settlements) {
      const p = project(s),
        d = Math.hypot(p.x - world.x, p.y - world.y);
      if (d < dist) {
        dist = d;
        nearest = s;
      }
    }
    return dist < 16 / zoom ? nearest : undefined;
  }
  return (
    <div className="earth-map" ref={container}>
      <div className="earth-toolbar">
        <div>
          {[
            ['geography', '地理'],
            ['society', '城市控制'],
            ['risk', '事件'],
          ].map(([id, name]) => (
            <button
              key={id}
              className={layer === id ? 'active' : ''}
              onClick={() => setLayer(id as any)}
            >
              {name}
            </button>
          ))}
        </div>
        <span>
          {layer === 'society' ? '城市归属与实际战线' : '真实地理'} ·{' '}
          {map?.calendar?.startYear ?? 1900}+ 模拟
        </span>
      </div>
      <form
        className="earth-search"
        onSubmit={(e) => {
          e.preventDefault();
          const s =
            map?.settlements.find((s: any) => s.name === query) ??
            map?.settlements.find((s: any) => s.name.includes(query.trim()));
          if (s && query.trim()) {
            const p = project(s);
            setZoom(10);
            setOffset({ x: (720 - p.x) * 10, y: (320 - p.y) * 10 });
            onPlace(s.id);
          }
        }}
      >
        <input
          aria-label="查找地图城镇"
          placeholder="查找城镇"
          value={query}
          list="earth-city-search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <datalist id="earth-city-search">
          {query &&
            map?.settlements
              .filter((s: any) => s.name.includes(query.trim()))
              .slice(0, 20)
              .map((s: any) => <option key={s.id} value={s.name} />)}
        </datalist>
        <button type="submit">定位</button>
      </form>
      <canvas
        ref={canvas}
        width="1440"
        height="760"
        aria-label="真实地球像素地图，可缩放拖动并预览城市"
        role="img"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, offset };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            setOffset({
              x: drag.current.offset.x + ((e.clientX - drag.current.x) * 1440) / rect.width,
              y: drag.current.offset.y + ((e.clientY - drag.current.y) * 760) / rect.height,
            });
          } else setHover(hit(e));
        }}
        onPointerUp={(e) => {
          if (
            drag.current &&
            Math.hypot(e.clientX - drag.current.x, e.clientY - drag.current.y) < 5
          ) {
            const s = hit(e);
            if (s) onPlace(s.id);
          }
          drag.current = undefined;
        }}
        onWheel={(e) => setZoom((z) => Math.max(1, Math.min(32, z + (e.deltaY < 0 ? 0.4 : -0.4))))}
      />
      <div className="earth-controls">
        <button onClick={() => setZoom((z) => Math.min(32, z + 0.6))} aria-label="放大地图">
          ＋
        </button>
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.6))} aria-label="缩小地图">
          −
        </button>
        <button
          onClick={() => {
            setOffset({ x: 0, y: 0 });
            setZoom(1);
          }}
        >
          全球
        </button>
        <button
          onClick={() => {
            const s = map?.settlements.find((s: any) => s.id === map.locations?.[personId ?? '']);
            if (s) {
              const p = project(s);
              setZoom(3);
              setOffset({ x: (720 - p.x) * 3, y: (320 - p.y) * 3 });
            }
          }}
        >
          定位人物
        </button>
      </div>
      {hover && (
        <div className="map-hover">
          <strong>{hover.name}</strong>
          <span>
            {map.polities.find((p: any) => p.id === hover.polityId)?.name} ·{' '}
            {hover.population?.toLocaleString()} 居民
          </span>
        </div>
      )}
      <div className="earth-map-note">拖动探索 · 滚轮缩放 · 城市与事件来自当前模拟状态</div>
    </div>
  );
}
