import { createClient } from '@/lib/supabase/client';
import type { ChatAnalytics, ChatEvent, ChatMessage, ChatSession } from '@/types/chat';

class AnalyticsService {
  private supabase = createClient();
  private static instance: AnalyticsService;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Track chat events
  public async trackEvent(event: ChatEvent): Promise<void> {
    try {
      await this.supabase
        .from('analytics_events')
        .insert({
          type: event.type,
          payload: event.payload,
          timestamp: event.timestamp,
          metadata: event.metadata,
        });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track message metrics
  public async trackMessage(message: ChatMessage): Promise<void> {
    try {
      await this.supabase
        .from('analytics_messages')
        .insert({
          message_id: message.id,
          session_id: message.session_id,
          user_id: message.user_id,
          role: message.role,
          tokens: message.metadata?.tokens || 0,
          model: message.metadata?.model,
          created_at: message.created_at,
        });
    } catch (error) {
      console.error('Failed to track message:', error);
    }
  }

  // Get chat analytics
  public async getChatAnalytics(userId: string): Promise<ChatAnalytics> {
    try {
      // Get total messages
      const { count: totalMessages } = await this.supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get sessions count
      const { count: sessionsCount } = await this.supabase
        .from('chat_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get average response time
      const { data: responseTimeData } = await this.supabase
        .rpc('get_average_response_time', { user_id: userId });

      // Get error rate
      const { data: errorData } = await this.supabase
        .rpc('get_error_rate', { user_id: userId });

      // Get popular topics
      const { data: topicsData } = await this.supabase
        .rpc('get_popular_topics', { user_id: userId, limit: 5 });

      return {
        totalMessages: totalMessages || 0,
        sessionsCount: sessionsCount || 0,
        averageResponseTime: responseTimeData?.average_time || 0,
        activeUsers: 1, // This would come from a separate calculation
        popularTopics: topicsData || [],
        userSatisfaction: 0, // This would come from feedback data
        errorRate: errorData?.error_rate || 0,
      };
    } catch (error) {
      console.error('Failed to get analytics:', error);
      throw error;
    }
  }

  // Track session metrics
  public async trackSession(session: ChatSession): Promise<void> {
    try {
      const duration = session.ended_at
        ? new Date(session.ended_at).getTime() - new Date(session.started_at).getTime()
        : 0;

      await this.supabase
        .from('analytics_sessions')
        .insert({
          session_id: session.id,
          user_id: session.user_id,
          case_id: session.case_id,
          duration,
          messages_count: 0, // This would be updated as messages are added
          status: session.status,
          created_at: session.created_at,
        });
    } catch (error) {
      console.error('Failed to track session:', error);
    }
  }

  // Track errors
  public async trackError(error: Error, context?: Record<string, any>): Promise<void> {
    try {
      await this.supabase
        .from('analytics_errors')
        .insert({
          error_message: error.message,
          error_stack: error.stack,
          context,
          created_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Failed to track error:', error);
    }
  }

  // Track user satisfaction
  public async trackSatisfaction(
    sessionId: string,
    rating: number,
    feedback?: string
  ): Promise<void> {
    try {
      await this.supabase
        .from('analytics_feedback')
        .insert({
          session_id: sessionId,
          rating,
          feedback,
          created_at: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Failed to track satisfaction:', error);
    }
  }
}

export const analytics = AnalyticsService.getInstance(); 