import { getArticles } from './actions'
import ClientHome from './client-home'

interface PageProps {
  searchParams: {
    q?: string
    page?: string
  }
}

export default async function Home({ searchParams }: PageProps) {
  const query = searchParams.q || ''
  const page = parseInt(searchParams.page || '0', 10)

  // Fetch initial data on the server
  const initialData = await getArticles(query, page)

  return (
    <ClientHome
      initialQuery={query}
      initialPage={page}
      initialData={initialData.success ? initialData.data : null}
      initialError={initialData.error}
    />
  )
}
