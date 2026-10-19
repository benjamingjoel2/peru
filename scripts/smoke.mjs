// Smoke + accessibility test across every route in the sitemap.
// Usage: BASE=http://localhost:3001 node scripts/smoke.mjs
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
let failures = 0;
for (const path of paths) {
  for (const [name, vp] of [["mobile", { width: 390, height: 844 }], ["desktop", { width: 1440, height: 900 }]]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const res = await page.goto(base + path, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    let axe = [];
    if (name === "desktop") {
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      axe = r.violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
    }
    const bad = res.status() !== 200 || errors.length || overflow || axe.length;
    if (bad) {
      failures++;
      console.log(`✗ ${path} [${name}] status=${res.status()} overflow=${overflow}`);
      errors.forEach((e) => console.log("   error:", e.slice(0, 200)));
      axe.forEach((a) => console.log("   axe:", a));
    }
    await ctx.close();
  }
}
console.log(`${paths.length} routes checked, ${failures} with problems`);
await browser.close();
process.exit(failures ? 1 : 0);
