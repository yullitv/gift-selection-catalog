export default function CatalogEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border p-12 text-center">
      <p className="text-lg font-medium">No results found</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Try changing your search or filters.
      </p>
    </div>
  );
}