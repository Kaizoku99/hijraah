import express, { Request, Response } from "npm:express@4.18.2";

import {
  UserProfile,
  EligibilityResult,
  ImmigrationRules,
  ApiError,
} from "../_shared/types";
import { supabase } from "../_shared/utils";

async function getImmigrationRules(
  programType: string
): Promise<ImmigrationRules> {
  const { data, error } = await supabase
    .from("immigration_rules")
    .select("*")
    .eq("program_type", programType)
    .single();

  if (error) throw error;
  return data as ImmigrationRules;
}

function checkBasicEligibility(params: {
  userProfile: UserProfile;
  programType: string;
  rules: ImmigrationRules;
}): EligibilityResult {
  const { userProfile, rules } = params;
  const missing: string[] = [];
  const recommendations: string[] = [];

  // Check qualifications
  if (rules.required_qualifications) {
    const missingQuals = rules.required_qualifications.filter(
      (qual: string) => !userProfile.qualifications.includes(qual)
    );
    if (missingQuals.length > 0) {
      missing.push(`Required qualifications: ${missingQuals.join(", ")}`);
    }
  }

  // Check work experience
  if (
    rules.minimum_work_experience &&
    userProfile.workExperience < rules.minimum_work_experience
  ) {
    missing.push(
      `Minimum ${rules.minimum_work_experience} years of work experience required`
    );
    recommendations.push("Gain more work experience in your field");
  }

  // Check nationality restrictions
  if (rules.restricted_nationalities?.includes(userProfile.nationality)) {
    missing.push("Nationality restrictions apply");
    recommendations.push("Consider alternative visa programs");
  }

  return {
    eligible: missing.length === 0,
    missing,
    recommendations,
  };
}

// Initialize Express app
const app = express();
app.use(express.json());

// Define routes
app.post("/eligibility-checker", async (req: Request, res: Response) => {
  try {
    const { userProfile, programType } = req.body;

    if (!userProfile || !programType) {
      return res.status(400).json({
        error: "User profile and program type are required",
      });
    }

    // Get immigration rules for the program
    const rules = await getImmigrationRules(programType);

    // Perform eligibility check
    const result = checkBasicEligibility({
      userProfile,
      programType,
      rules,
    });

    return res.status(200).json(result);
  } catch (error: unknown) {
    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
    return res.status(500).json({ error: apiError.message });
  }
});

// Handle all other routes
app.all("*", (req: Request, res: Response) => {
  res.status(405).json({ error: "Method not allowed" });
});

// Start server
app.listen(8000);

// For Supabase Edge Functions to recognize the handler
export default app;
