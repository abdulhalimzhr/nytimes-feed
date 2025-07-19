import Link from 'next/link'
import ThemeToggle from './theme-toggle'

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-4 sm:px-8 border-b border-border bg-background sticky top-0 z-30">
      <Link
        href="/"
        className="text-2xl font-bold text-black dark:text-white tracking-tight"
      >
        NY Times
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </nav>
  )
}
