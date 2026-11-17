import sys, json, wave
import numpy as np
SR, DUR = 48000, 199.6
N = int(SR * DUR); rs = np.random.default_rng(5)
W = json.load(open(sys.argv[1])); at = lambda i: W[i]["start"]
def env(n, a=.002, d=.15): t = np.arange(n) / SR; return np.minimum(t / a, 1) * np.exp(-t / d)
def lpf(x, k):
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc += k * (x[i] - acc); y[i] = acc
    return y
def whoosh(d=.45):
    n = int(SR * d); t = np.linspace(0, 1, n); x = rs.normal(0, 1, n); k = .015 + .12 * np.sin(np.pi * t)
    y = np.empty(n); acc = 0.
    for i in range(n): acc += k[i] * (x[i] - acc); y[i] = acc
    return y * np.sin(np.pi * t) ** 2 * 3
def boom():
    n = int(SR * 1.4); t = np.arange(n) / SR
    return np.sin(2 * np.pi * 48 * t * (1 + .4 * np.exp(-t * 12))) * env(n, .004, .45) + lpf(rs.normal(0, 1, n), .02) * env(n, .002, .12) * 2
def tick():
    n = int(SR * .35); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 2900 * t) + .6 * np.sin(2 * np.pi * 4350 * t)) * env(n, .001, .05) + rs.normal(0, .4, n) * env(n, .0005, .004)
def register():
    a = tick(); b = np.zeros(int(SR * .5)); b[:len(a)] += a; s = tick() * .8; b[int(SR * .09):int(SR * .09) + len(s)] += s; return b
def rustle(d=.5):
    n = int(SR * d); x = rs.normal(0, 1, n); g = (rs.random(n) < .02).astype(float); g = lpf(g, .01) * 30
    return lpf(x, .5) * np.clip(g, 0, 1) * np.sin(np.pi * np.linspace(0, 1, n)) * .8
def pen(d=.4):
    n = int(SR * d); t = np.arange(n) / SR; x = lpf(rs.normal(0, 1, n), .35)
    return x * (.5 + .5 * np.sin(2 * np.pi * 9 * t) ** 2) * np.sin(np.pi * t / t[-1]) * .7
def pop(f=600):
    n = int(SR * .15); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f * t - 900 * t * t)) * env(n, .002, .04)
def clock(): n = int(SR * .05); return lpf(rs.normal(0, 1, n), .6) * env(n, .0005, .006) * 1.5
sfx = np.zeros(N)
def put(s, t, g=1.):
    i = int(t * SR); s = s[:max(0, N - i)]; sfx[i:i + len(s)] += s * g
for i in [8, 21, 38, 44, 62, 84, 91, 128, 141, 149, 168, 186, 198, 209, 222, 230, 243, 248, 261, 277, 294, 314, 327, 335, 341, 354, 375, 392, 413, 426, 435]:
    put(whoosh(), at(i) - .2, .35)
for i in [5, 17, 58, 87, 235, 259, 275, 349, 410]: put(boom(), at(i), .55)
for i in [196, 219, 226, 235, 259, 332]: put(register(), at(i), .4)
for i in [186, 209, 327, 91]: put(rustle(), at(i), .5)
for i in [98, 108, 118, 123]: put(pop(500), at(i), .3)
for i in [192, 194, 212, 216, 328, 330]: put(pen(), at(i), .35)
for k in range(6): put(pop(500 + 60 * k), at(138) + k * .12, .25)
for k in range(8): put(pop(700 + 40 * k), at(157) + k * .06, .2)
for i in [354, 356, 364, 378, 381, 389, 401, 404, 407, 282, 325, 442]: put(pop(450), at(i), .3)
a, b = at(52), at(58) + .4
for k in range(11): put(clock(), a + (b - a) * k / 10, .5)
put(pen(.35), at(399), .5)
put(pop(900), 198.6, .4); put(clock(), 198.6, .8)
# ambient pad: slow minor chords
mus = np.zeros(N); t = np.arange(N) / SR; hz = lambda m: 440 * 2 ** ((m - 69) / 12)
chords = [[45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [43, 50, 55, 59, 62], [40, 47, 52, 55, 59]]
bar = 8.0
for b in range(int(DUR / bar) + 1):
    i0, i1 = int(b * bar * SR), min(N, int((b + 1) * bar * SR) + int(SR * 2))
    if i0 >= N: break
    tt = (np.arange(i0, i1) - i0) / SR; e = np.minimum(tt / 2.5, 1) * np.clip((bar + 2 - tt) / 2.5, 0, 1)
    for m in chords[b % 4]:
        f = hz(m); mus[i0:i1] += (np.sin(2 * np.pi * f * tt) + .25 * np.sin(2 * np.pi * f * 2.003 * tt)) * e * .1 * (1 + .15 * np.sin(2 * np.pi * .2 * tt + m))
mus = lpf(mus, .12) * np.minimum(1, np.minimum(t / 3, (DUR - t) / 3))
def write(p, x):
    x = x / (np.abs(x).max() + 1e-9) * .8; st = np.repeat((x * 32767).astype(np.int16)[:, None], 2, 1)
    with wave.open(p, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
write(sys.argv[2], sfx); write(sys.argv[3], mus); print("ok")
