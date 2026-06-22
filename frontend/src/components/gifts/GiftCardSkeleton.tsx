export default function GiftCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-lg backdrop-blur-md">
      <div className="aspect-square w-full shrink-0 animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="flex justify-between gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}