'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalHits: number
  onPageChange: (page: number) => void
  loading?: boolean
}

const ITEMS_PER_PAGE = 10
const MAX_PAGES = 100

export function Pagination({
  currentPage,
  totalHits,
  onPageChange,
  loading = false,
}: PaginationProps) {
  const totalPages = Math.min(Math.ceil(totalHits / ITEMS_PER_PAGE), MAX_PAGES)

  if (totalPages <= 1) {
    return null
  }

  const startItem = currentPage * ITEMS_PER_PAGE + 1
  const endItem = Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalHits)

  const getVisiblePages = () => {
    const delta = 1
    const start = Math.max(0, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    const pages = []

    // Add first page and ellipsis if needed
    if (start > 0) {
      pages.push(0)
      if (start > 1) {
        pages.push(-1) // represents ellipsis
      }
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add last page and ellipsis if needed
    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        pages.push(-1) // represents ellipsis
      }
      pages.push(totalPages - 1)
    }

    return pages
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8 mb-8">
      <div className="text-sm text-muted-foreground text-center">
        Showing {startItem}-{endItem} of {totalHits.toLocaleString()} results
      </div>

      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || loading}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getVisiblePages().map((page, index) => {
          if (page === -1) {
            return (
              <span
                key={`dots-${index}`}
                className="px-1 sm:px-2 text-muted-foreground flex-shrink-0"
              >
                ...
              </span>
            )
          }

          return (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              disabled={loading}
              className="h-8 min-w-8 px-2 flex-shrink-0 text-xs sm:text-sm"
            >
              {page + 1}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || loading}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
