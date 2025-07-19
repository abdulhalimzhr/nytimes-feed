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

export default function Home() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const { data, isLoading, error, isError } = useArticles(query, page)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setPage(0)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const articles = data?.articles || []
  const totalHits = data?.totalHits || 0

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center !px-4 sm:px-0 w-full max-w-3xl mx-auto">
        <Hero />
        <SearchBar onSearch={handleSearch} />
        {isLoading && <ArticleSkeletonGrid />}
        {isError && (
          <p className="mt-6 text-center text-destructive">
            {(error as Error).message}
          </p>
        )}
        {!isLoading && !isError && (
          <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
              {articles.map((article, i) => (
                <ArticleCard key={article._id || i} article={article} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalHits={totalHits}
              onPageChange={handlePageChange}
              loading={isLoading}
            />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
