import { useQuery } from '@tanstack/react-query'
import { fetchArticles } from '../lib/api'

export function useArticles(query: string, page = 0) {
  return useQuery({
    queryKey: ['articles', query, page],
    queryFn: () => fetchArticles(query, page),
    enabled: true, // Always enabled so empty queries work too
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('403')) {
          return false
        }
      }
      return failureCount < 2
    },
  })
}
