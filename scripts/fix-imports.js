/**
 * This script fixes import paths in the codebase by replacing references to old paths
 * @/presentation/components/* with references to the new structure @/shared/ui/*
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
  atoms: "atoms",
  molecules: "molecules",
  organisms: "organisms",
  templates: "templates",
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

    // Determine the type of file and component
    const fileName = path.basename(filePath, ".tsx");
    const dirName = path.dirname(filePath);
    const relativePath = path.relative(SHARED_DIR, dirName);
    const parts = relativePath.split(path.sep);

    let newContent = content;

    // Look for export statements from old paths
    const regex =
      /export \* from "@\/presentation\/components\/ui\/([^\/]+)\/([^"]+)";/;
    const match = content.match(regex);

    if (match) {
      const componentType = match[1]; // atoms, molecules, etc.
      const componentName = match[2]; // input, button, etc.

      // Determine the new path based on location of the file
      if (dirName.includes("ui/atoms") || dirName.includes("ui\\atoms")) {
        // If we're in atoms folder, reference the local folder
        newContent = content.replace(
          regex,
          `export * from "./${componentName}/index";`,
        );
      } else if (
        dirName.includes("ui/ui") ||
        dirName.includes("ui\\ui") ||
        dirName.includes("components/ui") ||
        dirName.includes("components\\ui")
      ) {
        // If in the ui folder, reference the atoms folder
        newContent = content.replace(
          regex,
          `export * from "@/shared/ui/${componentType}/${componentName}/index";`,
        );
      } else if (
        (dirName.includes("ui/molecules") ||
          dirName.includes("ui\\molecules")) &&
        componentType === "molecules"
      ) {
        newContent = content.replace(
          regex,
          `export * from "./${componentName}/index";`,
        );
      } else if (
        (dirName.includes("ui/organisms") ||
          dirName.includes("ui\\organisms")) &&
        componentType === "organisms"
      ) {
        newContent = content.replace(
          regex,
          `export * from "./${componentName}/index";`,
        );
      } else if (
        (dirName.includes("ui/templates") ||
          dirName.includes("ui\\templates")) &&
        componentType === "templates"
      ) {
        newContent = content.replace(
          regex,
          `export * from "./${componentName}/index";`,
        );
      } else {
        // In all other cases, use the full path
        newContent = content.replace(
          regex,
          `export * from "@/shared/ui/${componentType}/${componentName}/index";`,
        );
      }

      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log(`✅ Updated ${filePath}`);
        return true;
      }
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
  const pattern = "@/presentation/components";
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
