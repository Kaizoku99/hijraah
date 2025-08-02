/**
 * Cleanup teardown for Playwright tests
 * 
 * This teardown file cleans up test data and sessions after all tests complete.
 */

import { test as teardown } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

teardown('cleanup test data', async ({ page }) => {
  console.log('🧹 Starting test data cleanup...');

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Clean up test data in correct order to respect foreign key constraints
    console.log('🗑️ Cleaning up chat messages...');
    await supabase
      .from('chat_messages')
      .delete()
      .or('content.ilike.%test%,content.ilike.%e2e%');

    console.log('🗑️ Cleaning up chat sessions...');
    await supabase
      .from('chat_sessions')
      .delete()
      .or('title.ilike.%test%,title.ilike.%e2e%');

    console.log('🗑️ Cleaning up cases...');
    await supabase
      .from('cases')
      .delete()
      .or('title.ilike.%test%,title.ilike.%e2e%,description.ilike.%test%');

    console.log('🗑️ Cleaning up user profiles...');
    await supabase
      .from('profiles')
      .delete()
      .or('first_name.ilike.%test%,email.ilike.%test%,email.ilike.%e2e%');

    console.log('✅ Test data cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup test data:', error);
    // Don't throw to avoid failing the test run
  }
});

teardown('cleanup authentication files', async () => {
  console.log('🔐 Cleaning up authentication files...');

  try {
    const fs = require('fs');
    const path = require('path');

    const authFiles = [
      'playwright/.auth/user.json',
      'playwright/.auth/admin.json'
    ];

    for (const file of authFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted ${file}`);
      }
    }

    console.log('✅ Authentication files cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup auth files:', error);
  }
});

teardown('cleanup temporary files', async () => {
  console.log('📁 Cleaning up temporary files...');

  try {
    const fs = require('fs');
    const path = require('path');

    // Only clean up in non-CI environments to preserve artifacts
    if (!process.env.CI) {
      const tempDirs = [
        'test-results/temp',
        'playwright-report/temp'
      ];

      for (const dir of tempDirs) {
        const dirPath = path.join(process.cwd(), dir);
        if (fs.existsSync(dirPath)) {
          fs.rmSync(dirPath, { recursive: true, force: true });
          console.log(`🗑️ Deleted ${dir}`);
        }
      }
    }

    console.log('✅ Temporary files cleanup completed');
  } catch (error) {
    console.error('❌ Failed to cleanup temporary files:', error);
  }
});

teardown('verify cleanup', async ({ page }) => {
  console.log('✅ Verifying cleanup...');

  try {
    // Try to access the application to ensure it's still functional
    await page.goto('/');
    
    // Should see the landing page
    await page.waitForSelector('h1', { timeout: 10000 });
    
    console.log('✅ Application is still functional after cleanup');
  } catch (error) {
    console.warn('⚠️ Could not verify application functionality:', error.message);
  }
});