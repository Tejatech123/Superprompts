import React from 'react';
import {
  AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, random, spring,
  staticFile, useCurrentFrame, Easing,
} from 'remotion';
import '@fontsource/anton';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import WORDS from './words.json';

// ───────── design tokens ─────────
const FPS = 30;
const C = {
  bg: '#06070D', gold: '#FFB547', saffron: '#FF7A1A', ice: '#8AD8FF',
  white: '#FFFFFF', dim: 'rgba(255,255,255,0.62)', card: 'rgba(255,255,255,0.06)',
  line: 'rgba(255,255,255,0.14)',
};
const HEAD = 'Anton, sans-serif';
const BODY = 'Poppins, sans-serif';
const GRAD = `linear-gradient(90deg, ${C.gold}, ${C.saffron})`;
const REF_CODE = 'S72-HIMA-RNMZ';

const fr = (s: number) => Math.round(s * FPS);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
// spring that starts at absolute second `at`
const sp = (t: number, at: number, damping = 13, stiffness = 170) =>
  spring({frame: Math.round((t - at) * FPS), fps: FPS, config: {damping, stiffness}});
const lin = (t: number, a: number, b: number, from = 0, to = 1, ease = Easing.out(Easing.cubic)) =>
  interpolate(t, [a, b], [from, to], {...clamp, easing: ease});

// ───────── scene wrapper (enter / exit) ─────────
const Scene: React.FC<{t: number; start: number; end: number; children: React.ReactNode; zoom?: boolean}> = ({t, start, end, children, zoom = true}) => {
  if (t < start - 0.01 || t > end + 0.01) return null;
  const inP = lin(t, start, start + 0.3);
  const outP = lin(t, end - 0.22, end, 0, 1, Easing.in(Easing.cubic));
  const scale = zoom ? interpolate(inP, [0, 1], [1.08, 1]) * interpolate(outP, [0, 1], [1, 0.94]) : 1;
  const blur = (1 - inP) * 14 + outP * 14;
  return (
    <AbsoluteFill style={{opacity: inP * (1 - outP), transform: `scale(${scale})`, filter: `blur(${blur}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

// ───────── background ─────────
const Background: React.FC<{t: number}> = ({t}) => {
  const a = Math.sin(t * 0.35) * 120;
  const b = Math.cos(t * 0.28) * 140;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', width: 1100, height: 1100, left: -350 + a, top: 120 + b, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,122,26,0.26), transparent 65%)'}} />
      <div style={{position: 'absolute', width: 1200, height: 1200, right: -450 - a, bottom: -200 - b, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(70,120,255,0.24), transparent 65%)'}} />
      {/* perspective grid floor */}
      <div style={{position: 'absolute', left: -540, right: -540, bottom: -300, height: 900, opacity: 0.18,
        transform: 'perspective(600px) rotateX(62deg)',
        backgroundImage: `linear-gradient(${C.line} 2px, transparent 2px), linear-gradient(90deg, ${C.line} 2px, transparent 2px)`,
        backgroundSize: '90px 90px', backgroundPosition: `0 ${(t * 60) % 90}px`,
        maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)'}} />
      <Particles t={t} />
    </AbsoluteFill>
  );
};

const Particles: React.FC<{t: number; n?: number; color?: string}> = ({t, n = 50, color = 'rgba(255,255,255,0.7)'}) => (
  <>
    {Array.from({length: n}).map((_, i) => {
      const x = random(`x${i}`) * 1080;
      const speed = 20 + random(`s${i}`) * 50;
      const y = (random(`y${i}`) * 2100 - t * speed) % 2100;
      const size = 2 + random(`z${i}`) * 5;
      return <div key={i} style={{position: 'absolute', left: x + Math.sin(t + i) * 12, top: y < 0 ? y + 2100 : y, width: size, height: size,
        borderRadius: '50%', background: color, opacity: 0.25 + random(`o${i}`) * 0.5, filter: 'blur(0.5px)'}} />;
    })}
  </>
);

// ───────── small building blocks ─────────
const Tag: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({children, color = C.gold, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 30px', borderRadius: 999,
    border: `2px solid ${color}`, color, fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 3,
    textTransform: 'uppercase', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', ...style}}>{children}</div>
);

const Glass: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: 'linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))', border: `2px solid ${C.line}`,
    borderRadius: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)', backdropFilter: 'blur(14px)', ...style}}>{children}</div>
);

const GradText: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span style={{background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', ...style}}>{children}</span>
);

const Center: React.FC<{children: React.ReactNode; top?: number; style?: React.CSSProperties}> = ({children, top = 260, style}) => (
  <div style={{position: 'absolute', left: 60, right: 60, top, display: 'flex', flexDirection: 'column', alignItems: 'center', ...style}}>{children}</div>
);

const Pop: React.FC<{t: number; at: number; children: React.ReactNode; from?: 'up' | 'left' | 'right' | 'scale'; style?: React.CSSProperties}> = ({t, at, children, from = 'up', style}) => {
  const p = sp(t, at);
  const o = lin(t, at, at + 0.12);
  const tr = from === 'up' ? `translateY(${(1 - p) * 80}px)` : from === 'left' ? `translateX(${(1 - p) * -260}px)`
    : from === 'right' ? `translateX(${(1 - p) * 260}px)` : `scale(${0.3 + p * 0.7})`;
  return <div style={{opacity: o, transform: tr, ...style}}>{children}</div>;
};

// Tutorial step indicator (how-it-works section)
const StepBar: React.FC<{t: number; step: number; label: string; at: number}> = ({t, step, label, at}) => {
  const p = sp(t, at);
  return (
    <div style={{position: 'absolute', top: 210, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
      opacity: lin(t, at, at + 0.2), transform: `translateY(${(1 - p) * -40}px)`}}>
      <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.dim}}>HOW IT WORKS</div>
      <div style={{display: 'flex', gap: 14}}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} style={{width: s === step ? 120 : 60, height: 12, borderRadius: 6,
            background: s < step ? C.gold : s === step ? GRAD : 'rgba(255,255,255,0.18)'}} />
        ))}
      </div>
      <Tag>{`Step ${step} · ${label}`}</Tag>
    </div>
  );
};

// ───────── video helpers ─────────
const CLIPS = ['clip1.mp4', 'clip2.mp4', 'clip3.mp4'];
const Clip: React.FC<{i: number; from: number; dur: number; offset?: number; style?: React.CSSProperties}> = ({i, from, dur, offset = 0, style}) => (
  <Sequence from={fr(from)} durationInFrames={fr(dur)} layout="none">
    <OffthreadVideo src={staticFile(CLIPS[i])} startFrom={fr(offset)} muted style={{width: '100%', height: '100%', objectFit: 'cover', ...style}} />
  </Sequence>
);

// ═════════ SCENES ═════════

// 0 – 2.8  Hook: full-bleed vertical crops of the AI clips with whip cuts
const Hook: React.FC<{t: number}> = ({t}) => {
  const cuts = [0, 0.95, 1.85, 2.8];
  const flash = cuts.slice(1, 3).reduce((m, c) => Math.max(m, 1 - Math.abs(t - c) / 0.08), 0);
  const kb = 1.15 + (t % 0.95) * 0.08;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${kb})`}}>
        <Clip i={0} from={0} dur={0.95} offset={0.6} />
        <Clip i={1} from={0.95} dur={0.9} offset={1.2} style={{objectPosition: '55% 50%'}} />
        <Clip i={2} from={1.85} dur={0.95} offset={0.8} style={{objectPosition: '40% 50%'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 30%, transparent 60%, rgba(0,0,0,0.75))'}} />
      <AbsoluteFill style={{background: 'white', opacity: Math.max(0, flash) * 0.85}} />
      <Center top={250}>
        <Pop t={t} at={0.1} from="scale"><Tag color={C.white}>🎬 Made with AI</Tag></Pop>
      </Center>
      {/* REC frame corners */}
      {[[60, 200], [960, 200], [60, 1640], [960, 1640]].map(([x, y], k) => (
        <div key={k} style={{position: 'absolute', left: x, top: y, width: 60, height: 60,
          borderColor: 'rgba(255,255,255,0.8)', borderStyle: 'solid', borderWidth: 0,
          ...(k === 0 ? {borderTopWidth: 5, borderLeftWidth: 5} : k === 1 ? {borderTopWidth: 5, borderRightWidth: 5}
            : k === 2 ? {borderBottomWidth: 5, borderLeftWidth: 5} : {borderBottomWidth: 5, borderRightWidth: 5})}} />
      ))}
      <div style={{position: 'absolute', top: 290, left: 90, display: 'flex', alignItems: 'center', gap: 12, fontFamily: BODY, fontWeight: 700, fontSize: 28, color: 'white'}}>
        <div style={{width: 20, height: 20, borderRadius: 10, background: '#ff3b3b', opacity: Math.floor(t * 3) % 2 ? 1 : 0.3}} />REC
      </div>
    </AbsoluteFill>
  );
};

// 2.8 – 8.6  "Imagine your own film" + ₹2,00,000 prize pool
const Prize: React.FC<{t: number}> = ({t}) => {
  const slam = sp(t, 6.7, 9, 200);
  const count = Math.round(lin(t, 6.7, 7.7, 0, 200000, Easing.out(Easing.cubic)));
  const shake = t > 6.7 && t < 7.0 ? Math.sin(t * 120) * 10 * (7.0 - t) / 0.3 : 0;
  const cardP = sp(t, 2.85);
  return (
    <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
      {/* blurred clip backdrop */}
      <AbsoluteFill style={{filter: 'blur(40px) brightness(0.45)', transform: 'scale(1.3)'}}>
        <Clip i={0} from={2.8} dur={2.6} offset={1.4} />
        <Clip i={2} from={5.4} dur={3.3} offset={0.2} />
      </AbsoluteFill>
      <Center top={250}>
        <Pop t={t} at={3.0}><div style={{fontFamily: HEAD, fontSize: 92, color: 'white', textAlign: 'center', lineHeight: 1.05}}>
          IMAGINE <GradText>YOUR OWN</GradText> FILM</div></Pop>
      </Center>
      {/* framed 16:9 player card */}
      <div style={{position: 'absolute', left: 70, right: 70, top: 470, height: 530, borderRadius: 36, overflow: 'hidden',
        border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        transform: `perspective(1400px) rotateY(${(1 - cardP) * -25}deg) scale(${0.8 + cardP * 0.2 - lin(t, 6.6, 7, 0, 0.12)})`,
        opacity: lin(t, 2.8, 3.1)}}>
        <Clip i={0} from={2.8} dur={2.6} offset={1.4} />
        <Clip i={2} from={5.4} dur={3.3} offset={0.2} />
        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.2)'}}>
          <div style={{height: '100%', width: `${lin(t, 2.8, 8.6, 0, 100, Easing.linear)}%`, background: GRAD}} />
        </div>
      </div>
      {/* prize */}
      {t > 6.6 && (
        <Center top={1020}>
          <div style={{transform: `scale(${2.2 - slam * 1.2})`, opacity: lin(t, 6.65, 6.8), display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: C.dim}}>WIN FROM A PRIZE POOL OF</div>
            <div style={{fontFamily: HEAD, fontSize: 190, lineHeight: 1, filter: `drop-shadow(0 0 40px rgba(255,170,60,0.6))`}}>
              <GradText>₹{count.toLocaleString('en-IN')}</GradText></div>
          </div>
        </Center>
      )}
      {/* gold burst */}
      {t > 6.7 && Array.from({length: 26}).map((_, i) => {
        const ang = (i / 26) * Math.PI * 2;
        const d = lin(t, 6.7, 7.6, 0, 420 + random(`b${i}`) * 220);
        return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * d, top: 1140 + Math.sin(ang) * d * 0.7,
          width: 14, height: 14, borderRadius: 3, transform: `rotate(${t * 400 + i * 30}deg)`,
          background: i % 2 ? C.gold : C.saffron, opacity: lin(t, 7.2, 7.8, 1, 0)}} />;
      })}
    </AbsoluteFill>
  );
};

// 8.6 – 10.35  "Sounds exciting, right?"
const Exciting: React.FC<{t: number}> = ({t}) => {
  const p = sp(t, 8.75, 8, 220);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'brightness(0.4) saturate(1.2)', transform: `scale(${1.2 + (t - 8.6) * 0.1})`}}>
        <Clip i={1} from={8.6} dur={1.8} offset={0.4} />
      </AbsoluteFill>
      <Center top={560}>
        <div style={{fontSize: 200, transform: `scale(${p}) rotate(${(1 - p) * -40}deg)`}}>🔥</div>
        <div style={{fontFamily: HEAD, fontSize: 150, color: 'white', lineHeight: 0.95, textAlign: 'center', transform: `scale(${0.5 + p * 0.5})`, opacity: p}}>
          SOUNDS<br /><GradText>EXCITING?</GradText></div>
      </Center>
    </AbsoluteFill>
  );
};

// 10.35 – 15.4  Sceneh.ai presents the 72-hour AI creative competition
const Brand: React.FC<{t: number}> = ({t}) => {
  const word = 'SCENEH.AI';
  const elapsed = lin(t, 12.5, 15.4, 0, 1, Easing.linear);
  const secs = Math.max(0, 72 * 3600 - Math.floor(elapsed * 400) * 37);
  const hh = String(Math.floor(secs / 3600)).padStart(2, '0');
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  const ring = lin(t, 12.5, 15.4, 0, 1, Easing.inOut(Easing.cubic));
  return (
    <AbsoluteFill>
      <Center top={270}>
        <div style={{display: 'flex'}}>
          {word.split('').map((ch, i) => {
            const p = sp(t, 10.45 + i * 0.05, 11, 200);
            return <span key={i} style={{fontFamily: HEAD, fontSize: 150, color: ch === '.' ? C.gold : 'white', display: 'inline-block',
              transform: `translateY(${(1 - p) * 120}px) rotateX(${(1 - p) * 90}deg)`, opacity: p}}>{ch}</span>;
          })}
        </div>
        <Pop t={t} at={11.75}><div style={{fontFamily: BODY, fontWeight: 500, fontSize: 40, color: C.dim, letterSpacing: 6, marginTop: -6}}>PRESENTS</div></Pop>
      </Center>
      {/* countdown ring */}
      <div style={{position: 'absolute', left: 540 - 250, top: 560, width: 500, height: 500, opacity: lin(t, 12.45, 12.7), transform: `scale(${0.6 + sp(t, 12.45) * 0.4})`}}>
        <svg width={500} height={500} style={{position: 'absolute', transform: 'rotate(-90deg)'}}>
          <circle cx={250} cy={250} r={225} stroke="rgba(255,255,255,0.12)" strokeWidth={22} fill="none" />
          <circle cx={250} cy={250} r={225} stroke="url(#g)" strokeWidth={22} fill="none" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 225} strokeDashoffset={2 * Math.PI * 225 * ring} />
          <defs><linearGradient id="g"><stop offset="0" stopColor={C.gold} /><stop offset="1" stopColor={C.saffron} /></linearGradient></defs>
        </svg>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{fontFamily: HEAD, fontSize: 210, lineHeight: 0.9, color: 'white'}}>72</div>
          <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: C.gold}}>HOURS</div>
          <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 38, color: C.dim, marginTop: 10}}>{hh}:{mm}:{ss}</div>
        </AbsoluteFill>
      </div>
      <Center top={1110}>
        <Pop t={t} at={13.66}><div style={{fontFamily: HEAD, fontSize: 84, color: 'white', textAlign: 'center', lineHeight: 1.05}}>
          AI <GradText>CREATIVE</GradText> COMPETITION</div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// 15.4 – 24.35  What you can make
const Categories: React.FC<{t: number}> = ({t}) => {
  const cats = [
    {at: 20.0, icon: '🎬', label: 'SHORT FILM', clip: 2, off: 1.5, side: 'left' as const},
    {at: 20.9, icon: '📺', label: 'AD FILM', clip: 1, off: 0.2, side: 'right' as const},
    {at: 21.78, icon: '🎵', label: 'MUSIC VIDEO', clip: 0, off: 2.0, side: 'left' as const},
  ];
  return (
    <AbsoluteFill>
      <Center top={250}>
        <Pop t={t} at={15.55}><Tag>⏱ Just 72 hours</Tag></Pop>
        <Pop t={t} at={17.4}><div style={{fontFamily: HEAD, fontSize: 96, color: 'white', textAlign: 'center', lineHeight: 1.05, marginTop: 28}}>
          CREATE <span style={{color: C.dim}}>&</span> <GradText>SUBMIT</GradText></div></Pop>
        <Pop t={t} at={19.1}><div style={{fontFamily: BODY, fontWeight: 600, fontSize: 40, color: C.dim, marginTop: 6}}>your own AI-generated…</div></Pop>
      </Center>
      {cats.map((c, i) => {
        const p = sp(t, c.at);
        const active = t >= c.at && (i === 2 || t < cats[i + 1].at);
        return (
          <div key={i} style={{position: 'absolute', left: 80, right: 80, top: 640 + i * 215, height: 185,
            opacity: lin(t, c.at, c.at + 0.15), transform: `translateX(${(1 - p) * (c.side === 'left' ? -700 : 700)}px) scale(${active ? 1.03 : 1})`}}>
            <Glass style={{height: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: 0,
              border: `3px solid ${active ? C.gold : C.line}`, boxShadow: active ? '0 0 50px rgba(255,170,60,0.35)' : undefined}}>
              <div style={{width: 320, height: '100%', overflow: 'hidden', position: 'relative'}}>
                <Clip i={c.clip} from={c.at} dur={24.4 - c.at} offset={c.off} />
              </div>
              <div style={{fontSize: 70, marginLeft: 36}}>{c.icon}</div>
              <div style={{fontFamily: HEAD, fontSize: 70, color: 'white', marginLeft: 22}}>{c.label}</div>
            </Glass>
          </div>
        );
      })}
      <Center top={1300 - 20}>
        <Pop t={t} at={22.7} from="scale"><div style={{fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.bg, background: GRAD, padding: '12px 36px', borderRadius: 999}}>
          using sceneh.ai</div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// 24.35 – 32.75  Who can join
const Roles: React.FC<{t: number}> = ({t}) => {
  const roles = [
    {at: 25.05, label: '🎥 Filmmaker', x: 90, y: 560, r: -4},
    {at: 25.95, label: '✂️ Editor', x: 560, y: 620, r: 5},
    {at: 26.72, label: '🎓 Student', x: 130, y: 760, r: 3},
    {at: 27.38, label: '🎹 Musician', x: 540, y: 830, r: -5},
    {at: 28.35, label: '📱 Content Creator', x: 200, y: 970, r: 2},
  ];
  const stamp = sp(t, 29.6, 9, 220);
  return (
    <AbsoluteFill>
      <Center top={260}>
        <Pop t={t} at={24.45}><div style={{fontFamily: HEAD, fontSize: 110, color: 'white'}}>WHO CAN <GradText>JOIN?</GradText></div></Pop>
      </Center>
      {roles.map((r, i) => {
        const p = sp(t, r.at, 10, 200);
        const float = Math.sin(t * 2 + i) * 6;
        return <div key={i} style={{position: 'absolute', left: r.x, top: r.y + float, opacity: lin(t, r.at, r.at + 0.1) * lin(t, 31.1, 31.35, 1, 0),
          transform: `scale(${p}) rotate(${r.r}deg)`, fontFamily: BODY, fontWeight: 700, fontSize: 50, color: 'white',
          padding: '22px 40px', borderRadius: 999, background: 'rgba(255,255,255,0.09)', border: `2px solid ${C.line}`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)', whiteSpace: 'nowrap'}}>{r.label}</div>;
      })}
      {t > 29.5 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center',
          opacity: lin(t, 29.55, 29.65) * lin(t, 31.2, 31.4, 1, 0), transform: `scale(${2.4 - stamp * 1.4}) rotate(-8deg)`}}>
          <div style={{fontFamily: HEAD, fontSize: 120, color: C.gold, border: `10px solid ${C.gold}`, padding: '10px 40px', borderRadius: 24,
            background: 'rgba(6,7,13,0.85)', textShadow: '0 0 30px rgba(255,170,60,0.5)'}}>THIS IS FOR YOU</div>
        </div>
      )}
      {t > 31.25 && (
        <Center top={700}>
          <Pop t={t} at={31.3} from="scale"><div style={{fontFamily: HEAD, fontSize: 120, color: 'white', textAlign: 'center', lineHeight: 1,
            background: 'rgba(6,7,13,0.88)', padding: '30px 50px', borderRadius: 30}}>
            HERE'S HOW<br /><GradText>IT WORKS</GradText>
            <div style={{fontSize: 90, transform: `translateY(${Math.abs(Math.sin(t * 6)) * 20}px)`}}>👇</div></div></Pop>
        </Center>
      )}
    </AbsoluteFill>
  );
};

// 32.75 – 46.9  Step 1: Pricing tiers
const Pricing: React.FC<{t: number}> = ({t}) => {
  const tiers = [
    {at: 35.05, res: '480p', price: 700, priceAt: 36.25, tag: 'Starter'},
    {at: 37.75, res: '720p', price: 2100, priceAt: 39.0, tag: 'HD'},
    {at: 41.2, res: '1080p', price: 5200, priceAt: 42.6, tag: 'Full HD'},
  ];
  return (
    <AbsoluteFill>
      <StepBar t={t} step={1} label="Pick your resolution" at={32.85} />
      <Center top={480}>
        <Pop t={t} at={33.2}><div style={{fontFamily: HEAD, fontSize: 84, color: 'white'}}><GradText>3</GradText> RESOLUTION TIERS</div></Pop>
      </Center>
      {tiers.map((c, i) => {
        const p = sp(t, c.at);
        const next = tiers[i + 1]?.at ?? 44.5;
        const active = t >= c.at && t < next;
        const price = Math.round(lin(t, c.priceAt, c.priceAt + 0.7, 0, c.price, Easing.out(Easing.cubic)));
        return (
          <div key={i} style={{position: 'absolute', left: 80, right: 80, top: 640 + i * 205, height: 180,
            opacity: lin(t, c.at, c.at + 0.12) * (active || t > 44.5 ? 1 : 0.55),
            transform: `translateY(${(1 - p) * 120}px) scale(${active ? 1.04 : 0.98})`}}>
            <Glass style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px',
              border: `3px solid ${active ? C.gold : C.line}`, boxShadow: active ? '0 0 60px rgba(255,170,60,0.35)' : undefined}}>
              <div>
                <div style={{fontFamily: HEAD, fontSize: 96, color: 'white', lineHeight: 1}}>{c.res}</div>
                <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 28, color: C.ice, letterSpacing: 3}}>{c.tag.toUpperCase()}</div>
              </div>
              <div style={{fontFamily: HEAD, fontSize: 104, lineHeight: 1}}>
                {t >= c.priceAt ? <GradText>₹{price.toLocaleString('en-IN')}</GradText> : <span style={{color: 'rgba(255,255,255,0.2)'}}>₹—</span>}
              </div>
            </Glass>
          </div>
        );
      })}
      <Center top={1275}>
        <Pop t={t} at={44.55} from="scale"><div style={{fontFamily: BODY, fontWeight: 700, fontSize: 38, color: C.bg, background: GRAD, padding: '12px 34px', borderRadius: 999}}>
          ⏱ per 30 sec of generation</div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// 46.9 – 53.15  Step 2: Registration free vs generation paid
const FreePaid: React.FC<{t: number}> = ({t}) => {
  const box = (at: number, emoji: string, title: string, big: string, color: string, side: 'left' | 'right') => {
    const p = sp(t, at);
    return (
      <div style={{flex: 1, opacity: lin(t, at, at + 0.15), transform: `translateX(${(1 - p) * (side === 'left' ? -400 : 400)}px)`}}>
        <Glass style={{height: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, border: `3px solid ${color}`}}>
          <div style={{fontSize: 110}}>{emoji}</div>
          <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 3, color: C.dim}}>{title}</div>
          <div style={{fontFamily: HEAD, fontSize: 108, color}}>{big}</div>
        </Glass>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <StepBar t={t} step={2} label="Register" at={47.0} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 520, display: 'flex', gap: 34}}>
        {box(47.05, '✅', 'REGISTRATION', 'FREE', '#4BE38A', 'left')}
        {box(49.5, '💳', 'GENERATION', 'PAID', C.saffron, 'right')}
      </div>
      <Center top={1140}>
        <Pop t={t} at={51.4}><div style={{fontFamily: BODY, fontWeight: 700, fontSize: 40, color: 'white', padding: '18px 36px', borderRadius: 24,
          background: 'rgba(255,122,26,0.15)', border: `2px solid ${C.saffron}`}}>⚠️ Extra generations cost more</div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// 53.15 – 59.05  Step 3: Starts Dec 18, 18+
const DateAge: React.FC<{t: number}> = ({t}) => {
  const flip = lin(t, 54.5, 55.1, 0, 1, Easing.out(Easing.back(1.4)));
  const badge = sp(t, 56.85, 9, 200);
  return (
    <AbsoluteFill>
      <StepBar t={t} step={3} label="Mark the date" at={53.25} />
      <Center top={500}>
        <Pop t={t} at={53.4}><div style={{fontFamily: BODY, fontWeight: 700, fontSize: 38, color: C.dim, letterSpacing: 6}}>COMPETITION STARTS</div></Pop>
      </Center>
      {/* calendar */}
      <div style={{position: 'absolute', left: 540 - 230, top: 590, width: 460, height: 500, perspective: 1200,
        opacity: lin(t, 53.5, 53.8), transform: `scale(${0.7 + sp(t, 53.5) * 0.3})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: '#fff', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)'}}>
          <div style={{height: 130, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: HEAD, fontSize: 80, color: 'white', letterSpacing: 6}}>DEC</div>
          <div style={{height: 370, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEAD, fontSize: 260, color: C.bg}}>
            {flip < 0.5 ? '01' : '18'}</div>
        </div>
        {/* flipping page */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 130, height: 370, transformOrigin: 'top', background: '#f2f2f2',
          borderRadius: '0 0 40px 40px', transform: `rotateX(${flip * 180}deg)`, backfaceVisibility: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEAD, fontSize: 260, color: '#999', opacity: flip < 0.5 ? 1 : 0}}>01</div>
        {/* 18+ badge */}
        <div style={{position: 'absolute', right: -110, bottom: -90, width: 230, height: 230, borderRadius: '50%', background: C.bg,
          border: `8px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEAD, fontSize: 110,
          color: C.gold, transform: `scale(${badge}) rotate(${(1 - badge) * 180 + 12}deg)`, boxShadow: '0 0 50px rgba(255,170,60,0.5)'}}>18+</div>
      </div>
      <Center top={1185}>
        <Pop t={t} at={56.9}><div style={{fontFamily: BODY, fontWeight: 700, fontSize: 42, color: 'white'}}>Anyone aged <GradText>18 or above</GradText></div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// 59.05 – 64.15  Step 4: Limited seats
const Seats: React.FC<{t: number}> = ({t}) => {
  const cols = 8, rows = 5, total = cols * rows;
  const filled = Math.floor(lin(t, 59.6, 63.3, 0, total, Easing.inOut(Easing.quad)));
  const full = filled >= total;
  return (
    <AbsoluteFill>
      <StepBar t={t} step={4} label="Grab your seat" at={59.15} />
      <Center top={500}>
        <Pop t={t} at={59.2}><div style={{fontFamily: HEAD, fontSize: 100, color: 'white'}}>SEATS ARE <GradText>LIMITED</GradText></div></Pop>
      </Center>
      <div style={{position: 'absolute', left: 120, right: 120, top: 660, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18}}>
        {Array.from({length: total}).map((_, i) => {
          const on = i < filled;
          const p = on ? sp(t, 59.6 + (i / total) * 3.7, 10, 220) : 0;
          return <div key={i} style={{height: 80, borderRadius: '18px 18px 8px 8px',
            background: on ? GRAD : 'rgba(255,255,255,0.10)', border: `2px solid ${on ? 'transparent' : C.line}`,
            transform: `scale(${on ? 0.7 + p * 0.3 : 1})`, opacity: lin(t, 59.3, 59.6)}} />;
        })}
      </div>
      <Center top={1150}>
        <Pop t={t} at={61.0}><Tag color={C.ice}>First come · first served</Tag></Pop>
      </Center>
      {full && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center',
          transform: `scale(${2 - sp(t, 63.3, 9, 220)}) rotate(-6deg)`, opacity: lin(t, 63.3, 63.4)}}>
          <div style={{fontFamily: HEAD, fontSize: 110, color: '#ff4d4d', border: '10px solid #ff4d4d', padding: '6px 40px', borderRadius: 24,
            background: 'rgba(6,7,13,0.9)'}}>FULL → WAITLIST</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// 64.15 – 69.4  Benefits
const Benefits: React.FC<{t: number}> = ({t}) => {
  const items = [
    {at: 65.2, icon: '🧪', label: 'Experiment'},
    {at: 66.15, icon: '💼', label: 'Build your portfolio'},
    {at: 67.65, icon: '💡', label: 'Bring ideas to life'},
  ];
  return (
    <AbsoluteFill>
      <Center top={300}>
        <Pop t={t} at={64.25}><div style={{fontFamily: HEAD, fontSize: 110, color: 'white', textAlign: 'center', lineHeight: 1}}>
          YOUR <GradText>CHANCE</GradText> TO…</div></Pop>
      </Center>
      {items.map((it, i) => {
        const p = sp(t, it.at);
        const check = sp(t, it.at + 0.25, 10, 220);
        return (
          <div key={i} style={{position: 'absolute', left: 90, right: 90, top: 560 + i * 220, height: 180,
            opacity: lin(t, it.at, it.at + 0.12), transform: `translateX(${(1 - p) * 500}px)`}}>
            <Glass style={{height: '100%', display: 'flex', alignItems: 'center', padding: '0 44px', gap: 34}}>
              <div style={{fontSize: 84}}>{it.icon}</div>
              <div style={{fontFamily: BODY, fontWeight: 800, fontSize: 54, color: 'white', flex: 1}}>{it.label}</div>
              <div style={{width: 84, height: 84, borderRadius: 42, background: '#4BE38A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 54, color: C.bg, fontWeight: 800, transform: `scale(${check})`}}>✓</div>
            </Glass>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 69.4 – 76  CTA: register free + referral code + link in caption
const CTA: React.FC<{t: number}> = ({t}) => {
  // cursor path to the button, click at 71.0
  const cx = lin(t, 70.4, 70.95, 900, 640, Easing.inOut(Easing.cubic));
  const cy = lin(t, 70.4, 70.95, 1250, 690, Easing.inOut(Easing.cubic));
  const click = t > 70.95 && t < 71.25;
  const ripple = lin(t, 70.95, 71.5);
  const typed = REF_CODE.slice(0, Math.floor(lin(t, 72.3, 73.0, 0, REF_CODE.length, Easing.linear)));
  const glow = 0.5 + Math.sin(t * 6) * 0.5;
  return (
    <AbsoluteFill>
      <Center top={250}>
        <Pop t={t} at={69.5}><div style={{fontFamily: HEAD, fontSize: 92, color: 'white', textAlign: 'center', lineHeight: 1}}>
          WHAT ARE YOU<br /><GradText>WAITING FOR?</GradText></div></Pop>
      </Center>
      {/* register button */}
      <div style={{position: 'absolute', left: 140, right: 140, top: 600, height: 160, opacity: lin(t, 69.9, 70.1),
        transform: `scale(${sp(t, 69.9) * (click ? 0.94 : 1)})`}}>
        <div style={{height: '100%', borderRadius: 999, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: HEAD, fontSize: 76, color: C.bg, boxShadow: `0 0 ${40 + glow * 40}px rgba(255,150,40,0.6)`}}>REGISTER FREE →</div>
        {t > 70.95 && <div style={{position: 'absolute', left: cx - 140 - 100 * ripple, top: cy - 600 - 100 * ripple, width: 200 * ripple, height: 200 * ripple,
          borderRadius: '50%', border: '6px solid white', opacity: 1 - ripple}} />}
      </div>
      {/* cursor */}
      {t > 70.35 && t < 72.2 && (
        <svg width={90} height={90} viewBox="0 0 24 24" style={{position: 'absolute', left: cx, top: cy, transform: `scale(${click ? 0.85 : 1})`,
          opacity: lin(t, 70.35, 70.5) * lin(t, 71.9, 72.2, 1, 0), filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))'}}>
          <path d="M4 2 L4 20 L9 15 L12.5 22 L15.5 20.5 L12 13.8 L19 13.8 Z" fill="white" stroke="black" strokeWidth={1.2} />
        </svg>
      )}
      {/* referral coupon */}
      <div style={{position: 'absolute', left: 90, right: 90, top: 830, opacity: lin(t, 72.1, 72.3), transform: `translateY(${(1 - sp(t, 72.1)) * 150}px)`}}>
        <div style={{borderRadius: 32, border: `5px dashed ${C.gold}`, background: 'rgba(255,181,71,0.10)', padding: '28px 30px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
          <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 32, letterSpacing: 6, color: C.dim}}>🎟 MY REFERRAL CODE</div>
          <div style={{fontFamily: 'monospace', fontWeight: 800, fontSize: 84, color: 'white', letterSpacing: 4}}>
            {typed}<span style={{opacity: Math.floor(t * 3) % 2 ? 1 : 0, color: C.gold}}>|</span></div>
        </div>
      </div>
      <Center top={1140}>
        <Pop t={t} at={73.4} from="scale"><div style={{fontFamily: HEAD, fontSize: 70, color: 'white', display: 'flex', alignItems: 'center', gap: 18}}>
          🔗 LINK IN CAPTION <span style={{display: 'inline-block', transform: `translateY(${Math.abs(Math.sin(t * 6)) * 18}px)`}}>👇</span></div></Pop>
        <Pop t={t} at={74.4}><div style={{fontFamily: BODY, fontWeight: 600, fontSize: 36, color: C.dim, marginTop: 14}}>sceneh.ai/creative-challenge</div></Pop>
      </Center>
    </AbsoluteFill>
  );
};

// ───────── captions ─────────
type W = {t: string; s: number; e: number};
const CHUNKS: W[][] = (() => {
  const out: W[][] = [];
  let cur: W[] = [];
  (WORDS as W[]).forEach((w, i, arr) => {
    cur.push(w);
    const next = arr[i + 1];
    const brk = /[.,?!:]$/.test(w.t) || cur.length >= 3 || (next && next.s - w.e > 0.35);
    if (brk || !next) { out.push(cur); cur = []; }
  });
  return out;
})();

const Captions: React.FC<{t: number}> = ({t}) => {
  const idx = CHUNKS.findIndex((c, i) => t >= c[0].s - 0.05 && t < (CHUNKS[i + 1]?.[0].s ?? c[c.length - 1].e + 1.5) - 0.05
    && t < c[c.length - 1].e + 0.6);
  if (idx < 0) return null;
  const chunk = CHUNKS[idx];
  const p = sp(t, chunk[0].s - 0.05, 12, 260);
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1390, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 30px',
      transform: `scale(${0.85 + p * 0.15})`, opacity: p}}>
      {chunk.map((w, i) => {
        const active = t >= w.s - 0.03 && t < w.e + 0.08;
        const said = t >= w.s - 0.03;
        return <span key={i} style={{fontFamily: BODY, fontWeight: 800, fontSize: 76, textTransform: 'uppercase', letterSpacing: -1,
          color: active ? C.gold : said ? 'white' : 'rgba(255,255,255,0.88)', display: 'inline-block',
          transform: `scale(${active ? 1.1 : 1}) translateY(${active ? -4 : 0}px)`,
          WebkitTextStroke: '3px rgba(0,0,0,0.9)', paintOrder: 'stroke fill',
          textShadow: '0 6px 20px rgba(0,0,0,0.8)'}}>{w.t.replace(/[.,]$/, '')}</span>;
      })}
    </div>
  );
};

// ───────── sound design ─────────
const SFX: {at: number; s: string; v?: number}[] = [
  {at: 0.0, s: 'impact', v: 0.5}, {at: 0.9, s: 'whoosh'}, {at: 1.8, s: 'whoosh'}, {at: 2.75, s: 'whoosh'},
  {at: 5.2, s: 'riser', v: 0.5}, {at: 6.7, s: 'impact', v: 0.7}, {at: 6.75, s: 'cash', v: 0.45},
  {at: 8.6, s: 'whoosh'}, {at: 8.75, s: 'pop'}, {at: 10.35, s: 'whoosh'}, {at: 12.45, s: 'tick', v: 0.35}, {at: 13.6, s: 'pop'},
  {at: 15.4, s: 'whoosh'}, {at: 20.0, s: 'whoosh', v: 0.6}, {at: 20.9, s: 'whoosh', v: 0.6}, {at: 21.78, s: 'whoosh', v: 0.6}, {at: 22.7, s: 'pop'},
  {at: 24.35, s: 'whoosh'}, {at: 25.05, s: 'pop'}, {at: 25.95, s: 'pop'}, {at: 26.72, s: 'pop'}, {at: 27.38, s: 'pop'}, {at: 28.35, s: 'pop'},
  {at: 29.6, s: 'impact', v: 0.6}, {at: 31.3, s: 'whoosh'},
  {at: 32.75, s: 'whoosh'}, {at: 35.05, s: 'pop'}, {at: 36.25, s: 'cash', v: 0.3}, {at: 37.75, s: 'pop'}, {at: 39.0, s: 'cash', v: 0.3},
  {at: 41.2, s: 'pop'}, {at: 42.6, s: 'cash', v: 0.3}, {at: 44.55, s: 'pop'},
  {at: 46.9, s: 'whoosh'}, {at: 47.05, s: 'pop'}, {at: 49.5, s: 'pop'}, {at: 51.4, s: 'pop'},
  {at: 53.15, s: 'whoosh'}, {at: 54.5, s: 'whoosh', v: 0.6}, {at: 56.85, s: 'impact', v: 0.5},
  {at: 59.05, s: 'whoosh'}, {at: 59.6, s: 'tick', v: 0.3}, {at: 61.0, s: 'pop'}, {at: 63.3, s: 'impact', v: 0.6},
  {at: 64.15, s: 'whoosh'}, {at: 65.45, s: 'pop'}, {at: 66.4, s: 'pop'}, {at: 67.9, s: 'pop'},
  {at: 69.4, s: 'whoosh'}, {at: 69.9, s: 'pop'}, {at: 70.95, s: 'pop', v: 0.9}, {at: 72.1, s: 'whoosh'}, {at: 73.4, s: 'pop'},
];

// ═════════ MAIN ═════════
export const Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <Background t={t} />
      <Scene t={t} start={0} end={2.8} zoom={false}><Hook t={t} /></Scene>
      <Scene t={t} start={2.8} end={8.6}><Prize t={t} /></Scene>
      <Scene t={t} start={8.6} end={10.35}><Exciting t={t} /></Scene>
      <Scene t={t} start={10.35} end={15.4}><Brand t={t} /></Scene>
      <Scene t={t} start={15.4} end={24.35}><Categories t={t} /></Scene>
      <Scene t={t} start={24.35} end={32.75}><Roles t={t} /></Scene>
      <Scene t={t} start={32.75} end={46.9}><Pricing t={t} /></Scene>
      <Scene t={t} start={46.9} end={53.15}><FreePaid t={t} /></Scene>
      <Scene t={t} start={53.15} end={59.05}><DateAge t={t} /></Scene>
      <Scene t={t} start={59.05} end={64.15}><Seats t={t} /></Scene>
      <Scene t={t} start={64.15} end={69.4}><Benefits t={t} /></Scene>
      <Scene t={t} start={69.4} end={76.1}><CTA t={t} /></Scene>
      <Captions t={t} />
      {/* audio */}
      <Audio src={staticFile('voiceover.mp3')} />
      <Audio src={staticFile('music.mp3')} volume={(f) => interpolate(f, [0, 15, fr(74.5), fr(76)], [0, 0.13, 0.13, 0], clamp)} />
      {SFX.map((x, i) => (
        <Sequence key={i} from={fr(x.at)} layout="none">
          <Audio src={staticFile(`sfx/${x.s}.mp3`)} volume={(x.v ?? 0.4) * 0.8} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
