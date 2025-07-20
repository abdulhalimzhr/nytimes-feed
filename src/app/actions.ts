'use server'

import { fetchArticlesFromNYT } from '../lib/api'

export async function getArticles(searchQuery: string = '', currentPage: number = 0) {
  try {
    const articles = await fetchArticlesFromNYT(searchQuery, currentPage)
    return {
      success: true,
      data: articles,
      error: null
    }
  } catch (error) {
    console.error('Error fetching articles on server:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Something went wrong while loading articles. Please try again.'
      
    return {
      success: false,
      data: null,
      error: errorMessage
    }
  }
}
