const { chromium } = require('playwright');
const { spawn } = require('child_process');
const [mode, out, ...times] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('file://' + __dirname + '/scene.html'); await p.evaluate(() => window.ready);
  const grab = async t => { await p.evaluate(t => window.renderFrame(t), t);
    const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', .93)); return Buffer.from(d.split(',')[1], 'base64'); };
  if (mode === 'stills') {
    for (const t of times) require('fs').writeFileSync(`${out}/s_${t}.jpg`, await grab(+t));
  } else {
    const fps = 30, n = Math.round(44.9 * fps);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', '30', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) { const buf = await grab(i / fps); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 150 === 0) console.log('frame', i, '/', n); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  if (errs.length) console.log('ERRORS', errs.slice(0, 5));
  await b.close();
})();
