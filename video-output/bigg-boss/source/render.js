const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
// usage: node render.js <land|vert> stills <outdir> t1 t2 ...   |   node render.js <mode> video <out.mp4> <speed> <start> <end>
const [mode, kind, out, ...rest] = process.argv.slice(2);
(async () => {
  const W = mode === 'land' ? 1920 : 1080, H = mode === 'land' ? 1080 : 1920;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`file://${__dirname}/scene.html?mode=${mode}`); await p.evaluate(() => window.ready);
  const grab = async t => { await p.evaluate(t => window.renderFrame(t), t);
    const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', .92)); return Buffer.from(d.split(',')[1], 'base64'); };
  if (kind === 'stills') { for (const t of rest) fs.writeFileSync(`${out}/${mode}_${t}.jpg`, await grab(+t)); }
  else {
    const speed = +rest[0], t0 = +rest[1], t1 = +rest[2], fps = 30, n = Math.round((t1 - t0) / speed * fps);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', '30', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) { const buf = await grab(t0 + i / fps * speed); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log('frame', i, '/', n); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', n);
  }
  if (errs.length) console.log('ERRORS', errs.slice(0, 5));
  await b.close();
})();
