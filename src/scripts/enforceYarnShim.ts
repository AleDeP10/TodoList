/**
 * enforceYarnShim.ts
 *
 * This script verifies that the Yarn shim (`yarn.bat`) is present, executable, and correctly intercepts commands.
 * It ensures that the shim is not silently bypassed and that the expected log file (`yarn-shim.log`) is updated.
 *
 * The script performs the following checks:
 * - Confirms that `yarn.bat` exists at the expected location
 * - Executes a test command (`yarn --version`) through the shim
 * - Verifies that the command was logged correctly
 * - Appends a timestamp to the log for traceability
 *
 * This helps enforce consistent usage of the local Yarn setup and prevents accidental fallback to global Yarn.
 */

// Import only during development (before compilation)
if (process.env.NODE_ENV !== "production") {
  await import("./verifyShimActive.js");
}

// File system module for reading and checking files
import fs from "fs";

// Path module to resolve file paths
import path from "path";

// Converts import.meta.url to a file path
import { fileURLToPath } from "url";

// Executes shell commands synchronously
import { execSync } from "child_process";

// Current file path
const __filename = fileURLToPath(import.meta.url);

// Current directory path
const __dirname = path.dirname(__filename);

// Path to yarn.bat shim
const shimPath = path.resolve(__dirname, "../scripts/shims/yarn.bat");

// Path to log file
const logPath = path.resolve(__dirname, "../../logs/yarn-shim.log");

// Informative log
console.log("🔍 Verifying Yarn shim...");

// Check if yarn.bat exists
if (!fs.existsSync(shimPath)) {
  console.error("❌ yarn.bat shim not found at expected location:", shimPath);
  process.exit(1); // Exit with error
}

try {
  // Current timestamp
  const timestamp = new Date().toISOString();

  // Define test command
  const testCommand = "yarn --version";

  // Run test command via shim
  execSync(`"${shimPath}" --version`, { stdio: "inherit" });

  // Read log file
  const logContent = fs.readFileSync(logPath, "utf-8");

  // Append timestamp to log for traceability
  fs.appendFileSync(
    logPath,
    `[${timestamp}] enforceYarnShim.ts executed
`
  );

  // Check if test command was logged
  if (!logContent.includes(testCommand)) {
    console.error(`❌ Yarn shim did not log the test command: ${testCommand}`);
    process.exit(1); // Exit with error
  }

  // Success message
  console.log("✅ Yarn shim is active and logging correctly.");
} catch (err) {
  // Error message
  console.error("❌ Failed to execute yarn.bat shim:", err);
  process.exit(1); // Exit with error
}
