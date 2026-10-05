// Exporte chaque SVG de logo/svg en PNG haute définition (fond transparent) + la planche d'aperçu.
// Usage : node logo/export-png.mjs
import { chromium } from "playwright";
import { readdirSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "png");
mkdirSync(out, { recursive: true });
const width = (n) => (n.includes("horizontal") ? 2400 : n.includes("icone") || n.includes("avatar") ? 1024 : n.includes("monogramme") ? 1200 : 1600);

const browser = await chromium.launch();
const page = await browser.newPage();
for (const f of readdirSync(path.join(dir, "svg")).filter((f) => f.endsWith(".svg")).sort()) {
  const src = readFileSync(path.join(dir, "svg", f), "utf8");
  const [, vw, vh] = src.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
  const w = width(f), h = Math.round((w * vh) / vw);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<style>*{margin:0}html,body{background:transparent}svg{display:block;width:${w}px;height:${h}px}</style>${src}`);
  await page.screenshot({ path: path.join(out, f.replace(".svg", ".png")), omitBackground: true });
  console.log(`${f.replace(".svg", ".png")}  ${w}×${h}`);
}
await page.setViewportSize({ width: 1400, height: 900 });
await page.goto(pathToFileURL(path.join(dir, "planche.html")).href, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(dir, "planche-logos-novesya.png"), fullPage: true });
await page.pdf({ path: path.join(dir, "planche-logos-novesya.pdf"), width: "1400px", height: `${await page.evaluate(() => document.body.scrollHeight + 2)}px`, printBackground: true });
await browser.close();
