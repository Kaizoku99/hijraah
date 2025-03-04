import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Prefetch helper
export async function prefetchQuery(
  queryKey: string[],
  queryFn: () => Promise<any>,
  options = {}
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

// Optimistic update helper
export function optimisticUpdate<T>(
  queryKey: string[],
  updateFn: (oldData: T) => T
) {
  queryClient.setQueryData(queryKey, (oldData: T) => updateFn(oldData));
}