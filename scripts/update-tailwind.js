#!/usr/bin/env node

/**
 * Tailwind CSS Configuration Update Script
 * 
 * This script ensures the Tailwind CSS configuration is properly set up
 * for the Shadcn UI components used in the project.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ANSI color codes for prettier output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}=== Tailwind CSS Configuration Update ====${colors.reset}\n`);

// Path to tailwind.config.js
const tailwindConfigPath = path.resolve(rootDir, 'tailwind.config.js');

// Ensure @tailwindcss/typography is installed
try {
  console.log(`${colors.cyan}Checking for required Tailwind plugins...${colors.reset}`);
  
  // Check if @tailwindcss/typography is installed
  try {
    require.resolve('@tailwindcss/typography', { paths: [rootDir] });
    console.log(`${colors.green}✅ @tailwindcss/typography is installed.${colors.reset}`);
  } catch (e) {
    console.log(`${colors.yellow}⚠️ @tailwindcss/typography not found. Installing...${colors.reset}`);
    execSync('npm install -D @tailwindcss/typography', { cwd: rootDir, stdio: 'inherit' });
  }
  
  // Check for tailwindcss-animate
  try {
    require.resolve('tailwindcss-animate', { paths: [rootDir] });
    console.log(`${colors.green}✅ tailwindcss-animate is installed.${colors.reset}`);
  } catch (e) {
    console.log(`${colors.yellow}⚠️ tailwindcss-animate not found. Installing...${colors.reset}`);
    execSync('npm install -D tailwindcss-animate', { cwd: rootDir, stdio: 'inherit' });
  }
} catch (error) {
  console.log(`${colors.red}❌ Error checking Tailwind plugins: ${error.message}${colors.reset}`);
}

// Check tailwind.config.js and update if needed
console.log(`\n${colors.cyan}Checking tailwind.config.js...${colors.reset}`);

if (!fs.existsSync(tailwindConfigPath)) {
  console.log(`${colors.red}❌ tailwind.config.js not found!${colors.reset}`);
  console.log(`Creating a new tailwind.config.js file...`);
  
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./apps/web/src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};`;
  
  fs.writeFileSync(tailwindConfigPath, tailwindConfig, 'utf8');
  console.log(`${colors.green}✅ Created new tailwind.config.js file.${colors.reset}`);
} else {
  // Read existing tailwind.config.js
  const existingConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
  
  // Check if the config needs to be updated
  if (!existingConfig.includes('border: "hsl(var(--border))"')) {
    console.log(`${colors.yellow}⚠️ tailwind.config.js is missing theme configuration for Shadcn UI.${colors.reset}`);
    console.log(`Updating tailwind.config.js...`);
    
    const updatedConfig = `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./apps/web/src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};`;
    
    fs.writeFileSync(tailwindConfigPath, updatedConfig, 'utf8');
    console.log(`${colors.green}✅ Updated tailwind.config.js with proper theme configuration.${colors.reset}`);
  } else {
    console.log(`${colors.green}✅ tailwind.config.js already has proper theme configuration.${colors.reset}`);
  }
}

// Check package.json scripts for tailwind-related scripts
console.log(`\n${colors.cyan}Checking package.json for Tailwind scripts...${colors.reset}`);

const packageJsonPath = path.resolve(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check if build:css script exists
  if (!packageJson.scripts['build:css']) {
    console.log(`${colors.yellow}⚠️ Adding build:css script to package.json...${colors.reset}`);
    
    packageJson.scripts['build:css'] = 'tailwindcss -i ./apps/web/src/app/globals.css -o ./public/styles.css';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    
    console.log(`${colors.green}✅ Added build:css script to package.json.${colors.reset}`);
  } else {
    console.log(`${colors.green}✅ build:css script already exists in package.json.${colors.reset}`);
  }
} else {
  console.log(`${colors.red}❌ package.json not found!${colors.reset}`);
}

console.log(`\n${colors.bold}${colors.blue}=== Tailwind CSS Configuration Update Complete ====${colors.reset}`);
console.log(`\n${colors.magenta}Next steps:${colors.reset}`);
console.log(`1. Run ${colors.cyan}npm run dev${colors.reset} to start the development server`);
console.log(`2. If you encounter any CSS issues, run ${colors.cyan}node scripts/update-tailwind.js${colors.reset} again`);
console.log(`3. For a production build with optimized CSS, run ${colors.cyan}npm run build:css${colors.reset} before ${colors.cyan}npm run build${colors.reset}`); 