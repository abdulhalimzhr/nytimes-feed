'use client'
import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form
      className="w-full flex gap-2 mt-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search articles or leave empty for all..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="shrink-0">
        Search
      </Button>
    </form>
  )
}
