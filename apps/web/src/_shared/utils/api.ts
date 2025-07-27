/**
 * API utility functions for making HTTP requests
 */

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
};

/**
 * Wrapper for fetch API that handles common error cases
 */
export async function fetchApi<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body, cache } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Helper for GET requests
 */
export function get<T = any>(url: string, options: Omit<FetchOptions, 'method'> = {}) {
  return fetchApi<T>(url, { ...options, method: 'GET' });
}

/**
 * Helper for POST requests
 */
export function post<T = any>(url: string, data: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) {
  return fetchApi<T>(url, { ...options, method: 'POST', body: data });
}

/**
 * Helper for PUT requests
 */
export function put<T = any>(url: string, data: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) {
  return fetchApi<T>(url, { ...options, method: 'PUT', body: data });
}

/**
 * Helper for PATCH requests
 */
export function patch<T = any>(url: string, data: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) {
  return fetchApi<T>(url, { ...options, method: 'PATCH', body: data });
}

/**
 * Helper for DELETE requests
 */
export function del<T = any>(url: string, options: Omit<FetchOptions, 'method'> = {}) {
  return fetchApi<T>(url, { ...options, method: 'DELETE' });
}
