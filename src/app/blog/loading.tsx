export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-10 w-48 bg-muted rounded animate-pulse" />
          <div className="h-5 w-80 bg-muted/60 rounded animate-pulse" />
        </div>

        {/* Posts grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="h-5 w-20 bg-muted rounded animate-pulse" />
              <div className="h-6 w-full bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted/60 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted/40 rounded animate-pulse" />
                <div className="h-6 w-16 bg-muted/40 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
