import { NYTArticle, NYTResponse } from '../types/nyt'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

export interface ArticleSearchResult {
  articles: NYTArticle[]
  totalHits: number
  currentPage: number
}

export async function fetchArticles(
  query: string = '',
  page: number = 0
): Promise<ArticleSearchResult> {
  const url = new URL(BASE_URL)

  url.searchParams.set('q', query)
  url.searchParams.set('api-key', API_KEY)
  url.searchParams.set('sort', 'newest')
  url.searchParams.set('page', page.toString())

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('API Error:', res.status, errorText)

    if (res.status === 401) {
      throw new Error('Unauthorized')
    } else if (res.status === 429) {
      throw new Error('Too many requests.')
    } else {
      throw new Error(`Failed to fetch articles: ${res.status} ${errorText}`)
    }
  }

  const data: NYTResponse = await res.json()

  return {
    articles: data.response.docs,
    totalHits: data.response.metadata.hits,
    currentPage: page,
  }
}
