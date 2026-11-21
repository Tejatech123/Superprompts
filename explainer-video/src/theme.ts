import {Easing} from 'remotion';
import {continueRender, delayRender, staticFile} from 'remotion';
import fontList from './fonts.json';

// Fonts are bundled in public/fonts (downloaded from Google Fonts) so renders work offline.
const handle = delayRender('Loading fonts');
Promise.all(
  (fontList as {family: string; weight: string; style: string; file: string; range: string}[]).map((f) => {
    const face = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)}) format('woff2')`, {weight: f.weight, style: f.style, unicodeRange: f.range});
    document.fonts.add(face);
    return face.load();
  }),
).then(() => continueRender(handle)).catch((e) => { console.error(e); continueRender(handle); });

export const fonts = {
  num: 'Inter',
  te: 'NotoSansTelugu',
  head: 'Anton',
  serif: 'InstrumentSerif',
  hand: 'Caveat',
};

export const T = {
  bg: '#040505',
  panel: '#0E141C',
  panelBorder: '#1E2A38',
  text: '#F5F5F2',
  muted: '#8A93A0',
  accent: '#4C9BFF',
  negative: '#FF4D4D',
  green: '#34C77B',
  highlighter: '#FFE14A',
  paper: '#F3EEDF',
  fuel: '#E8B23A',
};

// Change these for your channel.
export const CHANNEL = {name: 'Your', second: 'Channel'};

export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const FPS = 30;
