#!/usr/bin/env node

/**
 * Script to apply database migrations
 * Run with: node scripts/apply-migrations.js
 */

const fs = require('fs');
const path = require('path');

const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables must be set');
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration(filePath) {
  try {
    console.log(`Applying migration: ${path.basename(filePath)}`);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`Error applying migration ${path.basename(filePath)}:`, error);
      return false;
    }

    console.log(`✅ Successfully applied migration: ${path.basename(filePath)}`);
    return true;
  } catch (err) {
    console.error(`Error reading or applying migration ${path.basename(filePath)}:`, err);
    return false;
  }
}

async function main() {
  console.log('Starting database migrations...');
  
  // Apply the admin_users table migration
  const migrationPath = path.join(__dirname, '../src/lib/db/migrations/create_admin_users_table.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error(`Migration file not found: ${migrationPath}`);
    process.exit(1);
  }
  
  const success = await applyMigration(migrationPath);
  
  if (success) {
    console.log('Migration completed successfully');
    
    // Test the function
    const { error } = await supabase.rpc('create_admin_users_table');
    if (error) {
      console.error('Error testing create_admin_users_table function:', error);
    } else {
      console.log('Successfully tested create_admin_users_table function');
    }
  } else {
    console.error('Migration failed');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unhandled error during migration:', err);
  process.exit(1);
}); 