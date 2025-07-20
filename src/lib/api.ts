import { NYTArticle, NYTResponse } from '../types/nyt'

const NYT_API_KEY = process.env.NYT_API_KEY
const NYT_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

export interface ArticleSearchResult {
  articles: NYTArticle[]
  totalHits: number
  currentPage: number
}

export async function fetchArticlesFromNYT(
  query: string = '',
  page: number = 0
): Promise<ArticleSearchResult> {
  if (!NYT_API_KEY) {
    throw new Error('NY Times API key not configured')
  }

  const url = new URL(NYT_BASE_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('api-key', NYT_API_KEY)
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
    console.error('NY Times API Error:', res.status, errorText)

    if (res.status === 401) {
      throw new Error('Invalid NY Times API credentials')
    } else if (res.status === 429) {
      throw new Error('Too many requests. Please try again later.')
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

export async function fetchArticles(
  query: string = '',
  page: number = 0
): Promise<ArticleSearchResult> {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const url = new URL('/api/articles', baseUrl)
  url.searchParams.set('q', query)
  url.searchParams.set('page', page.toString())

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    const errorMessage = errorData.error || `Request failed with status ${res.status}`
    
    if (res.status === 401) {
      throw new Error('Authentication failed')
    } else if (res.status === 429) {
      throw new Error('Too many requests. Please try again later.')
    } else {
      throw new Error(errorMessage)
    }
  }

  return await res.json()
}
