/**
 * Authentication setup for Playwright tests
 * 
 * This setup file creates authenticated user sessions that can be reused
 * across multiple test files to avoid repeated login steps.
 */

import { test as setup, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const authFile = 'playwright/.auth/user.json';
const adminAuthFile = 'playwright/.auth/admin.json';

// Setup regular user authentication
setup('authenticate as user', async ({ page }) => {
  console.log('🔐 Setting up user authentication...');

  const userData = {
    email: 'test-user@hijraah.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User'
  };

  // Navigate to signup
  await page.goto('/');
  await page.getByRole('link', { name: /get started/i }).click();

  // Fill signup form
  await page.getByLabel(/email/i).fill(userData.email);
  await page.getByLabel(/password/i).fill(userData.password);
  await page.getByRole('button', { name: /create account/i }).click();

  // Wait for successful authentication
  await page.waitForURL('**/dashboard', { timeout: 30000 });
  
  // Verify we're logged in
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

  // Save authentication state
  await page.context().storageState({ path: authFile });
  
  console.log('✅ User authentication setup completed');
});

// Setup admin user authentication
setup('authenticate as admin', async ({ page }) => {
  console.log('🔐 Setting up admin authentication...');

  const adminData = {
    email: 'admin@hijraah.com',
    password: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'User'
  };

  // Navigate to signup
  await page.goto('/');
  await page.getByRole('link', { name: /get started/i }).click();

  // Fill signup form
  await page.getByLabel(/email/i).fill(adminData.email);
  await page.getByLabel(/password/i).fill(adminData.password);
  await page.getByRole('button', { name: /create account/i }).click();

  // Wait for successful authentication
  await page.waitForURL('**/dashboard', { timeout: 30000 });

  // Navigate to admin area (if accessible)
  try {
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: /admin/i })).toBeVisible();
  } catch (error) {
    console.warn('⚠️ Admin area not accessible, using regular dashboard');
  }

  // Save admin authentication state
  await page.context().storageState({ path: adminAuthFile });
  
  console.log('✅ Admin authentication setup completed');
});

// Setup test data after authentication
setup('setup test data', async ({ page }) => {
  console.log('📝 Setting up test data...');

  // Use the authenticated session
  await page.goto('/dashboard');

  // Create a test case
  await page.getByRole('tab', { name: /cases/i }).click();
  await page.getByRole('button', { name: /create case/i }).click();
  
  await page.getByLabel(/title/i).fill('E2E Test Case');
  await page.getByLabel(/description/i).fill('This is a test case created during E2E setup');
  await page.getByRole('button', { name: /create/i }).click();

  // Verify case was created
  await expect(page.getByText('E2E Test Case')).toBeVisible();

  // Create a test document (if upload is available)
  try {
    await page.getByRole('tab', { name: /documents/i }).click();
    await page.getByRole('button', { name: /upload document/i }).click();
    
    await page.getByLabel(/name/i).fill('E2E Test Document');
    await page.getByLabel(/description/i).fill('This is a test document for E2E testing');
    
    // Create a test file
    const testContent = 'This is test document content for E2E testing';
    const buffer = Buffer.from(testContent);
    await page.getByLabel(/file/i).setInputFiles({
      name: 'test-document.txt',
      mimeType: 'text/plain',
      buffer: buffer,
    });
    
    await page.getByRole('button', { name: /upload/i }).click();
    
    // Verify document was uploaded
    await expect(page.getByText('E2E Test Document')).toBeVisible();
  } catch (error) {
    console.warn('⚠️ Document upload not available during setup');
  }

  console.log('✅ Test data setup completed');
});

// Verify authentication works
setup('verify authentication', async ({ page }) => {
  console.log('✅ Verifying authentication...');

  await page.goto('/dashboard');
  
  // Should be able to access dashboard without login
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  
  // Should see user-specific content
  await expect(page.getByText(/test/i)).toBeVisible();
  
  console.log('✅ Authentication verification completed');
});