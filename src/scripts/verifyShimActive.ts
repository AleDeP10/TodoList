/**
 * verifyShimActive.ts
 *
 * This script ensures that Yarn commands are executed through the local shim (`yarn.bat`)
 * and not bypassed by global Yarn, npx, or other package managers.
 *
 * It verifies that the current command was logged in `yarn-shim.log`, which is only updated
 * by the shim itself. If the command is not found, the script terminates immediately.
 *
 * This helps enforce architectural consistency and prevents silent fallback to global Yarn,
 * which may cause version mismatches, builder misdetection (e.g. Vite instead of Webpack),
 * or dependency resolution failures.
 */

// Import Node's file system module
import fs from "fs";

// Import Node's path module
import path from "path";

// Import Node's URL module to resolve current file path
import { fileURLToPath } from "url";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory of the current file
const __dirname = path.dirname(__filename);

// Resolve the path to the yarn-shim.log file
const logPath = path.resolve(__dirname, "../../logs/yarn-shim.log");

// Read the contents of the log file
const logContent = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf-8") : "";

// Get the current command arguments
const currentArgs = process.argv.slice(2).join(" ");

// Check if the current command was logged by the shim
if (!logContent.includes(currentArgs)) {
  // If not found, print error and terminate
  console.error("❌ Shim verification failed: command not logged via yarn-shim.");
  console.error("🔒 This script must be executed through the local Yarn shim.");
  process.exit(1);
}

// If found, print confirmation
console.log("✅ Shim verification passed: command was logged correctly.");