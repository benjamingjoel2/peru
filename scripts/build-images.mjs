// Pre-builds every photo in public/photos at each srcset width as WebP into public/img (git-ignored).
// Runs before `next dev` and `next build`; skips files that are already up to date.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { allWidths } from "../lib/imageWidths.mjs";

const src = path.join(process.cwd(), "public/photos");
const out = path.join(process.cwd(), "public/img");
await mkdir(out, { recursive: true });

const files = (await readdir(src)).filter((f) => f.endsWith(".jpg"));
let made = 0;
const mtime = async (p) => (await stat(p).catch(() => null))?.mtimeMs ?? 0;

await Promise.all(
  files.map(async (f) => {
    const input = path.join(src, f);
    const age = await mtime(input);
    for (const w of allWidths) {
      const target = path.join(out, `${f.replace(/\.jpg$/, "")}-${w}.webp`);
      if ((await mtime(target)) > age) continue;
      await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 62, effort: 4, smartSubsample: true }).toFile(target);
      made++;
    }
  }),
);
console.log(`images: ${files.length} photos × ${allWidths.length} widths (${made} built)`);
