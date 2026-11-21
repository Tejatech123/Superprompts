import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {Bg, Rise} from '../components/Kit';
import {T, fonts} from '../theme';

/** "NOT ABOUT X / ABOUT Y" over blurred bokeh, then the watch-till-end CTA. */
export const Reframe: React.FC<{dur: number; big: string; subWhite: string; subAccent: string; subAt: number; cta: string; ctaAt: number}> = ({dur, big, subWhite, subAccent, subAt, cta, ctaAt}) => {
  const f = useCurrentFrame();
  const out = interpolate(f, [dur - 12, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Bg>
      <AbsoluteFill style={{opacity: out}}>
        <AbsoluteFill style={{filter: 'blur(28px)'}}>
          {Array.from({length: 18}).map((_, i) => {
            const x = random(`bx${i}`) * 1920 + Math.sin(f / 40 + i) * 30;
            const y = random(`by${i}`) * 1080 + Math.cos(f / 50 + i) * 20;
            const r = 60 + random(`br${i}`) * 140;
            return <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: i % 3 ? '#E8B23A' : '#4C9BFF', opacity: 0.18 + random(`bo${i}`) * 0.2}} />;
          })}
        </AbsoluteFill>
        <AbsoluteFill style={{background: 'rgba(4,5,5,0.55)'}} />
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 120}}>
          <Rise at={0}><div style={{fontFamily: fonts.head, fontSize: 190, color: T.text, lineHeight: 0.95}}>{big}</div></Rise>
          <Rise at={subAt} style={{marginTop: 20}}><div style={{fontFamily: fonts.head, fontSize: 90, color: T.muted}}>{subWhite} <span style={{color: T.accent}}>{subAccent}</span></div></Rise>
          <Rise at={ctaAt} style={{marginTop: 60}}>
            <div style={{display: 'inline-block', fontFamily: fonts.num, fontWeight: 800, fontSize: 32, letterSpacing: 5, color: T.bg, background: T.text, padding: '16px 30px', borderRadius: 40}}>{cta} →</div>
          </Rise>
        </AbsoluteFill>
      </AbsoluteFill>
    </Bg>
  );
};
