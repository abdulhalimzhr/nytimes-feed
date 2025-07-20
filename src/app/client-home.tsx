'use client'
import { useState } from 'react'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import SearchBar from '../components/search-bar'
import ArticleCard from '../components/article-card'
import Footer from '../components/footer'
import { ArticleSkeletonGrid } from '../components/article-skeleton'
import { BackToTop } from '../components/back-to-top'
import { Pagination } from '../components/pagination'
import { useArticles } from '../hooks/useArticles'
import { ArticleSearchResult } from '../lib/api'
import { useRouter, useSearchParams } from 'next/navigation'

interface ClientHomeProps {
  initialQuery: string
  initialPage: number
  initialData: ArticleSearchResult | null
  initialError: string | null
}

export default function ClientHome({
  initialQuery,
  initialPage,
  initialData,
  initialError,
}: ClientHomeProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const { data, isLoading, error, isError } = useArticles(searchQuery, currentPage, {
    initialData: initialData
  })

  const hasError = isError || !!initialError
  const displayError = error || (initialError ? new Error(initialError) : null)

  const handleSearch = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery)
    setCurrentPage(0)
    
    const params = new URLSearchParams(searchParams.toString())
    if (newSearchQuery) {
      params.set('q', newSearchQuery)
    } else {
      params.delete('q')
    }
    params.delete('page')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    
    const params = new URLSearchParams(searchParams.toString())
    if (newPage > 0) {
      params.set('page', newPage.toString())
    } else {
      params.delete('page')
    }
    router.push(`?${params.toString()}`, { scroll: false })
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const articles = data?.articles || []
  const totalHits = data?.totalHits || 0

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center !px-4 sm:px-0 w-full max-w-3xl mx-auto">
        <Hero />
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        {isLoading && <ArticleSkeletonGrid />}
        {hasError && (
          <p className="mt-6 text-center text-destructive">
            {displayError?.message ||
              'Something went wrong while loading articles. Please try again.'}
          </p>
        )}
        {!isLoading && !hasError && (
          <>
            {articles.length > 0 ? (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  {articles.map((article, i) => (
                    <ArticleCard key={article._id || i} article={article} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalHits={totalHits}
                  onPageChange={handlePageChange}
                  loading={isLoading}
                />
              </>
            ) : (
              <div className="mt-6 text-center text-muted-foreground">
                <p>
                  No articles found for your search. Try different keywords or
                  browse our latest stories.
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
