import { useId } from 'react';

const skin = [
  '#f4d6bd',
  '#e6b795',
  '#d09a74',
  '#b47b58',
  '#8d5c42',
  '#f8e2cf',
  '#c99678',
  '#a3745a',
  '#e8c3a4',
  '#9c684d',
  '#d8ac8c',
  '#76503e',
];
const hairColors = [
  '#2b2421',
  '#5a392b',
  '#8b5a3c',
  '#c49a5e',
  '#d9c9aa',
  '#6b4a3a',
  '#b9b3a8',
  '#8e3f32',
  '#3d4658',
  '#e0d8c8',
  '#756654',
  '#a77d62',
];
const cloth = [
  '#526d5b',
  '#8d5b52',
  '#4f7584',
  '#74628a',
  '#a98d5e',
  '#55756e',
  '#c8bda6',
  '#394252',
  '#738692',
  '#9b7d64',
  '#625e5a',
  '#4f6a61',
  '#8d6d7a',
  '#b49a6c',
  '#7d8974',
  '#c9ccc4',
];

function pick<T>(list: T[], index: number): T {
  return list[Math.abs(index) % list.length]!;
}

function shade(hex: string, amount: number): string {
  const value = hex.replace('#', '');
  const n = parseInt(value.length === 3 ? value.split('').map((c) => c + c).join('') : value, 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amount));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (n & 255) + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export default function OriginalPortrait({ person }: { person: any }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const appearance = person?.appearance ?? {};
  const doll = appearance.doll ?? {};
  const age = person?.age ?? 30;
  const health = person?.health?.vitality ?? person?.health ?? 1;
  const mood = person?.mood ?? 0;
  const dead = Boolean(person?.died ?? person?.death);
  const sex = person?.sex ?? doll.bodyType ?? 'female';
  const bodyType = doll.bodyType ?? sex;
  const occupation = String(person?.occupation ?? '');
  const roles: string[] = person?.roles ?? [];
  const stateTags: string[] = person?.stateTags ?? [];
  const stage =
    age < 2 ? 'infant' : age < 6 ? 'toddler' : age < 13 ? 'child' : age < 18 ? 'teen' : age < 65 ? 'adult' : 'elder';
  const skinColor = pick(skin, appearance.skin ?? 1);
  const hairColor = doll.hairColor ?? pick(hairColors, appearance.hair ?? 0);
  const topColor = doll.topColor ?? pick(cloth, appearance.clothes ?? 2);
  const bottomColor = doll.bottomColor ?? shade(topColor, -24);
  const eyeColor = doll.eyeColor ?? pick(['#3c4a44', '#4a3a2e', '#52636a', '#5d4b3d'], appearance.hair ?? 0);
  const style = doll.hairStyle ?? appearance.hair ?? 0;
  const longHair = sex === 'female' || bodyType === 'female' || style % 4 === 2;
  const effectiveHair = stage === 'elder' ? '#b9b4aa' : hairColor;
  const happy = mood > 0.22;
  const sad = mood < -0.22 || health < 0.38;
  const angry = mood < -0.55;
  const sick = health < 0.32 || stateTags.includes('chronic-illness');
  const old = stage === 'elder';
  const infant = stage === 'infant';
  const child = stage === 'child' || stage === 'toddler';
  const headW = infant ? 92 : child ? 82 : stage === 'teen' ? 74 : old ? 72 : 78;
  const headH = infant ? 88 : child ? 86 : old ? 84 : 92;
  const headX = 100 - headW / 2;
  const headY = infant ? 52 : child ? 48 : 42;
  const eyeY = headY + headH * 0.48;
  const eyeGap = headW * 0.22;
  const eyeW = infant ? 15 : child ? 13 : 12;
  const eyeH = infant ? 10 : 8;
  const mouthY = headY + headH * 0.75;
  const jaw = headY + headH;
  const neckY = jaw - 6;
  const shoulderY = infant ? 150 : child ? 158 : 162;
  const shoulderW = infant ? 88 : child ? 112 : 148;
  const coat =
    occupation.includes('Arzt') ||
    occupation.includes('医生') ||
    occupation.includes('physician') ||
    occupation.includes('writer') ||
    occupation.includes('dramatist') ||
    roles.includes('official') ||
    roles.includes('beamter') ||
    roles.includes('writer') ||
    roles.includes('physician') ||
    roles.includes('dramatist') ||
    roles.includes('professor') ||
    stateTags.includes('office-patronage');
  const student = roles.includes('student') || roles.includes('pupil') || roles.includes('scholar');
  const soldier = roles.includes('soldier') || occupation.includes('Soldat');
  const artist = roles.includes('artist') || occupation.includes('Künstler') || occupation.includes('Maler');
  const worker = occupation.includes('Arbeiter') || occupation.includes('Fabrik') || roles.includes('worker');
  const glasses = coat || student || doll.glasses === 'round';
  const famous = stateTags.includes('fame');
  const scandal = stateTags.includes('public-scandal') || stateTags.includes('pl19-protected-scandal');
  const grieving = stateTags.includes('grief');
  const indebted = stateTags.includes('debt-bondage');
  const cursed = stateTags.includes('cursed-by-wish');
  const scarf = artist;
  const apron = worker;
  const outfit = soldier ? '#4b555d' : coat ? '#313b3b' : student ? '#42565e' : artist ? '#7b4e43' : topColor;
  const outfitDark = shade(outfit, -20);
  const outfitLight = shade(outfit, 18);
  const browY = eyeY - eyeH - 5;
  const blink = happy ? 2 : 0;
  const mouth = infant
    ? `M${100 - 6} ${mouthY} Q100 ${mouthY + 4} ${100 + 6} ${mouthY}`
    : angry
      ? `M${100 - 10} ${mouthY + 4} Q100 ${mouthY - 4} ${100 + 10} ${mouthY + 4}`
      : happy
        ? `M${100 - 12} ${mouthY - 1} Q100 ${mouthY + 8} ${100 + 12} ${mouthY - 1}`
        : sad
          ? `M${100 - 11} ${mouthY + 4} Q100 ${mouthY - 3} ${100 + 11} ${mouthY + 4}`
          : `M${100 - 9} ${mouthY + 1} Q100 ${mouthY + 3} ${100 + 9} ${mouthY + 1}`;

  return (
    <svg
      className={`original-portrait ${stage} ${dead ? 'dead' : ''} ${sick ? 'sick' : ''}`}
      viewBox="0 0 200 240"
      role="img"
      aria-label={`${person?.name ?? '人物'}的原创分层肖像`}
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c2a22" />
          <stop offset="100%" stopColor="#0c1210" />
        </linearGradient>
        <linearGradient id={`skin-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(skinColor, 14)} />
          <stop offset="100%" stopColor={shade(skinColor, -12)} />
        </linearGradient>
        <linearGradient id={`cloth-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={outfitLight} />
          <stop offset="100%" stopColor={outfitDark} />
        </linearGradient>
      </defs>

      <circle cx="100" cy="98" r="82" fill="#c8a45c" opacity="0.055" />
      <circle cx="100" cy="98" r="70" fill="none" stroke="#c8a45c" strokeWidth="0.8" opacity="0.12" />
      <path d="M18 240 L18 206 Q100 184 182 206 L182 240 Z" fill="#0a100d" opacity="0.45" />

      {/* shoulders / torso */}
      <path
        d={`M${100 - shoulderW / 2} 240 L${100 - shoulderW / 2 + 8} ${shoulderY} Q100 ${shoulderY - 18} ${100 + shoulderW / 2 - 8} ${shoulderY} L${100 + shoulderW / 2} 240 Z`}
        fill={`url(#cloth-${uid})`}
        stroke={outfitDark}
        strokeWidth="2"
      />
      <path
        d={`M${100 - 20} ${shoulderY + 4} L100 ${shoulderY + 30} L${100 + 20} ${shoulderY + 4}`}
        fill="none"
        stroke={shade(outfit, 38)}
        strokeWidth="2"
        opacity="0.8"
      />
      {coat && (
        <>
          <path d={`M${100 - 34} ${shoulderY + 2} L100 ${shoulderY + 48} L${100 - 4} ${shoulderY + 4} Z`} fill={shade(outfit, 28)} opacity="0.9" />
          <path d={`M${100 + 34} ${shoulderY + 2} L100 ${shoulderY + 48} L${100 + 4} ${shoulderY + 4} Z`} fill={shade(outfit, 20)} opacity="0.9" />
          <path d={`M${100 - 8} ${shoulderY + 8} L100 ${shoulderY + 28} L${100 + 8} ${shoulderY + 8} L${100 + 4} ${shoulderY + 4} L100 ${shoulderY + 14} L${100 - 4} ${shoulderY + 4} Z`} fill="#e7e1cf" opacity="0.92" />
        </>
      )}
      {apron && (
        <path d={`M${100 - 30} ${shoulderY + 8} L${100 + 30} ${shoulderY + 8} L${100 + 22} 240 L${100 - 22} 240 Z`} fill="#d6c8ae" opacity="0.75" />
      )}
      {old && <path d={`M${100 - 48} ${shoulderY + 4} Q100 ${shoulderY + 28} ${100 + 48} ${shoulderY + 4} L${100 + 40} 240 L${100 - 40} 240 Z`} fill="#3a3430" opacity="0.55" />}
      {scarf && (
        <path d={`M${100 - 28} ${shoulderY + 4} Q100 ${shoulderY + 20} ${100 + 28} ${shoulderY + 4} L${100 + 22} ${shoulderY + 18} Q100 ${shoulderY + 32} ${100 - 22} ${shoulderY + 18} Z`} fill="#a34f42" opacity="0.9" />
      )}
      {/* neck */}
      <rect x={100 - 13} y={neckY} width="26" height={shoulderY - neckY + 10} rx="7" fill={shade(skinColor, -16)} />
      {/* ears */}
      <ellipse cx={headX + 3} cy={eyeY + 6} rx="7" ry="11" fill={shade(skinColor, -8)} />
      <ellipse cx={headX + headW - 3} cy={eyeY + 6} rx="7" ry="11" fill={shade(skinColor, -8)} />
      {/* hair back */}
      {!infant && longHair && (
        <path
          d={`M${headX - 6} ${headY + 10} Q${headX - 22} ${headY + 80} ${headX + 2} ${headY + 118} L${headX + headW - 2} ${headY + 118} Q${headX + headW + 22} ${headY + 80} ${headX + headW + 6} ${headY + 10} Z`}
          fill={shade(effectiveHair, -18)}
        />
      )}
      {/* head */}
      <path
        d={`M${headX + 10} ${headY} Q100 ${headY - 14} ${headX + headW - 10} ${headY} Q${headX + headW + 5} ${headY + 34} ${headX + headW - 2} ${headY + 64} Q${headX + headW - 12} ${jaw} 100 ${jaw} Q${headX + 12} ${jaw} ${headX + 2} ${headY + 64} Q${headX - 5} ${headY + 34} ${headX + 10} ${headY} Z`}
        fill={`url(#skin-${uid})`}
        stroke={shade(skinColor, -28)}
        strokeWidth="1.5"
      />
      {/* hair front */}
      {!infant && !old && (
        <path
          d={`M${headX + 4} ${headY + 8} Q${headX + 14} ${headY - 14} ${100} ${headY - 16} Q${headX + headW - 14} ${headY - 14} ${headX + headW - 4} ${headY + 8} Q${headX + headW - 18} ${headY + 2} ${100} ${headY + 2} Q${headX + 18} ${headY + 2} ${headX + 4} ${headY + 8} Z`}
          fill={effectiveHair}
        />
      )}
      {!infant && longHair && (
        <>
          <path d={`M${headX - 2} ${headY + 16} Q${headX - 10} ${headY + 52} ${headX - 4} ${headY + 84} L${headX + 5} ${headY + 78} Q${headX + 2} ${headY + 44} ${headX + 4} ${headY + 18} Z`} fill={shade(effectiveHair, 8)} />
          <path d={`M${headX + headW + 2} ${headY + 16} Q${headX + headW + 10} ${headY + 52} ${headX + headW + 4} ${headY + 84} L${headX + headW - 5} ${headY + 78} Q${headX + headW - 2} ${headY + 44} ${headX + headW - 4} ${headY + 18} Z`} fill={shade(effectiveHair, 8)} />
        </>
      )}
      {!infant && !old && (
        <path d={`M${headX + 16} ${headY + 4} Q${headX + 34} ${headY - 7} ${headX + 52} ${headY + 2}`} fill="none" stroke={shade(effectiveHair, 28)} strokeWidth="2" opacity="0.55" strokeLinecap="round" />
      )}
      {old && (
        <path d={`M${headX + 8} ${headY + 6} Q${headX + 22} ${headY - 8} ${100} ${headY - 6} Q${headX + headW - 22} ${headY - 8} ${headX + headW - 8} ${headY + 6} Q${headX + headW - 24} ${headY + 10} ${100} ${headY + 10} Q${headX + 24} ${headY + 10} ${headX + 8} ${headY + 6} Z`} fill={effectiveHair} />
      )}
      {infant && (
        <>
          <path d={`M${headX + 5} ${headY + 12} Q100 ${headY - 24} ${headX + headW - 5} ${headY + 12} Q100 ${headY + 24} ${headX + 5} ${headY + 12} Z`} fill="#d8c7aa" stroke="#b7a180" strokeWidth="1.2" />
          <path d={`M${headX + 5} ${headY + 12} Q100 ${headY + 4} ${headX + headW - 5} ${headY + 12}`} fill="none" stroke="#f2e6cf" strokeWidth="3" opacity="0.8" />
          <path d={`M${headX + 8} ${headY + 13} Q100 ${headY + 25} ${headX + headW - 8} ${headY + 13}`} fill="none" stroke="#b7a180" strokeWidth="1.4" />
        </>
      )}
      {/* brows */}
      <path d={`M${100 - eyeGap - eyeW / 2} ${browY} Q${100 - eyeGap} ${browY - 5} ${100 - eyeGap + eyeW / 2} ${browY}`} stroke={shade(effectiveHair, 4)} strokeWidth={infant ? 1.2 : sex === 'female' ? 1.9 : 2.4} fill="none" strokeLinecap="round" opacity={infant ? 0.35 : 1} />
      <path d={`M${100 + eyeGap - eyeW / 2} ${browY} Q${100 + eyeGap} ${browY - 5} ${100 + eyeGap + eyeW / 2} ${browY}`} stroke={shade(effectiveHair, 4)} strokeWidth={infant ? 1.2 : sex === 'female' ? 1.9 : 2.4} fill="none" strokeLinecap="round" opacity={infant ? 0.35 : 1} />
      {/* eyes */}
      {[100 - eyeGap, 100 + eyeGap].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={eyeY} rx={eyeW / 2} ry={eyeH / 2} fill="#f4eee2" stroke={shade(skinColor, -34)} strokeWidth="0.8" />
          <circle cx={cx} cy={eyeY + blink} r={infant ? 4.5 : 3.6} fill={eyeColor} />
          <circle cx={cx} cy={eyeY + blink} r={infant ? 2 : 1.7} fill="#171512" />
          <circle cx={cx - 1.4} cy={eyeY - 1.5 + blink} r="1.1" fill="#fff8e9" opacity="0.9" />
        </g>
      ))}
      <path d={`M${100 - eyeGap - eyeW / 2} ${eyeY - eyeH / 2} Q${100 - eyeGap} ${eyeY - eyeH / 2 - 3} ${100 - eyeGap + eyeW / 2} ${eyeY - eyeH / 2}`} stroke="#3b2a24" strokeWidth="1.1" fill="none" opacity="0.65" />
      <path d={`M${100 + eyeGap - eyeW / 2} ${eyeY - eyeH / 2} Q${100 + eyeGap} ${eyeY - eyeH / 2 - 3} ${100 + eyeGap + eyeW / 2} ${eyeY - eyeH / 2}`} stroke="#3b2a24" strokeWidth="1.1" fill="none" opacity="0.65" />
      {sex === 'female' && (
        <>
          <path d={`M${100 - eyeGap - eyeW / 2 - 2} ${eyeY - eyeH / 2} L${100 - eyeGap - eyeW / 2 - 5} ${eyeY - eyeH / 2 - 2}`} stroke="#3b2a24" strokeWidth="1" opacity="0.6" />
          <path d={`M${100 + eyeGap + eyeW / 2 + 2} ${eyeY - eyeH / 2} L${100 + eyeGap + eyeW / 2 + 5} ${eyeY - eyeH / 2 - 2}`} stroke="#3b2a24" strokeWidth="1" opacity="0.6" />
        </>
      )}
      {/* nose */}
      {infant ? (
        <>
          <path d={`M100 ${eyeY + 12} Q98 ${eyeY + 17} 100 ${eyeY + 18}`} stroke={shade(skinColor, -28)} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <ellipse cx="97" cy={eyeY + 18} rx="1.1" ry="0.8" fill={shade(skinColor, -30)} opacity="0.55" />
          <ellipse cx="103" cy={eyeY + 18} rx="1.1" ry="0.8" fill={shade(skinColor, -30)} opacity="0.55" />
        </>
      ) : (
        <>
          <path d={`M100 ${eyeY + 8} Q97 ${eyeY + 18} 100 ${eyeY + 20}`} stroke={shade(skinColor, -34)} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d={`M96 ${eyeY + 20} Q100 ${eyeY + 23} 104 ${eyeY + 20}`} stroke={shade(skinColor, -20)} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* mouth */}
      <path d={mouth} stroke="#7d403c" strokeWidth={happy ? 2.4 : 2} fill={happy ? '#a5524c' : 'none'} strokeLinecap="round" />
      {/* cheeks / age */}
      <ellipse cx={100 - eyeGap - 2} cy={mouthY - 4} rx="8" ry="4" fill="#c96b5d" opacity={happy ? 0.18 : 0.1} />
      <ellipse cx={100 + eyeGap + 2} cy={mouthY - 4} rx="8" ry="4" fill="#c96b5d" opacity={happy ? 0.18 : 0.1} />
      {!infant && !old && (
        <path d={`M${headX + 16} ${headY + 4} Q${headX + 34} ${headY - 7} ${headX + 52} ${headY + 2}`} fill="none" stroke={shade(effectiveHair, 28)} strokeWidth="2" opacity="0.55" strokeLinecap="round" />
      )}
      <path d={`M${headX + 6} ${headY + 46} Q${headX + 16} ${jaw - 12} ${100} ${jaw - 3}`} fill="none" stroke={shade(skinColor, -18)} strokeWidth="1.2" opacity="0.35" />
      <path d={`M${headX + headW - 6} ${headY + 46} Q${headX + headW - 16} ${jaw - 12} ${100} ${jaw - 3}`} fill="none" stroke={shade(skinColor, -18)} strokeWidth="1.2" opacity="0.35" />
      {old && (
        <>
          <path d={`M${100 - 28} ${eyeY + 12} Q${100 - 22} ${eyeY + 16} ${100 - 16} ${eyeY + 12}`} stroke={shade(skinColor, -30)} strokeWidth="1" fill="none" opacity="0.55" />
          <path d={`M${100 + 16} ${eyeY + 12} Q${100 + 22} ${eyeY + 16} ${100 + 28} ${eyeY + 12}`} stroke={shade(skinColor, -30)} strokeWidth="1" fill="none" opacity="0.55" />
          <path d={`M${100 - 20} ${mouthY + 8} Q100 ${mouthY + 12} ${100 + 20} ${mouthY + 8}`} stroke={shade(skinColor, -30)} strokeWidth="1" fill="none" opacity="0.4" />
        </>
      )}
      {sick && <path d={`M${headX + headW - 8} ${eyeY + 24} Q${headX + headW - 2} ${eyeY + 32} ${headX + headW - 8} ${eyeY + 38}`} stroke="#9bb6b0" strokeWidth="2" fill="none" opacity="0.7" />}
      {/* glasses */}
      {glasses && (
        <g stroke="#c7b98d" strokeWidth="1.6" fill="none" opacity="0.9">
          <rect x={100 - eyeGap - eyeW / 2 - 2} y={eyeY - eyeH / 2 - 2} width={eyeW + 4} height={eyeH + 4} rx="3" />
          <rect x={100 + eyeGap - eyeW / 2 - 2} y={eyeY - eyeH / 2 - 2} width={eyeW + 4} height={eyeH + 4} rx="3" />
          <path d={`M${100 - 2} ${eyeY} L${100 + 2} ${eyeY}`} />
        </g>
      )}
      {/* earrings */}
      {!infant && sex === 'female' && (
        <>
          <circle cx={headX + 2} cy={eyeY + 20} r="2.2" fill="#d4b56d" />
          <circle cx={headX + headW - 2} cy={eyeY + 20} r="2.2" fill="#d4b56d" />
        </>
      )}
      {/* collar / buttons */}
      <path d={`M${100 - 16} ${shoulderY + 2} L100 ${shoulderY + 16} L${100 + 16} ${shoulderY + 2}`} fill="none" stroke={shade(outfit, 40)} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={100} cy={shoulderY + 28 + i * 14} r="1.7" fill={shade(outfit, 48)} opacity="0.8" />
      ))}
      <path d={`M${100 - 46} ${shoulderY + 44} Q${100 - 30} ${shoulderY + 54} ${100 - 16} ${shoulderY + 46}`} stroke={shade(outfit, -28)} strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d={`M${100 + 46} ${shoulderY + 44} Q${100 + 30} ${shoulderY + 54} ${100 + 16} ${shoulderY + 46}`} stroke={shade(outfit, -28)} strokeWidth="1.4" fill="none" opacity="0.55" />
      {/* occupation marker */}
      {coat && <path d={`M${100 - 44} ${shoulderY + 26} L${100 - 32} ${shoulderY + 26} L${100 - 32} ${shoulderY + 40} L${100 - 44} ${shoulderY + 40} Z`} fill="#e7e1cf" opacity="0.9" />}
      {soldier && <path d={`M${100 - 50} ${shoulderY + 18} L${100 - 36} ${shoulderY + 12} L${100 - 30} ${shoulderY + 20} L${100 - 44} ${shoulderY + 26} Z`} fill="#c8b36e" />}
      {student && <path d={`M${100 + 34} ${shoulderY + 18} Q${100 + 54} ${shoulderY + 26} ${100 + 50} ${shoulderY + 70}`} stroke="#8a6b48" strokeWidth="4" fill="none" />}
      {famous && (
        <>
          <circle cx={100 - 42} cy={shoulderY + 32} r="4" fill="#e6c36a" stroke="#8f6c2f" strokeWidth="1" />
          <path d={`M${100 - 46} ${shoulderY + 38} L${100 - 38} ${shoulderY + 38}`} stroke="#8f6c2f" strokeWidth="1.2" />
        </>
      )}
      {scandal && (
        <path d={`M${100 - 28} ${shoulderY + 6} Q100 ${shoulderY + 26} ${100 + 28} ${shoulderY + 6} L${100 + 24} ${shoulderY + 16} Q100 ${shoulderY + 36} ${100 - 24} ${shoulderY + 16} Z`} fill="#2f2628" opacity="0.75" />
      )}
      {grieving && <rect x={100 + 30} y={shoulderY + 20} width="10" height="5" fill="#171615" opacity="0.9" />}
      {indebted && <path d={`M${100 - 44} ${shoulderY + 62} L${100 - 30} ${shoulderY + 56} L${100 - 26} ${shoulderY + 66} L${100 - 40} ${shoulderY + 72} Z`} fill="#8c7458" opacity="0.8" />}
      {cursed && <path d={`M${100 + 38} ${shoulderY + 8} Q${100 + 48} ${shoulderY + 34} ${100 + 40} ${shoulderY + 58}`} stroke="#9e4f48" strokeWidth="2" fill="none" opacity="0.8" />}
      {dead && <rect x="0" y="0" width="200" height="240" fill="#0b100d" opacity="0.22" />}
    </svg>
  );
}
