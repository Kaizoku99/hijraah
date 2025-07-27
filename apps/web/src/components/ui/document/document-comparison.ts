import { DocumentAnalysis } from "@/types/documents";

export interface DocumentComparisonResult {
  fieldDifferences: Array<{
    field: string;
    source1Value: any;
    source2Value: any;
    isSignificant: boolean;
  }>;
  completenessComparison: {
    source1Score: number;
    source2Score: number;
    difference: number;
  };
  errorComparison: {
    source1ErrorCount: number;
    source2ErrorCount: number;
    difference: number;
  };
  overallImprovement: number; // Negative means regression, positive means improvement
}

export function compareDocumentAnalysis(
  source1: DocumentAnalysis,
  source2: DocumentAnalysis,
): DocumentComparisonResult {
  // Compare extracted data fields
  const fieldDifferences = [];
  const allFields = new Set([
    ...Object.keys(source1.extractedData),
    ...Object.keys(source2.extractedData),
  ]);

  for (const field of allFields) {
    const source1Value = source1.extractedData[field];
    const source2Value = source2.extractedData[field];

    if (source1Value !== source2Value) {
      fieldDifferences.push({
        field,
        source1Value,
        source2Value,
        isSignificant: isSignificantDifference(
          field,
          source1Value,
          source2Value,
        ),
      });
    }
  }

  // Compare completeness scores
  const completenessComparison = {
    source1Score: source1.completeness,
    source2Score: source2.completeness,
    difference: source2.completeness - source1.completeness,
  };

  // Compare error counts
  const source1ErrorCount =
    source1.formatErrors.length + source1.contentErrors.length;
  const source2ErrorCount =
    source2.formatErrors.length + source2.contentErrors.length;

  const errorComparison = {
    source1ErrorCount,
    source2ErrorCount,
    difference: source1ErrorCount - source2ErrorCount,
  };

  // Calculate overall improvement score
  // 60% weight on error reduction, 40% weight on completeness improvement
  const overallImprovement =
    errorComparison.difference * 0.6 +
    completenessComparison.difference * 100 * 0.4;

  return {
    fieldDifferences,
    completenessComparison,
    errorComparison,
    overallImprovement,
  };
}

// Helper function to determine if a difference is significant
function isSignificantDifference(
  field: string,
  value1: any,
  value2: any,
): boolean {
  // Date fields - check if dates are more than a day apart
  if (
    field.toLowerCase().includes("date") &&
    isValidDate(value1) &&
    isValidDate(value2)
  ) {
    const date1 = new Date(value1);
    const date2 = new Date(value2);
    const diffDays = Math.abs(
      (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diffDays > 1;
  }

  // Number fields - check if difference is more than 10%
  if (typeof value1 === "number" && typeof value2 === "number") {
    const max = Math.max(Math.abs(value1), Math.abs(value2));
    if (max === 0) return false;
    const percentDiff = (Math.abs(value1 - value2) / max) * 100;
    return percentDiff > 10;
  }

  // String fields - check if significantly different
  if (typeof value1 === "string" && typeof value2 === "string") {
    // If one is empty and other isn't, that's significant
    if ((!value1 && value2) || (value1 && !value2)) return true;

    // If length differs by more than 20%, that's significant
    const maxLength = Math.max(value1.length, value2.length);
    if (maxLength > 0) {
      const lengthDiff =
        (Math.abs(value1.length - value2.length) / maxLength) * 100;
      if (lengthDiff > 20) return true;
    }
  }

  // For critical fields, any difference is significant
  const criticalFields = [
    "passport_number",
    "id_number",
    "name",
    "surname",
    "nationality",
  ];
  if (
    criticalFields.some((critField) => field.toLowerCase().includes(critField))
  ) {
    return value1 !== value2;
  }

  return false;
}

function isValidDate(value: any): boolean {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}
