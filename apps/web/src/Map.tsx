import EarthMap from './EarthMap';
import { useEffect, useRef, useState } from 'react';
import { Application, Graphics, Text, Container } from 'pixi.js';
import { random } from '../../../packages/simulation-core/random';
function LegacyMap({
  map,
  personId,
  onPlace,
}: {
  map: any;
  personId?: string;
  onPlace: (id: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!map || !host.current) return;
    let disposed = false;
    const app = new Application();
    async function draw() {
      try {
        await document.fonts.load(
          '14px "Noto Sans SC"',
          map.settlements.map((s: any) => s.name).join(''),
        );
        await app.init({
          width: 780,
          height: 600,
          autoStart: false,
          background: '#182d36',
          antialias: false,
          resolution: 1,
          preference: 'webgl',
        });
        if (disposed) {
          app.destroy(true);
          return;
        }
        host.current!.replaceChildren(app.canvas);
        app.canvas.setAttribute('aria-label', '世界地图：城镇、边界与人物位置');
        app.canvas.setAttribute('role', 'img');
        const terrain = new Graphics();
        for (let y = 0; y < 600; y += 8)
          for (let x = 0; x < 780; x += 8) {
            const nx = (x - 390) / 365,
              ny = (y - 290) / 285;
            const coast = nx * nx + ny * ny + 0.16 * Math.sin(y / 35) + 0.1 * Math.cos(x / 23);
            const v = random(map.seed, x, y);
            if (
              coast < 0.96 ||
              map.settlements.some((s: any) => Math.abs(s.x - x) < 45 && Math.abs(s.y - y) < 40)
            ) {
              const colors =
                y < 210
                  ? ['#3a5148', '#465b49', '#53634d']
                  : x > 500
                    ? ['#747562', '#626b58', '#7e7b68']
                    : ['#617552', '#6a8058', '#748761'];
              terrain.rect(x, y, 8, 8).fill(colors[Math.floor(v * colors.length)]);
            } else if (coast < 1.04) terrain.rect(x, y, 8, 8).fill('#34504e');
            else if (v < 0.07) terrain.rect(x, y, 5, 1).fill('#35515a');
          }
        app.stage.addChild(terrain);
        const borders = new Graphics();
        for (const s of map.settlements) {
          const index = Number(s.id.split('-')[1]);
          const row = Math.floor(index / 6),
            col = index % 6;
          const color = map.polities.find((p: any) => p.id === s.polityId)?.color ?? '#ccc';
          borders.rect(45 + col * 110, 30 + row * 85, 110, 85).fill({ color, alpha: 0.08 });
          for (const offset of [1, 6]) {
            const next = map.settlements.find((q: any) => q.id === `town-${index + offset}`);
            if (next && next.polityId !== s.polityId && (offset === 6 || col < 5)) {
              if (offset === 1)
                borders
                  .moveTo(155 + col * 110, 30 + row * 85)
                  .lineTo(155 + col * 110, 115 + row * 85)
                  .stroke({ color, alpha: 0.55, width: 2 });
              else
                borders
                  .moveTo(45 + col * 110, 115 + row * 85)
                  .lineTo(155 + col * 110, 115 + row * 85)
                  .stroke({ color, alpha: 0.55, width: 2 });
            }
          }
        }
        app.stage.addChild(borders);
        const routes = new Graphics();
        for (const s of map.settlements) {
          const right = map.settlements.find(
            (q: any) => q.id === `town-${Number(s.id.split('-')[1]) + 1}`,
          );
          if (right && Math.abs(right.y - s.y) < 50)
            routes
              .moveTo(s.x, s.y)
              .lineTo(right.x, right.y)
              .stroke({ color: '#c8bd8b', alpha: 0.22, width: 1 });
        }
        app.stage.addChild(routes);
        for (const s of map.settlements) {
          const color = map.polities.find((p: any) => p.id === s.polityId)?.color ?? '#ccc';
          const node = new Container();
          node.position.set(s.x, s.y);
          const dot = new Graphics()
            .rect(-5, -5, 10, 10)
            .fill(color)
            .rect(-2, -9, 4, 4)
            .fill('#d4d0ae');
          if (s.scarcity > 0.2) dot.rect(-9, 7, 18, 2).fill('#cb795f');
          const label = new Text({
            text: s.name,
            style: { fontFamily: 'Noto Sans SC, sans-serif', fontSize: 14, fill: '#e0e1c8' },
          });
          label.anchor.set(0.5, 0);
          label.y = 11;
          node.addChild(dot, label);
          node.eventMode = 'static';
          node.cursor = 'pointer';
          node.on('pointertap', () => onPlace(s.id));
          app.stage.addChild(node);
        }
        const location = map.locations?.[personId ?? ''];
        const s = map.settlements.find((q: any) => q.id === location);
        if (s) {
          const marker = new Graphics()
            .circle(s.x, s.y, 13)
            .stroke({ color: '#f1d99c', width: 2 })
            .moveTo(s.x, s.y - 26)
            .lineTo(s.x - 5, s.y - 18)
            .lineTo(s.x + 5, s.y - 18)
            .closePath()
            .fill('#f1d99c');
          app.stage.addChild(marker);
        }
        app.render();
      } catch {
        if (!disposed) setFailed(true);
      }
    }
    draw();
    return () => {
      disposed = true;
      if (app.renderer) app.destroy(true, { children: true });
    };
  }, [map, personId]);
  return (
    <div className="map-frame">
      <div className="pixi-map" ref={host} />
      {failed && (
        <svg viewBox="0 0 780 600" role="img" aria-label="世界地图兼容视图">
          <rect width="780" height="600" fill="#223e43" />
          <ellipse cx="390" cy="300" rx="365" ry="280" fill="#617552" />
          {map?.settlements.map((s: any) => (
            <g key={s.id} onClick={() => onPlace(s.id)}>
              <rect
                x={s.x - 5}
                y={s.y - 5}
                width="10"
                height="10"
                fill={map.polities.find((p: any) => p.id === s.polityId)?.color}
              />
              <text x={s.x} y={s.y + 22} textAnchor="middle" fill="#eee" fontSize="14">
                {s.name}
              </text>
              {map.locations?.[personId ?? ''] === s.id && (
                <circle cx={s.x} cy={s.y} r="13" stroke="#f1d99c" fill="none" strokeWidth="2" />
              )}
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

export default function WorldMap(props: {
  map: any;
  personId?: string;
  onPlace: (id: string) => void;
}) {
  return props.map?.calendar ? <EarthMap {...props} /> : <LegacyMap {...props} />;
}
