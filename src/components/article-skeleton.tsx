import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function ArticleSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-0 mb-3 overflow-hidden rounded-t-lg">
        <div className="w-full h-40 bg-muted animate-pulse" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 pt-2">
          <div className="h-6 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-2" />
        </div>
        <div className="px-4">
          <div className="h-4 bg-muted animate-pulse rounded mb-1" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6 mb-1" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3 mb-2" />
        </div>
        <div className="px-4 pb-2">
          <div className="h-3 bg-muted animate-pulse rounded w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ArticleSkeletonGrid() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
      {[...Array(3)].map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  )
}
