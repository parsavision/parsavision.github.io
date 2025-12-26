export default function PostLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {/* Post header skeleton */}
        <header className="space-y-6 mb-12">
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            <div className="h-6 w-20 bg-muted/60 rounded animate-pulse" />
          </div>
          <div className="h-12 w-full bg-muted rounded animate-pulse" />
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-32 bg-muted/60 rounded animate-pulse" />
            </div>
          </div>
        </header>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted/60 rounded animate-pulse" />
          <div className="h-8 w-48 bg-muted rounded animate-pulse mt-8" />
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted/60 rounded animate-pulse" />
          <div className="h-32 w-full bg-muted/40 rounded-lg animate-pulse mt-4" />
          <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted/60 rounded animate-pulse" />
        </div>
      </article>
    </div>
  );
}
