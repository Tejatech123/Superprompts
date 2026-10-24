# Channel Playbook: 70-Second Animated Money Explainers

The format: vertical 9:16, 60–85 s, flat-vector 2.5D animation, one continuous camera, a countdown timer, and yellow keyword captions. Every video answers one everyday "Why…?" money question for Indian viewers.

---

## 1. Channel Positioning

**Promise:** "The hidden economics behind things you buy every day, explained in 70 seconds."

**Name ideas** (check that the handle is free on both Instagram and YouTube):
- PaisaLogic
- The Rupee Lab
- 70 Second Paisa
- Kyun Itna Sasta? / Why So Cheap?
- MoneyMechanics India
- Daily Economics

**Brand kit** (make it different from the competitor's navy/orange/brass look):
- Background: deep teal-green or charcoal instead of navy
- Hero colours: a single strong accent (e.g. lime or coral), plus white and gold for money
- Captions: white text, keyword in **your** accent colour (not yellow, if you want to stand apart)
- Timer prop: keep the countdown idea, but make it your own object, e.g. a sand timer, a draining ₹ coin, or a fuse

---

## 2. ElevenLabs Voice Setup

**Voice choice:** a warm, mid-pitch, conversational male or female voice with an Indian-English accent. Search the Voice Library for "Indian English narrator" or "storyteller". Pick one voice and never change it, because the voice becomes your brand.

**Model:** *Eleven v3* gives the most expressive results and understands the `[audio tags]` used in the scripts below. With *Multilingual v2*, delete the tags and replace `[short pause]` with `<break time="0.4s" />` and `[long pause]` with `<break time="0.8s" />`.

**Settings (starting point):**

| Setting | Value | Why |
|---|---|---|
| Stability | 40–50% | Lively but consistent |
| Similarity | 75–80% | Keeps the voice identity |
| Style exaggeration | 10–25% | A little drama, not cartoonish |
| Speaker boost | On | Clearer on phone speakers |
| Speed | 1.05–1.1× | Target about 2.7 words/sec (≈190 words for 70 s) |

**Writing rules so the AI reads it right:**
- Write money in words: "one rupee", "ten paise", "two thousand rupee note". Don't write ₹1 in the script; the ₹ symbol goes only in the captions.
- Write percentages as words: "ten percent".
- Keep sentences short (6–12 words). Put a full stop where you want a beat.
- Use `...` before a reveal word for a natural dramatic hold.
- Generate each script in 2–3 chunks (hook / body / ending). Regenerate any chunk that sounds flat, then join them in your editor.

**After export:** trim breaths and gaps tighter than 0.25 s, then master to about **−14 LUFS** with a music bed 18–22 dB under the voice and an SFX hit on every on-screen action.

---

## 3. Script Formula (copy this for every video)

```
HOOK (0–4s)        "Ever wondered why ___ ?"  ← everyday object + nostalgia or a surprise
PARADOX (4–9s)     "…while ___ ?"             ← the thing that doesn't add up
PROMISE (9–12s)    "Let's crack it in seventy seconds."  ← timer starts
OPTION A (12–28s)  "The obvious answer is ___. But ___."
OPTION B (28–45s)  "So why not ___? Because ___."
REVEAL (45–60s)    "The real answer... ___."  ← named concept as a big title card
HOW (60–75s)       3 quick mechanisms, one sentence each
CALLBACK (75–80s)  Return to the first image + one-line payoff
CTA (last 2s)      "Follow for one more 'why' every day."
```

---

## 4. 30 Content Ideas

**Prices and packaging**
1. Why do chips packets have so much air? (nitrogen + slack fill)
2. Why do prices end in 99? (charm pricing)
3. Why is a 5-rupee biscuit pack still 5 rupees? (shrinkflation, sequel angle)
4. Why does a sachet cost more per ml than a bottle?
5. How one-rupee shampoo sachets changed Indian FMCG
6. Why is popcorn in a cinema so expensive?
7. Why is airport food so costly? (rent + captive buyers)
8. Why is the "medium" size priced so close to the "large"? (decoy pricing)

**Payments and banking**
9. Who pays for UPI if it's free for you?
10. "No-cost EMI": who actually pays the interest?
11. The credit card "minimum due" trap
12. Why do banks give you so little interest on your savings account?
13. How do credit card companies make money if you pay on time?
14. Why was the 2000-rupee note withdrawn?
15. What happens to the money in a dormant bank account?

**Business models**
16. How does D-Mart sell cheaper than everyone?
17. How did mobile data become so cheap in India?
18. How do food delivery apps make money?
19. Why do quick-commerce apps deliver in 10 minutes?
20. Why do brands give free samples?
21. How do "free" apps make money from you?
22. Why do petrol pumps sell snacks and coffee?

**Everyday economics**
23. Why does ₹100 buy less every year? (inflation, visualised)
24. Why does gold get more expensive at wedding season?
25. Why is the same flight ticket a different price for different people?
26. Why do onion prices suddenly explode?
27. Why do companies sell at a loss for years?
28. Why is cash slowly disappearing?
29. Why do buy-1-get-1 offers still make profit?
30. Why does your 10-year-old ₹10 note still work but an old coin doesn't? (legal tender)

> Before recording, double-check any number, date or company claim against a current source. Explainer channels live or die on accuracy.

---

## 5. Three Ready-to-Record Scripts

The VO lines go into ElevenLabs as written; **[tags]** are for Eleven v3. The **Visual** column is your animation shot list, in the same continuous-camera style.

### Script 1: "Why Do Chips Packets Have So Much Air?" (~180 words)

| VO | Visual |
|---|---|
| [curious] Ever opened a packet of chips... and found it half empty? | Hand tears open a puffy chips pack; camera dives inside → mostly air |
| You paid for chips. [short pause] So why are you getting air? | Coin slides on counter; the "air" is shown as a big empty space |
| Let's crack it in seventy seconds. | Timer prop drops in, then shrinks to the corner |
| First, that's not normal air. It's nitrogen. | Gas cylinder labelled N₂ pumps into the pack |
| Normal air has oxygen... and oxygen makes chips go soft and stale. | Chip turns grey and droops; oxygen bubbles attack it |
| Nitrogen keeps them crispy for months. | Chip snaps fresh, sparkle |
| Second... it's a cushion. | Trucks bounce, packets fly |
| Without it, your chips would reach you as chip dust. | Flat pack crushed → crumbs pour out |
| But here's the part companies don't say out loud. | Camera pushes in on the pack; music dips |
| [short pause] A bigger packet looks like more value on the shelf. | Shelf: big puffy pack vs small flat pack; hand picks the big one |
| This is called... slack fill. | Big title card: **SLACK FILL** |
| So the air protects your chips... | Shield over chips |
| and quietly sells them too. | Price sticker pops on the puffy pack |
| Next time, check the weight, not the size. | Digital scale reads the gram weight; caption highlight on "weight" |
| Follow for one more "why", every day. | Back to the opening shot, then your logo |

### Script 2: "Who Pays for UPI If It's Free?" (~185 words)

| VO | Visual |
|---|---|
| [curious] You scan, you pay, and it's free. | Hand scans a QR at a chai stall; ✓ tick |
| But somebody is running those servers, every single second. | Camera whips back to a huge server room, lights blinking |
| So who's paying? Seventy seconds. | Timer starts |
| With a card, the shopkeeper pays a small fee on every payment. | Card swipe; a small coin flies away from the shopkeeper |
| That's called M-D-R. | Title tag: **MDR** |
| [short pause] For most UPI payments to shops, that fee is zero. | Fee coin crossed out |
| So banks and apps earn almost nothing per payment. | Bank building with an empty coin tray |
| Then why do they fight so hard for your UPI? | Three phones racing |
| Reason one... the government pays an incentive to push digital payments. | Government building sends a stack of coins to the banks |
| Reason two... data. | Phone shows a spending graph |
| Your payments show what you earn and spend, | Bars grow on the graph |
| and that helps apps sell you loans, insurance and investments. | Graph turns into loan, insurance and stock icons |
| Reason three... habit. | Hand taps the same app again and again |
| The app you pay with daily is the app you trust tomorrow. | Path from the payment app to a "Loans" button |
| UPI isn't the product. [short pause] You are the customer they're building. | Back to the chai stall QR; your logo |

### Script 3: "No-Cost EMI: Who Actually Pays the Interest?" (~180 words)

| VO | Visual |
|---|---|
| [curious] Buy a phone today, pay in six parts... with zero interest. | Phone with a "No-Cost EMI" starburst sticker |
| Banks don't lend money for free. So what's the catch? | Bank vault door, raised eyebrow emoji |
| Seventy seconds. | Timer starts |
| The interest is still there. Someone just hides it. | Hand lifts the sticker to show an interest tag underneath |
| Trick one... the discount trick. | Price tag |
| The seller gives a discount equal to the interest. | Price drops by a coin; that coin slides to the bank |
| So you didn't get a discount. [short pause] You got your own interest back. | Coin loops back to the start |
| Trick two... fees. | Small fee tags pop in: "processing fee" |
| A processing fee, plus tax on the interest, can show up on your statement. | Statement prints out line by line |
| Trick three... the lost cash discount. | Two lanes: Pay full / EMI |
| Pay upfront and you might have got a bigger discount. | The "Pay full" lane gets a bigger coin |
| It's not always a bad deal... | Scale balances |
| but it's never really free. | Scale tips; title card: **NO-COST ≠ FREE** |
| Check the final total, not the EMI. | Calculator shows the total; highlight on "total" |
| Follow for one more "why", every day. | Back to the phone; your logo |

---

## 6. Production Checklist (per video)

1. Pick a topic from the list and check the facts.
2. Fill in the script formula (aim for 170–200 words).
3. Generate the VO in ElevenLabs in 2–3 chunks and pick the best take of each.
4. Lock the VO timing, then build the animation to the VO, with a new visual every 1–1.5 s.
5. Captions: 2–5 words per line, keyword in your accent colour, numbers always highlighted.
6. Sound: music bed + an SFX hit on every action; master to −14 LUFS.
7. Hard cuts only if needed; prefer whip-pans, push-ins and focus pulls.
8. End on the same shot you opened with, so the video loops.
9. Instagram: hook text as the cover; YouTube Shorts: the question as the title ("Who pays for UPI? 🤔").
