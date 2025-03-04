#!/usr/bin/env node

/**
 * Development Setup Script for Hijraah Project
 * 
 * This script:
 * 1. Validates environment variables
 * 2. Checks Supabase connection
 * 3. Verifies package dependencies
 * 4. Provides guidance for development
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(rootDir, '.env.local') });

console.log(`${colors.bold}${colors.blue}=== Hijraah Development Setup ====${colors.reset}\n`);

// 1. Validate environment variables
console.log(`${colors.cyan}Checking environment variables...${colors.reset}`);

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const optionalEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN'
];

const missingRequiredVars = [];
const missingOptionalVars = [];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingRequiredVars.push(envVar);
  }
}

for (const envVar of optionalEnvVars) {
  if (!process.env[envVar]) {
    missingOptionalVars.push(envVar);
  }
}

if (missingRequiredVars.length > 0) {
  console.log(`${colors.red}❌ Missing required environment variables:${colors.reset}`);
  missingRequiredVars.forEach(envVar => console.log(`   - ${envVar}`));
  console.log(`\nPlease add these to your .env.local file before continuing.`);
} else {
  console.log(`${colors.green}✅ All required environment variables are set.${colors.reset}`);
  
  if (missingOptionalVars.length > 0) {
    console.log(`${colors.yellow}⚠️ Missing optional environment variables:${colors.reset}`);
    missingOptionalVars.forEach(envVar => console.log(`   - ${envVar}`));
    console.log(`\nThese are not required but may be needed for some features.`);
  } else {
    console.log(`${colors.green}✅ All optional environment variables are set.${colors.reset}`);
  }
}

// 2. Check Supabase connection
if (!missingRequiredVars.length) {
  console.log(`\n${colors.cyan}Testing Supabase connection...${colors.reset}`);
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('_placeholder_')
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      if (error.code === '42P01') {
        console.log(`${colors.green}✅ Connected to Supabase successfully (Table not found, but connection works)${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️ Connected to Supabase but got an error: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.green}✅ Connected to Supabase successfully${colors.reset}`);
    }
  } catch (err) {
    console.log(`${colors.red}❌ Failed to connect to Supabase: ${err.message}${colors.reset}`);
    console.log(`Please verify your Supabase URL and API key.`);
  }
}

// 3. Check dependencies
console.log(`\n${colors.cyan}Checking package dependencies...${colors.reset}`);

try {
  const packageJsonPath = path.resolve(rootDir, 'package.json');
  const packageLockPath = path.resolve(rootDir, 'package-lock.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`${colors.red}❌ package.json not found!${colors.reset}`);
  } else {
    const nodeModulesPath = path.resolve(rootDir, 'node_modules');
    
    if (!fs.existsSync(nodeModulesPath)) {
      console.log(`${colors.yellow}⚠️ node_modules directory not found. Running npm install...${colors.reset}`);
      execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
    } else {
      console.log(`${colors.green}✅ node_modules directory found.${colors.reset}`);
    }
    
    // Check for tailwindcss
    try {
      require.resolve('tailwindcss', { paths: [rootDir] });
      console.log(`${colors.green}✅ Tailwind CSS installed.${colors.reset}`);
    } catch (e) {
      console.log(`${colors.yellow}⚠️ Tailwind CSS not found in node_modules. It might need to be installed.${colors.reset}`);
    }
    
    // Check for hono
    try {
      require.resolve('hono', { paths: [rootDir] });
      console.log(`${colors.green}✅ Hono installed.${colors.reset}`);
    } catch (e) {
      console.log(`${colors.yellow}⚠️ Hono not found in node_modules. It might need to be installed.${colors.reset}`);
    }
  }
} catch (error) {
  console.log(`${colors.red}❌ Error checking dependencies: ${error.message}${colors.reset}`);
}

// 4. Print development guidance
console.log(`\n${colors.bold}${colors.magenta}=== Development Guidance ====${colors.reset}`);
console.log(`
${colors.bold}Available commands:${colors.reset}
  • ${colors.green}npm run dev${colors.reset} - Start development server
  • ${colors.green}npm run build${colors.reset} - Build for production
  • ${colors.green}npm run start${colors.reset} - Start production server

${colors.bold}Debugging Tools:${colors.reset}
  • ${colors.green}node scripts/check-supabase-config.js${colors.reset} - Test Supabase connection
  • ${colors.green}npx supabase status${colors.reset} - Check Supabase status (requires Supabase CLI)

${colors.bold}Next Steps:${colors.reset}
  1. Run ${colors.cyan}npm run dev${colors.reset} to start the development server
  2. Visit ${colors.cyan}http://localhost:3000${colors.reset} to see your application
  3. Check console for any additional errors or warnings
`);

console.log(`${colors.bold}${colors.blue}=== Setup Complete ====${colors.reset}\n`); 