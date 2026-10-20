// Downloads the photos listed in data/photo-sources.json into public/photos/<slot>.jpg.
// Sources are free Unsplash License photos; credits are listed on /credits.
// Run: node scripts/fetch-photos.mjs [--force]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sources = JSON.parse(readFileSync(join(root, "data/photo-sources.json"), "utf8"));
const outDir = join(root, "public/photos");
mkdirSync(outDir, { recursive: true });
const force = process.argv.includes("--force");

let failed = 0;
for (const s of sources) {
  const file = join(outDir, `${s.slot}.jpg`);
  if (existsSync(file) && !force) continue;
  const url = `${s.image}?w=2000&q=72&fm=jpg&fit=max`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${s.slot}: HTTP ${res.status}`);
    failed++;
    continue;
  }
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${s.slot}`);
}
process.exit(failed ? 1 : 0);
