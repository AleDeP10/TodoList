/**
 * generateShims.ts
 *
 * 🎯 Purpose: This script generates Yarn shims for both Windows (.bat) and Unix (.sh) environments,
 * using a local Yarn v1 setup (specifically version 1.22.19). It ensures consistent execution
 * across platforms and logs usage for traceability.
 *
 * 📁 Output locations:
 * - src/scripts/shims
 * - dist/scripts/shims
 *
 * 🧩 What it does:
 * - Writes `yarn.bat` and `yarn.sh` with logic to intercept unsupported commands and redirect them
 * - Creates a logs folder if missing and appends usage logs
 * - Copies the `yarn-1.22.19.cjs` file from source to distribution
 *
 * ⚠️ Notes:
 * - If the source file `yarn-1.22.19.cjs` is missing, a warning is printed and copy is skipped
 * - The shim intercepts `yarn npm info` and redirects to `npm info`, silencing noisy queries like Storybook version checks
 *
 * 🛠️ Requirements:
 * - Node.js and Yarn v1 installed locally
 * - Project structure must match the relative paths used in this script
 *
 * ✍️ Auto-generated to ensure reproducibility and simplify Yarn execution in CI/CD and local environments
 */

import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from "url";

// Resolve current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const yarnBat = `@echo off
setlocal

:: [YARN SHIM] Entrypoint for executing Yarn using a local Node.js setup
set projectRoot=%~dp0\\..\\..\\..\\

:: Create logs folder if missing
if not exist "%projectRoot%\\logs" (
    mkdir "%projectRoot%\\logs"
)

:: Log usage
echo [YARN SHIM] Using local Yarn: %~dp0yarn-1.22.19.cjs
echo [YARN SHIM] Args: %*
echo [%DATE% %TIME%] yarn %* >> "%projectRoot%\\logs\\yarn-shim.log"

:: Intercept unsupported Yarn v1 command: yarn npm info ...
if "%1"=="npm" (
    if "%2"=="info" (
        shift
        shift
        set args=%*

        :: Silence known noisy queries
        if "%args%"=="storybook --fields version --json" (
            echo {}
            exit /b 0
        )

        :: Redirect to npm info
        echo [YARN SHIM] Redirecting to npm info npm info %args%
        npm info %args%
        exit /b 0
    )
)

:: Execute via node
node "%~dp0yarn-1.22.19.cjs" %*

:: Propagate exit code
exit /b %ERRORLEVEL%
`;

const yarnSh = `#!/bin/bash
set -e

# [YARN SHIM] Entrypoint for executing Yarn using a local Node.js setup
projectRoot="$(dirname "$0")/../../../"

mkdir -p "$projectRoot/logs"

echo "[YARN SHIM] Using local Yarn: $(dirname "$0")/yarn-1.22.19.cjs"
echo "[YARN SHIM] Args: $@" >> "$projectRoot/logs/yarn-shim.log"

if [[ "$1" == "npm" && "$2" == "info" ]]; then
  shift 2
  args="$@"

  if [[ "$args" == "storybook --fields version --json" ]]; then
    echo "{}"
    exit 0
  fi

  echo "[YARN SHIM] Redirecting to npm info npm info $args"
  npm info $args
  exit $?
fi

node "$(dirname "$0")/yarn-1.22.19.cjs" "$@"
`;

// Store the shims in both src and dist
const targets = [
  join(__dirname, '../../src/scripts/shims'),
  join(__dirname, '../../dist/scripts/shims')
];

for (const target of targets) {
  if (!existsSync(target)) mkdirSync(target, { recursive: true });

  writeFileSync(join(target, 'yarn.bat'), yarnBat, 'utf8');
  writeFileSync(join(target, 'yarn.sh'), yarnSh, 'utf8');
  console.log(`[generateShims] Generated yarn.bat and yarn.sh in ${target}`);
}

// Copy yarn-1.22.19.cjs from src to dist
const srcCjs = join(__dirname, '../../src/scripts/shims/yarn-1.22.19.cjs');
const distCjs = join(__dirname, '../../dist/scripts/shims/yarn-1.22.19.cjs');

if (existsSync(srcCjs)) {
  copyFileSync(srcCjs, distCjs);
  console.log('[generateShims] Copied yarn-1.22.19.cjs to dist/scripts/shims');
} else {
  console.warn('[generateShims] Source yarn-1.22.19.cjs not found. Skipping copy.');
}