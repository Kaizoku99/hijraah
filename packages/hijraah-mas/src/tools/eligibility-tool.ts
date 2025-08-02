import { z } from 'zod'
import { createImmigrationTool } from './immigration-tool-factory'

// Eligibility checking tool
export const eligibilityTool = createImmigrationTool(
  'validateEligibility',
  'Validate applicant eligibility for immigration programs',
  z.object({
    applicantId: z.string(),
    programType: z.string(),
    country: z.string(),
    applicantProfile: z.record(z.any()),
    eligibilityCriteria: z.array(z.string()).optional()
  }),
  async ({ applicantId, programType, country, applicantProfile, eligibilityCriteria }) => {
    // This would integrate with your eligibility checking system
    // For now, returning mock eligibility results
    
    const defaultCriteria = [
      'Age requirements',
      'Education qualifications',
      'Language proficiency',
      'Work experience',
      'Financial capacity',
      'Health requirements',
      'Character requirements'
    ]

    const criteria = eligibilityCriteria || defaultCriteria

    const mockEligibilityCheck = {
      applicantId,
      programType,
      country,
      assessment: {
        eligible: Math.random() > 0.25, // 75% eligibility rate
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100
        overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
        minimumScore: 60
      },
      criteriaResults: criteria.map(criterion => ({
        criterion,
        met: Math.random() > 0.2, // 80% pass rate per criterion
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        maxScore: 100,
        evidence: `Profile data supports ${criterion} requirement`,
        notes: Math.random() > 0.7 ? `Additional verification needed for ${criterion}` : undefined,
        weight: Math.floor(Math.random() * 5) + 1 // 1-5
      })),
      disqualifyingFactors: [] as string[],
      recommendations: [] as string[],
      alternativePrograms: [] as Array<{
        program: string,
        eligibilityScore: number,
        requirements: string[]
      }>,
      metadata: {
        assessmentModel: 'EligibilityEngine_v3.0',
        policyVersion: `${country}_immigration_2024.1`,
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Within last 30 days
        processingTime: Math.floor(Math.random() * 1200) + 300 // 0.3-1.5 seconds
      },
      timestamp: new Date().toISOString()
    }

    // Calculate overall eligibility based on criteria
    const metCriteria = mockEligibilityCheck.criteriaResults.filter(c => c.met).length
    const totalCriteria = criteria.length
    const passRate = metCriteria / totalCriteria

    // Adjust eligibility based on pass rate
    mockEligibilityCheck.assessment.eligible = passRate >= 0.7 // Need 70% of criteria met
    mockEligibilityCheck.assessment.overallScore = Math.floor(passRate * 100)

    // Add disqualifying factors for ineligible applicants
    if (!mockEligibilityCheck.assessment.eligible) {
      const unmetCriteria = mockEligibilityCheck.criteriaResults
        .filter(c => !c.met)
        .map(c => c.criterion)
      
      mockEligibilityCheck.disqualifyingFactors = unmetCriteria.slice(0, 2) // Show top 2 issues
      mockEligibilityCheck.recommendations.push(
        'Address disqualifying factors before reapplying',
        'Consider alternative immigration programs'
      )

      // Suggest alternative programs
      mockEligibilityCheck.alternativePrograms = [
        {
          program: `${programType}_alternative`,
          eligibilityScore: Math.floor(Math.random() * 20) + 70,
          requirements: ['Lower age requirement', 'Reduced work experience']
        }
      ]
    } else {
      mockEligibilityCheck.recommendations.push(
        'Eligible for program - proceed with application',
        'Ensure all supporting documents are current'
      )
    }

    // Add notes for borderline cases
    mockEligibilityCheck.criteriaResults.forEach(result => {
      if (result.score < 70) {
        result.notes = `Score below optimal threshold - consider strengthening ${result.criterion}`
      }
    })

    // Simulate eligibility checking time
    await new Promise(resolve => setTimeout(resolve, 450))

    return mockEligibilityCheck
  }
)