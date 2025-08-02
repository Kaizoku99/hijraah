import { FullConfig } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

/**
 * Global teardown for Playwright tests
 * 
 * This teardown runs once after all tests and cleans up:
 * - Test data from database
 * - Authentication files
 * - Temporary files
 */
async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting Playwright global teardown...');

  // Clean up test data
  await cleanupTestData();

  // Clean up authentication files
  await cleanupAuthFiles();

  // Clean up temporary files
  await cleanupTempFiles();

  console.log('✅ Playwright global teardown completed');
}

async function cleanupTestData() {
  console.log('🗑️ Cleaning up test data...');

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Delete test data in correct order (respecting foreign key constraints)
    await supabase.from('chat_messages').delete().like('content', '%test%');
    await supabase.from('chat_sessions').delete().like('title', '%test%');
    await supabase.from('cases').delete().like('title', '%test%');
    
    // Delete test user profile (this will cascade delete related data)
    await supabase.from('profiles').delete().like('first_name', '%Test%');

    console.log('✅ Test data cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup test data:', error);
    // Don't throw error to avoid failing the entire test run
  }
}

async function cleanupAuthFiles() {
  console.log('🔐 Cleaning up authentication files...');

  try {
    const authDir = path.join(__dirname, 'playwright', '.auth');
    
    if (fs.existsSync(authDir)) {
      const files = fs.readdirSync(authDir);
      
      for (const file of files) {
        const filePath = path.join(authDir, file);
        fs.unlinkSync(filePath);
      }
      
      // Remove the directory if it's empty
      if (fs.readdirSync(authDir).length === 0) {
        fs.rmdirSync(authDir);
      }
    }

    console.log('✅ Authentication files cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup auth files:', error);
  }
}

async function cleanupTempFiles() {
  console.log('📁 Cleaning up temporary files...');

  try {
    // Clean up test artifacts that might be left behind
    const tempDirs = [
      'test-results',
      'playwright-report',
      'coverage'
    ];

    for (const dir of tempDirs) {
      const dirPath = path.join(__dirname, dir);
      if (fs.existsSync(dirPath)) {
        // Only clean up if it's a test run, not in CI where we want to keep artifacts
        if (!process.env.CI) {
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      }
    }

    console.log('✅ Temporary files cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup temporary files:', error);
  }
}

export default globalTeardown;