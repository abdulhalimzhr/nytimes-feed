import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ClientHome from '../src/app/client-home'
import { fetchArticles } from '../src/lib/api'

jest.mock('../src/lib/api')
const mockFetchArticles = fetchArticles as jest.MockedFunction<
  typeof fetchArticles
>

// Mock Next.js components for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const sampleArticle = {
  _id: 'nyt://article/test-123',
  web_url: 'https://www.nytimes.com/2025/07/19/business/test-article.html',
  headline: {
    main: 'Wall Street Wants to Make Private Markets a Little More Public',
  },
  snippet:
    'As value grows in private markets, fund managers are building products that expand access.',
  abstract:
    'Private markets are becoming more accessible through new financial products.',
  byline: {
    original: 'By Ian Frisch',
  },
  pub_date: '2025-07-19T12:00:02Z',
  multimedia: {
    caption: 'Test image',
    credit: 'Test credit',
    default: {
      url: 'https://static01.nyt.com/images/test.jpg',
      width: 600,
      height: 400,
    },
    thumbnail: {
      url: 'https://static01.nyt.com/images/thumb.jpg',
      width: 75,
      height: 75,
    },
  },
  source: 'The New York Times',
  keywords: [],
  document_type: 'article',
  type_of_material: 'News',
  word_count: 1200,
}

// Test helper function
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  })
}

function renderApp() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <ClientHome
        initialQuery=""
        initialPage={0}
        initialData={null}
        initialError={null}
      />
    </QueryClientProvider>
  )
}

describe('NY Times Feed App', () => {
  beforeEach(() => {
    mockFetchArticles.mockClear()
    mockFetchArticles.mockResolvedValue({
      articles: [],
      totalHits: 0,
      currentPage: 0,
    })
  })

  it('shows all the main parts of the page', () => {
    renderApp()

    expect(screen.getByText('The New York Times')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('shows articles when you search for something', async () => {
    renderApp()

    // Mock what happens when someone searches
    mockFetchArticles.mockResolvedValue({
      articles: [sampleArticle],
      totalHits: 1,
      currentPage: 0,
    })

    const searchBox = screen.getByPlaceholderText(/search/i)
    const searchBtn = screen.getByRole('button', { name: /search/i })

    // Type something and search
    fireEvent.change(searchBox, { target: { value: 'finance' } })
    fireEvent.click(searchBtn)

    // Check that the article shows up
    await waitFor(() => {
      expect(
        screen.getByText(
          'Wall Street Wants to Make Private Markets a Little More Public'
        )
      ).toBeInTheDocument()
    })

    expect(
      screen.getByText(/As value grows in private markets/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Ian Frisch/)).toBeInTheDocument()
  })

  it('shows an error when something goes wrong', async () => {
    renderApp()

    const searchBox = screen.getByPlaceholderText(/search/i)
    const searchBtn = screen.getByRole('button', { name: /search/i })

    // Make the API fail
    mockFetchArticles.mockClear()
    mockFetchArticles.mockRejectedValue(new Error('API Error'))

    fireEvent.change(searchBox, { target: { value: 'test' } })
    fireEvent.click(searchBtn)

    // Wait for the error to show up
    await new Promise(resolve => setTimeout(resolve, 100))

    await waitFor(
      () => {
        expect(screen.getByText('API Error')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('lets you click on articles to read them', async () => {
    renderApp()

    mockFetchArticles.mockResolvedValue({
      articles: [sampleArticle],
      totalHits: 1,
      currentPage: 0,
    })

    const searchBox = screen.getByPlaceholderText(/search/i)
    const searchBtn = screen.getByRole('button', { name: /search/i })

    fireEvent.change(searchBox, { target: { value: 'test' } })
    fireEvent.click(searchBtn)

    await waitFor(() => {
      const articleLink = screen.getByRole('link', {
        name: /Wall Street Wants to Make Private Markets a Little More Public/i,
      })

      // Check the link goes to the right place and opens in a new tab
      expect(articleLink).toHaveAttribute('href', sampleArticle.web_url)
      expect(articleLink).toHaveAttribute('target', '_blank')
      expect(articleLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
