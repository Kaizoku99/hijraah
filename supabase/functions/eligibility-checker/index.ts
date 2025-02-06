import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { UserProfile, EligibilityResult, ImmigrationRules, ApiError } from '../_shared/types.ts'
import { supabase } from '../_shared/utils.ts'

async function getImmigrationRules(programType: string): Promise<ImmigrationRules> {
  const { data, error } = await supabase
    .from('immigration_rules')
    .select('*')
    .eq('program_type', programType)
    .single()

  if (error) throw error
  return data as ImmigrationRules
}

function checkBasicEligibility(params: {
  userProfile: UserProfile,
  programType: string,
  rules: ImmigrationRules
}): EligibilityResult {
  const { userProfile, rules } = params
  const missing: string[] = []
  const recommendations: string[] = []

  // Check qualifications
  if (rules.required_qualifications) {
    const missingQuals = rules.required_qualifications.filter(
      (qual: string) => !userProfile.qualifications.includes(qual)
    )
    if (missingQuals.length > 0) {
      missing.push(`Required qualifications: ${missingQuals.join(', ')}`)
    }
  }

  // Check work experience
  if (rules.minimum_work_experience && userProfile.workExperience < rules.minimum_work_experience) {
    missing.push(`Minimum ${rules.minimum_work_experience} years of work experience required`)
    recommendations.push('Gain more work experience in your field')
  }

  // Check nationality restrictions
  if (rules.restricted_nationalities?.includes(userProfile.nationality)) {
    missing.push('Nationality restrictions apply')
    recommendations.push('Consider alternative visa programs')
  }

  return {
    eligible: missing.length === 0,
    missing,
    recommendations
  }
}

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { userProfile, programType } = await req.json()

    if (!userProfile || !programType) {
      return new Response(
        JSON.stringify({ error: 'User profile and program type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get immigration rules for the program
    const rules = await getImmigrationRules(programType)

    // Perform eligibility check
    const result = checkBasicEligibility({
      userProfile,
      programType,
      rules
    })

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }
    return new Response(
      JSON.stringify({ error: apiError.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}) 