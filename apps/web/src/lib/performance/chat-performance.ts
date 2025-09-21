/**
 * Chat Performance Monitoring
 * Tracks key metrics for chat loading and interaction performance
 */

interface ChatPerformanceMetrics {
  navigationStart: number;
  chatCreated?: number;
  chatLoaded?: number;
  firstMessage?: number;
  streamStart?: number;
  streamEnd?: number;
}

class ChatPerformanceMonitor {
  private metrics: Map<string, ChatPerformanceMetrics> = new Map();
  private readonly PERFORMANCE_THRESHOLD_MS = 2000; // 2 seconds

  /**
   * Start tracking performance for a chat session
   */
  startTracking(chatId: string): void {
    const now = performance.now();
    this.metrics.set(chatId, {
      navigationStart: now,
    });

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-start`);
    }
  }

  /**
   * Mark when chat creation completes
   */
  markChatCreated(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    metrics.chatCreated = performance.now();

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-created`);
      performance.measure(
        `chat-${chatId}-create-time`,
        `chat-${chatId}-start`,
        `chat-${chatId}-created`
      );
    }
  }

  /**
   * Mark when chat UI fully loads
   */
  markChatLoaded(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    metrics.chatLoaded = performance.now();

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-loaded`);
      performance.measure(
        `chat-${chatId}-load-time`,
        `chat-${chatId}-start`,
        `chat-${chatId}-loaded`
      );
    }

    // Log metrics if loading is too slow
    this.checkPerformanceThreshold(chatId);
  }

  /**
   * Mark when first message is sent
   */
  markFirstMessage(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    metrics.firstMessage = performance.now();

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-first-message`);
    }
  }

  /**
   * Mark when streaming starts
   */
  markStreamStart(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    metrics.streamStart = performance.now();

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-stream-start`);
    }
  }

  /**
   * Mark when streaming completes
   */
  markStreamEnd(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    metrics.streamEnd = performance.now();

    if (typeof window !== "undefined") {
      performance.mark(`chat-${chatId}-stream-end`);

      if (metrics.streamStart) {
        performance.measure(
          `chat-${chatId}-stream-duration`,
          `chat-${chatId}-stream-start`,
          `chat-${chatId}-stream-end`
        );
      }
    }

    // Log complete metrics
    this.logCompleteMetrics(chatId);
  }

  /**
   * Get current metrics for a chat
   */
  getMetrics(chatId: string): ChatPerformanceMetrics | null {
    return this.metrics.get(chatId) || null;
  }

  /**
   * Check if performance meets threshold and log warnings
   */
  private checkPerformanceThreshold(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics || !metrics.chatLoaded) return;

    const totalLoadTime = metrics.chatLoaded - metrics.navigationStart;

    if (totalLoadTime > this.PERFORMANCE_THRESHOLD_MS) {
      console.warn(`[ChatPerformance] Slow chat load detected:`, {
        chatId,
        totalLoadTime: `${Math.round(totalLoadTime)}ms`,
        threshold: `${this.PERFORMANCE_THRESHOLD_MS}ms`,
        breakdown: {
          chatCreation: metrics.chatCreated
            ? `${Math.round(metrics.chatCreated - metrics.navigationStart)}ms`
            : "N/A",
          uiLoad: `${Math.round(totalLoadTime)}ms`,
        },
      });

      // In development, also send to performance observer if available
      if (
        process.env.NODE_ENV === "development" &&
        typeof window !== "undefined"
      ) {
        // Send to analytics or monitoring service
        this.sendToAnalytics(chatId, totalLoadTime);
      }
    } else {
      console.log(`[ChatPerformance] Chat loaded efficiently:`, {
        chatId,
        totalLoadTime: `${Math.round(totalLoadTime)}ms`,
      });
    }
  }

  /**
   * Log complete performance metrics
   */
  private logCompleteMetrics(chatId: string): void {
    const metrics = this.metrics.get(chatId);
    if (!metrics) return;

    const completeMetrics = {
      chatId,
      navigationStart: 0, // Relative baseline
      chatCreated: metrics.chatCreated
        ? Math.round(metrics.chatCreated - metrics.navigationStart)
        : null,
      chatLoaded: metrics.chatLoaded
        ? Math.round(metrics.chatLoaded - metrics.navigationStart)
        : null,
      firstMessage: metrics.firstMessage
        ? Math.round(metrics.firstMessage - metrics.navigationStart)
        : null,
      streamStart: metrics.streamStart
        ? Math.round(metrics.streamStart - metrics.navigationStart)
        : null,
      streamEnd: metrics.streamEnd
        ? Math.round(metrics.streamEnd - metrics.navigationStart)
        : null,
      streamDuration:
        metrics.streamStart && metrics.streamEnd
          ? Math.round(metrics.streamEnd - metrics.streamStart)
          : null,
    };

    console.log(
      `[ChatPerformance] Complete metrics for ${chatId}:`,
      completeMetrics
    );

    // Clean up metrics to prevent memory leaks
    setTimeout(() => {
      this.metrics.delete(chatId);
    }, 60000); // Clean up after 1 minute
  }

  /**
   * Send performance data to analytics
   */
  private sendToAnalytics(chatId: string, loadTime: number): void {
    // In a real app, you'd send this to your analytics service
    // For now, just log to console
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "chat_performance", {
        event_category: "performance",
        event_label: "slow_load",
        value: Math.round(loadTime),
        custom_parameter_chat_id: chatId,
      });
    }
  }

  /**
   * Reset all metrics (useful for cleanup)
   */
  reset(): void {
    this.metrics.clear();

    if (typeof window !== "undefined") {
      // Clear performance marks
      performance
        .getEntriesByType("mark")
        .filter((entry) => entry.name.startsWith("chat-"))
        .forEach((entry) => performance.clearMarks(entry.name));

      performance
        .getEntriesByType("measure")
        .filter((entry) => entry.name.startsWith("chat-"))
        .forEach((entry) => performance.clearMeasures(entry.name));
    }
  }
}

// Export singleton instance
export const chatPerformanceMonitor = new ChatPerformanceMonitor();

// Export hook for React components
export function useChatPerformance(chatId: string) {
  return {
    startTracking: () => chatPerformanceMonitor.startTracking(chatId),
    markChatCreated: () => chatPerformanceMonitor.markChatCreated(chatId),
    markChatLoaded: () => chatPerformanceMonitor.markChatLoaded(chatId),
    markFirstMessage: () => chatPerformanceMonitor.markFirstMessage(chatId),
    markStreamStart: () => chatPerformanceMonitor.markStreamStart(chatId),
    markStreamEnd: () => chatPerformanceMonitor.markStreamEnd(chatId),
    getMetrics: () => chatPerformanceMonitor.getMetrics(chatId),
  };
}
