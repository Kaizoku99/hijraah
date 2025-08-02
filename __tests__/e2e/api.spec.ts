/**
 * API E2E Tests for Hijraah Platform
 *
 * Tests all API endpoints to ensure they work correctly and handle
 * authentication, validation, and error cases properly.
 */

import { test, expect, APIRequestContext } from "@playwright/test";
import { faker } from "@faker-js/faker";

// Test data generators
const generateUserData = () => ({
  email: faker.internet.email(),
  password: "TestPassword123!",
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});

const generateCaseData = () => ({
  title: `API Test Case - ${faker.lorem.words(3)}`,
  description: faker.lorem.paragraph(),
  status: "draft" as const,
});

test.describe("API Endpoints", () => {
  let apiContext: APIRequestContext;
  let authToken: string;
  let userId: string;

  test.beforeAll(async ({ playwright }) => {
    // Create API request context
    apiContext = await playwright.request.newContext({
      baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.describe("Authentication API", () => {
    test("should create new user account", async () => {
      const userData = generateUserData();

      const response = await apiContext.post("/api/auth/signup", {
        data: userData,
      });

      expect(response.status()).toBe(201);

      const responseData = await response.json();
      expect(responseData).toHaveProperty("user");
      expect(responseData.user.email).toBe(userData.email);

      userId = responseData.user.id;
    });

    test("should login with valid credentials", async () => {
      const userData = generateUserData();

      // Create user first
      await apiContext.post("/api/auth/signup", {
        data: userData,
      });

      // Then login
      const loginResponse = await apiContext.post("/api/auth/login", {
        data: {
          email: userData.email,
          password: userData.password,
        },
      });

      expect(loginResponse.status()).toBe(200);

      const loginData = await loginResponse.json();
      expect(loginData).toHaveProperty("token");
      expect(loginData).toHaveProperty("user");

      authToken = loginData.token;
    });

    test("should reject invalid credentials", async () => {
      const response = await apiContext.post("/api/auth/login", {
        data: {
          email: "invalid@email.com",
          password: "wrongpassword",
        },
      });

      expect(response.status()).toBe(401);

      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
    });

    test("should validate email format", async () => {
      const response = await apiContext.post("/api/auth/signup", {
        data: {
          email: "invalid-email",
          password: "ValidPassword123!",
          firstName: "Test",
          lastName: "User",
        },
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData.error).toContain("email");
    });

    test("should validate password strength", async () => {
      const response = await apiContext.post("/api/auth/signup", {
        data: {
          email: faker.internet.email(),
          password: "weak",
          firstName: "Test",
          lastName: "User",
        },
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData.error).toContain("password");
    });
  });

  test.describe("Cases API", () => {
    test.beforeEach(async () => {
      // Ensure we have an authenticated user
      if (!authToken) {
        const userData = generateUserData();
        await apiContext.post("/api/auth/signup", { data: userData });

        const loginResponse = await apiContext.post("/api/auth/login", {
          data: { email: userData.email, password: userData.password },
        });

        const loginData = await loginResponse.json();
        authToken = loginData.token;
        userId = loginData.user.id;
      }
    });

    test("should create new case", async () => {
      const caseData = generateCaseData();

      const response = await apiContext.post("/api/cases", {
        data: { ...caseData, user_id: userId },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(response.status()).toBe(201);

      const responseData = await response.json();
      expect(responseData.title).toBe(caseData.title);
      expect(responseData.description).toBe(caseData.description);
      expect(responseData.status).toBe(caseData.status);
    });

    test("should get user cases", async () => {
      // Create a case first
      const caseData = generateCaseData();
      await apiContext.post("/api/cases", {
        data: { ...caseData, user_id: userId },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const response = await apiContext.get(`/api/cases?user_id=${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(200);

      const cases = await response.json();
      expect(Array.isArray(cases)).toBe(true);
      expect(cases.length).toBeGreaterThan(0);
    });

    test("should update case", async () => {
      // Create a case first
      const caseData = generateCaseData();
      const createResponse = await apiContext.post("/api/cases", {
        data: { ...caseData, user_id: userId },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const createdCase = await createResponse.json();

      // Update the case
      const updateData = { status: "in_review" };
      const updateResponse = await apiContext.patch(
        `/api/cases/${createdCase.id}`,
        {
          data: updateData,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      expect(updateResponse.status()).toBe(200);

      const updatedCase = await updateResponse.json();
      expect(updatedCase.status).toBe("in_review");
    });

    test("should delete case", async () => {
      // Create a case first
      const caseData = generateCaseData();
      const createResponse = await apiContext.post("/api/cases", {
        data: { ...caseData, user_id: userId },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const createdCase = await createResponse.json();

      // Delete the case
      const deleteResponse = await apiContext.delete(
        `/api/cases/${createdCase.id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      expect(deleteResponse.status()).toBe(204);

      // Verify case is deleted
      const getResponse = await apiContext.get(`/api/cases/${createdCase.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(getResponse.status()).toBe(404);
    });

    test("should require authentication", async () => {
      const caseData = generateCaseData();

      const response = await apiContext.post("/api/cases", {
        data: caseData,
      });

      expect(response.status()).toBe(401);
    });

    test("should validate required fields", async () => {
      const response = await apiContext.post("/api/cases", {
        data: { description: "Missing title" },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData.error).toContain("title");
    });
  });

  test.describe("Documents API", () => {
    test.beforeEach(async () => {
      // Ensure we have an authenticated user
      if (!authToken) {
        const userData = generateUserData();
        await apiContext.post("/api/auth/signup", { data: userData });

        const loginResponse = await apiContext.post("/api/auth/login", {
          data: { email: userData.email, password: userData.password },
        });

        const loginData = await loginResponse.json();
        authToken = loginData.token;
        userId = loginData.user.id;
      }
    });

    test("should upload document", async () => {
      const documentData = {
        name: "API Test Document",
        description: "Document uploaded via API test",
        user_id: userId,
      };

      // Create a test file
      const fileContent = "This is test document content";
      const formData = new FormData();
      formData.append("name", documentData.name);
      formData.append("description", documentData.description);
      formData.append("user_id", documentData.user_id);
      formData.append(
        "file",
        new Blob([fileContent], { type: "text/plain" }),
        "test.txt"
      );

      const response = await apiContext.post("/api/documents", {
        multipart: {
          name: documentData.name,
          description: documentData.description,
          user_id: documentData.user_id,
          file: {
            name: "test.txt",
            mimeType: "text/plain",
            buffer: Buffer.from(fileContent),
          },
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(201);

      const responseData = await response.json();
      expect(responseData.name).toBe(documentData.name);
      expect(responseData.description).toBe(documentData.description);
    });

    test("should get user documents", async () => {
      const response = await apiContext.get(
        `/api/documents?user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      expect(response.status()).toBe(200);

      const documents = await response.json();
      expect(Array.isArray(documents)).toBe(true);
    });

    test("should validate file type", async () => {
      const response = await apiContext.post("/api/documents", {
        multipart: {
          name: "Invalid File",
          description: "This should fail",
          user_id: userId,
          file: {
            name: "malicious.exe",
            mimeType: "application/x-executable",
            buffer: Buffer.from("malicious content"),
          },
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData.error).toContain("file type");
    });

    test("should validate file size", async () => {
      // Create a large file (simulate)
      const largeContent = "x".repeat(10 * 1024 * 1024); // 10MB

      const response = await apiContext.post("/api/documents", {
        multipart: {
          name: "Large File",
          description: "This file is too large",
          user_id: userId,
          file: {
            name: "large.txt",
            mimeType: "text/plain",
            buffer: Buffer.from(largeContent),
          },
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData.error).toContain("file size");
    });
  });

  test.describe("Chat API", () => {
    test.beforeEach(async () => {
      // Ensure we have an authenticated user
      if (!authToken) {
        const userData = generateUserData();
        await apiContext.post("/api/auth/signup", { data: userData });

        const loginResponse = await apiContext.post("/api/auth/login", {
          data: { email: userData.email, password: userData.password },
        });

        const loginData = await loginResponse.json();
        authToken = loginData.token;
        userId = loginData.user.id;
      }
    });

    test("should create chat session", async () => {
      const sessionData = {
        title: "API Test Chat",
        context: "immigration_guidance",
        user_id: userId,
      };

      const response = await apiContext.post("/api/chat/sessions", {
        data: sessionData,
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(201);

      const responseData = await response.json();
      expect(responseData.title).toBe(sessionData.title);
      expect(responseData.context).toBe(sessionData.context);
    });

    test("should send message", async () => {
      // Create session first
      const sessionResponse = await apiContext.post("/api/chat/sessions", {
        data: {
          title: "Test Session",
          context: "immigration_guidance",
          user_id: userId,
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const session = await sessionResponse.json();

      // Send message
      const messageData = {
        session_id: session.id,
        role: "user",
        content: "What documents do I need for a work visa?",
      };

      const response = await apiContext.post("/api/chat/messages", {
        data: messageData,
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(201);

      const responseData = await response.json();
      expect(responseData.content).toBe(messageData.content);
      expect(responseData.role).toBe(messageData.role);
    });

    test("should get chat history", async () => {
      // Create session and send message first
      const sessionResponse = await apiContext.post("/api/chat/sessions", {
        data: {
          title: "Test Session",
          context: "immigration_guidance",
          user_id: userId,
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const session = await sessionResponse.json();

      await apiContext.post("/api/chat/messages", {
        data: {
          session_id: session.id,
          role: "user",
          content: "Test message",
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Get chat history
      const response = await apiContext.get(
        `/api/chat/sessions/${session.id}/messages`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      expect(response.status()).toBe(200);

      const messages = await response.json();
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBeGreaterThan(0);
    });
  });

  test.describe("Rate Limiting", () => {
    test("should enforce rate limits", async () => {
      const userData = generateUserData();

      // Make multiple rapid requests
      const requests = Array.from({ length: 20 }, () =>
        apiContext.post("/api/auth/signup", { data: userData })
      );

      const responses = await Promise.all(requests);

      // Some requests should be rate limited
      const rateLimitedResponses = responses.filter((r) => r.status() === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    test("should include rate limit headers", async () => {
      const response = await apiContext.get("/api/health");

      const headers = response.headers();
      expect(headers).toHaveProperty("x-ratelimit-limit");
      expect(headers).toHaveProperty("x-ratelimit-remaining");
    });
  });

  test.describe("Error Handling", () => {
    test("should handle 404 for non-existent resources", async () => {
      const response = await apiContext.get("/api/cases/non-existent-id", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(404);

      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
    });

    test("should handle malformed JSON", async () => {
      const response = await apiContext.post("/api/cases", {
        data: "invalid json",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status()).toBe(400);
    });

    test("should handle server errors gracefully", async () => {
      // This would require mocking or a specific test endpoint
      // For now, we'll test that the API returns proper error format
      const response = await apiContext.get("/api/non-existent-endpoint");

      expect(response.status()).toBe(404);

      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
      expect(typeof errorData.error).toBe("string");
    });
  });

  test.describe("Health Check", () => {
    test("should return health status", async () => {
      const response = await apiContext.get("/api/health");

      expect(response.status()).toBe(200);

      const healthData = await response.json();
      expect(healthData).toHaveProperty("status");
      expect(healthData.status).toBe("ok");
    });

    test("should include system information", async () => {
      const response = await apiContext.get("/api/health");

      const healthData = await response.json();
      expect(healthData).toHaveProperty("timestamp");
      expect(healthData).toHaveProperty("version");
    });
  });
});
