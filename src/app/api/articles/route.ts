import { NextRequest, NextResponse } from 'next/server'
import { NYTArticle, NYTResponse } from '../../../types/nyt'

const API_KEY = process.env.NYT_API_KEY
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

export interface ArticleSearchResult {
  articles: NYTArticle[]
  totalHits: number
  currentPage: number
}

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'NY Times API key not configured' },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '0', 10)

  try {
    const apiUrl = new URL(BASE_URL)
    apiUrl.searchParams.set('q', query)
    apiUrl.searchParams.set('api-key', API_KEY)
    apiUrl.searchParams.set('sort', 'newest')
    apiUrl.searchParams.set('page', page.toString())

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NY Times API Error:', response.status, errorText)

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API credentials' },
          { status: 401 }
        )
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      } else {
        return NextResponse.json(
          { error: 'Failed to fetch articles from NY Times' },
          { status: response.status }
        )
      }
    }

    const data: NYTResponse = await response.json()

    const result: ArticleSearchResult = {
      articles: data.response.docs,
      totalHits: data.response.metadata.hits,
      currentPage: page,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Internal server error while fetching articles' },
      { status: 500 }
    )
  }
}
