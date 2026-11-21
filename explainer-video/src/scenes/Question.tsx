import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Bg, Eyebrow, Push, Rise} from '../components/Kit';
import {T, ease, fonts} from '../theme';

/** Lower-left headline + a rubber stamp that thuds in on the trigger word. */
export const Question: React.FC<{dur: number; eyebrow: string; white: string; accent: string; stamp: string; stampAt: number}> = ({dur, eyebrow, white, accent, stamp, stampAt}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [stampAt, stampAt + 6], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Bg>
      <Push dur={dur} from={1} to={1.06}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 70% 45%, #18202B 0%, #040505 65%)'}} />
        <div style={{position: 'absolute', left: 1020, top: 170, width: 620, height: 760, background: '#E9E4D6', transform: 'rotate(5deg)', borderRadius: 6, boxShadow: '0 40px 100px rgba(0,0,0,0.7)', padding: 60, boxSizing: 'border-box', opacity: 0.92}}>
          {Array.from({length: 13}).map((_, i) => <div key={i} style={{height: 14, width: `${60 + ((i * 37) % 40)}%`, background: '#B9B3A3', borderRadius: 7, marginBottom: 30}} />)}
        </div>
        <div style={{position: 'absolute', left: 1130, top: 360, width: 420, height: 420, borderRadius: 210, border: `14px solid ${T.negative}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(-14deg) scale(${1.6 - 0.6 * s})`, opacity: s * 0.92, fontFamily: fonts.head, fontSize: 150, color: T.negative, boxShadow: `inset 0 0 0 10px #E9E4D6, inset 0 0 0 18px ${T.negative}`}}>
          {stamp}
        </div>
      </Push>
      <AbsoluteFill style={{background: 'linear-gradient(90deg,rgba(4,5,5,0.92) 0%,rgba(4,5,5,0) 50%)'}} />
      <div style={{position: 'absolute', left: 120, bottom: 190}}>
        <Rise at={0}><Eyebrow>{eyebrow}</Eyebrow></Rise>
        <Rise at={3}><div style={{fontFamily: fonts.head, fontSize: 170, lineHeight: 0.95, color: T.text}}>{white}<br /><span style={{color: T.accent}}>{accent}</span></div></Rise>
      </div>
    </Bg>
  );
};
