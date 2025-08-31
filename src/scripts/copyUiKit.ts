/**
 * copyUiKit.ts — Sync selected folders and styles
 * from `todolist-ui-kit/src` into:
 *   - `todolist-storybook`
 *   - `todolist-fe-nextjs`
 *
 * This script performs two separate copy operations:
 * one for Storybook, one for the frontend.
 * It copies top-level folders into `src/lib/`
 * and styles into `public/styles/`.
 *
 * Usage:
 *   yarn run copy-ui-kit
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
  const publicDestination = resolve("./todolist-storybook/public/styles");

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
  await cp(
    resolve(sourceBase, "styles/globals.css"),
    resolve(publicDestination, "globals.css")
  );

  // Copy themes
  await cp(
    resolve(sourceBase, "styles/themes"),
    resolve(publicDestination, "themes"),
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
  const publicDestination = resolve("./todolist-fe-nextjs/public/styles");

  // Copy lib folders
  for (const item of toLib) {
    await cp(resolve(sourceBase, item), resolve(libDestination, item), {
      recursive: true,
    });
  }

  // Copy global styles
  await cp(
    resolve(sourceBase, "styles/globals-base.css"),
    resolve(publicDestination, "globals-base.css")
  );
  await cp(
    resolve(sourceBase, "styles/globals.css"),
    resolve(publicDestination, "globals.css")
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
