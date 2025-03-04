/**
 * Supabase Dependencies Installer
 * 
 * This script installs all necessary dependencies for working with
 * Supabase locally in the Hijraah immigration platform.
 */

const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Helper to print colored messages
function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Helper to run shell commands with error handling
function runCommand(command, options = {}) {
  try {
    print(`\n> ${command}`, 'cyan');
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    if (options.ignoreError) {
      print(`Command failed but continuing: ${error.message}`, 'yellow');
      return null;
    }
    throw error;
  }
}

// Main function
async function main() {
  print('🚀 Installing Supabase Dependencies', 'bright');
  print('===============================', 'bright');

  // Step 1: Install Supabase packages
  print('\n📦 Installing Supabase JavaScript libraries...', 'green');
  runCommand('npm install @supabase/supabase-js @supabase/ssr --save');

  // Step 2: Install Supabase CLI globally
  print('\n🔧 Installing Supabase CLI globally...', 'green');
  try {
    print('Checking if Supabase CLI is already installed...', 'cyan');
    execSync('supabase --version', { stdio: 'pipe' });
    print('Supabase CLI is already installed ✅', 'green');
  } catch (error) {
    print('Installing Supabase CLI globally...', 'cyan');
    runCommand('npm install -g supabase');
  }

  // Step 3: Install Docker if not installed (OS-specific)
  print('\n🐳 Checking Docker installation...', 'green');
  try {
    execSync('docker --version', { stdio: 'pipe' });
    print('Docker is already installed ✅', 'green');
  } catch (error) {
    print('Docker is required for local Supabase development!', 'red');
    print('Please install Docker Desktop from https://www.docker.com/products/docker-desktop', 'yellow');
  }

  // Step 4: Install PostgreSQL client tools if needed
  print('\n🐘 Checking PostgreSQL client tools...', 'green');
  try {
    execSync('psql --version', { stdio: 'pipe' });
    print('PostgreSQL client tools are already installed ✅', 'green');
  } catch (error) {
    print('PostgreSQL client tools are recommended for database management', 'yellow');
    print('Visit https://www.postgresql.org/download/ to install them', 'yellow');
  }

  // Step 5: Install TypeScript if not already installed
  print('\n📘 Checking TypeScript installation...', 'green');
  try {
    execSync('tsc --version', { stdio: 'pipe' });
    print('TypeScript is already installed ✅', 'green');
  } catch (error) {
    print('Installing TypeScript...', 'cyan');
    runCommand('npm install typescript --save-dev');
  }

  // Step 6: Complete
  print('\n✅ All dependencies installed!', 'bright');
  print('\nNext steps:', 'green');
  print('1. Run "node scripts/setup-local-supabase.js" to set up the local environment', 'cyan');
  print('2. Run "npm run dev:local" to start the development server with local Supabase', 'cyan');
}

main().catch(error => {
  print(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
}); 