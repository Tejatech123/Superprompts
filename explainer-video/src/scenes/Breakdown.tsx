import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Bg, Eyebrow, useCount} from '../components/Kit';
import {T, ease, fonts} from '../theme';

export type Layer = {label: string; value: number; color: string; tax?: boolean; showAt: number; countAt: number; dim?: boolean};

type Props = {
  dur: number;
  product: string; // e.g. "PETROL 1 L"
  price: number;
  who: string; // "GOVT"
  guess: {value: number; showAt: number; noAt: number};
  reveal: {value: number; at: number};
  layersAt: number;
  layers: Layer[]; // bottom → top
  bracketAt: number;
  shareAt: number;
  shareText: string;
  arrowAt: number;
  target: string; // "GOVT TREASURY"
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * One held "product" shot that keeps changing — the core move of the reference:
 * "X GETS ?" → wrong guess struck out → reveal → colour-coded breakdown → arrow to who really wins.
 */
export const Breakdown: React.FC<Props> = (p) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pr = (a: number, d = 10) => interpolate(f, [a, a + d], [0, 1], {easing: ease, ...clamp});

  // Phase A (question/reveal) → phase B (breakdown)
  const toB = pr(p.layersAt, 14);
  const enter = spring({frame: f, fps, config: {damping: 200}, durationInFrames: 14});
  const canX = interpolate(toB, [0, 1], [700, 420]);
  const drift = interpolate(f, [0, p.dur], [1, 1.04]);

  // Liquid geometry inside can
  const LTOP = 150, LBOT = 600, H = LBOT - LTOP;
  const total = p.layers.reduce((s, l) => s + l.value, 0);
  let acc = 0;
  const geo = p.layers.map((l) => {
    const h = (l.value / total) * H;
    const y = LBOT - acc - h;
    acc += h;
    return {...l, y, h};
  });
  const taxGeo = geo.filter((g) => g.tax);
  const taxTop = Math.min(...taxGeo.map((g) => g.y));
  const taxBot = Math.max(...taxGeo.map((g) => g.y + g.h));

  const guessIn = pr(p.guess.showAt);
  const strike = pr(p.guess.noAt, 8);
  const revealIn = pr(p.reveal.at, 8);
  const revealVal = useCount(p.reveal.at, p.guess.value, p.reveal.value, 14);
  const focusTax = pr(p.bracketAt);
  const shareIn = pr(p.shareAt);
  const arrow = pr(p.arrowAt, 14);
  const boxIn = pr(p.arrowAt + 8);

  return (
    <Bg>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 35% 50%, #141B26 0%, #040505 60%)'}} />
      <AbsoluteFill style={{transform: `scale(${drift})`}}>
        {/* ---------- the product (jerry can) ---------- */}
        <svg viewBox="0 0 520 720" width={520} height={720} style={{position: 'absolute', left: canX - 260, top: 230, opacity: enter, transform: `scale(${0.96 + 0.04 * enter})`}}>
          <defs>
            <clipPath id="body"><path d="M60 140 Q60 110 90 110 L430 110 Q460 110 460 140 L460 600 Q460 630 430 630 L90 630 Q60 630 60 600 Z" /></clipPath>
            <linearGradient id="shine" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.0" />
              <stop offset="0.18" stopColor="#fff" stopOpacity="0.14" />
              <stop offset="0.3" stopColor="#fff" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* handle + spout */}
          <path d="M150 110 L150 40 Q150 20 170 20 L330 20 Q350 20 350 40 L350 110 L310 110 L310 60 L190 60 L190 110 Z" fill="#202A37" />
          <path d="M380 110 L420 30 L470 30 L470 70 L440 110 Z" fill="#202A37" />
          <g clipPath="url(#body)">
            <rect x="0" y="0" width="520" height="720" fill="#121922" />
            {/* single colour before breakdown, layers after */}
            <rect x="0" y={LTOP} width="520" height={H + 40} fill={T.fuel} opacity={1 - toB} />
            {geo.map((g) => (
              <g key={g.label} opacity={pr(g.showAt) * (1 - focusTax * (g.tax ? 0 : 0.55))}>
                <rect x="0" y={g.y} width="520" height={g.h} fill={g.color} />
                <rect x="0" y={g.y} width="520" height="2" fill="#000" opacity={0.35} />
              </g>
            ))}
            <rect x="0" y="0" width="520" height="720" fill="url(#shine)" />
          </g>
          <path d="M60 140 Q60 110 90 110 L430 110 Q460 110 460 140 L460 600 Q460 630 430 630 L90 630 Q60 630 60 600 Z" fill="none" stroke="#2E3B4C" strokeWidth="6" />
          {/* label band */}
          <rect x="110" y="300" width="300" height="90" rx="8" fill="#0B0F14" opacity={0.85 * (1 - toB)} />
          <text x="260" y="358" textAnchor="middle" fontFamily={fonts.head} fontSize="44" fill={T.text} opacity={1 - toB}>{p.product}</text>
          {/* tax bracket */}
          <g opacity={focusTax}>
            <path d={`M480 ${taxTop} L505 ${taxTop} L505 ${taxBot} L480 ${taxBot}`} fill="none" stroke={T.negative} strokeWidth="6" />
          </g>
        </svg>

        {/* price tag */}
        <div style={{position: 'absolute', left: canX - 300, top: 200, opacity: enter * (1 - toB * 0.0), transform: 'rotate(-8deg)', background: T.paper, color: '#111', fontFamily: fonts.num, fontWeight: 800, fontSize: 44, padding: '10px 22px', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>
          ₹{p.price}
        </div>

        {/* ---------- phase A text: "GOVT GETS ?" ---------- */}
        <div style={{position: 'absolute', left: 1120, top: 330, opacity: 1 - toB}}>
          <div style={{fontFamily: fonts.head, fontSize: 130, color: T.text, lineHeight: 1}}>
            {p.who} GETS
          </div>
          <div style={{position: 'relative', height: 200, marginTop: 10}}>
            <div style={{position: 'absolute', fontFamily: fonts.head, fontSize: 170, color: T.accent, opacity: 1 - guessIn}}>?</div>
            <div style={{position: 'absolute', fontFamily: fonts.head, fontSize: 150, color: T.muted, opacity: guessIn * (1 - revealIn), transform: `translateY(${(1 - guessIn) * 12}px)`}}>
              ₹{p.guess.value}?
              <div style={{position: 'absolute', left: -10, top: 92, height: 12, width: `${strike * 105}%`, background: T.negative, borderRadius: 6}} />
            </div>
            <div style={{position: 'absolute', fontFamily: fonts.head, fontSize: 190, color: T.negative, opacity: revealIn, transform: `scale(${1.15 - 0.15 * revealIn})`, transformOrigin: 'left center', lineHeight: 1}}>
              ≈ ₹{Math.round(revealVal)}
            </div>
          </div>
        </div>

        {/* ---------- phase B: legend ---------- */}
        <div style={{position: 'absolute', left: 780, top: 300, width: 600, opacity: toB}}>
          <Eyebrow>Where your ₹{p.price} goes</Eyebrow>
          {[...geo].reverse().map((g) => {
            const v = useCountSafe(f, g.countAt, g.value);
            const o = pr(g.showAt) * (g.dim ? 0.6 : 1) * (1 - focusTax * (g.tax ? 0 : 0.6));
            return (
              <div key={g.label} style={{display: 'flex', alignItems: 'center', gap: 22, height: 96, borderBottom: `1px solid ${T.panelBorder}`, opacity: o, transform: `translateY(${(1 - pr(g.showAt)) * 12}px)`}}>
                <div style={{width: 26, height: 26, borderRadius: 6, background: g.color}} />
                <div style={{flex: 1, fontFamily: fonts.num, fontWeight: 700, fontSize: 34, color: T.text, letterSpacing: 1}}>{g.label}</div>
                <div style={{fontFamily: fonts.num, fontWeight: 800, fontSize: 52, color: g.tax ? T.negative : T.text, fontVariantNumeric: 'tabular-nums'}}>₹{Math.round(v)}</div>
              </div>
            );
          })}
          <div style={{marginTop: 26, fontFamily: fonts.head, fontSize: 64, color: T.negative, opacity: shareIn, transform: `translateY(${(1 - shareIn) * 12}px)`}}>{p.shareText}</div>
        </div>

        {/* ---------- arrow → target ---------- */}
        <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path d="M1400 520 C 1470 520, 1470 380, 1540 380" fill="none" stroke={T.negative} strokeWidth="7" strokeDasharray="400" strokeDashoffset={400 * (1 - arrow)} strokeLinecap="round" />
          <path d="M1525 362 L1552 380 L1525 398" fill="none" stroke={T.negative} strokeWidth="7" strokeLinecap="round" opacity={arrow > 0.95 ? 1 : 0} />
        </svg>
        <div style={{position: 'absolute', left: 1565, top: 290, width: 270, padding: '24px 20px', borderRadius: 16, background: T.panel, border: `3px solid ${T.negative}`, opacity: boxIn, transform: `scale(${0.96 + 0.04 * boxIn})`, textAlign: 'center'}}>
          <svg width="70" height="62" viewBox="0 0 70 62"><path d="M35 2 L68 18 L2 18 Z" fill={T.negative} /><rect x="8" y="22" width="8" height="28" fill={T.text} /><rect x="24" y="22" width="8" height="28" fill={T.text} /><rect x="40" y="22" width="8" height="28" fill={T.text} /><rect x="56" y="22" width="8" height="28" fill={T.text} /><rect x="2" y="54" width="66" height="8" fill={T.negative} /></svg>
          <div style={{fontFamily: fonts.head, fontSize: 46, color: T.text, lineHeight: 1.05, marginTop: 10}}>{p.target}</div>
        </div>
      </AbsoluteFill>
    </Bg>
  );
};

// Hook-free count helper (used inside a map).
const useCountSafe = (f: number, at: number, to: number) =>
  interpolate(f, [at, at + 12], [0, to], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
