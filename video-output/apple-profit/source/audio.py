import sys, wave
import numpy as np

SR, DUR = 48000, 44.9
N = int(SR * DUR)
rs = np.random.default_rng(3)

def env(n, a=0.002, d=0.15):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t / d)

def lp(x, k):  # one-pole low-pass, k in (0,1)
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc += k * (v - acc); y[i] = acc
    return y

def pop(f=900, d=.08):
    n = int(SR * .18); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f * t + 600 * t * t * -1.5)) * env(n, .002, d)

def click(): n = int(SR * .03); return rs.normal(0, 1, n) * env(n, .0005, .006)

def coin(f=2400):
    n = int(SR * .5); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * m * t) / (i + 1) for i, m in enumerate([1, 1.52, 2.7, 3.9]))
    return s * env(n, .001, .09) * .5

def whoosh(d=.35, up=True):
    n = int(SR * d); t = np.linspace(0, 1, n)
    noise = rs.normal(0, 1, n)
    k = 0.02 + 0.25 * (t if up else 1 - t)
    y = np.empty(n); acc = 0.0
    for i in range(n): acc += k[i] * (noise[i] - acc); y[i] = acc
    return y * np.sin(np.pi * t) ** 2 * 2.2

def thud(f=70, d=.25):
    n = int(SR * .6); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t * (1 + .5 * np.exp(-t * 30))) * env(n, .002, d) + rs.normal(0, .15, n) * env(n, .001, .02))

def hit():  # title hit: thud + bright shimmer
    a = thud(55, .35); b = np.zeros_like(a); s = coin(1800)[: len(a)] * .6; b[: len(s)] = s
    return a + b

def chime():
    n = int(SR * .9); t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * t) * env(n, .003, .35) for f in [880, 1320, 1760]) * .3

def boing():
    n = int(SR * .45); t = np.arange(n) / SR
    f = 180 + 220 * np.exp(-t * 8) * np.cos(t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .003, .18)

def stretch():
    n = int(SR * .7); t = np.arange(n) / SR
    f = 120 + 260 * t / t[-1]
    return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .25 * np.sin(np.pi * t / t[-1])

def rumble():
    n = int(SR * .7); t = np.linspace(0, 1, n)
    return lp(rs.normal(0, 1, n), .03) * np.sin(np.pi * t) * 4

def flip():
    n = int(SR * .12); return lp(rs.normal(0, 1, n), .5) * env(n, .002, .03)

sfx = np.zeros(N)
def put(sound, at, gain=1.0):
    i = int(at * SR); seg = sound[: max(0, N - i)]; sfx[i:i + len(seg)] += seg * gain

for k in range(5): put(pop(700 + k * 90), 1.95 + k * .13, .5)
put(click(), 4.35, .8); put(pop(1300, .05), 4.4, .4)
for k in range(12): put(coin(2600 + k * 50), 5.5 + k * .04, .08)
for k in range(30): put(coin(2200 + (k * 137) % 900), 6.88 + k * .025, .12)
put(hit(), 7.25, .7); put(pop(600), 8.25, .35)
put(whoosh(.5, False), 11.3, .5); put(thud(120, .1), 11.9, .6); put(click(), 11.95, .6)
put(whoosh(.3), 12.25, .4)
for b in [12.7, 19.3, 30.2, 36.3, 42.05]: put(whoosh(.36), b - .2, .9)
for b in [12.85, 19.44, 30.36]: put(pop(520, .12), b, .6)
put(whoosh(.3), 14.45, .4); put(thud(90, .08), 14.85, .8)
put(whoosh(.3), 15.5, .4); put(thud(90, .08), 15.85, .8)
put(pop(800), 16.9, .3)
for k in range(6): put(click(), 17.55 + k * .06, .5)
for k in range(6): put(click(), 18.6 + k * .06, .5)
for a in [21.2, 22.15, 22.85]: put(pop(1000, .07), a, .5)
put(chime(), 23.6, .5); put(chime(), 24.95, .35)
put(stretch(), 26.15, .35); put(boing(), 26.9, .6)
put(rumble(), 28.9, .6); put(hit(), 29.0, .5); put(hit(), 29.55, .5)
put(pop(900), 31.3, .45); put(pop(1100), 31.8, .45)
put(coin(), 32.0, .25); put(coin(2600), 32.3, .25)
put(whoosh(.8), 33.9, .25)
put(hit(), 35.25, .6)
put(pop(700), 37.45, .45)
put(pop(900), 38.75, .4)
for f in [39.0, 39.6, 40.48, 40.95, 41.44, 41.75]: put(flip(), f, .5); put(coin(), f + .28, .35)
put(hit(), 41.4, .35)
put(pop(800), 42.25, .5); put(click(), 42.7, .8); put(pop(1200, .05), 42.72, .4)
put(pop(1000), 43.1, .45)
put(chime(), 43.9, .3)

# ---- lo-fi music bed: Am7 - Fmaj7 - C - G, 90 bpm ----
bpm = 90; beat = 60 / bpm; bar = beat * 4
chords = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 55, 60, 64], [55, 59, 62, 67]]
mus = np.zeros(N); t = np.arange(N) / SR
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
for b in range(int(DUR / bar) + 1):
    t0 = b * bar; i0, i1 = int(t0 * SR), min(N, int((t0 + bar) * SR))
    if i0 >= N: break
    tt = t[i0:i1] - t0
    e = np.minimum(tt / .3, 1) * np.minimum((bar - tt) / .3, 1)
    for m in chords[b % 4]:
        mus[i0:i1] += (np.sin(2 * np.pi * hz(m) * tt) + .3 * np.sin(4 * np.pi * hz(m) * tt)) * e * .12
    mus[i0:i1] += np.sin(2 * np.pi * hz(chords[b % 4][0] - 12) * tt) * e * .25
for k in range(int(DUR / beat)):
    s = k * beat; n = int(SR * .25); tt = np.arange(n) / SR
    i = int(s * SR); seg = slice(i, min(N, i + n)); L = seg.stop - seg.start
    if k % 2 == 0: mus[seg] += (np.sin(2 * np.pi * 55 * tt * (1 + np.exp(-tt * 40))) * np.exp(-tt * 18))[:L] * .5
    h = int((s + beat / 2) * SR); hn = int(SR * .05)
    if h + hn < N: mus[h:h + hn] += rs.normal(0, 1, hn) * np.exp(-np.arange(hn) / SR * 90) * .06
mus = lp(mus, .25)
fade = np.minimum(1, np.minimum(t / 1.0, (DUR - t) / 1.2)); mus *= fade

def write(path, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * .8
    st = np.repeat((x * 32767).astype(np.int16)[:, None], 2, axis=1)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
write(sys.argv[1], sfx); write(sys.argv[2], mus)
print('ok')
