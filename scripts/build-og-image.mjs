// Renders the default share image (scripts/og/opengraph-image.tsx) to app/opengraph-image.png.
// Run `npm run og-image` after editing the design and commit the PNG. It used to be rendered by a
// next/og route, which pulled @vercel/og (resvg + yoga WebAssembly, ~0.6 MiB gzipped) into the
// Cloudflare Worker just to serve one prerendered image.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { build } from "esbuild";

const root = process.cwd();
const bundle = path.join(root, "node_modules/.cache/og-image/render.cjs");
await mkdir(path.dirname(bundle), { recursive: true });
await build({
  entryPoints: [path.join(root, "scripts/og/opengraph-image.tsx")],
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  packages: "external",
  tsconfig: path.join(root, "tsconfig.json"),
  outfile: bundle,
  logLevel: "warning",
});
const mod = createRequire(import.meta.url)(bundle);
const png = Buffer.from(await mod.default().arrayBuffer());
await writeFile(path.join(root, "app/opengraph-image.png"), png);
await writeFile(path.join(root, "app/opengraph-image.alt.txt"), mod.alt);
console.log(`og-image: ${mod.size.width}x${mod.size.height}, ${png.length} bytes`);
