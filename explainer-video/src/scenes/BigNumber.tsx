import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Bg} from '../components/Kit';
import {T, ease, fonts} from '../theme';

/** Big stat slammed over a wall of currency notes (vector stand-in for a money photo). */
export const BigNumber: React.FC<{dur: number; big: string; small: string; color?: string}> = ({dur, big, small, color = T.text}) => {
  const f = useCurrentFrame();
  const slam = interpolate(f, [0, 7], [0, 1], {easing: ease, extrapolateRight: 'clamp'});
  const pan = interpolate(f, [0, dur], [0, -40]);
  return (
    <Bg>
      <AbsoluteFill style={{transform: `translateX(${pan}px) scale(1.1)`, filter: 'blur(1.5px)'}}>
        {Array.from({length: 48}).map((_, i) => {
          const x = (i % 8) * 270 - 120 + random(`x${i}`) * 60;
          const y = Math.floor(i / 8) * 200 - 80 + random(`y${i}`) * 50;
          const r = (random(`r${i}`) - 0.5) * 30;
          return (
            <div key={i} style={{position: 'absolute', left: x, top: y, width: 300, height: 140, transform: `rotate(${r}deg)`, borderRadius: 8, background: 'linear-gradient(135deg,#5E4A7A,#8A6FA3 50%,#4E3D66)', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxSizing: 'border-box', color: 'rgba(255,255,255,0.55)', fontFamily: fonts.num, fontWeight: 800, fontSize: 40}}>
              <span>₹</span><span style={{width: 70, height: 70, borderRadius: 40, border: '3px solid rgba(255,255,255,0.3)'}} /><span>2000</span>
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'rgba(4,5,5,0.55)'}} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transform: `scale(${1.12 - 0.12 * slam})`, opacity: slam}}>
        <div style={{fontFamily: fonts.head, fontSize: 260, color, lineHeight: 0.95, textShadow: '0 10px 50px rgba(0,0,0,0.8)'}}>{big}</div>
        <div style={{fontFamily: fonts.num, fontWeight: 800, fontSize: 48, letterSpacing: 8, color: T.text, marginTop: 18}}>{small}</div>
      </AbsoluteFill>
    </Bg>
  );
};
