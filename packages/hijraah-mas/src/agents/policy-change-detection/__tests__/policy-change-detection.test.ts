import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  PolicyMonitoringAgent,
  ImpactAssessmentAgent,
  NotificationGenerationAgent,
  TrendAnalysisAgent,
  CrossJurisdictionAgent,
  PolicyChangeDetectionTeam,
} from '../index';

// Mock Supabase client
const mockSupabaseClient = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn(() => ({ data: null, error: null })),
        limit: vi.fn(() => ({ data: [], error: null })),
        order: vi.fn(() => ({ data: [], error: null })),
      })),
      in: vi.fn(() => ({
        limit: vi.fn(() => ({ data: [], error: null })),
        order: vi.fn(() => ({ data: [], error: null })),
      })),
      gte: vi.fn(() => ({
        lte: vi.fn(() => ({
          order: vi.fn(() => ({ data: [], error: null })),
        })),
      })),
      ilike: vi.fn(() => ({
        eq: vi.fn(() => ({
          gte: vi.fn(() => ({
            lte: vi.fn(() => ({
              limit: vi.fn(() => ({ data: [], error: null })),
            })),
          })),
        })),
      })),
      overlaps: vi.fn(() => ({
        order: vi.fn(() => ({ data: [], error: null })),
      })),
    })),
    insert: vi.fn(() => ({ error: null })),
  })),
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

// Mock AI SDK
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  tool: vi.fn(),
}));

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(() => 'mocked-openai-model'),
}));

describe('Policy Change Detection Agents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
  });

  describe('PolicyMonitoringAgent', () => {
    let agent: PolicyMonitoringAgent;

    beforeEach(() => {
      agent = new PolicyMonitoringAgent();
    });

    it('should initialize correctly', () => {
      expect(agent).toBeInstanceOf(PolicyMonitoringAgent);
    });

    it('should have monitoring methods', () => {
      expect(typeof agent.monitorPolicyChanges).toBe('function');
      expect(typeof agent.analyzePolicyDocument).toBe('function');
      expect(typeof agent.getMonitoringStatus).toBe('function');
    });
  });

  describe('ImpactAssessmentAgent', () => {
    let agent: ImpactAssessmentAgent;

    beforeEach(() => {
      agent = new ImpactAssessmentAgent();
    });

    it('should initialize correctly', () => {
      expect(agent).toBeInstanceOf(ImpactAssessmentAgent);
    });

    it('should have assessment methods', () => {
      expect(typeof agent.assessPolicyImpact).toBe('function');
      expect(typeof agent.batchAssessImpacts).toBe('function');
      expect(typeof agent.generateMitigationStrategies).toBe('function');
    });
  });

  describe('NotificationGenerationAgent', () => {
    let agent: NotificationGenerationAgent;

    beforeEach(() => {
      agent = new NotificationGenerationAgent();
    });

    it('should initialize correctly', () => {
      expect(agent).toBeInstanceOf(NotificationGenerationAgent);
    });

    it('should have notification methods', () => {
      expect(typeof agent.generateNotification).toBe('function');
      expect(typeof agent.generateBatchNotifications).toBe('function');
      expect(typeof agent.generateFollowUpNotification).toBe('function');
      expect(typeof agent.generateEmergencyNotification).toBe('function');
    });
  });

  describe('TrendAnalysisAgent', () => {
    let agent: TrendAnalysisAgent;

    beforeEach(() => {
      agent = new TrendAnalysisAgent();
    });

    it('should initialize correctly', () => {
      expect(agent).toBeInstanceOf(TrendAnalysisAgent);
    });

    it('should have analysis methods', () => {
      expect(typeof agent.analyzeTrends).toBe('function');
      expect(typeof agent.generatePredictions).toBe('function');
      expect(typeof agent.compareTrends).toBe('function');
    });
  });

  describe('CrossJurisdictionAgent', () => {
    let agent: CrossJurisdictionAgent;

    beforeEach(() => {
      agent = new CrossJurisdictionAgent();
    });

    it('should initialize correctly', () => {
      expect(agent).toBeInstanceOf(CrossJurisdictionAgent);
    });

    it('should have jurisdiction methods', () => {
      expect(typeof agent.analyzeJurisdictions).toBe('function');
      expect(typeof agent.generateHarmonizationPlan).toBe('function');
      expect(typeof agent.monitorHarmonizationProgress).toBe('function');
    });
  });

  describe('PolicyChangeDetectionTeam', () => {
    let team: PolicyChangeDetectionTeam;

    beforeEach(() => {
      team = new PolicyChangeDetectionTeam();
    });

    it('should initialize correctly', () => {
      expect(team).toBeInstanceOf(PolicyChangeDetectionTeam);
    });

    it('should have team coordination methods', () => {
      expect(typeof team.processPolicyChange).toBe('function');
      expect(typeof team.handleEmergencyPolicyChange).toBe('function');
      expect(typeof team.getTeamStatus).toBe('function');
    });

    it('should return team status', async () => {
      const status = await team.getTeamStatus();
      
      expect(status).toHaveProperty('status');
      expect(status).toHaveProperty('timestamp');
      
      if (status.status === 'operational') {
        expect(status).toHaveProperty('agents');
        expect(status).toHaveProperty('capabilities');
        
        expect(status.agents).toHaveProperty('policyMonitor');
        expect(status.agents).toHaveProperty('impactAssessor');
        expect(status.agents).toHaveProperty('notificationGenerator');
        expect(status.agents).toHaveProperty('trendAnalyzer');
        expect(status.agents).toHaveProperty('crossJurisdictionAnalyzer');
      } else {
        // Error case - should have error property
        expect(status).toHaveProperty('error');
      }
    });
  });
});

describe('Policy Change Detection Integration', () => {
  let team: PolicyChangeDetectionTeam;

  beforeEach(() => {
    team = new PolicyChangeDetectionTeam();
  });

  it('should handle no changes detected scenario', async () => {
    const result = await team.processPolicyChange(
      ['https://example.gov/policies'],
      ['user1', 'user2'],
      {
        monitoringRules: {
          keywords: ['immigration', 'visa'],
          categories: ['work_permit', 'student_visa'],
          jurisdictions: ['US', 'CA'],
        },
        impactContext: {
          userProfiles: [],
          historicalData: [],
          riskThresholds: { low: 0.3, medium: 0.6, high: 0.8 },
        },
        notificationContext: {
          userPreferences: {
            channels: ['email'],
            frequency: 'immediate',
            urgency: ['high', 'critical'],
          },
          deliverySettings: {
            timezone: 'UTC',
            language: 'en',
            format: 'html',
          },
        },
        trendContext: {
          historicalPeriod: 12,
          analysisDepth: 'detailed',
          includePredictions: true,
        },
        jurisdictionContext: {
          targetJurisdictions: ['US', 'CA'],
          comparisonCriteria: ['requirements', 'timelines'],
          harmonizationGoals: ['standardization'],
        },
      }
    );

    expect(result).toHaveProperty('status', 'no_changes_detected');
    expect(result).toHaveProperty('timestamp');
  });

  it('should handle emergency policy changes', async () => {
    const mockPolicyChange = {
      id: 'emergency-001',
      title: 'Emergency Immigration Policy Update',
      description: 'Critical changes to visa processing',
      country: 'US',
      jurisdiction: 'federal',
      effectiveDate: new Date().toISOString(),
      detectedAt: new Date().toISOString(),
      changeType: 'amendment',
      severity: 'critical',
      affectedCategories: ['work_permit'],
      sourceUrl: 'https://example.gov/emergency-update',
      confidence: 0.95,
      rawContent: 'Emergency policy content...',
    };

    const result = await team.handleEmergencyPolicyChange(
      mockPolicyChange,
      ['user1', 'user2'],
      {
        timeToDeadline: 24,
        criticalActions: ['submit_documents', 'update_application'],
        escalationLevel: 'critical',
      }
    );

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('results');
  });
});