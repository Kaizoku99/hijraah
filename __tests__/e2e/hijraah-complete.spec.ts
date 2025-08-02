/**
 * Hijraah Platform - Complete E2E Test Suite
 * 
 * This comprehensive test suite covers all user flows and interconnections
 * in the Hijraah immigration platform to ensure everything works correctly
 * before release.
 */

import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Test data generators
const generateUserData = () => ({
  email: faker.internet.email(),
  password: 'TestPassword123!',
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  countryOfResidence: 'United States',
  countryOfInterest: 'Canada',
  immigrationGoals: 'Work visa application'
});

const generateCaseData = () => ({
  title: `Immigration Case - ${faker.lorem.words(3)}`,
  description: faker.lorem.paragraph(),
  visaType: 'Work Visa'
});

const generateDocumentData = () => ({
  name: `Document - ${faker.lorem.words(2)}`,
  description: faker.lorem.sentence()
});

// Page Object Models
class LandingPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickGetStarted() {
    await this.page.getByRole('link', { name: /get started/i }).click();
  }

  async clickStartChat() {
    await this.page.getByRole('link', { name: /start chat/i }).click();
  }

  async clickDashboard() {
    await this.page.getByRole('link', { name: /dashboard/i }).click();
  }

  async verifyHeroSection() {
    await expect(this.page.getByRole('heading', { name: /navigate your immigration journey/i })).toBeVisible();
    await expect(this.page.getByText(/get instant, personalized immigration assistance/i)).toBeVisible();
  }

  async verifyFeatures() {
    await expect(this.page.getByText(/24\/7 ai support/i)).toBeVisible();
    await expect(this.page.getByText(/expert guidance/i)).toBeVisible();
    await expect(this.page.getByText(/time-saving tools/i)).toBeVisible();
  }
}

class AuthPage {
  constructor(private page: Page) {}

  async gotoSignup() {
    await this.page.goto('/signup');
  }

  async gotoLogin() {
    await this.page.goto('/login');
  }

  async signupWithEmail(userData: ReturnType<typeof generateUserData>) {
    await this.page.getByLabel(/email/i).fill(userData.email);
    await this.page.getByLabel(/password/i).fill(userData.password);
    await this.page.getByRole('button', { name: /create account/i }).click();
  }

  async loginWithEmail(email: string, password: string) {
    await this.page.getByLabel(/email/i).fill(email);
    await this.page.getByLabel(/password/i).fill(password);
    await this.page.getByRole('button', { name: /sign in/i }).click();
  }

  async signupWithGoogle() {
    await this.page.getByRole('button', { name: /google/i }).click();
  }

  async verifySignupForm() {
    await expect(this.page.getByRole('heading', { name: /create an account/i })).toBeVisible();
    await expect(this.page.getByLabel(/email/i)).toBeVisible();
    await expect(this.page.getByLabel(/password/i)).toBeVisible();
  }

  async verifyLoginForm() {
    await expect(this.page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(this.page.getByLabel(/email/i)).toBeVisible();
    await expect(this.page.getByLabel(/password/i)).toBeVisible();
  }
}

class OnboardingPage {
  constructor(private page: Page) {}

  async completeWelcomeStep() {
    await expect(this.page.getByText(/welcome to hijraah/i)).toBeVisible();
    await this.page.getByRole('button', { name: /continue/i }).click();
  }

  async completeProfileSetup(userData: ReturnType<typeof generateUserData>) {
    await this.page.getByLabel(/first name/i).fill(userData.firstName);
    await this.page.getByLabel(/last name/i).fill(userData.lastName);
    await this.page.getByLabel(/country of residence/i).selectOption(userData.countryOfResidence);
    await this.page.getByLabel(/country of interest/i).selectOption(userData.countryOfInterest);
    await this.page.getByLabel(/immigration goals/i).fill(userData.immigrationGoals);
    await this.page.getByRole('button', { name: /continue/i }).click();
  }

  async completeFeatureTour() {
    // Navigate through feature tour steps
    await expect(this.page.getByText(/let's explore the platform/i)).toBeVisible();
    await this.page.getByRole('button', { name: /next/i }).click();
    await this.page.getByRole('button', { name: /next/i }).click();
    await this.page.getByRole('button', { name: /finish tour/i }).click();
  }

  async completeFirstTask() {
    await expect(this.page.getByText(/create your first case/i)).toBeVisible();
    await this.page.getByRole('button', { name: /create case/i }).click();
  }

  async completeResources() {
    await expect(this.page.getByText(/helpful resources/i)).toBeVisible();
    await this.page.getByRole('button', { name: /finish onboarding/i }).click();
  }

  async verifyOnboardingComplete() {
    await expect(this.page.url()).toContain('/dashboard');
  }
}

class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
  }

  async verifyDashboardLoaded() {
    await expect(this.page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(this.page.getByRole('tab', { name: /cases/i })).toBeVisible();
    await expect(this.page.getByRole('tab', { name: /documents/i })).toBeVisible();
    await expect(this.page.getByRole('tab', { name: /analytics/i })).toBeVisible();
  }

  async switchToTab(tabName: 'cases' | 'documents' | 'analytics') {
    await this.page.getByRole('tab', { name: new RegExp(tabName, 'i') }).click();
  }

  async verifyBreadcrumb() {
    await expect(this.page.getByRole('navigation')).toContainText('Dashboard');
  }

  async verifySidebar() {
    await expect(this.page.getByRole('navigation')).toBeVisible();
  }
}

class CasesPage {
  constructor(private page: Page) {}

  async createNewCase(caseData: ReturnType<typeof generateCaseData>) {
    await this.page.getByRole('button', { name: /create case/i }).click();
    await this.page.getByLabel(/title/i).fill(caseData.title);
    await this.page.getByLabel(/description/i).fill(caseData.description);
    await this.page.getByRole('button', { name: /create/i }).click();
  }

  async verifyCaseCreated(title: string) {
    await expect(this.page.getByText(title)).toBeVisible();
  }

  async openCase(title: string) {
    await this.page.getByText(title).click();
  }

  async verifyCaseDetails(caseData: ReturnType<typeof generateCaseData>) {
    await expect(this.page.getByText(caseData.title)).toBeVisible();
    await expect(this.page.getByText(caseData.description)).toBeVisible();
  }

  async updateCaseStatus(status: string) {
    await this.page.getByRole('combobox', { name: /status/i }).selectOption(status);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async verifyCasesList() {
    await expect(this.page.getByRole('table')).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /title/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /status/i })).toBeVisible();
  }
}

class DocumentsPage {
  constructor(private page: Page) {}

  async uploadDocument(documentData: ReturnType<typeof generateDocumentData>, filePath: string) {
    await this.page.getByRole('button', { name: /upload document/i }).click();
    await this.page.getByLabel(/name/i).fill(documentData.name);
    await this.page.getByLabel(/description/i).fill(documentData.description);
    await this.page.getByLabel(/file/i).setInputFiles(filePath);
    await this.page.getByRole('button', { name: /upload/i }).click();
  }

  async verifyDocumentUploaded(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async openDocument(name: string) {
    await this.page.getByText(name).click();
  }

  async verifyDocumentDetails(documentData: ReturnType<typeof generateDocumentData>) {
    await expect(this.page.getByText(documentData.name)).toBeVisible();
    await expect(this.page.getByText(documentData.description)).toBeVisible();
  }

  async linkDocumentToCase(caseName: string) {
    await this.page.getByRole('combobox', { name: /case/i }).selectOption(caseName);
    await this.page.getByRole('button', { name: /link/i }).click();
  }

  async verifyDocumentsList() {
    await expect(this.page.getByRole('table')).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /name/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /type/i })).toBeVisible();
  }
}

class ChatPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/chat');
  }

  async startNewChat() {
    await this.page.getByRole('button', { name: /new chat/i }).click();
  }

  async sendMessage(message: string) {
    await this.page.getByRole('textbox', { name: /message/i }).fill(message);
    await this.page.getByRole('button', { name: /send/i }).click();
  }

  async verifyAIResponse() {
    await expect(this.page.getByRole('article').last()).toBeVisible();
    await expect(this.page.getByRole('article').last()).not.toBeEmpty();
  }

  async verifyChatInterface() {
    await expect(this.page.getByRole('textbox', { name: /message/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /send/i })).toBeVisible();
  }

  async selectChatContext(context: string) {
    await this.page.getByRole('combobox', { name: /context/i }).selectOption(context);
  }
}

class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/profile');
  }

  async updatePersonalInfo(userData: Partial<ReturnType<typeof generateUserData>>) {
    if (userData.firstName) {
      await this.page.getByLabel(/first name/i).fill(userData.firstName);
    }
    if (userData.lastName) {
      await this.page.getByLabel(/last name/i).fill(userData.lastName);
    }
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async updateImmigrationPreferences(preferences: { countryOfInterest?: string; visaType?: string }) {
    if (preferences.countryOfInterest) {
      await this.page.getByLabel(/country of interest/i).selectOption(preferences.countryOfInterest);
    }
    if (preferences.visaType) {
      await this.page.getByLabel(/visa type/i).selectOption(preferences.visaType);
    }
    await this.page.getByRole('button', { name: /save preferences/i }).click();
  }

  async verifyProfileInfo(userData: ReturnType<typeof generateUserData>) {
    await expect(this.page.getByDisplayValue(userData.firstName)).toBeVisible();
    await expect(this.page.getByDisplayValue(userData.lastName)).toBeVisible();
  }
}

// Test Suite
test.describe('Hijraah Platform - Complete E2E Tests', () => {
  let userData: ReturnType<typeof generateUserData>;
  let caseData: ReturnType<typeof generateCaseData>;
  let documentData: ReturnType<typeof generateDocumentData>;

  test.beforeEach(() => {
    userData = generateUserData();
    caseData = generateCaseData();
    documentData = generateDocumentData();
  });

  test.describe('Landing Page & Marketing Flow', () => {
    test('should display landing page correctly', async ({ page }) => {
      const landingPage = new LandingPage(page);
      
      await landingPage.goto();
      await landingPage.verifyHeroSection();
      await landingPage.verifyFeatures();
    });

    test('should navigate to signup from landing page', async ({ page }) => {
      const landingPage = new LandingPage(page);
      const authPage = new AuthPage(page);
      
      await landingPage.goto();
      await landingPage.clickGetStarted();
      await authPage.verifySignupForm();
    });

    test('should navigate to chat from landing page', async ({ page }) => {
      const landingPage = new LandingPage(page);
      
      await landingPage.goto();
      await landingPage.clickStartChat();
      await expect(page.url()).toContain('/chat');
    });
  });

  test.describe('Authentication Flow', () => {
    test('should complete email signup flow', async ({ page }) => {
      const authPage = new AuthPage(page);
      
      await authPage.gotoSignup();
      await authPage.verifySignupForm();
      await authPage.signupWithEmail(userData);
      
      // Should redirect to onboarding or dashboard
      await expect(page.url()).toMatch(/(onboarding|dashboard)/);
    });

    test('should complete login flow', async ({ page, context }) => {
      // First create an account
      const authPage = new AuthPage(page);
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      
      // Then test login
      await authPage.gotoLogin();
      await authPage.verifyLoginForm();
      await authPage.loginWithEmail(userData.email, userData.password);
      
      await expect(page.url()).toContain('/dashboard');
    });

    test('should handle authentication errors gracefully', async ({ page }) => {
      const authPage = new AuthPage(page);
      
      await authPage.gotoLogin();
      await authPage.loginWithEmail('invalid@email.com', 'wrongpassword');
      
      await expect(page.getByText(/error/i)).toBeVisible();
    });
  });

  test.describe('Onboarding Flow', () => {
    test('should complete full onboarding process', async ({ page }) => {
      const authPage = new AuthPage(page);
      const onboardingPage = new OnboardingPage(page);
      
      // Sign up first
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      
      // Complete onboarding
      await onboardingPage.completeWelcomeStep();
      await onboardingPage.completeProfileSetup(userData);
      await onboardingPage.completeFeatureTour();
      await onboardingPage.completeFirstTask();
      await onboardingPage.completeResources();
      await onboardingPage.verifyOnboardingComplete();
    });

    test('should allow skipping onboarding steps', async ({ page }) => {
      const authPage = new AuthPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      
      // Skip to dashboard
      await page.getByRole('button', { name: /skip/i }).click();
      await expect(page.url()).toContain('/dashboard');
    });
  });

  test.describe('Dashboard & Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user
      const authPage = new AuthPage(page);
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
    });

    test('should display dashboard correctly', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      
      await dashboardPage.goto();
      await dashboardPage.verifyDashboardLoaded();
      await dashboardPage.verifyBreadcrumb();
      await dashboardPage.verifySidebar();
    });

    test('should switch between dashboard tabs', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      
      await dashboardPage.goto();
      
      await dashboardPage.switchToTab('cases');
      await expect(page.getByRole('tabpanel')).toContainText(/cases/i);
      
      await dashboardPage.switchToTab('documents');
      await expect(page.getByRole('tabpanel')).toContainText(/documents/i);
      
      await dashboardPage.switchToTab('analytics');
      await expect(page.getByRole('tabpanel')).toContainText(/analytics/i);
    });
  });

  test.describe('Case Management Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      await dashboardPage.switchToTab('cases');
    });

    test('should create new case', async ({ page }) => {
      const casesPage = new CasesPage(page);
      
      await casesPage.verifyCasesList();
      await casesPage.createNewCase(caseData);
      await casesPage.verifyCaseCreated(caseData.title);
    });

    test('should view case details', async ({ page }) => {
      const casesPage = new CasesPage(page);
      
      await casesPage.createNewCase(caseData);
      await casesPage.openCase(caseData.title);
      await casesPage.verifyCaseDetails(caseData);
    });

    test('should update case status', async ({ page }) => {
      const casesPage = new CasesPage(page);
      
      await casesPage.createNewCase(caseData);
      await casesPage.openCase(caseData.title);
      await casesPage.updateCaseStatus('in_review');
      
      await expect(page.getByText(/in review/i)).toBeVisible();
    });
  });

  test.describe('Document Management Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      await dashboardPage.switchToTab('documents');
    });

    test('should upload document', async ({ page }) => {
      const documentsPage = new DocumentsPage(page);
      
      await documentsPage.verifyDocumentsList();
      
      // Create a test file
      const testFilePath = 'test-document.pdf';
      await page.evaluate(() => {
        const blob = new Blob(['Test document content'], { type: 'application/pdf' });
        const file = new File([blob], 'test-document.pdf', { type: 'application/pdf' });
        return file;
      });
      
      await documentsPage.uploadDocument(documentData, testFilePath);
      await documentsPage.verifyDocumentUploaded(documentData.name);
    });

    test('should view document details', async ({ page }) => {
      const documentsPage = new DocumentsPage(page);
      
      // Upload document first
      const testFilePath = 'test-document.pdf';
      await documentsPage.uploadDocument(documentData, testFilePath);
      
      await documentsPage.openDocument(documentData.name);
      await documentsPage.verifyDocumentDetails(documentData);
    });
  });

  test.describe('Case-Document Integration', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user with case and document
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      const casesPage = new CasesPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      
      // Create a case first
      await dashboardPage.switchToTab('cases');
      await casesPage.createNewCase(caseData);
    });

    test('should link document to case', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const documentsPage = new DocumentsPage(page);
      
      // Upload document
      await dashboardPage.switchToTab('documents');
      const testFilePath = 'test-document.pdf';
      await documentsPage.uploadDocument(documentData, testFilePath);
      
      // Link to case
      await documentsPage.openDocument(documentData.name);
      await documentsPage.linkDocumentToCase(caseData.title);
      
      await expect(page.getByText(caseData.title)).toBeVisible();
    });
  });

  test.describe('AI Chat Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user
      const authPage = new AuthPage(page);
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
    });

    test('should start new chat session', async ({ page }) => {
      const chatPage = new ChatPage(page);
      
      await chatPage.goto();
      await chatPage.verifyChatInterface();
      await chatPage.startNewChat();
    });

    test('should send message and receive AI response', async ({ page }) => {
      const chatPage = new ChatPage(page);
      
      await chatPage.goto();
      await chatPage.sendMessage('What documents do I need for a work visa?');
      await chatPage.verifyAIResponse();
    });

    test('should use case context in chat', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const casesPage = new CasesPage(page);
      const chatPage = new ChatPage(page);
      
      // Create a case first
      await dashboardPage.goto();
      await dashboardPage.switchToTab('cases');
      await casesPage.createNewCase(caseData);
      
      // Use case context in chat
      await chatPage.goto();
      await chatPage.selectChatContext(caseData.title);
      await chatPage.sendMessage('What is the status of my case?');
      await chatPage.verifyAIResponse();
    });
  });

  test.describe('Profile & Settings Flow', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user
      const authPage = new AuthPage(page);
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
    });

    test('should update personal information', async ({ page }) => {
      const profilePage = new ProfilePage(page);
      
      await profilePage.goto();
      
      const updatedData = {
        firstName: 'Updated First Name',
        lastName: 'Updated Last Name'
      };
      
      await profilePage.updatePersonalInfo(updatedData);
      await profilePage.verifyProfileInfo({ ...userData, ...updatedData });
    });

    test('should update immigration preferences', async ({ page }) => {
      const profilePage = new ProfilePage(page);
      
      await profilePage.goto();
      await profilePage.updateImmigrationPreferences({
        countryOfInterest: 'Australia',
        visaType: 'Student Visa'
      });
      
      await expect(page.getByText(/preferences updated/i)).toBeVisible();
    });
  });

  test.describe('Cross-Feature Integration', () => {
    test.beforeEach(async ({ page }) => {
      // Setup authenticated user with full data
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      const casesPage = new CasesPage(page);
      const documentsPage = new DocumentsPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      
      // Create case and document
      await dashboardPage.switchToTab('cases');
      await casesPage.createNewCase(caseData);
      
      await dashboardPage.switchToTab('documents');
      const testFilePath = 'test-document.pdf';
      await documentsPage.uploadDocument(documentData, testFilePath);
    });

    test('should maintain context across features', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const chatPage = new ChatPage(page);
      
      // Navigate to chat with case context
      await chatPage.goto();
      await chatPage.selectChatContext(caseData.title);
      await chatPage.sendMessage('What documents are linked to this case?');
      await chatPage.verifyAIResponse();
      
      // Verify context is maintained
      await dashboardPage.goto();
      await expect(page.getByText(caseData.title)).toBeVisible();
    });

    test('should show related items across features', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const casesPage = new CasesPage(page);
      
      // View case details
      await dashboardPage.switchToTab('cases');
      await casesPage.openCase(caseData.title);
      
      // Should show related documents
      await expect(page.getByText(/related documents/i)).toBeVisible();
    });
  });

  test.describe('Error Handling & Edge Cases', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Simulate network failure
      await page.route('**/api/**', route => route.abort());
      
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.goto();
      
      await expect(page.getByText(/connection error/i)).toBeVisible();
    });

    test('should handle form validation errors', async ({ page }) => {
      const authPage = new AuthPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail({ ...userData, email: 'invalid-email' });
      
      await expect(page.getByText(/invalid email/i)).toBeVisible();
    });

    test('should handle file upload errors', async ({ page }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      const documentsPage = new DocumentsPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      await dashboardPage.switchToTab('documents');
      
      // Try to upload invalid file
      await page.getByRole('button', { name: /upload document/i }).click();
      await page.getByLabel(/file/i).setInputFiles('invalid-file.exe');
      
      await expect(page.getByText(/invalid file type/i)).toBeVisible();
    });
  });

  test.describe('Performance & Loading States', () => {
    test('should show loading states during data fetching', async ({ page }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      
      // Slow down network to see loading states
      await page.route('**/api/**', route => {
        setTimeout(() => route.continue(), 1000);
      });
      
      await dashboardPage.goto();
      await expect(page.getByTestId('loading-skeleton')).toBeVisible();
    });

    test('should handle large data sets efficiently', async ({ page }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      
      // Verify pagination or virtual scrolling for large lists
      await dashboardPage.switchToTab('cases');
      await expect(page.getByRole('button', { name: /load more/i })).toBeVisible();
    });
  });

  test.describe('Accessibility & Internationalization', () => {
    test('should be keyboard navigable', async ({ page }) => {
      const landingPage = new LandingPage(page);
      
      await landingPage.goto();
      
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      
      // Should navigate to signup
      await expect(page.url()).toContain('/signup');
    });

    test('should support screen readers', async ({ page }) => {
      const landingPage = new LandingPage(page);
      
      await landingPage.goto();
      
      // Check for proper ARIA labels
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('navigation')).toBeVisible();
      await expect(page.getByRole('button', { name: /get started/i })).toHaveAttribute('aria-label');
    });

    test('should support RTL languages', async ({ page }) => {
      // Set Arabic locale
      await page.goto('/?lang=ar');
      
      // Verify RTL layout
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.getByText(/مرحبا/)).toBeVisible(); // Arabic welcome text
    });
  });

  test.describe('Security & Privacy', () => {
    test('should protect authenticated routes', async ({ page }) => {
      // Try to access dashboard without authentication
      await page.goto('/dashboard');
      
      // Should redirect to login
      await expect(page.url()).toContain('/login');
    });

    test('should handle session expiration', async ({ page, context }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      
      // Clear session cookies
      await context.clearCookies();
      
      // Try to access protected resource
      await page.reload();
      
      // Should redirect to login
      await expect(page.url()).toContain('/login');
    });

    test('should sanitize user input', async ({ page }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      const casesPage = new CasesPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      await dashboardPage.switchToTab('cases');
      
      // Try to inject script
      const maliciousData = {
        title: '<script>alert("XSS")</script>',
        description: 'Normal description'
      };
      
      await casesPage.createNewCase(maliciousData);
      
      // Script should be escaped, not executed
      await expect(page.getByText('<script>')).toBeVisible();
      // No alert should appear
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size
    
    test('should work on mobile devices', async ({ page }) => {
      const landingPage = new LandingPage(page);
      const authPage = new AuthPage(page);
      
      await landingPage.goto();
      await landingPage.verifyHeroSection();
      
      // Test mobile navigation
      await page.getByRole('button', { name: /menu/i }).click();
      await page.getByRole('link', { name: /sign up/i }).click();
      
      await authPage.verifySignupForm();
    });

    test('should handle touch interactions', async ({ page }) => {
      const authPage = new AuthPage(page);
      const dashboardPage = new DashboardPage(page);
      
      await authPage.gotoSignup();
      await authPage.signupWithEmail(userData);
      await dashboardPage.goto();
      
      // Test swipe gestures for tabs
      await page.touchscreen.tap(100, 100);
      await page.touchscreen.tap(300, 100);
      
      await expect(page.getByRole('tab', { selected: true })).toBeVisible();
    });
  });
});

// Utility functions for test setup
export async function setupTestUser(page: Page) {
  const userData = generateUserData();
  const authPage = new AuthPage(page);
  
  await authPage.gotoSignup();
  await authPage.signupWithEmail(userData);
  
  return userData;
}

export async function setupTestData(page: Page) {
  const userData = await setupTestUser(page);
  const caseData = generateCaseData();
  const documentData = generateDocumentData();
  
  const dashboardPage = new DashboardPage(page);
  const casesPage = new CasesPage(page);
  const documentsPage = new DocumentsPage(page);
  
  await dashboardPage.goto();
  
  // Create test case
  await dashboardPage.switchToTab('cases');
  await casesPage.createNewCase(caseData);
  
  // Upload test document
  await dashboardPage.switchToTab('documents');
  const testFilePath = 'test-document.pdf';
  await documentsPage.uploadDocument(documentData, testFilePath);
  
  return { userData, caseData, documentData };
}