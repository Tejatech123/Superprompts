import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Bg, Eyebrow, Push, Rise, useCount} from '../components/Kit';
import {T, fonts} from '../theme';

/** Close-up of a pump display; amount counts up on the spoken price. */
export const PumpMeter: React.FC<{dur: number; countAt: number; countEnd: number; titleAt: number; price: number; place: string}> = ({dur, countAt, countEnd, titleAt, price, place}) => {
  const amt = useCount(countAt, 0, price, countEnd - countAt);
  const lit = useCount(countAt, 0, 1, countEnd - countAt);
  const lcd: React.CSSProperties = {fontFamily: fonts.num, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#FFB547', textShadow: '0 0 24px rgba(255,181,71,0.55)', textAlign: 'right'};
  const label: React.CSSProperties = {fontFamily: fonts.num, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: T.muted};
  return (
    <Bg>
      <Push dur={dur} from={1.0} to={1.06}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 60% 40%, #1C2633 0%, #070A0E 70%)'}} />
        <div style={{position: 'absolute', left: 760, top: 150, width: 960, height: 640, borderRadius: 28, background: 'linear-gradient(160deg,#2A3646,#131A24)', boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.08)', padding: 60, boxSizing: 'border-box'}}>
          {[['AMOUNT  ₹', amt.toFixed(2), 150], ['LITRES', lit.toFixed(2), 110]].map(([l, v, size]) => (
            <div key={l as string} style={{marginBottom: 40}}>
              <div style={label}>{l}</div>
              <div style={{marginTop: 10, background: '#07090B', borderRadius: 12, padding: '14px 36px', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)'}}>
                <div style={{...lcd, fontSize: size as number}}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </Push>
      <AbsoluteFill style={{background: 'linear-gradient(90deg,rgba(4,5,5,0.95) 0%,rgba(4,5,5,0.4) 45%,rgba(4,5,5,0) 70%)'}} />
      <div style={{position: 'absolute', left: 120, bottom: 170}}>
        <Rise at={titleAt}><Eyebrow>{place}</Eyebrow></Rise>
        <Rise at={titleAt + 3}>
          <div style={{fontFamily: fonts.head, fontSize: 150, color: T.text, lineHeight: 1}}>₹{Math.round(price)}<span style={{fontSize: 70, color: T.muted}}> / LITRE</span></div>
        </Rise>
      </div>
    </Bg>
  );
};
