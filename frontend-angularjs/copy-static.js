// 📦 Static file copier for build
const fs = require("fs-extra");

async function main() {
  console.log("📦 Copying static files...");

  await fs.copy("index.html", "dist/index.html");
  await fs.copy("app.js", "dist/app.js");
  await fs.copy("config.json", "dist/config.json");

  await fs.copy("lib", "dist/lib");

  await fs.copy("assets", "dist/assets");

  await fs.copy("controllers", "dist/controllers");
  await fs.copy("directives", "dist/directives");
  await fs.copy("filters", "dist/filters");
  await fs.copy("services", "dist/services");
  await fs.copy("store", "dist/store");
  await fs.copy("utils", "dist/utils");

  console.log("✅ Static files copied.");
}

main().catch((err) => {
  console.error("❌ Error copying static files:", err);
  process.exit(1);
});
