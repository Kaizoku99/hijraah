/**
 * Form utility functions
 */

/**
 * Extracts form data from a FormData object
 */
export function extractFormData(formData: FormData): Record<string, string | File | string[]> {
  const data: Record<string, string | File | string[]> = {};
  
  for (const [key, value] of formData.entries()) {
    // Handle arrays (fields with same name)
    if (data[key] !== undefined) {
      if (Array.isArray(data[key])) {
        (data[key] as string[]).push(value as string);
      } else {
        data[key] = [data[key] as string, value as string];
      }
    } else {
      data[key] = value;
    }
  }
  
  return data;
}

/**
 * Formats form errors for display
 */
export function formatFormErrors(errors: Record<string, string[]>): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  Object.entries(errors).forEach(([field, messages]) => {
    formatted[field] = messages.join('. ');
  });
  
  return formatted;
}

/**
 * Serializes form data to a query string
 */
export function serializeFormData(formData: FormData): string {
  const params = new URLSearchParams();
  
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  }
  
  return params.toString();
}

/**
 * Deserializes a query string to a record object
 */
export function deserializeQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
}
