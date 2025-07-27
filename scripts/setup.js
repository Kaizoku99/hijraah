#!/usr/bin/env node

/**
 * Hijraah Project Setup Script
 *
 * This script:
 * 1. Makes all helper scripts executable
 * 2. Updates Tailwind CSS configuration
 * 3. Checks Supabase configuration
 * 4. Sets up development environment
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// ANSI color codes for prettier output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  bold: "\x1b[1m",
};

console.log(
  `${colors.bold}${colors.blue}=== Hijraah Project Setup ====${colors.reset}\n`,
);

// Helper function to make script executable
function makeExecutable(scriptPath) {
  try {
    // Check if file exists
    if (!fs.existsSync(scriptPath)) {
      console.log(
        `${colors.yellow}⚠️ Script ${scriptPath} not found, skipping${colors.reset}`,
      );
      return false;
    }

    // Make executable (chmod +x)
    if (process.platform !== "win32") {
      fs.chmodSync(scriptPath, "755");
      console.log(
        `${colors.green}✅ Made ${scriptPath} executable${colors.reset}`,
      );
    } else {
      console.log(
        `${colors.yellow}⚠️ Skipping chmod on Windows for ${scriptPath}${colors.reset}`,
      );
    }

    return true;
  } catch (error) {
    console.log(
      `${colors.red}❌ Error making ${scriptPath} executable: ${error.message}${colors.reset}`,
    );
    return false;
  }
}

// 1. Make all scripts executable
console.log(`${colors.cyan}Making helper scripts executable...${colors.reset}`);

const scriptsToProcess = [
  path.resolve(__dirname, "check-supabase-config.js"),
  path.resolve(__dirname, "setup-dev.js"),
  path.resolve(__dirname, "update-tailwind.js"),
];

let executableScriptsCount = 0;
for (const scriptPath of scriptsToProcess) {
  if (makeExecutable(scriptPath)) {
    executableScriptsCount++;
  }
}

console.log(
  `${colors.green}✅ Made ${executableScriptsCount} scripts executable${colors.reset}`,
);

// 2. Update Tailwind CSS configuration
console.log(
  `\n${colors.cyan}Updating Tailwind CSS configuration...${colors.reset}`,
);

try {
  console.log("Running update-tailwind.js...");
  execSync("node " + path.resolve(__dirname, "update-tailwind.js"), {
    stdio: "inherit",
    cwd: rootDir,
  });
} catch (error) {
  console.log(
    `${colors.red}❌ Error updating Tailwind configuration: ${error.message}${colors.reset}`,
  );
}

// 3. Check Supabase configuration
console.log(
  `\n${colors.cyan}Checking Supabase configuration...${colors.reset}`,
);

try {
  console.log("Running check-supabase-config.js...");
  execSync("node " + path.resolve(__dirname, "check-supabase-config.js"), {
    stdio: "inherit",
    cwd: rootDir,
  });
} catch (error) {
  console.log(
    `${colors.red}❌ Error checking Supabase configuration: ${error.message}${colors.reset}`,
  );
}

// 4. Set up development environment
console.log(
  `\n${colors.cyan}Setting up development environment...${colors.reset}`,
);

try {
  console.log("Running setup-dev.js...");
  execSync("node " + path.resolve(__dirname, "setup-dev.js"), {
    stdio: "inherit",
    cwd: rootDir,
  });
} catch (error) {
  console.log(
    `${colors.red}❌ Error setting up development environment: ${error.message}${colors.reset}`,
  );
}

console.log(
  `\n${colors.bold}${colors.blue}=== Setup Complete ====${colors.reset}`,
);
console.log(`\n${colors.magenta}Next steps:${colors.reset}`);
console.log(
  `1. Run ${colors.cyan}npm run dev${colors.reset} to start the development server`,
);
console.log(
  `2. Visit ${colors.cyan}http://localhost:3000${colors.reset} to see your application`,
);
console.log(
  `3. If you encounter issues, run ${colors.cyan}node scripts/setup.js${colors.reset} again\n`,
);
