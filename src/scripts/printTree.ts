/**
 * printTree.ts
 *
 * 📁 Project Structure Diagnostic Tool
 *
 * This standalone script provides a visual representation of a project's folder tree,
 * helping developers inspect and share directory structures without relying on external tools or dependencies.
 * It is especially useful for debugging `.gitignore` configurations, auditing file organization,
 * and preparing documentation or commit notes.
 *
 * 🚫 No Yarn or package manager required — runs directly with Node.js.
 *
 * 🔧 How it works:
 * - Recursively traverses the specified directory
 * - Prints a tree-like structure to the console
 * - Skips common build artifacts and irrelevant files (e.g., node_modules, .git, .map, .log)
 * - Customizable ignore lists for folders and file extensions
 * - Displays final statistics: total files and folders processed
 * - Optional depth control for limiting recursion
 *
 * 🛠 Usage:
 * ```bash
 * node printTree.js <path> [depth]
 * ```
 * Example:
 * ```bash
 * node printTree.js ../../todolist-ui-kit 1
 * ```
 */

import fs from "fs"; // Node.js file system module for reading directories and file metadata
import path from "path"; // Node.js path utilities for resolving and joining paths
import { fileURLToPath } from "url"; // Converts module URL to file path (for ES modules)

// Get the absolute path of the current script file
const __filename = fileURLToPath(import.meta.url);

// Get the directory containing the current script
const __dirname = path.dirname(__filename);

// List of folder names to ignore during traversal
const ignore = [
  "node_modules",
  ".git",
  "storybook-static",
  "dist",
  ".next",
  "logs",
  "out",
  "Release",
  "obj",
  "bin",
  ".vs",
  "temp",
];

// List of file extensions to ignore (typically build artifacts or logs)
const ignoreExtensions = [".log", ".map"];

// Counters for statistics
let fileCount = 0;
let folderCount = 0;

/**
 * Recursively prints the folder tree structure and updates file/folder counters.
 * @param dirPath - The directory path to start from
 * @param indent - The indentation string for visual hierarchy
 * @param currentDepth - Current recursion depth
 * @param maxDepth - Optional maximum depth to print
 */
function printTree(
  dirPath: string,
  indent = "",
  currentDepth = 1,
  maxDepth?: number
) {
  // Read all items (files and folders) in the current directory
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    // Construct the full path to the current item
    const fullPath = path.join(dirPath, item);

    // Determine whether the item is a directory
    const isDir = fs.statSync(fullPath).isDirectory();

    // Extract the file extension (if any)
    const ext = path.extname(item);

    // Normalize path separators for consistent filtering
    const normalizedPath = fullPath.replace(/\\/g, "/");

    // Skip items based on folder name, file extension, or specific path pattern
    if (
      ignore.includes(item) || // Skip if the folder name is in the ignore list
      (!isDir && ignoreExtensions.includes(ext)) || // Skip if it's a file with an ignored extension
      normalizedPath.includes("src/lib") // Skip if the path contains 'src/lib'
    ) {
      continue; // Skip this item and move to the next
    }

    // Print the item with tree-style formatting
    console.log(indent + (isDir ? "├── " : "└── ") + item);

    // Update counters
    if (isDir) {
      folderCount++;
    } else {
      fileCount++;
    }

    // If it's a directory and depth limit is not reached, recurse
    if (isDir && (!maxDepth || currentDepth < maxDepth)) {
      printTree(fullPath, indent + "│   ", currentDepth + 1, maxDepth);
    }
  }
}

// Get the input path from command-line arguments
const inputPath = process.argv[2];

// Get optional depth argument (as number)
const depthArg = process.argv[3];
const maxDepth = depthArg ? parseInt(depthArg) : undefined;

// If no path is provided, show an error and exit
if (!inputPath) {
  console.error("❌ Please specify a path as argument");
  process.exit(1);
}

// Resolve the input path relative to the current script and start printing
const resolvedPath = path.resolve(__dirname, inputPath);
printTree(resolvedPath, "", 1, maxDepth);

// Print final statistics
console.log("\n📊 Tree Summary");
console.log(`📁 Folders: ${folderCount}`);
console.log(`📄 Files: ${fileCount}`);
