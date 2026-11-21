import words from './data/words.json';
import {FPS} from './theme';

export type Word = {text: string; start: number; end: number};
export const WORDS = words as Word[];

/** Absolute frame where word #i starts. */
export const wf = (i: number) => Math.round(WORDS[i].start * FPS);
/** Frame of word #i relative to a beat that starts at word #from. */
export const rel = (i: number, from: number) => wf(i) - wf(from);
export const VO_END = Math.round(WORDS[WORDS.length - 1].end * FPS);
