/**
 * checkVersions.ts
 *
 * This script validates the presence and compatibility of key dependencies including Storybook, React, ReactDOM, and their type definitions.
 * It ensures that peer dependencies are respected and warns if mismatches are detected.
 * It also checks for known issues such as missing `scheduler/tracing` in @types/react.
 * It is designed to work with Yarn v1 and local shims.
 */

// Import shim verification only during development
if (process.env.NODE_ENV !== "production") {
  await import("./verifyShimActive.js");
}

// Import required modules
import { execSync } from "child_process"; // For executing shell commands
import fs from "fs"; // For reading and checking files
import path from "path"; // For resolving file paths
import { fileURLToPath } from "url"; // For converting module URL to file path

// Resolve current file path
const __filename = fileURLToPath(import.meta.url);

// Resolve directory of current file
const __dirname = path.dirname(__filename);

// Get installed version of a package from yarn list output
function getVersion(pkg: string): string | null {
  try {
    // Run yarn list to get version info
    const output = execSync(`yarn list --pattern ${pkg}`, {
      encoding: "utf-8",
    });

    // Extract version using regex
    const match = output.match(new RegExp(`${pkg}@(\\d+\\.\\d+\\.\\d+)`));
    return match ? match[1] : null;
  } catch (err) {
    // Log error if command fails
    console.error(`❌ Failed to get version for ${pkg}:`, err);
    return null;
  }
}

// Get declared version of a package from a workspace's package.json
function getWorkspaceVersion(workspace: string, pkg: string): string | null {
  // Resolve path to workspace's package.json
  const pkgPath = path.resolve(__dirname, `../${workspace}/package.json`);
  if (!fs.existsSync(pkgPath)) return null;

  // Read and parse package.json
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  // Merge all dependency types
  const allDeps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
    ...pkgJson.peerDependencies,
  };

  // Return version if found
  return allDeps[pkg] || null;
}

// Get root-level versions of key packages
const reactVersion = getVersion("react");
const reactDomVersion = getVersion("react-dom");
const storybookVersion = getVersion("@storybook/react");
const typesReactVersion = getVersion("@types/react");
const typesReactDomVersion = getVersion("@types/react-dom");

// Log detected versions
console.log("🔍 Detected root versions:");
console.log("React:", reactVersion);
console.log("ReactDOM:", reactDomVersion);
console.log("Storybook:", storybookVersion);
console.log("@types/react:", typesReactVersion);
console.log("@types/react-dom:", typesReactDomVersion);

// Warn if any version is missing
if (!reactVersion) console.warn("⚠️ React version not found");
if (!reactDomVersion) console.warn("⚠️ ReactDOM version not found");
if (!storybookVersion) console.warn("⚠️ Storybook version not found");
if (!typesReactVersion) console.warn("⚠️ @types/react version not found");
if (!typesReactDomVersion) console.warn("⚠️ @types/react-dom version not found");

// Define expected versions
const expectedReactVersion = "18.2.0";
const expectedStorybookVersion = "7.6.0";
const expectedTypesReactVersion = "18.2.0";
const expectedTypesReactDomVersion = "18.2.0";

// Compare actual versions to expected and warn if mismatched
if (reactVersion && reactVersion !== expectedReactVersion) {
  console.warn(`⚠️ React version is ${reactVersion}, expected ${expectedReactVersion}`);
}
if (reactDomVersion && reactDomVersion !== expectedReactVersion) {
  console.warn(`⚠️ ReactDOM version is ${reactDomVersion}, expected ${expectedReactVersion}`);
}
if (typesReactVersion && typesReactVersion !== expectedTypesReactVersion) {
  console.warn(`⚠️ @types/react version is ${typesReactVersion}, expected ${expectedTypesReactVersion}`);
}
if (typesReactDomVersion && typesReactDomVersion !== expectedTypesReactDomVersion) {
  console.warn(`⚠️ @types/react-dom version is ${typesReactDomVersion}, expected ${expectedTypesReactDomVersion}`);
}

// Check if @types/react references scheduler/tracing
try {
  // Resolve path to index.d.ts
  const reactTypesPath = path.resolve(__dirname, "../../node_modules/@types/react/index.d.ts");

  // Read file content
  const content = fs.readFileSync(reactTypesPath, "utf-8");

  // Warn if scheduler/tracing is referenced
  if (content.includes("scheduler/tracing")) {
    console.warn("⚠️ @types/react includes reference to 'scheduler/tracing'. Ensure @types/scheduler is installed.");
  }
} catch (err) {
  // Log error if file read fails
  console.error("❌ Failed to check @types/react for scheduler/tracing:", err);
}

// Define workspaces to check
const workspaces = [
  "todolist-ui-kit",
  "todolist-storybook",
  "todolist-fe-nextjs",
];

// Define Storybook-related packages to validate
const storybookPackages = [
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
  "@storybook/nextjs",
  "@storybook/react",
  "@storybook/testing-library",
  "@storybook/react-vite",
];

// Track if any mismatches are found
let hasMismatch = false;

// Loop through each workspace
for (const workspace of workspaces) {
  console.log(`\n📦 Checking workspace: ${workspace}`);

  // Get declared versions of key packages
  const react = getWorkspaceVersion(workspace, "react");
  const reactDom = getWorkspaceVersion(workspace, "react-dom");
  const typesReact = getWorkspaceVersion(workspace, "@types/react");
  const typesReactDom = getWorkspaceVersion(workspace, "@types/react-dom");

  // Compare versions and log errors if mismatched
  if (react && react !== expectedReactVersion) {
    console.error(`❌ ${workspace}: react is ${react}, expected ${expectedReactVersion}`);
    hasMismatch = true;
  }
  if (reactDom && reactDom !== expectedReactVersion) {
    console.error(`❌ ${workspace}: react-dom is ${reactDom}, expected ${expectedReactVersion}`);
    hasMismatch = true;
  }
  if (typesReact && typesReact !== expectedTypesReactVersion) {
    console.error(`❌ ${workspace}: @types/react is ${typesReact}, expected ${expectedTypesReactVersion}`);
    hasMismatch = true;
  }
  if (typesReactDom && typesReactDom !== expectedTypesReactDomVersion) {
    console.error(`❌ ${workspace}: @types/react-dom is ${typesReactDom}, expected ${expectedTypesReactDomVersion}`);
    hasMismatch = true;
  }

  // Resolve path to workspace's package.json
  const pkgPath = path.resolve(__dirname, `../${workspace}/package.json`);
  if (!fs.existsSync(pkgPath)) continue;

  // Read and parse package.json
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  // Merge dependencies and devDependencies
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  // Check Storybook package versions
  for (const name of storybookPackages) {
    const version = allDeps[name];
    if (version && version !== expectedStorybookVersion) {
      console.error(`❌ ${workspace}: ${name} is ${version}, expected ${expectedStorybookVersion}`);
      hasMismatch = true;
    }
  }
}

// Exit with error code if mismatches were found
if (hasMismatch) {
  process.exit(1);
} else {
  // Otherwise confirm success
  console.log("✅ All packages are correctly pinned.");
}
