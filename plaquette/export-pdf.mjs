// Exporte plaquette.html en PDF A4 (4 pages).
// Usage : node plaquette/export-pdf.mjs
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(dir, "plaquette.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: path.join(dir, "Plaquette_NOVESYA_Formules.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("PDF généré : plaquette/Plaquette_NOVESYA_Formules.pdf");
