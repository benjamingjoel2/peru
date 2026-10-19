// End-to-end checks of the key interactions. Usage: BASE=http://localhost:3001 node scripts/interactions.mjs
import { chromium } from "playwright";
import assert from "node:assert/strict";

const base = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const results = [];
async function check(name, fn, viewport = { width: 1440, height: 900 }) {
  const ctx = await browser.newContext({ viewport, acceptDownloads: true });
  const page = await ctx.newPage();
  try {
    await fn(page);
    results.push(`✓ ${name}`);
  } catch (e) {
    results.push(`✗ ${name}: ${e.message.split("\n")[0]} @ ${(e.stack.match(/interactions\.mjs:(\d+)/) ?? [])[1] ?? "?"}`);
  } finally {
    await ctx.close();
  }
}

await check("Mega-menu opens by keyboard and closes with Esc", async (page) => {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const btn = page.locator('[data-menu="Destinations"]');
  await btn.focus();
  await page.keyboard.press("Enter");
  await page.locator("#menu-Destinations").waitFor();
  assert.equal(await btn.getAttribute("aria-expanded"), "true");
  await page.locator("#menu-Destinations a", { hasText: "The Southern Andes" }).hover();
  await page.locator("#menu-Destinations a", { hasText: "Lake Titicaca" }).waitFor();
  await page.keyboard.press("Escape");
  await page.locator("#menu-Destinations").waitFor({ state: "detached" });
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("data-menu")), "Destinations");
});

await check("Mobile drawer: three levels with Back", async (page) => {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  const dlg = page.locator("dialog[open]");
  await dlg.getByRole("button", { name: "Destinations" }).click();
  await dlg.getByRole("button", { name: "Cusco & the Sacred Valley" }).click();
  await dlg.getByRole("link", { name: "Machu Picchu" }).waitFor();
  await dlg.getByRole("button", { name: "Back" }).click();
  await dlg.getByRole("button", { name: "The Amazon" }).waitFor();
  await page.keyboard.press("Escape");
  await page.locator("dialog[open]").waitFor({ state: "detached" });
}, { width: 390, height: 844 });

await check("Enquire modal: budget step gates the form, submit shows Gracias", async (page) => {
  await page.goto(base + "/journeys/first-peru-done-right", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Enquire about this journey" }).click();
  const dlg = page.locator("dialog[open]");
  await dlg.getByText("Does this fit your").waitFor();
  assert.ok(await dlg.getByRole("button", { name: "Continue" }).isDisabled());
  await dlg.getByLabel("This fits what I have in mind").check();
  await dlg.getByRole("button", { name: "Continue" }).click();
  await dlg.getByText("Enquiring about:").waitFor();
  await dlg.getByLabel("When (month)").selectOption("Feb");
  await dlg.getByText("Inca Trail closed", { exact: true }).first().waitFor();
  await dlg.getByLabel("Children (under 18)").fill("2");
  await dlg.getByLabel("Age of child 1").fill("8");
  await dlg.getByLabel("Age of child 2").fill("11");
  await dlg.getByLabel("Country of residence").selectOption("Australia");
  await dlg.locator('input[name="name"]').fill("Test Traveller");
  await dlg.locator('input[name="email"]').fill("test@example.com");
  await dlg.getByText("WhatsApp", { exact: true }).click();
  await dlg.getByText("Machu Picchu", { exact: true }).click();
  await dlg.getByRole("button", { name: "Send my enquiry" }).click();
  await dlg.getByText("Your Peru Specialist will be in touch soon.").waitFor();
});

await check("Gated itinerary download returns a PDF", async (page) => {
  await page.goto(base + "/journeys/the-classic-inca-trail", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Download itinerary" }).click();
  const dlg = page.locator("dialog[open]");
  await dlg.locator('input[name="name"]').fill("Test");
  await dlg.locator('input[name="email"]').fill("t@example.com");
  await dlg.getByLabel("Country of residence").selectOption("United Kingdom");
  const [download] = await Promise.all([page.waitForEvent("download"), dlg.getByRole("button", { name: "Download PDF" }).click()]);
  const path = await download.path();
  const { readFileSync } = await import("node:fs");
  const buf = readFileSync(path);
  assert.equal(buf.subarray(0, 4).toString(), "%PDF");
  assert.ok(buf.length > 5000);
});

await check("Altitude chart: arrow keys announce each night", async (page) => {
  await page.goto(base + "/journeys/first-peru-done-right", { waitUntil: "networkidle" });
  const chart = page.locator('svg[aria-roledescription="altitude chart"]').first();
  await chart.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // let hydration finish on this long page
  await chart.focus();
  for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowRight");
  await page.getByText("Day 3: Sacred Valley").waitFor();
  await page.getByText("Sleep lower first").first().waitFor();
  await page.getByText("Show as a table").first().click();
  await page.locator("details[open] table").first().waitFor();
});

await check("Route builder: straight-to-Cusco preset warns", async (page) => {
  await page.goto(base + "/altitude", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Straight to Cusco (not ideal)" }).click();
  await page.getByText(/Sleep lower first, e\.g\./).waitFor();
  await page.getByRole("button", { name: "Sleep lower first", exact: true }).click();
  await page.getByText("This route climbs gradually").waitFor();
});

await check("Food map: keyboard moves between altitude zones", async (page) => {
  await page.goto(base + "/peru-by-altitude", { waitUntil: "networkidle" });
  await page.locator("#food-tab-pacific").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.locator("#food-panel h3", { hasText: "Andean valleys" }).waitFor();
  await page.locator("#food-panel").getByRole("button", { name: /Pachamanca/ }).click();
  await page.locator("#food-panel").getByRole("link", { name: /Pisac/ }).waitFor();
});

await check("Destination tabs: arrow keys switch panels", async (page) => {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.locator("#tab-coast").focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("#tab-cusco-sacred-valley").getAttribute("aria-selected"), "true");
  await page.locator("#panel-cusco-sacred-valley").getByRole("link", { name: "Machu Picchu" }).first().waitFor();
});

await check("Machu Picchu helper: February + Inca Trail shows closure", async (page) => {
  await page.goto(base + "/machu-picchu", { waitUntil: "networkidle" });
  const helper = page.locator("#book");
  await helper.getByLabel("Travel month").selectOption("Feb");
  await helper.getByLabel("Route").selectOption("classic-inca-trail");
  await helper.getByText("is closed in February").waitFor();
  await helper.getByLabel("Route").selectOption("train");
  await helper.getByText(/Aim to secure them by|Book as soon as you can/).waitFor();
});

await check("Currency switcher converts prices and persists", async (page) => {
  await page.goto(base + "/journeys", { waitUntil: "networkidle" });
  await page.getByLabel("Currency").selectOption("EUR");
  await page.locator('[data-currency="EUR"]').first().waitFor();
  assert.match(await page.locator('[data-currency="EUR"]').first().innerText(), /€/);
  await page.reload();
  await page.locator('[data-currency="EUR"]').first().waitFor();
});

await check("Newsletter signup confirms", async (page) => {
  await page.goto(base + "/faq", { waitUntil: "networkidle" });
  await page.getByLabel("Email address").fill("news@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.getByText("You're on the list").waitFor();
});

await check("Reduced motion: hero does not auto-advance and film shows play", async (page) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  assert.equal(await page.getByRole("button", { name: "Pause" }).count(), 0);
  await page.getByRole("button", { name: "Play film" }).waitFor();
});

console.log(results.join("\n"));
await browser.close();
process.exit(results.some((r) => r.startsWith("✗")) ? 1 : 0);
