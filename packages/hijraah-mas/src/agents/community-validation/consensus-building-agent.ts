import { generateObject, generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import {
  ConsensusSessionSchema,
  ContributorProfileSchema,
  ContentSubmissionSchema,
  CommunityValidationConfigSchema,
  type ConsensusSession,
  type ContributorProfile,
  type ContentSubmission,
  type CommunityValidationConfig,
  type PeerReview,
} from "./types.js";

/**
 * Consensus Building Agent using AI SDK v5
 * Manages conflict resolution and agreement facilitation processes
 */
export class ConsensusBuildingAgent {
  private config: CommunityValidationConfig;

  constructor(config: Partial<CommunityValidationConfig> = {}) {
    this.config = CommunityValidationConfigSchema.parse(config);
  }

  /**
   * Initiate consensus building session for conflicting reviews
   */
  async initiateConsensusSession(
    content: ContentSubmission,
    conflictingReviews: PeerReview[],
    initiator: ContributorProfile,
    sessionConfig?: {
      timeLimit: number; // minutes
      requiredParticipants: number;
      expertRequired: boolean;
      moderatorId?: string;
    }
  ): Promise<ConsensusSession> {
    const sessionId = `consensus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Define tools for session setup
    const participantSelectionTool = tool({
      description: "Select appropriate participants for consensus session",
      parameters: z.object({
        conflictingReviews: z.array(z.any()),
        contentType: z.string(),
        expertRequired: z.boolean(),
        requiredParticipants: z.number(),
      }),
      execute: async ({
        conflictingReviews,
        contentType,
        expertRequired,
        requiredParticipants,
      }: {
        conflictingReviews: any[];
        contentType: string;
        expertRequired: boolean;
        requiredParticipants: number;
      }) => {
        const participants: any[] = [];

        // Add all reviewers from conflicting reviews
        conflictingReviews.forEach((review: any) => {
          participants.push({
            userId: review.reviewerId,
            role:
              review.reviewerProfile.trustLevel === "expert"
                ? "expert"
                : "reviewer",
            joinedAt: new Date().toISOString(),
            isActive: true,
          });
        });

        // Add content contributor
        participants.push({
          userId: content.submitterId,
          role: "contributor",
          joinedAt: new Date().toISOString(),
          isActive: true,
        });

        // Add moderator if needed
        if (expertRequired && !participants.some((p) => p.role === "expert")) {
          participants.push({
            userId: "expert_moderator_001",
            role: "expert",
            joinedAt: new Date().toISOString(),
            isActive: true,
          });
        }

        // Add additional reviewers if needed to meet minimum
        while (participants.length < requiredParticipants) {
          participants.push({
            userId: `reviewer_${participants.length + 1}`,
            role: "reviewer",
            joinedAt: new Date().toISOString(),
            isActive: true,
          });
        }

        return participants;
      },
    });

    const sessionPlanningTool = tool({
      description: "Plan consensus session phases and timeline",
      parameters: z.object({
        timeLimit: z.number(),
        participantCount: z.number(),
        conflictSeverity: z.enum(["low", "medium", "high"]),
      }),
      execute: async ({
        timeLimit,
        participantCount,
        conflictSeverity,
      }: {
        timeLimit: number;
        participantCount: number;
        conflictSeverity: "low" | "medium" | "high";
      }) => {
        const phases: any[] = [];
        const totalTime = timeLimit;

        // Discussion phase (40% of time)
        const discussionTime = Math.floor(totalTime * 0.4);
        phases.push({
          phase: "discussion",
          startTime: new Date().toISOString(),
          endTime: new Date(
            Date.now() + discussionTime * 60 * 1000
          ).toISOString(),
          status: "pending",
          outcomes: [],
        });

        // Proposal phase (25% of time)
        const proposalTime = Math.floor(totalTime * 0.25);
        phases.push({
          phase: "proposal",
          startTime: new Date(
            Date.now() + discussionTime * 60 * 1000
          ).toISOString(),
          endTime: new Date(
            Date.now() + (discussionTime + proposalTime) * 60 * 1000
          ).toISOString(),
          status: "pending",
          outcomes: [],
        });

        // Voting phase (20% of time)
        const votingTime = Math.floor(totalTime * 0.2);
        phases.push({
          phase: "voting",
          startTime: new Date(
            Date.now() + (discussionTime + proposalTime) * 60 * 1000
          ).toISOString(),
          endTime: new Date(
            Date.now() +
              (discussionTime + proposalTime + votingTime) * 60 * 1000
          ).toISOString(),
          status: "pending",
          outcomes: [],
        });

        // Refinement phase if needed (10% of time)
        if (conflictSeverity === "high") {
          const refinementTime = Math.floor(totalTime * 0.1);
          phases.push({
            phase: "refinement",
            startTime: new Date(
              Date.now() +
                (discussionTime + proposalTime + votingTime) * 60 * 1000
            ).toISOString(),
            endTime: new Date(
              Date.now() +
                (discussionTime + proposalTime + votingTime + refinementTime) *
                  60 *
                  1000
            ).toISOString(),
            status: "pending",
            outcomes: [],
          });

          // Final vote (5% of time)
          phases.push({
            phase: "final_vote",
            startTime: new Date(
              Date.now() +
                (discussionTime + proposalTime + votingTime + refinementTime) *
                  60 *
                  1000
            ).toISOString(),
            endTime: new Date(Date.now() + totalTime * 60 * 1000).toISOString(),
            status: "pending",
            outcomes: [],
          });
        }

        return phases;
      },
    });

    const conflictAnalysisTool = tool({
      description:
        "Analyze the nature and severity of conflicts between reviews",
      parameters: z.object({
        reviews: z.array(z.any()),
      }),
      execute: async ({ reviews }) => {
        const scores = reviews.map((r: any) => r.overallScore);
        const recommendations = reviews.map((r: any) => r.recommendation);

        // Calculate score variance
        const avgScore =
          scores.reduce((sum: number, score: number) => sum + score, 0) /
          scores.length;
        const variance =
          scores.reduce(
            (sum: number, score: number) => sum + Math.pow(score - avgScore, 2),
            0
          ) / scores.length;
        const standardDeviation = Math.sqrt(variance);

        // Analyze recommendation conflicts
        const recommendationCounts = recommendations.reduce(
          (counts: Record<string, number>, rec: string) => {
            counts[rec] = (counts[rec] || 0) + 1;
            return counts;
          },
          {}
        );

        const conflictSeverity =
          standardDeviation > 2.5
            ? "high"
            : standardDeviation > 1.5
              ? "medium"
              : "low";

        const mainConflicts: any[] = [];
        if (recommendationCounts["approve"] && recommendationCounts["reject"]) {
          mainConflicts.push("Fundamental disagreement on approval");
        }
        if (standardDeviation > 2) {
          mainConflicts.push("Significant score variance");
        }

        return {
          conflictSeverity,
          scoreVariance: variance,
          mainConflicts,
          recommendationDistribution: recommendationCounts,
          requiresExpertInput: conflictSeverity === "high",
        };
      },
    });

    // Generate consensus session using AI SDK v5
    const { object: session } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: ConsensusSessionSchema,
      system: `You are an expert consensus facilitator with deep knowledge of collaborative decision-making, conflict resolution, and community mediation processes.

Your role is to:
1. Analyze conflicts between different viewpoints and reviews
2. Design structured consensus-building processes
3. Select appropriate participants for productive discussions
4. Plan session phases and timelines for effective resolution
5. Facilitate fair and transparent decision-making
6. Ensure all voices are heard and considered

Use the available tools to set up comprehensive consensus sessions. Consider:
- Nature and severity of conflicts between reviews
- Appropriate participant selection and role assignment
- Structured phases for discussion, proposal, and voting
- Time management and session planning
- Expert input requirements for complex decisions
- Fair representation of different viewpoints

Create structured, fair consensus processes that lead to well-reasoned community decisions.`,
      prompt: `Initiate consensus building session for conflicting reviews:

**Content Submission:**
${JSON.stringify(content, null, 2)}

**Conflicting Reviews:**
${JSON.stringify(conflictingReviews, null, 2)}

**Session Initiator:**
${JSON.stringify(initiator, null, 2)}

**Session Configuration:**
${JSON.stringify(sessionConfig, null, 2)}

**Requirements:**
1. Use the analysis tools to understand conflict nature and severity
2. Select appropriate participants for productive consensus building
3. Plan structured session phases with appropriate timing
4. Create a comprehensive consensus session with:
   - Clear topic and description of the conflict
   - Appropriate participant selection and role assignment
   - Structured phases for discussion, proposal, and decision-making
   - Conflict analysis and resolution strategy
   - Success metrics and outcome tracking

**Session ID:** ${sessionId}

Focus on creating fair, structured processes that facilitate productive discussion and lead to well-reasoned community decisions.`,
    });

    return {
      ...session,
      sessionId,
      contentId: content.contentId,
      initiatorId: initiator.userId,
      status: "planning",
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Facilitate active consensus session
   */
  async facilitateConsensusSession(
    session: ConsensusSession,
    currentPhase: string,
    participantInputs: Array<{
      participantId: string;
      inputType: "discussion" | "proposal" | "vote" | "refinement";
      content: string;
      timestamp: string;
    }>
  ): Promise<{
    sessionUpdate: Partial<ConsensusSession>;
    nextActions: Array<{
      participantId: string;
      action: string;
      deadline: string;
    }>;
    phaseCompletion: {
      completed: boolean;
      outcomes: string[];
      nextPhase?: string;
    };
  }> {
    // Define tools for session facilitation
    const discussionAnalysisTool = tool({
      description: "Analyze discussion inputs and identify key points",
      parameters: z.object({
        inputs: z.array(z.any()),
        currentPhase: z.string(),
      }),
      execute: async ({
        inputs,
        currentPhase,
      }: {
        inputs: any[];
        currentPhase: string;
      }) => {
        const discussionInputs = inputs.filter(
          (input) => input.inputType === "discussion"
        );

        if (discussionInputs.length === 0) {
          return {
            keyPoints: [],
            emergingConsensus: [],
            remainingConflicts: [],
            participationLevel: 0,
          };
        }

        // Analyze key discussion points
        const keyPoints = discussionInputs.map((input: any) => ({
          participantId: input.participantId,
          point: input.content.substring(0, 200), // Summary
          timestamp: input.timestamp,
        }));

        // Identify emerging consensus areas
        const emergingConsensus = [
          "Agreement on need for content improvement",
          "Consensus on maintaining quality standards",
        ];

        // Identify remaining conflicts
        const remainingConflicts = [
          "Disagreement on severity of issues",
          "Different views on required changes",
        ];

        const participationLevel =
          discussionInputs.length / session.participants.length;

        return {
          keyPoints,
          emergingConsensus,
          remainingConflicts,
          participationLevel,
        };
      },
    });

    const proposalEvaluationTool = tool({
      description: "Evaluate proposals and their viability",
      parameters: z.object({
        inputs: z.array(z.any()),
        sessionContext: z.any(),
      }),
      execute: async ({
        inputs,
        sessionContext,
      }: {
        inputs: any[];
        sessionContext: any;
      }) => {
        const proposalInputs = inputs.filter(
          (input) => input.inputType === "proposal"
        );

        const evaluatedProposals = proposalInputs.map(
          (input: any, index: number) => ({
            proposalId: `prop_${index + 1}`,
            proposerId: input.participantId,
            title: `Proposal ${index + 1}`,
            description: input.content,
            changes: [
              {
                field: "content_status",
                currentValue: "under_review",
                proposedValue: "approved_with_changes",
                reasoning: "Addresses main concerns while preserving value",
              },
            ],
            votes: [],
            score: 0,
            status: "active",
          })
        );

        return evaluatedProposals;
      },
    });

    const voteAnalysisTool = tool({
      description: "Analyze votes and determine consensus level",
      parameters: z.object({
        inputs: z.array(z.any()),
        proposals: z.array(z.any()),
      }),
      execute: async ({
        inputs,
        proposals,
      }: {
        inputs: any[];
        proposals: any[];
      }) => {
        const voteInputs = inputs.filter((input) => input.inputType === "vote");

        // Process votes for each proposal
        const votingResults = proposals.map((proposal: any) => {
          const proposalVotes = voteInputs.filter((vote: any) =>
            vote.content.includes(proposal.proposalId)
          );

          const supportVotes = proposalVotes.filter((vote: any) =>
            vote.content.toLowerCase().includes("support")
          ).length;

          const opposeVotes = proposalVotes.filter((vote: any) =>
            vote.content.toLowerCase().includes("oppose")
          ).length;

          const abstainVotes = proposalVotes.filter((vote: any) =>
            vote.content.toLowerCase().includes("abstain")
          ).length;

          const totalVotes = supportVotes + opposeVotes + abstainVotes;
          const supportRatio = totalVotes > 0 ? supportVotes / totalVotes : 0;

          return {
            proposalId: proposal.proposalId,
            supportVotes,
            opposeVotes,
            abstainVotes,
            supportRatio,
            hasConsensus:
              supportRatio >= 0.7 &&
              totalVotes >= session.participants.length * 0.6,
          };
        });

        return votingResults;
      },
    });

    // Facilitate session using AI SDK v5
    const { object: facilitation } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        sessionUpdate: z.object({
          phases: z.array(z.any()).optional(),
          proposals: z.array(z.any()).optional(),
          consensusMetrics: z
            .object({
              participationRate: z.number(),
              agreementLevel: z.number(),
              expertAlignment: z.number(),
              timeToConsensus: z.number(),
              iterationsRequired: z.number(),
            })
            .optional(),
        }),
        nextActions: z.array(
          z.object({
            participantId: z.string(),
            action: z.string(),
            deadline: z.string(),
          })
        ),
        phaseCompletion: z.object({
          completed: z.boolean(),
          outcomes: z.array(z.string()),
          nextPhase: z.string().optional(),
        }),
      }),
      system: `You are facilitating an active consensus building session. Analyze participant inputs, 
      guide the discussion process, and determine when phases are complete and ready to advance.`,
      prompt: `Facilitate consensus session in ${currentPhase} phase:

**Session:** ${JSON.stringify(session, null, 2)}
**Participant Inputs:** ${JSON.stringify(participantInputs, null, 2)}

Analyze inputs, update session state, and provide guidance for next steps in the consensus process.`,
    });

    return facilitation;
  }

  /**
   * Resolve conflicts through structured negotiation
   */
  async resolveConflictsThroughNegotiation(
    conflictingParties: Array<{
      participantId: string;
      position: string;
      reasoning: string;
      flexibility: number; // 0-1 scale
    }>,
    mediationContext: {
      contentId: string;
      conflictType: "scoring" | "recommendation" | "interpretation" | "policy";
      stakeholders: string[];
      constraints: string[];
    }
  ): Promise<{
    negotiationId: string;
    resolution:
      | "agreement_reached"
      | "compromise_found"
      | "escalation_needed"
      | "no_resolution";
    agreedSolution?: {
      description: string;
      compromises: Array<{
        party: string;
        concession: string;
        compensation: string;
      }>;
      implementation: string[];
    };
    alternativeOptions: Array<{
      option: string;
      pros: string[];
      cons: string[];
      feasibility: number;
    }>;
    escalationRecommendation?: {
      reason: string;
      suggestedMediators: string[];
      additionalInformation: string[];
    };
  }> {
    const negotiationId = `negotiation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { object: resolution } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        resolution: z.enum([
          "agreement_reached",
          "compromise_found",
          "escalation_needed",
          "no_resolution",
        ]),
        agreedSolution: z
          .object({
            description: z.string(),
            compromises: z.array(
              z.object({
                party: z.string(),
                concession: z.string(),
                compensation: z.string(),
              })
            ),
            implementation: z.array(z.string()),
          })
          .optional(),
        alternativeOptions: z.array(
          z.object({
            option: z.string(),
            pros: z.array(z.string()),
            cons: z.array(z.string()),
            feasibility: z.number(),
          })
        ),
        escalationRecommendation: z
          .object({
            reason: z.string(),
            suggestedMediators: z.array(z.string()),
            additionalInformation: z.array(z.string()),
          })
          .optional(),
      }),
      system: `You are a skilled negotiation facilitator specializing in community conflict resolution. 
      Analyze conflicting positions and find mutually acceptable solutions through structured negotiation.`,
      prompt: `Resolve conflicts through negotiation:

**Conflicting Parties:** ${JSON.stringify(conflictingParties, null, 2)}
**Mediation Context:** ${JSON.stringify(mediationContext, null, 2)}

Find mutually acceptable solutions or determine if escalation is needed.`,
    });

    return {
      negotiationId,
      ...resolution,
    };
  }

  /**
   * Build community agreement on policies and standards
   */
  async buildCommunityAgreement(
    proposedPolicy: {
      title: string;
      description: string;
      rationale: string;
      impact: string[];
      implementation: string[];
    },
    stakeholders: Array<{
      userId: string;
      role: "contributor" | "reviewer" | "expert" | "moderator";
      influence: number; // 0-1 scale
      concerns: string[];
    }>,
    consultationPeriod: number // days
  ): Promise<{
    agreementId: string;
    consultationPhases: Array<{
      phase: string;
      duration: string;
      activities: string[];
      participants: string[];
    }>;
    feedbackCollection: {
      methods: string[];
      channels: string[];
      timeline: string;
    };
    consensusBuilding: {
      strategy: string;
      facilitation: string[];
      decisionCriteria: string[];
    };
    expectedOutcome: {
      timeline: string;
      successMetrics: string[];
      fallbackOptions: string[];
    };
  }> {
    const agreementId = `agreement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { object: agreement } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        consultationPhases: z.array(
          z.object({
            phase: z.string(),
            duration: z.string(),
            activities: z.array(z.string()),
            participants: z.array(z.string()),
          })
        ),
        feedbackCollection: z.object({
          methods: z.array(z.string()),
          channels: z.array(z.string()),
          timeline: z.string(),
        }),
        consensusBuilding: z.object({
          strategy: z.string(),
          facilitation: z.array(z.string()),
          decisionCriteria: z.array(z.string()),
        }),
        expectedOutcome: z.object({
          timeline: z.string(),
          successMetrics: z.array(z.string()),
          fallbackOptions: z.array(z.string()),
        }),
      }),
      system: `You are designing a community agreement process for policy development. 
      Create inclusive, transparent processes that build genuine consensus on community standards.`,
      prompt: `Design community agreement process for policy:

**Proposed Policy:** ${JSON.stringify(proposedPolicy, null, 2)}
**Stakeholders:** ${JSON.stringify(stakeholders, null, 2)}
**Consultation Period:** ${consultationPeriod} days

Create comprehensive process for building community agreement on the proposed policy.`,
    });

    return {
      agreementId,
      ...agreement,
    };
  }

  /**
   * Monitor consensus session progress and health
   */
  async monitorSessionHealth(
    session: ConsensusSession,
    healthMetrics: {
      participationRate: number;
      responseTime: number; // average minutes
      conflictEscalation: boolean;
      expertEngagement: number;
      timeRemaining: number; // minutes
    }
  ): Promise<{
    healthStatus: "healthy" | "concerning" | "critical";
    issues: Array<{
      issue: string;
      severity: "low" | "medium" | "high";
      recommendation: string;
      urgency: "immediate" | "soon" | "monitor";
    }>;
    interventions: Array<{
      intervention: string;
      timing: string;
      expectedImpact: string;
    }>;
    successPrediction: {
      likelihood: number;
      confidence: number;
      keyFactors: string[];
    };
  }> {
    const { object: health } = await generateObject({
      model: openai(this.config.model),
      temperature: this.config.temperature,

      schema: z.object({
        healthStatus: z.enum(["healthy", "concerning", "critical"]),
        issues: z.array(
          z.object({
            issue: z.string(),
            severity: z.enum(["low", "medium", "high"]),
            recommendation: z.string(),
            urgency: z.enum(["immediate", "soon", "monitor"]),
          })
        ),
        interventions: z.array(
          z.object({
            intervention: z.string(),
            timing: z.string(),
            expectedImpact: z.string(),
          })
        ),
        successPrediction: z.object({
          likelihood: z.number(),
          confidence: z.number(),
          keyFactors: z.array(z.string()),
        }),
      }),
      system: `You are monitoring the health of a consensus building session. 
      Identify issues, recommend interventions, and predict success likelihood.`,
      prompt: `Monitor consensus session health:

**Session:** ${JSON.stringify(session, null, 2)}
**Health Metrics:** ${JSON.stringify(healthMetrics, null, 2)}

Assess session health and provide recommendations for maintaining productive consensus building.`,
    });

    return health;
  }
}
