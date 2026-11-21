import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Bg, Push} from '../components/Kit';

/** Hook B-roll stand-in: a fuel station at night (vector). Swap for stock footage when you have it. */
export const FuelStation: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const streak = (offset: number) => ((f * 38 + offset) % 2600) - 400;
  return (
    <Bg>
      <Push dur={dur} from={1.02} to={1.12}>
        <AbsoluteFill style={{background: 'linear-gradient(180deg,#05080F 0%,#0B1424 55%,#05070A 56%,#030405 100%)'}} />
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="pump" x1="0" x2="1">
              <stop offset="0" stopColor="#1B2533" />
              <stop offset="0.5" stopColor="#2B3A4F" />
              <stop offset="1" stopColor="#141C27" />
            </linearGradient>
          </defs>
          {/* canopy */}
          <rect x="260" y="250" width="1400" height="70" fill="#111A26" />
          <rect x="260" y="250" width="1400" height="14" fill="#E8B23A" />
          {[420, 760, 1160, 1500].map((x) => (
            <g key={x}>
              <rect x={x - 70} y="318" width="140" height="8" fill="#FFF7E0" />
              <path d={`M${x - 70} 326 L${x - 330} 1080 L${x + 330} 1080 L${x + 70} 326 Z`} fill="url(#glow)" opacity={0.5} />
            </g>
          ))}
          {/* pillars */}
          {[520, 1400].map((x) => <rect key={x} x={x} y="320" width="34" height="420" fill="#0D141E" />)}
          {/* pumps */}
          {[700, 1110].map((x) => (
            <g key={x}>
              <rect x={x} y="470" width="120" height="270" rx="10" fill="url(#pump)" />
              <rect x={x + 18} y="500" width="84" height="54" rx="4" fill="#0A0F14" />
              <rect x={x + 26} y="510" width="68" height="14" fill="#E8B23A" opacity={0.85} />
              <rect x={x + 26} y="530" width="48" height="12" fill="#E8B23A" opacity={0.5} />
              <rect x={x + 120} y="580" width="16" height="70" rx="6" fill="#0D141E" />
            </g>
          ))}
          <rect x="0" y="740" width="1920" height="4" fill="#1A2230" />
          {/* passing car light streaks */}
          <rect x={streak(0)} y="880" width="420" height="5" rx="3" fill="#FF4D4D" opacity={0.7} />
          <rect x={streak(1300)} y="920" width="560" height="4" rx="3" fill="#FFF4D6" opacity={0.6} />
        </svg>
      </Push>
      <AbsoluteFill style={{background: 'linear-gradient(0deg,rgba(4,5,5,0.85) 0%,rgba(4,5,5,0) 40%)', opacity: interpolate(f, [0, 8], [0, 1])}} />
    </Bg>
  );
};
