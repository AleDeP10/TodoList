/**
 * cleanInstall.ts
 *
 * 🧹 Clean Dependency Reinstallation Script
 *
 * This script performs a clean installation of dependencies across all workspaces.
 * It removes `node_modules` and `yarn.lock`, clears the Yarn cache,
 * and reinstalls dependencies using Yarn v1.
 *
 * ✅ Cross-platform (Node.js-based)
 * ⚠️ Requires Yarn v1 and a local shim setup
 *
 * Recommended usage:
 * - Run via `yarn run setup` after cloning the repository
 * - Do not run directly before compiling shims with `yarn run build-scripts`
 *
 * Optional flags:
 * force → skips shim verification (use only if setup hasn't been run yet)
 *
 * Example:
 * ```bash
 * node cleanInstall.js force
 * ```
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging utility with emoji prefix
function log(msg: string) {
  console.log(`🧹 ${msg}`);
}

// Read positional arguments
const args = process.argv.slice(2);

// Check if 'force' flag is present
const bypassShim = args.includes("force");

// Import shim verification only if not bypassed
if (process.env.NODE_ENV !== "production" && !bypassShim) {
  await import("./verifyShimActive.js");
} else if (bypassShim) {
  console.warn("⚠️ Shim bypassed via 'force'. Proceeding without verification.");
}

try {
  // Resolve project root directory
  const root = path.resolve(__dirname, "../..");

  // Remove node_modules if it exists
  const nodeModulesPath = path.join(root, "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    log("Removed node_modules");
  }

  // Remove yarn.lock if it exists
  const yarnLockPath = path.join(root, "yarn.lock");
  if (fs.existsSync(yarnLockPath)) {
    fs.rmSync(yarnLockPath);
    log("Removed yarn.lock");
  }

  // Clear Yarn cache
  execSync("yarn cache clean", { stdio: "inherit" });

  // Reinstall dependencies
  execSync("yarn install", { stdio: "inherit" });

  log("✅ Reinstallation complete.");
} catch (err) {
  console.error("❌ Failed during clean install:", err);
  process.exit(1);
}
