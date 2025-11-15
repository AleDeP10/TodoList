/**
 * copySharedResources.ts
 *
 * 📦 Docker Resource Copy Script
 *
 * This script copies shared resources into each project
 * to make them accessible inside Docker containers.
 *
 * ✅ Cross-platform (Node.js-based)
 * ✅ Compatible with build-scripts
 * ⚠️ Must be run before Docker build
 *
 * Usage:
 * ```bash
 * node dist/scripts/copySharedResources.js
 * ```
 */

import { cp, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging utility
function log(msg: string) {
  console.log(`📦 ${msg}`);
}

// Copy a file or folder recursively
async function copy(src: string, dest: string) {
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true });
  log(`Copied ${src} → ${dest}`);
}

// Base paths
const root = path.resolve(__dirname, "../..");
const distScripts = path.join(root, "dist", "scripts");

// Full module folders
const postcssFolder = path.join(root, "node_modules", "postcss-cli");
const serveFolder = path.join(root, "node_modules", "serve");
const storybookFolder = path.join(root, "node_modules", "@storybook", "cli");
const storybookCli = path.join(root, "node_modules", "@storybook", "cli");


// Copy resources into a project
async function copyResources(project: string, extras: boolean = false) {
  const target = path.join(root, project, "shared-resources");

  // Copy shims
  await copy(path.join(distScripts, "shims"), path.join(target, "scripts", "shims"));

  // Copy yarn.lock from root
  await copy(path.join(root, "yarn.lock"), path.join(target, "yarn.lock"));

  // Extra resources for storybook
  if (extras) {
    await copy(postcssFolder, path.join(target, "postcss-cli"));
    await copy(serveFolder, path.join(target, "serve"));
    await copy(storybookFolder, path.join(target, "storybook"));
    await copy(storybookCli, path.join(target, "@storybook", "cli"));
  }
}

// Execute copy for both projects
(async () => {
  try {
    await copyResources("fe-nextjs/monolith");
    await copyResources("storybook", true);
    log("✅ Shared resources copied for frontend and storybook.");
  } catch (err) {
    console.error("❌ Failed to copy resources:", err);
    process.exit(1);
  }
})();
