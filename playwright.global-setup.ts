import { chromium, FullConfig } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

/**
 * Global setup for Playwright tests
 * 
 * This setup runs once before all tests and prepares:
 * - Test database
 * - Authentication state
 * - Test data
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright global setup...');

  // Ensure auth directory exists
  const authDir = path.join(__dirname, 'playwright', '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Setup test database
  await setupTestDatabase();

  // Create authenticated user session
  await setupAuthenticatedUser();

  // Setup test data
  await setupTestData();

  console.log('✅ Playwright global setup completed');
}

async function setupTestDatabase() {
  console.log('📊 Setting up test database...');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  // Clean up any existing test data
  await supabase.from('chat_messages').delete().like('content', '%test%');
  await supabase.from('chat_sessions').delete().like('title', '%test%');
  await supabase.from('cases').delete().like('title', '%test%');
  await supabase.from('profiles').delete().like('first_name', '%test%');

  console.log('✅ Test database setup completed');
}

async function setupAuthenticatedUser() {
  console.log('🔐 Setting up authenticated user...');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to signup page
    await page.goto(process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000');
    await page.getByRole('link', { name: /get started/i }).click();

    // Create test user
    const testUser = {
      email: 'test@hijraah.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User'
    };

    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill(testUser.password);
    await page.getByRole('button', { name: /create account/i }).click();

    // Wait for authentication to complete
    await page.waitForURL('**/dashboard', { timeout: 30000 });

    // Save authenticated state
    await context.storageState({ 
      path: path.join(__dirname, 'playwright', '.auth', 'user.json') 
    });

    console.log('✅ Authenticated user setup completed');
  } catch (error) {
    console.error('❌ Failed to setup authenticated user:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function setupTestData() {
  console.log('📝 Setting up test data...');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  // Get test user
  const { data: user } = await supabase
    .from('profiles')
    .select('id')
    .eq('first_name', 'Test')
    .single();

  if (!user) {
    console.warn('⚠️ Test user not found, skipping test data setup');
    return;
  }

  // Create test case
  await supabase.from('cases').insert({
    user_id: user.id,
    title: 'Test Immigration Case',
    description: 'This is a test case for E2E testing',
    status: 'draft'
  });

  // Create test chat session
  await supabase.from('chat_sessions').insert({
    user_id: user.id,
    title: 'Test Chat Session',
    context: 'immigration_guidance'
  });

  console.log('✅ Test data setup completed');
}

export default globalSetup;