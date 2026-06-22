import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { fetchGifts } from "@/lib/gifts/giftsApi";
import { notifyError, notifySuccess } from "@/lib/notify";
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
        <code className="rounded bg-muted px-1">VITE_API_URL</code> and Vite
        proxy.
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
            <p className="text-sm font-medium">
              Gifts received: {gifts.length}
            </p>
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

      <section className="mt-8 rounded-lg border border-brand-gold/30 bg-brand-cream/50 p-4">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          UI checks (Success, 404, Toasts)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Dev-only helpers for this branch. Remove or keep on{" "}
          <code className="rounded bg-muted px-1">{ROUTES.devSmoke}</code>{" "}
          before merge — as your team prefers.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm hover:bg-white/80"
            onClick={() => notifySuccess("Test success toast")}
          >
            Test success toast
          </button>
          <button
            type="button"
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm hover:bg-white/80"
            onClick={() => notifyError("Test error toast")}
          >
            Test error toast
          </button>
        </div>

        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              to={ROUTES.orderSuccess}
              state={{ orderId: "TEST-001" }}
              className="font-medium text-brand-gold underline-offset-4 hover:underline"
            >
              Test order success page (with order ID)
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.orderSuccess}
              className="font-medium text-brand-gold underline-offset-4 hover:underline"
            >
              Test success guard (no order ID → should redirect to catalog)
            </Link>
          </li>
          <li>
            <Link
              to="/this-page-does-not-exist"
              className="font-medium text-brand-gold underline-offset-4 hover:underline"
            >
              Test 404 page
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-6">
        <Link to={ROUTES.home} className="text-primary underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
