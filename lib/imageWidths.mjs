// Widths pre-built for every photo by scripts/build-images.mjs and served by lib/imageLoader.ts.
// next.config.ts uses the same list for deviceSizes/imageSizes, so every srcset entry exists as a file.
export const imageSizes = [256, 384];
export const deviceSizes = [640, 828, 1200, 1920];
export const allWidths = [...imageSizes, ...deviceSizes];
