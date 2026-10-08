import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const [,, html, out, fpsArg, onlyAt] = process.argv;
const fps = Number(fpsArg || 30);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto('file://' + path.resolve(html));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
if (onlyAt) { // preview stills
  for (const t of onlyAt.split(',')) {
    await page.evaluate(t => render(t), Number(t));
    await page.screenshot({ path: `${out}/still_${t}.png` });
  }
  await browser.close(); process.exit(0);
}
const dur = await page.evaluate(() => window.DUR);
const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const n = Math.round(dur * fps);
for (let i = 0; i < n; i++) {
  await page.evaluate(t => render(t), i / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 60 === 0) console.error(`frame ${i}/${n}`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
