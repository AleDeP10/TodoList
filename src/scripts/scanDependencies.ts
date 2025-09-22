import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiKitPath = path.resolve(__dirname, "../../todolist-ui-kit/package.json");
const storybookPath = path.resolve(__dirname, "../../todolist-storybook/package.json");

const uiDeps = JSON.parse(readFileSync(uiKitPath, "utf-8")).dependencies;
const storybookDeps = JSON.parse(readFileSync(storybookPath, "utf-8")).dependencies;

const missing = Object.keys(uiDeps).filter(dep => !(dep in storybookDeps));

console.log("📦 Moduli usati da todolist-ui-kit ma non presenti in todolist-storybook:");
missing.forEach(dep => console.log(`- ${dep}`));
