import { useEffect, useState } from "react";

import { fetchGifts } from "@/lib/giftsApi";
import type { GiftDto } from "@/types/gift";

function App() {
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
    <div className="mx-auto max-w-2xl p-6 font-sans">
      <h1 className="text-3xl font-bold text-blue-600">Gift Selection Catalog</h1>
      <p className="mt-2 text-muted-foreground">
        TPM-21 smoke test: <code className="rounded bg-muted px-1">GET /gifts</code> через{" "}
        <code className="rounded bg-muted px-1">VITE_API_URL</code> і Vite proxy.
      </p>

      <section className="mt-6 rounded-lg border border-border p-4">
        {gifts === null && !error && <p className="text-sm text-muted-foreground">Завантаження…</p>}
        {error && (
          <p className="text-sm text-destructive">
            {error}. Перевір бекенд на <code className="rounded bg-muted px-1">localhost:8080</code> і файл{" "}
            <code className="rounded bg-muted px-1">frontend/.env</code> з{" "}
            <code className="rounded bg-muted px-1">VITE_API_URL=/api</code>.
          </p>
        )}
        {gifts && (
          <>
            <p className="text-sm font-medium">Отримано подарунків: {gifts.length}</p>
            <ul className="mt-3 list-inside list-disc text-sm">
              {gifts.slice(0, 8).map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
            {gifts.length > 8 && (
              <p className="mt-2 text-xs text-muted-foreground">…і ще {gifts.length - 8}</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default App;
