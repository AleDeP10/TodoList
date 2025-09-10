/**
 * copyUiKit.ts
 *
 * 🔄 UI Kit Synchronization Script
 *
 * Copies shared components, hooks, styles, and utilities from `todolist-ui-kit/src`
 * into the `todolist-storybook` and `todolist-fe-nextjs` workspaces.
 *
 * ✅ Ensures visual and functional consistency across frontend and Storybook
 * ✅ Automatically invoked during `yarn run setup`
 * ❌ Does not verify shim or dependencies — assumes setup has already run
 *
 * Operations:
 * - Copies folders: assets, components, hooks, providers, types, utils, index.ts → `src/lib/`
 * - Copies styles: globals-base.css, globals.css → `src/lib/styles/` and `public/styles/`
 * - Copies themes: `styles/themes/` → `public/styles/themes/`
 *
 * Usage:
 *   yarn run copy-ui-kit
 *
 * Note: it is mandatory to run this script after every update affecting todolist-ui-kit
 */

import { cp } from "fs/promises";
import { resolve } from "path";

// Folders to copy into src/lib/
const toLib = [
  "assets",
  "components",
  "hooks",
  "providers",
  "types",
  "utils",
  "index.ts",
];

// Source base directory (UI Kit)
const sourceBase = resolve("./todolist-ui-kit/src");

// === COPY TO todolist-storybook ===
try {
  const libDestination = resolve("./todolist-storybook/src/lib");
  const publicDestination = resolve("./todolist-storybook/public");

  // Copy lib folders
  for (const item of toLib) {
    await cp(resolve(sourceBase, item), resolve(libDestination, item), {
      recursive: true,
    });
  }

  // Copy global styles
  await cp(
    resolve(sourceBase, "styles/globals-base.css"),
    resolve(libDestination, "styles/globals-base.css")
  );

  // Copy themes
  await cp(
    resolve(sourceBase, "styles/themes"),
    resolve(publicDestination, "styles/themes"),
    { recursive: true }
  );

  console.log("✅ UI Kit copied successfully to todolist-storybook");
} catch (err) {
  console.error("❌ Error while copying UI Kit to todolist-storybook:", err);
  process.exit(1);
}

// === COPY TO todolist-fe-nextjs ===
try {
  const libDestination = resolve("./todolist-fe-nextjs/src/lib");
  const stylesLib = resolve(libDestination, "styles");
  const publicDestination = resolve("./todolist-fe-nextjs/public/styles");

  // Copy lib folders
  for (const item of toLib) {
    await cp(resolve(sourceBase, item), resolve(libDestination, item), {
      recursive: true,
    });
  }

  // Ensure styles folder exists
  await cp(
    resolve(sourceBase, "styles/globals-base.css"),
    resolve(stylesLib, "globals-base.css")
  );
  await cp(
    resolve(sourceBase, "styles/globals.css"),
    resolve(stylesLib, "globals.css")
  );

  // Optional: also copy to public if needed for CDN or legacy
  await cp(
    resolve(sourceBase, "styles/globals.css"),
    resolve(publicDestination, "globals.css")
  );
  await cp(
    resolve(sourceBase, "styles/globals-base.css"),
    resolve(publicDestination, "globals-base.css")
  );

  // Copy themes
  await cp(
    resolve(sourceBase, "styles/themes"),
    resolve(publicDestination, "themes"),
    { recursive: true }
  );

  console.log("✅ UI Kit copied successfully to todolist-fe-nextjs");
} catch (err) {
  console.error("❌ Error while copying UI Kit to todolist-fe-nextjs:", err);
  process.exit(1);
}
