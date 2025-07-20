import { useQuery } from '@tanstack/react-query'
import { fetchArticles, ArticleSearchResult } from '../lib/api'

interface UseArticlesOptions {
  initialData?: ArticleSearchResult | null
  initialError?: Error | null
}

export function useArticles(
  searchQuery: string,
  pageNumber = 0,
  options?: UseArticlesOptions
) {
  return useQuery({
    queryKey: ['articles', searchQuery, pageNumber],
    queryFn: () => fetchArticles(searchQuery, pageNumber),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    initialData: options?.initialData || undefined,
    retry: (attemptCount, error) => {
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase()
        if (errorMsg.includes('401') || errorMsg.includes('403')) {
          return false
        }
      }

      return attemptCount < 2
    },
  })
}
