/**
 * analyzeStorybookBundle.ts
 *
 * 📦 Storybook Bundle Analyzer
 *
 * This utility scans the contents of the `storybook-static` directory and reports
 * the largest assets generated during the Storybook build. It helps identify
 * oversized JavaScript bundles that may impact performance or cause build warnings.
 *
 * 🛠 Usage:
 * ```bash
 * node dist/scripts/analyzeStorybookBundle.js
 * ```
 *
 * ✅ Designed to run after `build-storybook`, typically as part of `postbuild`
 * ❌ Does not fail the build, but prints warnings for assets exceeding thresholds
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the Storybook output directory
const staticDir = path.resolve(
  __dirname,
  "../../todolist-storybook/storybook-static"
);

// Define size threshold in KiB
const sizeLimitKiB = 500;

// Convert bytes to KiB
function toKiB(bytes: number): number {
  return Math.round(bytes / 1024);
}

// Recursively collect all .js files in the directory
function collectJsFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Start analysis
console.log("🔍 Analyzing Storybook bundle...");

if (!fs.existsSync(staticDir)) {
  console.error(
    "❌ storybook-static directory not found. Run build-storybook first."
  );
  process.exit(1);
}

const jsFiles = collectJsFiles(staticDir);
const oversized: { file: string; size: number }[] = [];

for (const file of jsFiles) {
  const stats = fs.statSync(file);
  const sizeKiB = toKiB(stats.size);

  if (sizeKiB > sizeLimitKiB) {
    oversized.push({ file: path.relative(staticDir, file), size: sizeKiB });
  }
}

// Print results
if (oversized.length > 0) {
  console.warn(
    `⚠️ Found ${oversized.length} oversized JS assets (> ${sizeLimitKiB} KiB):`
  );
  for (const asset of oversized) {
    console.warn(` - ${asset.file}: ${asset.size} KiB`);
  }
} else {
  console.log("✅ All JS assets are within size limits.");
}
