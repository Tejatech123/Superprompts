import sys, wave, json
from pocketsphinx import Decoder
text = open(sys.argv[2]).read().split()
d = Decoder(samprate=16000, bestpath=False)
d.set_align_text(" ".join(text))
with wave.open(sys.argv[1]) as w: data = w.readframes(w.getnframes())
d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
out=[{"w":s.word,"s":s.start_frame/100,"e":(s.end_frame+1)/100} for s in d.seg() if s.word not in ("<sil>","<s>","</s>","(NULL)")]
json.dump(out, open(sys.argv[3],"w"))
print(" ".join(f"{o['w']}@{o['s']:.2f}" for o in out))
