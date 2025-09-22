/**
 * validateStorybook.ts
 *
 * ✅ Storybook Build Validation Script
 *
 * This script is designed to be run manually by developers during the development phase.
 * It helps verify that Storybook has been correctly built and configured before Docker packaging.
 *
 * ⚠️ Note:
 * - This script is **not** invoked automatically during build or postbuild.
 * - It is intended for **local troubleshooting and verification only**.
 * - It assumes that shared resources (e.g. shims, postcss) have already been copied after `build-shims`.
 *
 * 🔍 What it checks:
 * - Verifies that the `storybook-static` folder exists (output of `build-storybook`)
 * - Ensures that `.storybook/main.ts` is present (required for Storybook config)
 * - Warns if `.storybook/preview.tsx` is missing (used for global decorators and theming)
 * - Verifies that `public/styles/globals.css` has been generated (required for global styles)
 *
 * 🛑 Behavior:
 * - If any required file is missing, the script exits with a non-zero error code.
 * - This prevents incomplete or misconfigured Storybook builds from being published.
 *
 * 🧪 Recommended usage:
 * ```bash
 * node scripts/validateStorybook.js
 * ```
 * Run this after `build-storybook` and before Docker packaging if needed.
 */

// Import shim verification only during development
if (process.env.NODE_ENV !== "production") {
  await import("./verifyShimActive.js");
}

// Import filesystem and path utilities
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the current file path
const __filename = fileURLToPath(import.meta.url);

// Resolve the directory containing this script
const __dirname = path.dirname(__filename);

// Define the path to the built Storybook output
const staticPath = path.resolve(
  __dirname,
  "../../todolist-storybook/storybook-static"
);

// Define the path to the main Storybook configuration file
const configPath = path.resolve(
  __dirname,
  "../../todolist-storybook/.storybook/main.ts"
);

// Define the path to the optional preview file (used for theming and decorators)
const previewPath = path.resolve(
  __dirname,
  "../../todolist-storybook/.storybook/preview.tsx"
);

// Define the path to the global stylesheet used by Storybook
const globalsPath = path.resolve(
  __dirname,
  "../../todolist-storybook/public/styles/globals.css"
);

// Check if the storybook-static folder exists
if (!existsSync(staticPath)) {
  console.error("❌ storybook-static not found. Did you run build-storybook?");
  process.exit(1);
}

// Check if main.ts exists
if (!existsSync(configPath)) {
  console.error(
    "❌ Missing .storybook/main.ts. Storybook cannot build without it."
  );
  process.exit(1);
}

// Check if preview.tsx exists
if (!existsSync(previewPath)) {
  console.warn(
    "⚠️ Missing .storybook/preview.tsx. Theme and global decorators may not be applied."
  );
}

// Check if globals.css exists
if (!existsSync(globalsPath)) {
  console.error("❌ Missing public/styles/globals.css. Required for global styles.");
  process.exit(1);
}

// If all checks pass, confirm success
console.log("✅ Validation completed.");
