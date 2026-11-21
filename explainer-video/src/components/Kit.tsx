import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {CHANNEL, T, ease, fonts} from '../theme';

/** Fade + 12px rise starting at frame `at` (relative to the sequence). */
export const useRise = (at: number, dur = 10) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + dur], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {opacity: p, transform: `translateY(${(1 - p) * 12}px)`, p};
};

export const Rise: React.FC<{at: number; style?: React.CSSProperties; children: React.ReactNode}> = ({at, style, children}) => {
  const {opacity, transform} = useRise(at);
  return <div style={{opacity, transform, ...style}}>{children}</div>;
};

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = T.accent}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: fonts.num, fontWeight: 700, fontSize: 26, letterSpacing: 4, color, textTransform: 'uppercase', marginBottom: 18}}>
    <span style={{width: 24, height: 3, background: color, display: 'inline-block'}} />
    {children}
  </div>
);

/** Count from `from` to `to` over 12 frames starting at `at`. */
export const useCount = (at: number, from: number, to: number, dur = 12) => {
  const f = useCurrentFrame();
  return interpolate(f, [at, at + dur], [from, to], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

/** Slow push-in over the whole beat (Ken Burns). */
export const Push: React.FC<{dur: number; from?: number; to?: number; y?: number; children: React.ReactNode}> = ({dur, from = 1, to = 1.08, y = 0, children}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dur], [from, to]);
  const ty = interpolate(f, [0, dur], [0, y]);
  return <AbsoluteFill style={{transform: `scale(${s}) translateY(${ty}px)`}}>{children}</AbsoluteFill>;
};

/** Grain, vignette, watermark — sits on top of every frame. */
export const Finish: React.FC = () => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2);
  const ox = Math.floor(random(`gx${seed}`) * 200);
  const oy = Math.floor(random(`gy${seed}`) * 200);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.035) 0%, rgba(0,0,0,0) 60%)'}} />
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.05, mixBlendMode: 'screen'}}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed % 50} /></filter>
        <rect x={-ox} y={-oy} width="2200" height="1300" filter="url(#grain)" />
      </svg>
      <div style={{position: 'absolute', right: 56, bottom: 40, fontSize: 22, opacity: 0.35, color: T.text}}>
        <span style={{fontFamily: fonts.num, fontWeight: 800}}>{CHANNEL.name} </span>
        <span style={{fontFamily: fonts.serif, fontStyle: 'italic', color: T.accent}}>{CHANNEL.second}</span>
      </div>
    </AbsoluteFill>
  );
};

export const Bg: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: T.bg}}>{children}</AbsoluteFill>
);
