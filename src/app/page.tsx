import { getArticles } from './actions'
import ClientHome from './client-home'
import { Metadata } from 'next'

interface PageProps {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams
  const searchQuery = params.q || ''

  const pageTitle = searchQuery
    ? `"${searchQuery}" - NY Times Articles`
    : 'NY Times Articles - Latest News and Stories'

  const pageDescription = searchQuery
    ? `Discover articles about "${searchQuery}" from The New York Times - America's newspaper of record`
    : 'Explore the latest breaking news, analysis, and stories from The New York Times'

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
    },
  }
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const searchQuery = params.q || ''
  const currentPage = parseInt(params.page || '0', 10)

  const initialArticles = await getArticles(searchQuery, currentPage)

  return (
    <ClientHome 
      initialQuery={searchQuery}
      initialPage={currentPage}
      initialData={initialArticles.success ? initialArticles.data : null}
      initialError={initialArticles.error}
    />
  )
}
