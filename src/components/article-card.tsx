import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { NYTArticle } from '../types/nyt'

interface ArticleCardProps {
  article: NYTArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const headline = article.headline?.main || ''
  const snippet = article.snippet || ''
  const url = article.web_url || '#'

  // Get author name from byline
  let author = 'NYT Staff'
  if (article.byline?.original) {
    author = article.byline.original
  } else if (article.byline?.person && article.byline.person.length > 0) {
    author = article.byline.person
      .map(p => `${p.firstname} ${p.lastname}`)
      .join(', ')
  }

  // Format the publication date
  const pubDate = new Date(article.pub_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // Check for image
  const imageUrl =
    article.multimedia?.default?.url ||
    article.multimedia?.thumbnail?.url ||
    null

  const imageWidth =
    article.multimedia?.default?.width ||
    article.multimedia?.thumbnail?.width ||
    400
  const imageHeight =
    article.multimedia?.default?.height ||
    article.multimedia?.thumbnail?.height ||
    200

  return (
    <Card className="w-full max-w-md mx-auto flex flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        {imageUrl && (
          <CardHeader className="p-0 mb-3 overflow-hidden rounded-t-lg">
            <Image
              src={imageUrl}
              alt={headline}
              width={imageWidth}
              height={imageHeight}
              className="object-cover w-full h-40"
            />
          </CardHeader>
        )}
        <CardContent className="p-0 flex flex-col flex-grow">
          <CardTitle>
            <span className="text-xl font-bold mb-1 text-black dark:text-white px-4 pt-2 block">
              {headline}
            </span>
          </CardTitle>
          <div className="px-4 mb-2">
            <p className="text-xs text-muted-foreground">
              By {author} • {pubDate}
            </p>
          </div>
          <CardDescription className="flex-grow">
            <span className="text-sm text-muted-foreground mb-2 line-clamp-3 px-4 block">
              {snippet}
            </span>
          </CardDescription>
          <div className="p-4 flex justify-end">
            <span className="text-xs text-primary underline">Read more</span>
          </div>
        </CardContent>
      </a>
    </Card>
  )
}
