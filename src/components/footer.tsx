import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-foreground">
            NY Times Feed
          </Link>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Discover the latest news and articles from The New York Times. Stay
            informed with quality journalism and in-depth reporting.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://www.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              NY Times
            </a>
            <a
              href="https://developer.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              API
            </a>
            <a
              href="https://help.nytimes.com/hc/en-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </a>
            <a
              href="https://www.nytimes.com/privacy/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border w-full">
            <p>
              © 2025 NY Times Feed. Content provided by The New York Times API.
            </p>
            <p className="mt-1">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
