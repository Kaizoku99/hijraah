import { expect, test } from "../fixtures";
import { HijraahChatPage } from "../pages/hijraah-chat";
import { HijraahArtifactPage } from "../pages/hijraah-artifact";
import { createTestSpan } from "../helpers/test-tracing";

// Context7 - Observability: Test suite with distributed tracing
test.describe("Hijraah Artifacts E2E Tests (Context7 Compliant)", () => {
  let chatPage: HijraahChatPage;
  let artifactPage: HijraahArtifactPage;

  test.beforeEach(async ({ page, context }) => {
    // Context7 - Tracing: Initialize test span for observability
    const testSpan = createTestSpan("artifacts_e2e_test");

    chatPage = new HijraahChatPage(page);
    artifactPage = new HijraahArtifactPage(page);

    // Context7 - Observability: Add test metadata to page context
    await page.addInitScript(() => {
      window.TEST_MODE = true;
      window.TEST_CONTEXT = {
        suite: "artifacts",
        timestamp: Date.now(),
      };
    });

    await chatPage.createNewChat();

    testSpan.setAttributes({
      "test.setup": "complete",
      "test.suite": "artifacts",
    });
  });

  // Context7 - Modularity: Text artifact creation and validation
  test("Create and validate text artifact with Context7 observability", async ({
    page,
  }) => {
    const testSpan = createTestSpan("create_text_artifact", {
      "artifact.type": "text",
      "test.feature": "creation",
    });

    try {
      // Context7 - Data-as-Code: Test with structured content
      const testPrompt =
        "Help me write a comprehensive immigration guide for skilled workers moving to Canada, including Express Entry requirements and provincial nominee programs.";

      await chatPage.sendUserMessage(testPrompt);
      await artifactPage.isGenerationComplete();

      // Context7 - Observability: Verify artifact visibility
      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.visible": true,
        "artifact.creation_time": Date.now(),
      });

      // Context7 - Data-as-Code: Validate assistant response
      const assistantMessage = await chatPage.getRecentAssistantMessage();
      expect(assistantMessage.content).toContain("document");

      // Context7 - Tracing: Verify chat ID generation
      await chatPage.hasChatIdInUrl();
      testSpan.setAttributes({
        "chat.id_generated": true,
        "test.status": "success",
      });

      // Context7 - Observability: Validate artifact metadata
      const artifactMetadata = await artifactPage.getArtifactMetadata();
      expect(artifactMetadata.kind).toBe("text");
      expect(artifactMetadata.title).toBeTruthy();
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Modularity: Artifact visibility toggle
  test("Toggle artifact visibility with state management", async ({ page }) => {
    const testSpan = createTestSpan("toggle_artifact_visibility", {
      "test.feature": "visibility_toggle",
    });

    try {
      await chatPage.sendUserMessage(
        "Create a code snippet for a NextJS middleware function with authentication",
      );
      await artifactPage.isGenerationComplete();

      // Context7 - Observability: Verify initial visibility
      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.initial_visibility": true,
      });

      // Context7 - Provider Isolation: Test artifact close functionality
      await artifactPage.closeArtifact();
      await chatPage.isElementNotVisible("artifact");
      testSpan.setAttributes({
        "artifact.closed": true,
      });

      // Context7 - Resumability: Test artifact reopen
      await artifactPage.reopenArtifact();
      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.reopened": true,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Resumability: Follow-up message handling
  test("Send follow-up message after artifact generation", async ({ page }) => {
    const testSpan = createTestSpan("followup_message_after_artifact", {
      "test.feature": "message_continuity",
    });

    try {
      // Context7 - Data-as-Code: Initial artifact creation
      await chatPage.sendUserMessage(
        "Create a comprehensive checklist for immigration document preparation",
      );
      await artifactPage.isGenerationComplete();

      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.created": true,
        "artifact.type": "checklist",
      });

      // Context7 - Observability: Validate generation message
      const firstAssistantMessage = await chatPage.getRecentAssistantMessage();
      expect(firstAssistantMessage.content).toContain("checklist");

      // Context7 - Resumability: Follow-up interaction
      await chatPage.sendUserMessage(
        "Can you add estimated timeframes for each step?",
      );
      await artifactPage.isGenerationComplete();

      // Context7 - Tracing: Validate continuous conversation
      const secondAssistantMessage = await chatPage.getRecentAssistantMessage();
      expect(secondAssistantMessage.content).toBeTruthy();
      testSpan.setAttributes({
        "followup.completed": true,
        "conversation.continuous": true,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Modularity: Multi-format artifact support
  test("Create and validate code artifact with syntax highlighting", async ({
    page,
  }) => {
    const testSpan = createTestSpan("create_code_artifact", {
      "artifact.type": "code",
      "test.feature": "syntax_highlighting",
    });

    try {
      // Context7 - Data-as-Code: Request code artifact
      await chatPage.sendUserMessage(
        "Write a TypeScript function to calculate immigration points based on age, education, and language scores",
      );
      await artifactPage.isGenerationComplete();

      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.visible": true,
        "artifact.type": "code",
      });

      // Context7 - Observability: Validate code artifact features
      const artifactMetadata = await artifactPage.getArtifactMetadata();
      expect(artifactMetadata.kind).toBe("code");

      // Context7 - Provider Isolation: Test syntax highlighting
      const hasCodeHighlighting =
        await artifactPage.hasCodeSyntaxHighlighting();
      expect(hasCodeHighlighting).toBe(true);
      testSpan.setAttributes({
        "code.syntax_highlighting": true,
      });

      // Context7 - Modularity: Test code execution capabilities
      const canExecuteCode = await artifactPage.canExecuteCode();
      testSpan.setAttributes({
        "code.executable": canExecuteCode,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Data-as-Code: Version management and diff view
  test("Artifact version management and diff visualization", async ({
    page,
  }) => {
    const testSpan = createTestSpan("artifact_version_management", {
      "test.feature": "version_control",
    });

    try {
      // Context7 - Data-as-Code: Create initial artifact version
      await chatPage.sendUserMessage(
        "Create a template email for visa application follow-up",
      );
      await artifactPage.isGenerationComplete();

      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "artifact.version": 1,
        "artifact.type": "text",
      });

      // Context7 - Resumability: Request modification
      await chatPage.sendUserMessage(
        "Make the email more formal and add legal disclaimer",
      );
      await artifactPage.isGenerationComplete();

      // Context7 - Observability: Validate version history
      const versionCount = await artifactPage.getVersionCount();
      expect(versionCount).toBeGreaterThan(1);
      testSpan.setAttributes({
        "artifact.versions": versionCount,
      });

      // Context7 - Modularity: Test diff view
      await artifactPage.toggleDiffView();
      const diffViewVisible = await artifactPage.isDiffViewVisible();
      expect(diffViewVisible).toBe(true);
      testSpan.setAttributes({
        "diff.view_available": true,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Provider Isolation: Guest user artifact access
  test("Guest user artifact creation and limitations", async ({
    page,
    context,
  }) => {
    const testSpan = createTestSpan("guest_artifact_access", {
      "user.type": "guest",
      "test.feature": "access_control",
    });

    try {
      // Context7 - Provider Isolation: Switch to guest mode
      await chatPage.switchToGuestMode();
      testSpan.setAttributes({
        "user.auth_mode": "guest",
      });

      // Context7 - Data-as-Code: Test artifact creation as guest
      await chatPage.sendUserMessage(
        "Help me understand the basic requirements for Canadian permanent residence",
      );
      await artifactPage.isGenerationComplete();

      await expect(artifactPage.artifact).toBeVisible();
      testSpan.setAttributes({
        "guest.artifact_created": true,
      });

      // Context7 - Observability: Validate guest limitations
      const guestLimitations = await artifactPage.getGuestLimitations();
      expect(guestLimitations.canSave).toBe(false);
      expect(guestLimitations.canShare).toBe(false);
      testSpan.setAttributes({
        "guest.save_restricted": !guestLimitations.canSave,
        "guest.share_restricted": !guestLimitations.canShare,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });

  // Context7 - Observability: Performance monitoring
  test("Artifact performance and loading metrics", async ({ page }) => {
    const testSpan = createTestSpan("artifact_performance", {
      "test.feature": "performance_monitoring",
    });

    try {
      const startTime = Date.now();

      // Context7 - Observability: Monitor artifact creation time
      await chatPage.sendUserMessage(
        "Generate a detailed immigration timeline with multiple phases",
      );

      const generationStartTime = Date.now();
      await artifactPage.isGenerationComplete();
      const generationEndTime = Date.now();

      await expect(artifactPage.artifact).toBeVisible();
      const artifactLoadTime = Date.now();

      // Context7 - Tracing: Capture performance metrics
      const metrics = {
        generation_time: generationEndTime - generationStartTime,
        artifact_load_time: artifactLoadTime - generationEndTime,
        total_time: artifactLoadTime - startTime,
      };

      testSpan.setAttributes({
        "performance.generation_time_ms": metrics.generation_time,
        "performance.artifact_load_time_ms": metrics.artifact_load_time,
        "performance.total_time_ms": metrics.total_time,
      });

      // Context7 - Data-as-Code: Validate performance thresholds
      expect(metrics.generation_time).toBeLessThan(30000); // 30 seconds max
      expect(metrics.artifact_load_time).toBeLessThan(2000); // 2 seconds max
      testSpan.setAttributes({
        "performance.within_thresholds": true,
        "test.status": "success",
      });
    } catch (error) {
      testSpan.setAttributes({
        "test.status": "failed",
        "test.error": error.message,
      });
      throw error;
    } finally {
      testSpan.end();
    }
  });
});

// Context7 - Observability: Test suite completion tracking
test.afterAll(async () => {
  const suiteSpan = createTestSpan("artifacts_test_suite_complete", {
    "test.suite": "artifacts",
    "test.completion_time": Date.now(),
  });

  suiteSpan.setAttributes({
    "test.status": "completed",
  });

  suiteSpan.end();
});
