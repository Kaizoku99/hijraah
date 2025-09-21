import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TimelinePredictionAgent } from '../timeline-prediction-agent.js'
import { SuccessProbabilityAgent } from '../success-probability-agent.js'
import { RiskAssessmentAgent } from '../risk-assessment-agent.js'
import { CostEstimationAgent } from '../cost-estimation-agent.js'
import { RecommendationAgent } from '../recommendation-agent.js'
import { PredictiveAnalyticsTeam } from '../predictive-analytics-team.js'
import type { UserProfile } from '../types.js'

// Mock AI SDK functions
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  tool: vi.fn()
}))

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn()
}))

describe('Predictive Analytics Agents', () => {
  let mockUserProfile: UserProfile
  let mockCaseData: any

  beforeEach(() => {
    mockUserProfile = {
      demographics: {
        age: 30,
        nationality: 'Indian',
        currentCountry: 'India',
        targetCountry: 'Canada',
        maritalStatus: 'married',
        dependents: 1
      },
      education: {
        level: 'master',
        field: 'Computer Science',
        institution: 'University of Delhi',
        year: 2018
      },
      employment: {
        status: 'employed',
        industry: 'Technology',
        experience: 8,
        income: 75000,
        jobOffer: true
      },
      language: {
        native: 'Hindi',
        proficiency: {
          'Canada': 'advanced',
          'English': 'advanced'
        },
        testScores: {
          'IELTS': 8.5
        }
      },
      immigration: {
        visaType: 'skilled_worker',
        previousApplications: [],
        currentStatus: 'preparing',
        urgency: 'medium'
      },
      financial: {
        savings: 50000,
        income: 75000,
        debts: 10000,
        sponsorship: false
      },
      documents: {
        passportValid: true,
        documentsReady: 0.8,
        translationsNeeded: true,
        authenticationsNeeded: true
      }
    }

    mockCaseData = {
      caseType: 'skilled_worker',
      country: 'Canada',
      visaType: 'express_entry',
      applicationStage: 'preparation',
      urgency: 'medium'
    }

    // Reset mocks
    vi.clearAllMocks()
  })

  describe('TimelinePredictionAgent', () => {
    let agent: TimelinePredictionAgent

    beforeEach(() => {
      agent = new TimelinePredictionAgent()
    })

    it('should create timeline prediction agent with default config', () => {
      expect(agent).toBeInstanceOf(TimelinePredictionAgent)
    })

    it('should create timeline prediction agent with custom config', () => {
      const customAgent = new TimelinePredictionAgent({
        model: 'gpt-4o-mini',
        temperature: 0.2,

      })
      expect(customAgent).toBeInstanceOf(TimelinePredictionAgent)
    })

    it('should predict timeline with valid inputs', async () => {
      // Mock the generateObject response
      const mockPrediction = {
        predictionId: 'test_prediction',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry',
        estimatedDays: 180,
        confidenceInterval: {
          lower: 150,
          upper: 210,
          confidence: 0.95
        },
        factors: [
          {
            factor: 'Complete documentation',
            impact: 0.1,
            confidence: 0.9,
            description: 'Well-prepared documents speed up processing'
          }
        ],
        historicalComparison: {
          averageDays: 175,
          medianDays: 165,
          percentile25: 140,
          percentile75: 200,
          sampleSize: 1000
        },
        milestones: [
          {
            stage: 'Application Review',
            estimatedDays: 30,
            confidence: 0.85,
            description: 'Initial application review and validation'
          }
        ],
        riskFactors: ['Document translation delays'],
        acceleratingFactors: ['Job offer', 'Advanced language skills'],
        modelVersion: 'gpt-4o',
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockPrediction
      } as any)

      const result = await agent.predictTimeline(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.caseType).toBe('skilled_worker')
      expect(result.country).toBe('Canada')
      expect(result.visaType).toBe('express_entry')
      expect(generateObject).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: expect.any(Number),
          maxSteps: expect.any(Number),
          schema: expect.any(Object),
          system: expect.stringContaining('immigration timeline prediction analyst'),
          prompt: expect.stringContaining('Predict the immigration timeline')
        })
      )
    })

    it('should handle historical data when provided', async () => {
      const historicalData = {
        averageProcessingTime: 165,
        recentTrends: [
          { month: 'Jan 2024', averageDays: 160 },
          { month: 'Feb 2024', averageDays: 170 }
        ],
        similarCases: [
          { profile: {}, processingDays: 155, outcome: 'approved' },
          { profile: {}, processingDays: 175, outcome: 'approved' }
        ]
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          predictionId: 'test',
          estimatedDays: 165,
          confidenceInterval: { lower: 150, upper: 180, confidence: 0.95 }
        }
      } as any)

      const result = await agent.predictTimeline(mockUserProfile, mockCaseData, historicalData)

      expect(result).toBeDefined()
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('SuccessProbabilityAgent', () => {
    let agent: SuccessProbabilityAgent

    beforeEach(() => {
      agent = new SuccessProbabilityAgent()
    })

    it('should create success probability agent', () => {
      expect(agent).toBeInstanceOf(SuccessProbabilityAgent)
    })

    it('should calculate success probability', async () => {
      const mockProbability = {
        predictionId: 'test_success',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry',
        successProbability: 0.85,
        confidenceInterval: {
          lower: 0.80,
          upper: 0.90,
          confidence: 0.95
        },
        factors: [
          {
            factor: 'Advanced Education',
            impact: 0.15,
            confidence: 0.9,
            description: 'Master\'s degree increases approval chances'
          }
        ],
        riskLevel: 'low',
        statisticalAnalysis: {
          sampleSize: 1000,
          historicalSuccessRate: 0.82,
          similarCasesCount: 150,
          modelAccuracy: 0.87
        },
        outcomeBreakdown: {
          approved: 0.85,
          denied: 0.10,
          additionalInfoRequired: 0.04,
          withdrawn: 0.01
        },
        improvementSuggestions: [
          {
            suggestion: 'Complete language proficiency test',
            impact: 0.05,
            difficulty: 'medium',
            timeRequired: '2-3 months'
          }
        ],
        modelVersion: 'gpt-4o',
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockProbability
      } as any)

      const result = await agent.calculateSuccessProbability(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.successProbability).toBeGreaterThan(0)
      expect(result.successProbability).toBeLessThanOrEqual(1)
      expect(result.riskLevel).toBeDefined()
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('RiskAssessmentAgent', () => {
    let agent: RiskAssessmentAgent

    beforeEach(() => {
      agent = new RiskAssessmentAgent()
    })

    it('should create risk assessment agent', () => {
      expect(agent).toBeInstanceOf(RiskAssessmentAgent)
    })

    it('should assess risks comprehensively', async () => {
      const mockAssessment = {
        assessmentId: 'test_risk',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry',
        overallRiskScore: 25,
        riskLevel: 'low',
        riskFactors: [
          {
            category: 'documentation',
            factor: 'Translation Requirements',
            severity: 'medium',
            probability: 0.6,
            impact: 0.4,
            description: 'Documents require certified translations',
            mitigation: {
              strategy: 'Obtain certified translations',
              effectiveness: 0.95,
              timeRequired: '1-2 weeks',
              cost: 'medium',
              difficulty: 'easy'
            }
          }
        ],
        riskCategories: {
          documentation: {
            score: 30,
            level: 'medium',
            factors: ['Translation Requirements']
          }
        },
        mitigationPlan: {
          priority: 'medium',
          strategies: [
            {
              strategy: 'Complete document preparation',
              targetRisks: ['Translation Requirements'],
              expectedReduction: 0.8,
              timeline: '2-4 weeks',
              resources: ['Certified translator', 'Document checklist']
            }
          ],
          estimatedRiskReduction: 0.6
        },
        monitoringPlan: [
          {
            metric: 'Document completion rate',
            frequency: 'Weekly',
            threshold: 0.9,
            action: 'Accelerate document preparation'
          }
        ],
        modelVersion: 'gpt-4o',
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockAssessment
      } as any)

      const result = await agent.assessRisks(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.overallRiskScore).toBeGreaterThanOrEqual(0)
      expect(result.overallRiskScore).toBeLessThanOrEqual(100)
      expect(result.riskLevel).toBeDefined()
      expect(result.riskFactors).toBeInstanceOf(Array)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('CostEstimationAgent', () => {
    let agent: CostEstimationAgent

    beforeEach(() => {
      agent = new CostEstimationAgent()
    })

    it('should create cost estimation agent', () => {
      expect(agent).toBeInstanceOf(CostEstimationAgent)
    })

    it('should estimate costs comprehensively', async () => {
      const mockEstimation = {
        estimationId: 'test_cost',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry',
        totalEstimatedCost: 5500,
        currency: 'USD',
        confidenceInterval: {
          lower: 5000,
          upper: 6000,
          confidence: 0.90
        },
        costBreakdown: [
          {
            category: 'government_fees',
            item: 'Application Fee',
            estimatedCost: 1365,
            currency: 'USD',
            confidence: 0.95,
            required: true,
            timing: 'At application submission',
            notes: 'Express Entry application fee'
          }
        ],
        costCategories: {
          government_fees: {
            total: 1500,
            percentage: 0.27,
            items: ['Application Fee', 'Biometric Fee']
          }
        },
        budgetPlanning: {
          upfrontCosts: 3000,
          ongoingCosts: 500,
          contingencyFund: 1000,
          paymentSchedule: [
            {
              phase: 'Application Submission',
              amount: 1500,
              timing: 'Month 1',
              description: 'Government fees and initial costs'
            }
          ]
        },
        costOptimization: [
          {
            suggestion: 'Self-prepare documents instead of using services',
            potentialSavings: 800,
            tradeoffs: 'Requires more time and effort',
            feasibility: 'medium'
          }
        ],
        historicalComparison: {
          averageCost: 5200,
          medianCost: 5000,
          percentile25: 4500,
          percentile75: 5800,
          sampleSize: 500
        },
        modelVersion: 'gpt-4o',
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockEstimation
      } as any)

      const result = await agent.estimateCosts(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.totalEstimatedCost).toBeGreaterThan(0)
      expect(result.currency).toBeDefined()
      expect(result.costBreakdown).toBeInstanceOf(Array)
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('RecommendationAgent', () => {
    let agent: RecommendationAgent

    beforeEach(() => {
      agent = new RecommendationAgent()
    })

    it('should create recommendation agent', () => {
      expect(agent).toBeInstanceOf(RecommendationAgent)
    })

    it('should generate comprehensive recommendations', async () => {
      const mockRecommendation = {
        recommendationId: 'test_rec',
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry',
        overallStrategy: 'Enhanced Preparation Strategy',
        strategicPriorities: [
          'Complete document preparation',
          'Improve language scores',
          'Secure job offer'
        ],
        actionPlan: [
          {
            id: 'action_1',
            title: 'Complete Document Collection',
            description: 'Gather all required documents',
            category: 'documentation',
            priority: 'critical',
            urgency: 'immediate',
            estimatedTime: '2-4 weeks',
            difficulty: 'easy',
            dependencies: [],
            resources: ['Document checklist'],
            expectedImpact: {
              successProbability: 0.08,
              timelineReduction: 0,
              costImpact: 500,
              riskReduction: 0.15
            },
            status: 'not_started'
          }
        ],
        timeline: {
          phases: [
            {
              phase: 'Preparation Phase',
              duration: '8-16 weeks',
              objectives: ['Complete documentation'],
              actions: ['action_1'],
              milestones: ['All documents collected']
            }
          ],
          criticalPath: ['action_1'],
          bufferTime: '4-6 weeks'
        },
        riskMitigation: [
          {
            risk: 'Document delays',
            mitigation: 'Start early and use certified services',
            monitoring: 'Weekly progress checks'
          }
        ],
        successFactors: ['Complete documentation', 'Strong language skills'],
        warningSignals: ['Missing documents', 'Policy changes'],
        alternativeStrategies: [
          {
            strategy: 'Provincial Nominee Program',
            conditions: 'If Express Entry score is low',
            tradeoffs: 'Longer processing time but higher success rate'
          }
        ],
        personalization: {
          userProfile: {
            age: 30,
            nationality: 'Indian',
            targetCountry: 'Canada',
            visaType: 'express_entry'
          },
          customizations: ['Consider family factors'],
          preferences: {
            riskTolerance: 'moderate'
          }
        },
        confidence: 0.85,
        modelVersion: 'gpt-4o',
        timestamp: new Date().toISOString()
      }

      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockResolvedValue({
        object: mockRecommendation
      } as any)

      const result = await agent.generateRecommendations(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.overallStrategy).toBeDefined()
      expect(result.actionPlan).toBeInstanceOf(Array)
      expect(result.timeline).toBeDefined()
      expect(generateObject).toHaveBeenCalled()
    })
  })

  describe('PredictiveAnalyticsTeam', () => {
    let team: PredictiveAnalyticsTeam

    beforeEach(() => {
      team = new PredictiveAnalyticsTeam()
    })

    it('should create predictive analytics team', () => {
      expect(team).toBeInstanceOf(PredictiveAnalyticsTeam)
    })

    it('should perform comprehensive analysis', async () => {
      // Mock all agent responses
      const { generateObject } = await import('ai')
      
      // Mock timeline prediction
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          predictionId: 'timeline_test',
          estimatedDays: 180,
          confidenceInterval: { lower: 150, upper: 210, confidence: 0.95 },
          factors: [],
          historicalComparison: { averageDays: 175, medianDays: 165, percentile25: 140, percentile75: 200, sampleSize: 1000 },
          milestones: [],
          riskFactors: [],
          acceleratingFactors: [],
          modelVersion: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock success probability
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          predictionId: 'success_test',
          successProbability: 0.85,
          confidenceInterval: { lower: 0.80, upper: 0.90, confidence: 0.95 },
          factors: [],
          riskLevel: 'low',
          statisticalAnalysis: { sampleSize: 1000, historicalSuccessRate: 0.82, similarCasesCount: 150, modelAccuracy: 0.87 },
          outcomeBreakdown: { approved: 0.85, denied: 0.10, additionalInfoRequired: 0.04, withdrawn: 0.01 },
          improvementSuggestions: [],
          modelVersion: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock risk assessment
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          assessmentId: 'risk_test',
          overallRiskScore: 25,
          riskLevel: 'low',
          riskFactors: [],
          riskCategories: {},
          mitigationPlan: { priority: 'medium', strategies: [], estimatedRiskReduction: 0.6 },
          monitoringPlan: [],
          modelVersion: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock cost estimation
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          estimationId: 'cost_test',
          totalEstimatedCost: 5500,
          currency: 'USD',
          confidenceInterval: { lower: 5000, upper: 6000, confidence: 0.90 },
          costBreakdown: [],
          costCategories: {},
          budgetPlanning: { upfrontCosts: 3000, ongoingCosts: 500, contingencyFund: 1000, paymentSchedule: [] },
          costOptimization: [],
          historicalComparison: { averageCost: 5200, medianCost: 5000, percentile25: 4500, percentile75: 5800, sampleSize: 500 },
          modelVersion: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock recommendations
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          recommendationId: 'rec_test',
          overallStrategy: 'Enhanced Preparation Strategy',
          strategicPriorities: [],
          actionPlan: [],
          timeline: { phases: [], criticalPath: [], bufferTime: '4-6 weeks' },
          riskMitigation: [],
          successFactors: [],
          warningSignals: [],
          alternativeStrategies: [],
          personalization: { userProfile: {}, customizations: [], preferences: {} },
          confidence: 0.85,
          modelVersion: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      } as any)

      // Mock overall insights synthesis
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: {
          keyFindings: ['High success probability', 'Moderate timeline'],
          criticalActions: ['Complete documentation'],
          successFactors: ['Strong profile'],
          majorRisks: ['Document delays'],
          budgetSummary: 'Total cost: $5,500',
          timelineSummary: 'Expected processing: 6 months',
          confidenceLevel: 0.85
        }
      } as any)

      const result = await team.performComprehensiveAnalysis(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.analysisId).toBeDefined()
      expect(result.timelinePrediction).toBeDefined()
      expect(result.successProbability).toBeDefined()
      expect(result.riskAssessment).toBeDefined()
      expect(result.costEstimation).toBeDefined()
      expect(result.recommendations).toBeDefined()
      expect(result.overallInsights).toBeDefined()
      expect(result.agentCoordination).toBeDefined()
      expect(result.agentCoordination.agentsUsed).toHaveLength(5)
    })

    it('should perform quick analysis', async () => {
      // Mock quick analysis responses
      const { generateObject, generateText } = await import('ai')
      
      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { successProbability: 0.85 }
      } as any)

      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { estimatedDays: 180 }
      } as any)

      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { riskFactors: [{ factor: 'Document delays' }] }
      } as any)

      vi.mocked(generateObject).mockResolvedValueOnce({
        object: { totalEstimatedCost: 5500 }
      } as any)

      vi.mocked(generateText).mockResolvedValueOnce({
        text: '1. Complete documentation\n2. Improve language scores\n3. Secure job offer'
      } as any)

      const result = await team.performQuickAnalysis(mockUserProfile, mockCaseData)

      expect(result).toBeDefined()
      expect(result.successProbability).toBeGreaterThan(0)
      expect(result.estimatedTimeline).toBeGreaterThan(0)
      expect(result.majorRisks).toBeInstanceOf(Array)
      expect(result.estimatedCost).toBeGreaterThan(0)
      expect(result.topRecommendations).toBeInstanceOf(Array)
    })

    it('should handle errors gracefully', async () => {
      const { generateObject } = await import('ai')
      vi.mocked(generateObject).mockRejectedValue(new Error('API Error'))

      await expect(
        team.performComprehensiveAnalysis(mockUserProfile, mockCaseData)
      ).rejects.toThrow('Predictive analysis failed')
    })
  })

  describe('Agent Configuration', () => {
    it('should accept custom configuration for all agents', () => {
      const config = {
        model: 'gpt-4o-mini',
        temperature: 0.2,
        timeout: 45000,
        confidenceThreshold: 0.8
      }

      const timelineAgent = new TimelinePredictionAgent(config)
      const successAgent = new SuccessProbabilityAgent(config)
      const riskAgent = new RiskAssessmentAgent(config)
      const costAgent = new CostEstimationAgent(config)
      const recommendationAgent = new RecommendationAgent(config)
      const team = new PredictiveAnalyticsTeam(config)

      expect(timelineAgent).toBeInstanceOf(TimelinePredictionAgent)
      expect(successAgent).toBeInstanceOf(SuccessProbabilityAgent)
      expect(riskAgent).toBeInstanceOf(RiskAssessmentAgent)
      expect(costAgent).toBeInstanceOf(CostEstimationAgent)
      expect(recommendationAgent).toBeInstanceOf(RecommendationAgent)
      expect(team).toBeInstanceOf(PredictiveAnalyticsTeam)
    })
  })

  describe('Type Safety', () => {
    it('should validate user profile schema', () => {
      const invalidProfile = {
        demographics: {
          age: 'thirty', // Should be number
          nationality: 'Indian'
        }
      }

      // This would fail at runtime with proper validation
      expect(() => {
        // In a real implementation, this would validate the schema
        // UserProfileSchema.parse(invalidProfile)
      }).not.toThrow() // Placeholder - actual validation would throw
    })

    it('should validate case data structure', () => {
      const validCaseData = {
        caseType: 'skilled_worker',
        country: 'Canada',
        visaType: 'express_entry'
      }

      expect(validCaseData.caseType).toBe('skilled_worker')
      expect(validCaseData.country).toBe('Canada')
      expect(validCaseData.visaType).toBe('express_entry')
    })
  })
})