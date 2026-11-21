import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Bg, Eyebrow, Push, Rise} from '../components/Kit';
import {T, ease, fonts} from '../theme';

export type MathLine = {text: string; note?: string; at: number; color?: string; rule?: boolean};

/** "Real math" desk shot: notebook lines hand-write in on the spoken words, calculator shows the result. */
export const DeskMath: React.FC<{dur: number; lines: MathLine[]; result: string; resultAt: number; eyebrow: string; title: string}> = ({dur, lines, result, resultAt, eyebrow, title}) => {
  const f = useCurrentFrame();
  const w = (at: number) => interpolate(f, [at, at + 12], [0, 100], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const circ = interpolate(f, [resultAt, resultAt + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Bg>
      <Push dur={dur} from={1.04} to={1.0}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 55% 45%, #2A2118 0%, #120E0A 55%, #050404 100%)'}} />
        {/* notebook */}
        <div style={{position: 'absolute', left: 640, top: 120, width: 720, height: 860, background: T.paper, transform: 'rotate(-4deg)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', borderRadius: 6, backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 78px, #C9D6E8 78px 80px)', padding: '120px 70px', boxSizing: 'border-box'}}>
          <div style={{position: 'absolute', left: 60, top: 0, bottom: 0, width: 2, background: '#E59A9A'}} />
          {lines.map((l, i) => (
            <div key={i} style={{position: 'relative', height: 80, fontFamily: fonts.hand, fontWeight: 600, fontSize: 64, color: l.color ?? '#1D2733', whiteSpace: 'nowrap', clipPath: `inset(0 ${100 - w(l.at)}% 0 0)`, borderTop: l.rule ? '4px solid #1D2733' : undefined}}>
              {l.text}<span style={{fontSize: 42, color: '#6B7480', marginLeft: 24}}>{l.note}</span>
            </div>
          ))}
          <svg width="360" height="140" style={{position: 'absolute', left: 50, top: 120 + (lines.length - 1) * 80 - 30}}>
            <ellipse cx="180" cy="70" rx="170" ry="58" fill="none" stroke={T.negative} strokeWidth="5" strokeDasharray="760" strokeDashoffset={760 * (1 - circ)} />
          </svg>
        </div>
        {/* calculator */}
        <div style={{position: 'absolute', left: 1420, top: 300, width: 340, height: 520, borderRadius: 30, background: 'linear-gradient(160deg,#2B333D,#14191F)', transform: 'rotate(6deg)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)', padding: 28, boxSizing: 'border-box'}}>
          <div style={{height: 110, borderRadius: 12, background: '#9FB38A', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 22px', fontFamily: fonts.num, fontWeight: 700, fontSize: 64, color: '#1E261A', fontVariantNumeric: 'tabular-nums'}}>
            {f >= resultAt ? result : '0'}
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 26}}>
            {Array.from({length: 16}).map((_, i) => <div key={i} style={{height: 64, borderRadius: 12, background: i % 4 === 3 ? '#E8B23A' : '#3A434F'}} />)}
          </div>
        </div>
      </Push>
      <AbsoluteFill style={{background: 'linear-gradient(90deg,rgba(4,5,5,0.9) 0%,rgba(4,5,5,0) 38%)'}} />
      <div style={{position: 'absolute', left: 120, bottom: 170}}>
        <Rise at={0}><Eyebrow>{eyebrow}</Eyebrow></Rise>
        <Rise at={3}><div style={{fontFamily: fonts.head, fontSize: 110, color: T.text, lineHeight: 1, width: 520}}>{title}</div></Rise>
      </div>
    </Bg>
  );
};
