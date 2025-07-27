/**
 * Document Templates Utility
 *
 * Provides templates and validation schemas for different document types
 * used in immigration processes.
 */

import { getSupabaseClient } from "@/lib/supabase/client";
import { DocumentType } from "@/types/domain/documents";

// Document template interface
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  countries: string[];
  fields: {
    [key: string]: {
      type: "string" | "date" | "number" | "boolean" | "array";
      required: boolean;
      description: string;
      format?: string;
      example?: string;
    };
  };
  sections: string[];
  validations: {
    [key: string]: {
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      minValue?: number;
      maxValue?: number;
      dependencies?: string[];
    };
  };
}

// Cache for templates to avoid repeated database calls
const templateCache = new Map<string, DocumentTemplate>();

/**
 * Get a document template by document type and optional target country
 */
export async function getDocumentTemplate(
  documentType: DocumentType,
  targetCountry?: string
): Promise<DocumentTemplate> {
  // Generate cache key
  const cacheKey = `${documentType}:${targetCountry || "global"}`;

  // Check cache first
  if (templateCache.has(cacheKey)) {
    return templateCache.get(cacheKey)!;
  }

  try {
    // Try to get from database first
    const supabase = getSupabaseClient();
    let query = supabase
      .from("document_templates")
      .select("*")
      .eq("type", documentType);

    // Filter by country if provided
    if (targetCountry) {
      query = query.filter("countries", "cs", `{"${targetCountry}"}`);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      // Fall back to default templates
      const defaultTemplate = getDefaultTemplate(documentType, targetCountry);
      templateCache.set(cacheKey, defaultTemplate);
      return defaultTemplate;
    }

    // Parse and cache the template
    const template: DocumentTemplate = {
      id: data.id,
      name: data.name,
      description: data.description,
      countries: data.countries,
      fields: data.fields,
      sections: data.sections,
      validations: data.validations,
    };

    templateCache.set(cacheKey, template);
    return template;
  } catch (error) {
    console.error("Error fetching document template:", error);

    // Fall back to default templates
    const defaultTemplate = getDefaultTemplate(documentType, targetCountry);
    templateCache.set(cacheKey, defaultTemplate);
    return defaultTemplate;
  }
}

/**
 * Get default document template when database lookup fails
 */
function getDefaultTemplate(
  documentType: DocumentType,
  targetCountry?: string
): DocumentTemplate {
  // Generic template structure
  const genericTemplate: DocumentTemplate = {
    id: "default",
    name: `Default ${documentType} Template`,
    description: `Default template for ${documentType} documents`,
    countries: targetCountry ? [targetCountry] : ["global"],
    fields: {},
    sections: [],
    validations: {},
  };

  // Add document-specific fields based on type
  switch (documentType) {
    case DocumentType.PASSPORT:
      return {
        ...genericTemplate,
        name: "Passport Template",
        description: "Template for passport documents",
        fields: {
          passportNumber: {
            type: "string",
            required: true,
            description: "Passport number",
            format: "alphanumeric",
          },
          surname: {
            type: "string",
            required: true,
            description: "Surname/Last name",
          },
          givenNames: {
            type: "string",
            required: true,
            description: "Given names/First name",
          },
          dateOfBirth: {
            type: "date",
            required: true,
            description: "Date of birth",
            format: "YYYY-MM-DD",
          },
          placeOfBirth: {
            type: "string",
            required: true,
            description: "Place of birth",
          },
          nationality: {
            type: "string",
            required: true,
            description: "Nationality",
          },
          sex: {
            type: "string",
            required: true,
            description: "Sex/Gender",
          },
          dateOfIssue: {
            type: "date",
            required: true,
            description: "Date of issue",
            format: "YYYY-MM-DD",
          },
          dateOfExpiry: {
            type: "date",
            required: true,
            description: "Date of expiry",
            format: "YYYY-MM-DD",
          },
          issuingAuthority: {
            type: "string",
            required: true,
            description: "Issuing authority",
          },
        },
        sections: ["Personal Information", "Document Information"],
        validations: {
          passportNumber: {
            minLength: 5,
            maxLength: 15,
          },
          dateOfExpiry: {
            // No explicit pattern, but should be in the future
          },
        },
      };

    case DocumentType.VISA:
      return {
        ...genericTemplate,
        name: "Visa Template",
        description: "Template for visa documents",
        fields: {
          visaNumber: {
            type: "string",
            required: true,
            description: "Visa number",
            format: "alphanumeric",
          },
          type: {
            type: "string",
            required: true,
            description: "Visa type/category",
          },
          surname: {
            type: "string",
            required: true,
            description: "Surname/Last name",
          },
          givenNames: {
            type: "string",
            required: true,
            description: "Given names/First name",
          },
          passportNumber: {
            type: "string",
            required: true,
            description: "Passport number",
          },
          nationality: {
            type: "string",
            required: true,
            description: "Nationality",
          },
          dateOfBirth: {
            type: "date",
            required: true,
            description: "Date of birth",
            format: "YYYY-MM-DD",
          },
          dateOfIssue: {
            type: "date",
            required: true,
            description: "Date of issue",
            format: "YYYY-MM-DD",
          },
          dateOfExpiry: {
            type: "date",
            required: true,
            description: "Date of expiry",
            format: "YYYY-MM-DD",
          },
          numberOfEntries: {
            type: "string",
            required: true,
            description: "Number of entries (e.g., SINGLE, MULTIPLE)",
          },
          validFor: {
            type: "string",
            required: false,
            description: "Countries or regions the visa is valid for",
          },
          remarks: {
            type: "string",
            required: false,
            description: "Additional remarks or conditions",
          },
        },
        sections: ["Personal Information", "Visa Information", "Validity"],
        validations: {
          visaNumber: {
            minLength: 5,
            maxLength: 20,
          },
          dateOfExpiry: {
            // Should be in the future
          },
        },
      };

    case DocumentType.BIRTH_CERTIFICATE:
      return {
        ...genericTemplate,
        name: "Birth Certificate Template",
        description: "Template for birth certificate documents",
        fields: {
          registrationNumber: {
            type: "string",
            required: true,
            description: "Registration/Certificate number",
          },
          fullName: {
            type: "string",
            required: true,
            description: "Full name of the person",
          },
          dateOfBirth: {
            type: "date",
            required: true,
            description: "Date of birth",
            format: "YYYY-MM-DD",
          },
          placeOfBirth: {
            type: "string",
            required: true,
            description: "Place of birth",
          },
          sex: {
            type: "string",
            required: true,
            description: "Sex/Gender",
          },
          fatherName: {
            type: "string",
            required: false,
            description: "Father's name",
          },
          motherName: {
            type: "string",
            required: false,
            description: "Mother's name",
          },
          registrationDate: {
            type: "date",
            required: false,
            description: "Date of registration",
            format: "YYYY-MM-DD",
          },
          issuingAuthority: {
            type: "string",
            required: true,
            description: "Issuing authority",
          },
        },
        sections: [
          "Child Information",
          "Parent Information",
          "Registration Details",
        ],
        validations: {
          registrationNumber: {
            minLength: 5,
            maxLength: 30,
          },
        },
      };

    case DocumentType.EDUCATION_CREDENTIAL:
      return {
        ...genericTemplate,
        name: "Education Credential Template",
        description: "Template for educational certificates and diplomas",
        fields: {
          credentialType: {
            type: "string",
            required: true,
            description:
              "Type of credential (e.g., Degree, Diploma, Certificate)",
          },
          institutionName: {
            type: "string",
            required: true,
            description: "Name of educational institution",
          },
          studentName: {
            type: "string",
            required: true,
            description: "Name of student/graduate",
          },
          programName: {
            type: "string",
            required: true,
            description: "Name of program/course of study",
          },
          awardedDate: {
            type: "date",
            required: true,
            description: "Date credential was awarded",
            format: "YYYY-MM-DD",
          },
          graduationDate: {
            type: "date",
            required: false,
            description: "Date of graduation",
            format: "YYYY-MM-DD",
          },
          degreeLevel: {
            type: "string",
            required: false,
            description:
              "Level of degree (e.g., Bachelor's, Master's, Doctorate)",
          },
          majorField: {
            type: "string",
            required: false,
            description: "Major field of study",
          },
          gpa: {
            type: "string",
            required: false,
            description: "Grade Point Average or final grade",
          },
          registrationNumber: {
            type: "string",
            required: false,
            description: "Registration or certificate number",
          },
        },
        sections: [
          "Student Information",
          "Institution Information",
          "Program Details",
          "Verification",
        ],
        validations: {},
      };

    default:
      return genericTemplate;
  }
}

/**
 * Get all available document templates
 */
export async function getAllDocumentTemplates(): Promise<DocumentTemplate[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("document_templates")
      .select("*")
      .order("type", { ascending: true });

    if (error) {
      console.error("Error fetching document templates:", error);
      return getDefaultTemplates();
    }

    // Parse templates
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      countries: item.countries,
      fields: item.fields,
      sections: item.sections,
      validations: item.validations,
    }));
  } catch (error) {
    console.error("Error in getAllDocumentTemplates:", error);
    return getDefaultTemplates();
  }
}

/**
 * Get default templates for all document types
 */
function getDefaultTemplates(): DocumentTemplate[] {
  return Object.values(DocumentType).map((type) => getDefaultTemplate(type));
}
