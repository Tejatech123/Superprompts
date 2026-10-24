import json, sys
words = json.load(open(sys.argv[1]))
# (display, aligned-word count, keyword); "|" starts a new caption line
spec = """Did you know... | out of every 5:1:k phones sold, | only one is an iPhone...:2:k |
but Apple takes almost 80%:2:k | of all the profit?:1:k | Crazy, right? |
Here's how, in 40:1:k seconds. | One.:1:k | Apple makes its own parts:1:k | and its own software.:1:k |
So Apple decides the cost...:1:k | and the price.:1:k | Two.:1:k | After the iPhone,:2:k |
you buy AirPods...:2:k | a Watch...:1:k iCloud.:2:k | Everything works so well together... |
that leaving feels painful.:1:k | This is called... | a walled:1:k garden.:1:k | Three.:1:k |
Buy an app or a subscription:1:k | on iPhone...:2:k | and Apple quietly:1:k takes |
up to 30%.:2:k | So Apple doesn't just | sell you a phone. | It keeps earning:1:k from you... |
every single month.:1:k | Follow for one more why,:1:k | every day."""
lines, i = [], 0
for chunk in spec.replace("\n", " ").split("|"):
    toks = []
    for raw in chunk.split():
        parts = raw.rsplit(":", 2) if raw.count(":") >= 2 else [raw, "1", ""]
        disp, n, k = parts[0], int(parts[1]), parts[2] == "k"
        ws = words[i:i+n]; i += n
        toks.append({"t": disp, "s": ws[0]["s"], "e": ws[-1]["e"], "k": k})
    lines.append(toks)
assert i == len(words), (i, len(words))
for a, b in zip(lines, lines[1:]): a[-1]["lineEnd"] = b[0]["s"]
lines[-1][-1]["lineEnd"] = 44.9
json.dump(lines, open(sys.argv[2], "w"))
def ts(x): return f"{int(x//3600):02}:{int(x%3600//60):02}:{int(x%60):02},{int(round(x%1*1000)):03}"
with open(sys.argv[3], "w") as f:
    for n, l in enumerate(lines, 1):
        f.write(f"{n}\n{ts(l[0]['s'])} --> {ts(l[-1]['lineEnd'])}\n{' '.join(t['t'] for t in l)}\n\n")
print(len(lines), "caption lines")
