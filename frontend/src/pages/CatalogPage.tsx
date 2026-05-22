import { Link, useSearchParams } from "react-router-dom";

export default function CatalogPage() {
  const [searchParams] = useSearchParams();

  const targetAudience = searchParams.get("targetAudience");
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const sort = searchParams.get("sort");

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Catalog</h1>
      <p className="mt-2 text-muted-foreground">Catalog — coming soon.</p>

      <section className="mt-6 rounded-lg border border-border p-4">
        <h2 className="text-sm font-semibold">Query params (debug)</h2>
        <pre className="mt-2 overflow-x-auto text-xs text-muted-foreground">
          {JSON.stringify(
            {
              targetAudience,
              q,
              page,
              size,
              sort,
            },
            null,
            2,
          )}
        </pre>
      </section>

      <p className="mt-6">
        <Link to="/" className="text-primary underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}