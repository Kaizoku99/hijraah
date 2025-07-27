/**
 * Deploy Supabase Cron Jobs
 * 
 * This script deploys the necessary SQL files to set up cron jobs in Supabase
 * using the Supabase CLI.
 * 
 * Prerequisites:
 * - Supabase CLI installed (https://supabase.com/docs/guides/cli/getting-started)
 * - Logged in to Supabase CLI (supabase login)
 * - Project linked (supabase link)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ID = process.env.SUPABASE_PROJECT_ID;
const SQL_FILES = [
  'setup-extensions.sql',
  'scheduled-scraping-function.sql',
  'setup-cron-jobs.sql',
];

// Get the directory of this script
const scriptDir = __dirname;

// Function to deploy a SQL file
function deploySqlFile(filePath) {
  console.log(`Deploying ${path.basename(filePath)}...`);
  
  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Create a temporary file with the SQL content
    const tempFile = path.join(
      require('os').tmpdir(), 
      `supabase-deploy-${Date.now()}.sql`
    );
    fs.writeFileSync(tempFile, sqlContent);
    
    // Deploy the SQL file using Supabase CLI
    const command = `supabase db push --file ${tempFile}`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up the temporary file
    fs.unlinkSync(tempFile);
    
    console.log(`Successfully deployed ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`Error deploying ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('Starting deployment of Supabase cron jobs...');
  
  // Check if Supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('Supabase CLI is not installed. Please install it first.');
    process.exit(1);
  }
  
  // Deploy each SQL file in order
  for (const sqlFile of SQL_FILES) {
    const filePath = path.join(scriptDir, sqlFile);
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    
    const success = deploySqlFile(filePath);
    if (!success) {
      console.error(`Failed to deploy ${sqlFile}. Stopping deployment.`);
      process.exit(1);
    }
  }
  
  console.log('Deployment completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('Deployment failed:', error);
  process.exit(1);
}); 