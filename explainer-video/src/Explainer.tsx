import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {Finish} from './components/Kit';
import {T} from './theme';
import {VO_END, rel, wf} from './sync';
import {FuelStation} from './scenes/FuelStation';
import {PumpMeter} from './scenes/PumpMeter';
import {FuelPour} from './scenes/FuelPour';
import {Breakdown} from './scenes/Breakdown';
import {BigNumber} from './scenes/BigNumber';
import {DeskMath} from './scenes/DeskMath';
import {Question} from './scenes/Question';
import {Reframe} from './scenes/Reframe';

/*
 * BEAT SHEET — each beat starts on the first word of a new idea (word indexes into src/data/words.json).
 * Mirrors the reference: hook B-roll → pour close-up → one held product shot that keeps changing
 * (question → wrong guess → reveal → breakdown → arrow) → big number card → "real math" → question → reframe + CTA.
 */
const B = [0, 5, 10, 16, 44, 46, 53, 59] as const;

export const Explainer: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  const seq = (k: number) => {
    const from = wf(B[k]);
    const to = k + 1 < B.length ? wf(B[k + 1]) : durationInFrames;
    return {from, durationInFrames: to - from};
  };
  const d = (k: number) => seq(k).durationInFrames;
  const r = (i: number, k: number) => rel(i, B[k]);

  const sfx: [string, number, number?][] = [
    ['whoosh', wf(5)], ['tick', wf(9)], ['whoosh', wf(10)], ['paper', wf(16)],
    ['pop', wf(17)], ['pop', wf(18)], ['boom', wf(20)],
    ['whoosh', wf(22)], ['pop', wf(22)], ['tick', wf(25)], ['pop', wf(28)], ['tick', wf(31)],
    ['riser', wf(40) - 45, 0.12], ['pop', wf(40)], ['tick', wf(43)], ['boom', wf(44)],
    ['paper', wf(46)], ['pop', wf(49)], ['pop', wf(50)], ['pop', wf(51)], ['tick', wf(52)],
    ['whoosh', wf(53)], ['boom', wf(54), 0.1], ['whoosh', wf(59)], ['pop', wf(64)], ['pop', wf(67)],
  ];

  return (
    <AbsoluteFill style={{background: T.bg}}>
      <Sequence {...seq(0)}><FuelStation dur={d(0)} /></Sequence>
      <Sequence {...seq(1)}>
        <PumpMeter dur={d(1)} countAt={r(6, 1)} countEnd={r(9, 1)} titleAt={r(8, 1)} price={107.46} place="Hyderabad · Petrol" />
      </Sequence>
      <Sequence {...seq(2)}>
        <FuelPour dur={d(2)} qAt={r(13, 2)} eyebrow="The question" question={<>HOW MUCH GOES<br />TO THE <span style={{color: T.negative}}>GOVT?</span></>} />
      </Sequence>
      <Sequence {...seq(3)}>
        <Breakdown
          dur={d(3)}
          product="PETROL 1 L"
          price={107}
          who="GOVT"
          guess={{value: 10, showAt: r(17, 3), noAt: r(18, 3)}}
          reveal={{value: 50, at: r(20, 3)}}
          layersAt={r(22, 3)}
          layers={[
            {label: 'BASE PRICE + FREIGHT', value: 53, color: T.green, showAt: r(22, 3), countAt: r(22, 3), dim: true},
            {label: 'DEALER COMMISSION', value: 4, color: T.accent, showAt: r(22, 3), countAt: r(22, 3), dim: true},
            {label: 'CENTRAL EXCISE', value: 22, color: T.negative, tax: true, showAt: r(22, 3), countAt: r(25, 3)},
            {label: 'STATE VAT', value: 28, color: '#B8262B', tax: true, showAt: r(28, 3), countAt: r(31, 3)},
          ]}
          bracketAt={r(34, 3)}
          shareAt={r(40, 3)}
          shareText="≈ ₹50 = HALF IS TAX"
          arrowAt={r(43, 3)}
          target="GOVT TREASURY"
        />
      </Sequence>
      <Sequence {...seq(4)}><BigNumber dur={d(4)} big="HALF!" small="OF EVERY LITRE → TAX" color={T.negative} /></Sequence>
      <Sequence {...seq(5)}>
        <DeskMath
          dur={d(5)}
          eyebrow="Today's video"
          title="THE REAL MATH"
          lines={[
            {text: '107.46', note: 'pump price', at: r(47, 5)},
            {text: '− 53.00', note: 'base', at: r(49, 5)},
            {text: '−  4.40', note: 'dealer', at: r(50, 5)},
            {text: '= 50.06', note: 'tax', at: r(51, 5), color: T.negative, rule: true},
          ]}
          result="50.06"
          resultAt={r(52, 5)}
        />
      </Sequence>
      <Sequence {...seq(6)}><Question dur={d(6)} eyebrow="The big question" white="WHY NOT" accent="GST?" stamp="GST?" stampAt={r(54, 6)} /></Sequence>
      <Sequence {...seq(7)}>
        <Reframe dur={d(7)} big="NOT ABOUT PETROL" subWhite="IT'S ABOUT OUR" subAccent="POCKET" subAt={r(64, 7)} cta="WATCH TILL THE END" ctaAt={r(67, 7)} />
      </Sequence>

      <Finish />

      {/* ---------- audio ---------- */}
      <Audio src={staticFile('vo/vo.mp3')} />
      <Audio src={staticFile('sfx/bed.mp3')} loop volume={(f) => 0.07 * interpolate(f, [0, 15, VO_END, VO_END + 15], [0, 1, 1, 0], {extrapolateRight: 'clamp'})} />
      {sfx.map(([name, at, vol], i) => (
        <Sequence key={i} from={Math.max(0, at)} durationInFrames={60}>
          <Audio src={staticFile(`sfx/${name}.mp3`)} volume={vol ?? 0.16} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
