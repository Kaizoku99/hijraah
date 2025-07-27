/**
 * This script fixes import paths in the codebase by replacing references to old paths
 * @/components/ui/* with references to the new structure @/shared/ui/*
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SHARED_DIR = path.resolve(path.join(__dirname, ".."), "src/_shared");

// Map of component types to their directories
const COMPONENT_TYPES = {
  progress: "atoms",
  tabs: "components/ui",
  avatar: "atoms",
  button: "atoms",
  card: "atoms",
  checkbox: "atoms",
  input: "atoms",
  label: "atoms",
  separator: "atoms",
  textarea: "atoms",
  switch: "atoms",
  badge: "atoms",
  select: "atoms",
  toast: "ui",
  dialog: "ui",
  "dropdown-menu": "ui",
  form: "ui",
  popover: "ui",
  "scroll-area": "ui",
  "radio-group": "ui",
  sheet: "ui",
  table: "ui",
  breadcrumb: "ui",
  sidebar: "ui",
  "theme-toggle": "ui",
  "language-switcher": "ui",
};

// Helper function to find all .tsx files recursively
function findFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      results = results.concat(findFilesRecursively(filePath));
    } else if (path.extname(filePath) === ".tsx") {
      // Add .tsx files
      results.push(filePath);
    }
  }

  return results;
}

// Helper function to check if a file contains the pattern
function fileContainsPattern(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return content.includes(pattern);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return false;
  }
}

// Find all files with a specific pattern
function findFiles(dir, pattern) {
  try {
    // Get all .tsx files
    const allFiles = findFilesRecursively(dir);

    // Filter files containing the pattern
    return allFiles.filter((file) => fileContainsPattern(file, pattern));
  } catch (error) {
    console.error(`Error finding files: ${error.message}`);
    return [];
  }
}

function updateFile(filePath) {
  console.log(`Processing ${filePath}...`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    let newContent = content;

    // Look for import statements from @/components/ui
    const regex = /from ['"]@\/components\/ui\/([^'"]+)['"]/g;
    let match;
    let updated = false;

    // Create a new string with replacements
    while ((match = regex.exec(content)) !== null) {
      const componentName = match[1]; // progress, button, etc.

      // Determine the right component type (atoms, ui, etc.)
      const componentType = COMPONENT_TYPES[componentName] || "ui";

      // Create the replacement string
      const oldImport = `from '@/components/ui/${componentName}'`;
      const newImport = `from '@/shared/${componentType === "components/ui" ? componentType : "ui/" + componentType}/${componentName}'`;

      // Replace the import
      newContent = newContent.replace(oldImport, newImport);

      // Also replace double-quoted version if it exists
      const oldImportDoubleQuotes = `from "@/components/ui/${componentName}"`;
      const newImportDoubleQuotes = `from "@/shared/${componentType === "components/ui" ? componentType : "ui/" + componentType}/${componentName}"`;
      newContent = newContent.replace(
        oldImportDoubleQuotes,
        newImportDoubleQuotes,
      );

      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ Updated ${filePath}`);
      return true;
    }

    console.log(`⚠️ No patterns matched in ${filePath}`);
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log("🔍 Finding files with old import paths...");

  // Find all files with the old pattern
  const pattern = "@/components/ui/";
  const files = findFiles(SHARED_DIR, pattern);

  console.log(`Found ${files.length} files to update.`);

  // Update each file
  let updatedCount = 0;

  for (const file of files) {
    if (updateFile(file)) {
      updatedCount++;
    }
  }

  console.log(
    `\n✨ Done! Updated ${updatedCount} out of ${files.length} files.`,
  );
}

main();
