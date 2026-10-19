// Usage: node scripts/shot.mjs <path> <outPrefix> [--full] [--click=selector]
import { chromium } from "playwright";
const [, , path = "/", out = "shot", ...rest] = process.argv;
const full = rest.includes("--full");
const click = rest.find((r) => r.startsWith("--click="))?.slice(8);
const base = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const [name, vp] of [["m", { width: 390, height: 844 }], ["d", { width: 1440, height: 900 }]]) {
  const page = await browser.newPage({ viewport: vp });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (click && name === "d") { await page.click(click); await page.waitForTimeout(600); }
  if (full) {
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: `${out}-${name}.png`, fullPage: full });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(name, "errors:", errors.length ? errors : "none", "hOverflow:", overflow);
  await page.close();
}
await browser.close();
