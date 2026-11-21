import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Bg, Eyebrow, Rise} from '../components/Kit';
import {T, fonts} from '../theme';

/** Macro "pour" shot with a slow upward drift, like the reference's pour close-up. */
export const FuelPour: React.FC<{dur: number; qAt: number; eyebrow: string; question: React.ReactNode}> = ({dur, qAt, eyebrow, question}) => {
  const f = useCurrentFrame();
  const drift = interpolate(f, [0, dur], [30, -30]);
  const wob = (k: number) => Math.sin(f / 3 + k) * 6;
  const stream = `M ${900 + wob(0)} 330 C ${905 + wob(1)} 500, ${895 + wob(2)} 650, ${900 + wob(3)} 820 L ${940 + wob(3)} 820 C ${935 + wob(2)} 650, ${945 + wob(1)} 500, ${930 + wob(0)} 330 Z`;
  return (
    <Bg>
      <AbsoluteFill style={{transform: `translateY(${drift}px) scale(1.05)`}}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 48% 55%, #2A1C08 0%, #0A0704 45%, #040505 75%)'}} />
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
          <defs>
            <linearGradient id="fuelG" x1="0" x2="1">
              <stop offset="0" stopColor="#B87A12" />
              <stop offset="0.45" stopColor="#FFE08A" />
              <stop offset="1" stopColor="#C98A1C" />
            </linearGradient>
            <linearGradient id="nozzle" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3A4656" />
              <stop offset="1" stopColor="#151B24" />
            </linearGradient>
          </defs>
          {/* nozzle */}
          <path d="M 1400 120 L 1010 250 Q 930 280 915 330 L 950 335 Q 965 300 1030 285 L 1420 190 Z" fill="url(#nozzle)" />
          <rect x="1380" y="90" width="300" height="130" rx="30" fill="#1A222D" />
          <path d={stream} fill="url(#fuelG)" opacity={0.95} />
          {/* tank opening */}
          <ellipse cx="920" cy="840" rx="150" ry="34" fill="#0B0E12" stroke="#2B3542" strokeWidth="10" />
          <ellipse cx="920" cy="836" rx="110" ry="20" fill="#E8B23A" opacity={0.35} />
          {Array.from({length: 14}).map((_, i) => {
            const t = ((f * 1.4 + i * 9) % 40) / 40;
            const x = 920 + Math.sin(i * 7.3) * 120 * t;
            const y = 830 - Math.sin(t * Math.PI) * (60 + (i % 4) * 25);
            return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill="#FFE08A" opacity={1 - t} />;
          })}
        </svg>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 120, top: 380, width: 700}}>
        <Rise at={qAt}><Eyebrow>{eyebrow}</Eyebrow></Rise>
        <Rise at={qAt + 3}><div style={{fontFamily: fonts.head, fontSize: 110, lineHeight: 1.02, color: T.text}}>{question}</div></Rise>
      </div>
    </Bg>
  );
};
