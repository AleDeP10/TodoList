// 📦 Static file copier for build
import { copy } from "fs-extra";

async function main() {
  console.log("📦 Copying static files...");

  await copy("index.html", "dist/index.html");
  await copy("app.js", "dist/app.js");
  await copy("config.json", "dist/config.json");

  await copy("lib", "dist/lib");

  await copy("assets", "dist/assets");

  await copy("controllers", "dist/controllers");
  await copy("directives", "dist/directives");
  await copy("filters", "dist/filters");
  await copy("services", "dist/services");
  await copy("store", "dist/store");
  await copy("utils", "dist/utils");

  console.log("✅ Static files copied.");
}

main().catch((err) => {
  console.error("❌ Error copying static files:", err);
  process.exit(1);
});
