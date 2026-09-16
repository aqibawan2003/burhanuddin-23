/**
 * Image optimization pipeline
 * Usage: npm run optimize:images
 *
 * Reads from: /public/photos/originals/*.{jpg,jpeg,png,webp}
 * Writes to:  /public/photos/{01,02,...}.avif  +  {01,02,...}.webp
 * Updates:    /content/photos.ts  (blurDataURL fields)
 */

import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "photos", "originals");
const OUT_DIR = path.join(ROOT, "public", "photos");
const PHOTOS_TS = path.join(ROOT, "content", "photos.ts");
const MAX_LONG_EDGE = 1600;
const MAX_OUTPUT_BYTES = 250 * 1024; // 250 KB

if (!existsSync(SRC_DIR)) {
  console.error(`Source directory not found: ${SRC_DIR}`);
  console.error("Place your original photos in public/photos/originals/ as 01.jpg … 20.jpg");
  process.exit(1);
}

const EXTS = [".jpg", ".jpeg", ".png", ".webp"];
const files = (await readdir(SRC_DIR))
  .filter((f) => EXTS.includes(path.extname(f).toLowerCase()))
  .sort();

if (files.length === 0) {
  console.error("No image files found in originals/");
  process.exit(1);
}

console.log(`\nProcessing ${files.length} images…\n`);
console.log(
  "File".padEnd(10),
  "Original".padEnd(12),
  "AVIF".padEnd(12),
  "WebP".padEnd(12),
  "Saved"
);
console.log("-".repeat(55));

const blurMap = {};
let totalOrig = 0, totalAvif = 0, totalWebp = 0;
const oversized = [];

for (const f of files) {
  const srcPath = path.join(SRC_DIR, f);
  const base = path.basename(f, path.extname(f));
  const origStat = await stat(srcPath);
  totalOrig += origStat.size;

  const img = sharp(srcPath).rotate(); // auto-orient from EXIF
  const meta = await img.metadata();
  const isPortrait = (meta.height ?? 0) > (meta.width ?? 1);
  const resize = isPortrait
    ? { height: MAX_LONG_EDGE, width: undefined }
    : { width: MAX_LONG_EDGE, height: undefined };

  // AVIF
  const avifBuf = await img
    .clone()
    .resize(resize.width, resize.height, { fit: "inside", withoutEnlargement: true })
    .withMetadata(false)
    .avif({ quality: 52, effort: 4 })
    .toBuffer();

  // WebP
  const webpBuf = await img
    .clone()
    .resize(resize.width, resize.height, { fit: "inside", withoutEnlargement: true })
    .withMetadata(false)
    .webp({ quality: 75 })
    .toBuffer();

  // LQIP blur placeholder (16px wide, base64)
  const blurBuf = await img
    .clone()
    .resize(16, null, { fit: "inside" })
    .blur(4)
    .jpeg({ quality: 40 })
    .toBuffer();
  blurMap[base] = "data:image/jpeg;base64," + blurBuf.toString("base64");

  // Write outputs
  await writeFile(path.join(OUT_DIR, `${base}.avif`), avifBuf);
  await writeFile(path.join(OUT_DIR, `${base}.webp`), webpBuf);

  totalAvif += avifBuf.length;
  totalWebp += webpBuf.length;

  const saved = (((origStat.size - avifBuf.length) / origStat.size) * 100).toFixed(0);
  console.log(
    f.padEnd(10),
    `${(origStat.size / 1024).toFixed(0)} KB`.padEnd(12),
    `${(avifBuf.length / 1024).toFixed(0)} KB`.padEnd(12),
    `${(webpBuf.length / 1024).toFixed(0)} KB`.padEnd(12),
    `${saved}%`
  );

  if (avifBuf.length > MAX_OUTPUT_BYTES) oversized.push(`${base}.avif (${(avifBuf.length / 1024).toFixed(0)} KB)`);
  if (webpBuf.length > MAX_OUTPUT_BYTES) oversized.push(`${base}.webp (${(webpBuf.length / 1024).toFixed(0)} KB)`);
}

console.log("-".repeat(55));
console.log(
  "TOTAL".padEnd(10),
  `${(totalOrig / 1024 / 1024).toFixed(1)} MB`.padEnd(12),
  `${(totalAvif / 1024 / 1024).toFixed(1)} MB`.padEnd(12),
  `${(totalWebp / 1024 / 1024).toFixed(1)} MB`.padEnd(12),
  `${(((totalOrig - totalAvif) / totalOrig) * 100).toFixed(0)}%`
);

if (oversized.length > 0) {
  console.error("\nERROR: The following outputs exceed 250 KB:");
  oversized.forEach((f) => console.error(" !", f));
  process.exit(1);
}

// Update blurDataURL in content/photos.ts
let src = await readFile(PHOTOS_TS, "utf8");
for (const [base, blur] of Object.entries(blurMap)) {
  // Replace existing blurDataURL for each photo entry
  const re = new RegExp(
    `(src:\\s*"/photos/${base}\\.[a-z]+"[\\s\\S]*?blurDataURL:\\s*)"[^"]*"`,
    "g"
  );
  src = src.replace(re, `$1"${blur}"`);
}
await writeFile(PHOTOS_TS, src);

console.log("\n✓ All images optimized and blurDataURLs updated in content/photos.ts");
console.log("✓ No originals were committed (they are gitignored)\n");
