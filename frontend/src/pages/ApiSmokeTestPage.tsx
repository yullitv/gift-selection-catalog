import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchGifts } from "@/lib/giftsApi";
import type { GiftDto } from "@/types/gift";

export default function ApiSmokeTestPage() {
  const [gifts, setGifts] = useState<GiftDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGifts()
      .then((data) => {
        if (!cancelled) {
          setGifts(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setGifts(null);
          setError(e instanceof Error ? e.message : "Request failed");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-blue-600">API smoke test</h1>
      <p className="mt-2 text-muted-foreground">
        <code className="rounded bg-muted px-1">GET /gifts</code> via{" "}
        <code className="rounded bg-muted px-1">VITE_API_URL</code> and Vite proxy.
      </p>

      <section className="mt-6 rounded-lg border border-border p-4">
        {gifts === null && !error && (
          <p className="text-sm text-muted-foreground">Loading…</p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            {error}. Check backend on{" "}
            <code className="rounded bg-muted px-1">localhost:8080</code> and{" "}
            <code className="rounded bg-muted px-1">frontend/.env</code> with{" "}
            <code className="rounded bg-muted px-1">VITE_API_URL=/api</code>.
          </p>
        )}
        {gifts && (
          <>
            <p className="text-sm font-medium">Gifts received: {gifts.length}</p>
            <ul className="mt-3 list-inside list-disc text-sm">
              {gifts.slice(0, 8).map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
            {gifts.length > 8 && (
              <p className="mt-2 text-xs text-muted-foreground">
                …and {gifts.length - 8} more
              </p>
            )}
          </>
        )}
      </section>

      <p className="mt-6">
        <Link to="/" className="text-primary underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}