import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../components/search-bar'
import ArticleCard from '../components/article-card'

// Mock article data
const mockArticle = {
  _id: '12345',
  web_url: 'https://www.nytimes.com/test-article',
  snippet: 'This is a test article snippet.',
  headline: { main: 'Test Article Headline' },
  byline: { original: 'By Test Author' },
  pub_date: '2025-01-19T10:00:00Z',
  multimedia: {
    default: {
      url: 'images/test-image.jpg',
      width: 400,
      height: 200,
    },
    caption: 'Test image caption',
    credit: 'Test image credit',
    thumbnail: {
      url: 'images/test-thumbnail.jpg',
      width: 100,
      height: 50,
    },
  },
  lead_paragraph: 'Test paragraph',
  abstract: 'Test abstract',
  source: 'The New York Times',
  keywords: [],
  document_type: 'article',
  word_count: 100,
}

describe('NYT Article Search App', () => {
  describe('SearchBar Component', () => {
    it('renders search input and button', () => {
      const mockOnSearch = jest.fn()
      render(<SearchBar onSearch={mockOnSearch} />)

      expect(
        screen.getByPlaceholderText(/search articles or leave empty/i)
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument()
    })

    it('calls onSearch when form is submitted', async () => {
      const mockOnSearch = jest.fn()
      render(<SearchBar onSearch={mockOnSearch} />)

      const input = screen.getByPlaceholderText(/search articles or leave empty/i)
      const button = screen.getByRole('button', { name: /search/i })

      fireEvent.change(input, { target: { value: '' } })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('')
      })
    })
  })

  describe('ArticleCard Component', () => {
    it('renders article title, author, and date', () => {
      render(<ArticleCard article={mockArticle} />)

      expect(screen.getByText('Test Article Headline')).toBeInTheDocument()
      expect(screen.getByText(/By Test Author/)).toBeInTheDocument()
      expect(screen.getByText(/Jan 19, 2025/)).toBeInTheDocument()
    })

    it('renders article snippet', () => {
      render(<ArticleCard article={mockArticle} />)

      expect(
        screen.getByText('This is a test article snippet.')
      ).toBeInTheDocument()
    })

    it('has clickable link that opens in new tab', () => {
      render(<ArticleCard article={mockArticle} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute(
        'href',
        'https://www.nytimes.com/test-article'
      )
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders "Read more" text', () => {
      render(<ArticleCard article={mockArticle} />)

      expect(screen.getByText('Read more')).toBeInTheDocument()
    })
  })
})
