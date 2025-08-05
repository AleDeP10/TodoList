import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// ✅ Conversione __dirname per ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "src");
function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      checkFileForUseClient(fullPath);
    }
  }
}
function checkFileForUseClient(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const firstNonEmptyLine = content.split("\n").find((line) => line.trim().length > 0);
  if (firstNonEmptyLine?.includes('"use client"') || firstNonEmptyLine?.includes("'use client'")) {
    console.log(`📍 ${filePath}`);
  }
}
scanDirectory(ROOT_DIR);
