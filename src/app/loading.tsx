export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-muted animate-spin border-t-white" />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
}
