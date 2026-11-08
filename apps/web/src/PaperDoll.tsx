import { useEffect, useRef, useState } from 'react';
import {
  appearanceLayers,
  hairPalette,
  skinPalette,
  textilePalette,
} from '../../../packages/visuals/paper-doll';
import type { DollConfig } from '../../../packages/contracts';
import OriginalPortrait from './OriginalPortrait';
const images = new Map<string, Promise<HTMLImageElement>>();
function load(src: string) {
  if (!images.has(src))
    images.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      }),
    );
  return images.get(src)!;
}
const rgba = (hex: string) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];
const frames = new Map<string, HTMLCanvasElement>();
async function layerFrame(url: string, row: number, column: number, color?: string) {
  const key = `${url}:${row}:${column}:${color}`;
  if (frames.has(key)) return frames.get(key)!;
  const img = await load(url),
    canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const rows = Math.max(1, Math.floor(img.height / 64)),
    columns = Math.max(1, Math.floor(img.width / 64));
  ctx.drawImage(img, (column % columns) * 64, (row % rows) * 64, 64, 64, 0, 0, 64, 64);
  if (color) {
    const rgb = rgba(color),
      pixels = ctx.getImageData(0, 0, 64, 64);
    for (let i = 0; i < pixels.data.length; i += 4) {
      if (!pixels.data[i + 3]) continue;
      const light =
        (pixels.data[i] * 0.3 + pixels.data[i + 1] * 0.59 + pixels.data[i + 2] * 0.11) / 180;
      for (let c = 0; c < 3; c++) pixels.data[i + c] = Math.min(255, rgb[c] * light);
    }
    ctx.putImageData(pixels, 0, 0);
  }
  frames.set(key, canvas);
  if (frames.size > 1800) frames.delete(frames.keys().next().value!);
  return canvas;
}
export default function PaperDoll({
  person,
  direction = 2,
  motion = false,
  className = '',
}: {
  person: any;
  direction?: number;
  motion?: boolean;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!person) return;
    let stop = false,
      frame = 0,
      timer: ReturnType<typeof setTimeout>;
    const layers = appearanceLayers(person);
    async function render() {
      try {
        const walking =
          motion || person.plans?.some((p: any) => p.kind === 'migrate' && p.status === 'active');
        const index = walking ? 1 + (frame % 8) : 0;
        const parts = await Promise.all(
          layers.map(async (l) => ({
            img: await layerFrame(l.asset.url, direction, index, l.color),
            scale: l.scale ?? 1,
          })),
        );
        if (stop || !canvas.current) return;
        // Compose the 64x64 LPC layers first, then crop transparent margins and
        // draw the figure large in the portrait canvas. The old code drew a
        // 64px figure into a 216px box, which made the character look tiny.
        const composed = document.createElement('canvas');
        composed.width = composed.height = 64;
        const compose = composed.getContext('2d', { willReadFrequently: true })!;
        compose.imageSmoothingEnabled = false;
        for (const part of parts) {
          if (part.scale === 1) compose.drawImage(part.img, 0, 0);
          else {
            compose.save();
            compose.translate(32, 32);
            compose.scale(part.scale, part.scale);
            compose.drawImage(part.img, -32, -32);
            compose.restore();
          }
        }
        const pixels = compose.getImageData(0, 0, 64, 64).data;
        let minX = 64, minY = 64, maxX = -1, maxY = -1;
        for (let y = 0; y < 64; y++) {
          for (let x = 0; x < 64; x++) {
            if (!pixels[(y * 64 + x) * 4 + 3]) continue;
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
        if (maxX < minX || maxY < minY) return;
        const bw = maxX - minX + 1;
        const bh = maxY - minY + 1;
        const ageScale = person.age !== undefined && person.age < 3 ? 0.76 : person.age !== undefined && person.age < 13 ? 0.88 : 1;
        const targetH = 184 * ageScale;
        const scale = Math.min(targetH / bh, 176 / bw);
        const dw = bw * scale;
        const dh = bh * scale;
        const ctx = canvas.current.getContext('2d')!;
        ctx.imageSmoothingEnabled = false;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 192, 192);
        if (person.death !== undefined) ctx.filter = 'grayscale(1) brightness(.65)';
        ctx.drawImage(composed, minX, minY, bw, bh, (192 - dw) / 2, 184 - dh, dw, dh);
        ctx.filter = 'none';
        if (person.health < 0.4) {
          ctx.fillStyle = '#9b675f';
          ctx.fillRect(94, 96, 4, 2);
        }
        frame++;
        if (walking) timer = setTimeout(render, 140);
      } catch {
        if (!stop) setFailed(true);
      }
    }
    render();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [person, direction, motion]);
  return (
    <div className={`doll-frame ${failed ? 'failed' : ''}`}>
      <span className="doll-fallback" aria-hidden>
        {person?.name?.slice(0, 1) ?? '?'}
      </span>
      <canvas
        ref={canvas}
        width="192"
        height="192"
        className={`paper-doll ${className}`}
        role="img"
        aria-label={`${person?.name ?? '人物'}的分层像素纸娃娃${failed ? '（素材加载失败，显示姓名首字）' : ''}`}
      />
    </div>
  );
}
export function CompactDollEditor({
  value,
  onChange,
}: {
  value: { skin: number; hair: number; clothes: number; doll?: DollConfig };
  onChange: (v: typeof value) => void;
}) {
  const d = value.doll ?? { bodyType: 'female' };
  const body = d.bodyType ?? 'female';
  const set = (key: string, next: any) => onChange({ ...value, doll: { ...d, [key]: next } });
  const randomize = () =>
    onChange({
      skin: Math.floor(Math.random() * Math.min(8, skinPalette.length)),
      hair: Math.floor(Math.random() * Math.min(8, hairPalette.length)),
      clothes: Math.floor(Math.random() * Math.min(8, textilePalette.length)),
      doll: {
        ...d,
        hairColor: hairPalette[Math.floor(Math.random() * Math.min(8, hairPalette.length))],
        topColor: textilePalette[Math.floor(Math.random() * Math.min(8, textilePalette.length))],
        bottomColor: textilePalette[Math.floor(Math.random() * Math.min(8, textilePalette.length))],
      },
    });
  return (
    <div className="compact-doll">
      <div className="compact-doll-preview">
        <OriginalPortrait
          person={{
            name: '出生预览',
            appearance: { ...value, doll: d },
            age: 0,
            health: { vitality: 1 },
            mood: 0.15,
            roles: [],
          }}
        />
        <button type="button" className="text-button" onClick={randomize}>
          随机外观
        </button>
      </div>
      <div className="compact-doll-fields">
        <label>
          体型
          <select value={body} onChange={(e) => set('bodyType', e.target.value)}>
            <option value="female">女性</option>
            <option value="male">男性</option>
            <option value="muscular">壮实</option>
            <option value="teen">纤细</option>
          </select>
        </label>
        <div className="doll-colors">
          <span>肤色</span>
          <div>
            {skinPalette.slice(0, 8).map((color, index) => (
              <button
                key={color}
                type="button"
                className={value.skin === index ? 'selected' : ''}
                style={{ background: color }}
                onClick={() => onChange({ ...value, skin: index })}
                aria-label={`肤色 ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="doll-colors">
          <span>发色</span>
          <div>
            {hairPalette.slice(0, 8).map((color, index) => (
              <button
                key={color}
                type="button"
                className={value.hair === index ? 'selected' : ''}
                style={{ background: color }}
                onClick={() => onChange({ ...value, hair: index })}
                aria-label={`发色 ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="doll-colors">
          <span>衣服</span>
          <div>
            {textilePalette.slice(0, 8).map((color, index) => (
              <button
                key={color}
                type="button"
                className={value.clothes === index ? 'selected' : ''}
                style={{ background: color }}
                onClick={() => onChange({ ...value, clothes: index })}
                aria-label={`衣服 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
