// Fails if content uses phrases the brand voice avoids.
// Run: node scripts/lint-voice.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const banned = [/lost city/i, /mystical/i, /exotic/i, /once[- ]in[- ]a[- ]lifetime/i, /hidden gem/i];
const roots = ["data", "content", "config", "components", "app"];
const hits = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mdx?)$/.test(f)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const re of banned) if (re.test(line)) hits.push(`${p}:${i + 1}  ${line.trim().slice(0, 100)}`);
      });
    }
  }
};
roots.forEach(walk);
if (hits.length) {
  console.error("Voice check failed: avoid these phrases\n" + hits.join("\n"));
  process.exit(1);
}
console.log("Voice check passed");
