# Explainer video template (dark "documentary data" style)

Built to copy the editing style of the reference video (the 32s Telugu liquor-excise explainer):
a cut every 2–3 s, one held "product" shot that keeps changing (question → wrong guess → reveal →
colour-coded breakdown → arrow to who really wins), a big-number card, a "real math" beat,
the question, then a "NOT ABOUT X / ABOUT Y" reframe + "watch till the end".

## Make a new episode
1. Put your voiceover at `public/vo/vo.mp3`.
2. Put word timings in `src/data/words.json` (`[{text,start,end}]`, seconds) — from ElevenLabs
   TTS `with-timestamps` or forced alignment.
3. Edit the beat sheet in `src/Explainer.tsx`: `B` = word index where each beat starts; scene props
   use `r(wordIndex, beat)` so every graphic lands on its spoken word.
4. `npm run studio` to preview, `npm run render` to export `out/explainer.mp4`.

Channel name for the watermark: `CHANNEL` in `src/theme.ts`.

## Scenes (`src/scenes/`)
FuelStation (hook B-roll stand-in) · PumpMeter (counting display) · FuelPour (macro + question) ·
Breakdown (the signature held shot) · BigNumber (stat over money) · DeskMath (handwritten math) ·
Question (headline + stamp) · Reframe (CTA).
Vector stand-ins are used where the reference uses stock footage — swap in real clips with `<OffthreadVideo>`.

## Demo episode facts (verify before publishing)
Hyderabad petrol ≈ ₹107.46/L; central excise ₹21.90/L; Telangana VAT 35.2% (≈ ₹28);
dealer commission ≈ ₹4.40; base + freight ≈ ₹53. Prices change — re-check on the day.

Sound effects and music bed in `public/sfx/` were generated with ElevenLabs.
