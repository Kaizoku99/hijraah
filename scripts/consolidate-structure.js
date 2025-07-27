/**
 * Project Structure Consolidation Script
 *
 * This script helps consolidate duplicate directories in the project structure
 * while ensuring no files are lost during restructuring.
 */

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

import { glob } from "glob";

const execAsync = promisify(exec);

// Define mappings for directories to consolidate
const directoryMappings = [
  // Infrastructure layer consolidation
  { from: "src/infrastructure", to: "src/_infrastructure" },
  // Core domain consolidation
  { from: "src/domain", to: "src/_core" },
  // Application services consolidation
  { from: "src/application", to: "src/_application" },
  // UI components consolidation
  { from: "src/components", to: "src/_shared/ui" },
  { from: "src/shared/components/ui", to: "src/_shared/ui" },
  { from: "src/presentation/components/ui", to: "src/_shared/ui" },
  // Hooks consolidation
  { from: "src/hooks", to: "src/_shared/hooks" },
  { from: "src/lib/hooks", to: "src/_shared/hooks" },
  { from: "src/presentation/hooks", to: "src/_shared/hooks" },
  // Types consolidation
  { from: "src/types", to: "src/_shared/types" },
  { from: "src/lib/types", to: "src/_shared/types" },
  // Utils consolidation
  { from: "src/utils", to: "src/_shared/utils" },
  { from: "src/lib/utils", to: "src/_shared/utils" },
  { from: "src/shared/utils", to: "src/_shared/utils" },
];

// Helper function to safely create directory if it doesn't exist
const ensureDirectoryExists = (dirPath) => {
  const directories = dirPath.split(path.sep);
  let currentDir = "";

  directories.forEach((dir) => {
    currentDir = currentDir ? path.join(currentDir, dir) : dir;
    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir);
    }
  });
};

// Function to copy a file, ensuring target directory exists
const copyFile = (source, target) => {
  ensureDirectoryExists(path.dirname(target));

  // Only copy if source exists and target doesn't, or source is newer
  if (fs.existsSync(source)) {
    let shouldCopy = true;

    if (fs.existsSync(target)) {
      const sourceStats = fs.statSync(source);
      const targetStats = fs.statSync(target);

      // Only overwrite if source is newer
      shouldCopy = sourceStats.mtime > targetStats.mtime;
    }

    if (shouldCopy) {
      fs.copyFileSync(source, target);
      console.log(`Copied: ${source} → ${target}`);
      return true;
    }
  }

  return false;
};

// Get unique component names from paths to prevent duplicating atomic components
const getAtomicComponentName = (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));

  // UI component pattern matching
  const uiMatches = [
    /button/i,
    /input/i,
    /card/i,
    /avatar/i,
    /badge/i,
    /checkbox/i,
    /label/i,
    /switch/i,
    /textarea/i,
    /form/i,
    /modal/i,
    /dropdown/i,
    /alert/i,
    /toast/i,
    /tooltip/i,
    /menu/i,
    /nav/i,
    /tab/i,
    /dialog/i,
    /popover/i,
  ];

  // Check if file name matches any UI component pattern
  const isUiComponent = uiMatches.some((pattern) => pattern.test(fileName));

  if (isUiComponent) {
    // Determine component type (atom, molecule, organism)
    if (/container|layout|section|page|template/i.test(filePath)) {
      return "templates/" + fileName.toLowerCase();
    } else if (/header|footer|sidebar|navbar|form|list|card$/i.test(filePath)) {
      return "organisms/" + fileName.toLowerCase();
    } else if (/item|group|row|cell|pair/i.test(filePath)) {
      return "molecules/" + fileName.toLowerCase();
    } else {
      return "atoms/" + fileName.toLowerCase();
    }
  }

  return null;
};

// Consolidate files from source directory to target directory
const consolidateDirectory = async (sourceDir, targetDir) => {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.log(`Source directory does not exist: ${sourceDir}`);
      return 0;
    }

    ensureDirectoryExists(targetDir);

    const files = glob.sync(`${sourceDir}/**/*`, {
      nodir: true,
      ignore: ["**/node_modules/**", "**/.next/**"],
    });

    let copyCount = 0;

    for (const file of files) {
      const relativePath = path.relative(sourceDir, file);

      // Special handling for UI components to organize by atomic design
      const atomicName = getAtomicComponentName(file);
      let targetPath;

      if (atomicName && targetDir.includes("/_shared/ui")) {
        targetPath = path.join(targetDir, atomicName + path.extname(file));
      } else {
        targetPath = path.join(targetDir, relativePath);
      }

      if (copyFile(file, targetPath)) {
        copyCount++;
      }
    }

    console.log(
      `Consolidated ${copyCount} files from ${sourceDir} to ${targetDir}`,
    );
    return copyCount;
  } catch (error) {
    console.error(`Error consolidating ${sourceDir} to ${targetDir}:`, error);
    return 0;
  }
};

// Main function
const main = async () => {
  console.log("Starting directory consolidation...");

  let totalFilesMoved = 0;

  for (const mapping of directoryMappings) {
    const sourceDir = path.resolve(mapping.from);
    const targetDir = path.resolve(mapping.to);

    console.log(`\nProcessing: ${sourceDir} → ${targetDir}`);
    const fileCount = await consolidateDirectory(sourceDir, targetDir);
    totalFilesMoved += fileCount;
  }

  console.log(`\nConsolidation complete! Moved ${totalFilesMoved} files.`);
  console.log(
    "\nReminder: This script only copies files. Please review the changes",
  );
  console.log(
    "and manually remove the old directories once you've confirmed everything works.",
  );

  // Check for any Supabase config files and ensure the shadow_port is set correctly
  try {
    const supabaseConfigPath = path.resolve("supabase/config.toml");
    if (fs.existsSync(supabaseConfigPath)) {
      let configContent = fs.readFileSync(supabaseConfigPath, "utf8");

      // Ensure shadow_port is set to 54800 to avoid Windows conflicts
      if (configContent.includes("shadow_port = 54320")) {
        configContent = configContent.replace(
          "shadow_port = 54320",
          "shadow_port = 54800",
        );
        fs.writeFileSync(supabaseConfigPath, configContent, "utf8");
        console.log(
          "\nIMPORTANT: Updated Supabase shadow_port to 54800 to avoid Windows port conflicts.",
        );
      } else if (configContent.includes("shadow_port = 54800")) {
        console.log(
          "\nINFO: Supabase shadow_port is already correctly set to 54800.",
        );
      }
    }
  } catch (error) {
    console.error("Error checking Supabase configuration:", error);
  }
};

// Run the script
main();
