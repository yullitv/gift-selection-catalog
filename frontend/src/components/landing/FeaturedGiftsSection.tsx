import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GiftCard from "@/components/landing/GiftCard";
import { catalogUrl } from "@/lib/catalogUrl";
import { fetchGifts } from "@/lib/giftsApi";
import type { GiftDto } from "@/types/gift";

const FEATURED_GIFTS_COUNT = 3;

function GiftCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-lg backdrop-blur-md">
      <div className="aspect-square w-full animate-pulse bg-muted" />
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

export default function FeaturedGiftsSection() {
  const [gifts, setGifts] = useState<GiftDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchGifts({ size: FEATURED_GIFTS_COUNT, sort: "NEWEST" })
      .then((data) => {
        if (!cancelled) {
          setGifts(data.slice(0, FEATURED_GIFTS_COUNT));
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setGifts(null);
          setError(e instanceof Error ? e.message : "Failed to load gifts");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = gifts === null && !error;
  const isEmpty = gifts !== null && gifts.length === 0;

  const gridClassName =
    "mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6";

  return (
    <section className="relative flex min-h-below-header flex-col overflow-hidden border-y border-border/40">
      <img
        src="/images/home/popular-products-block-giveheart.jpg"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/40" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-center px-4 py-8 md:py-10">
        <div className="mx-auto mb-6 max-w-2xl shrink-0 text-center md:mb-8">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Top picks: What people are buying right now
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Real-time popular original gifts that solve the &quot;what to give&quot;
            problem.
          </p>
        </div>

        {error ? (
          <p className="mb-4 text-center text-sm text-destructive" role="alert">
            {error}. Popular gifts are temporarily unavailable.
          </p>
        ) : null}

        {isLoading ? (
          <div className={gridClassName}>
            {Array.from({ length: FEATURED_GIFTS_COUNT }).map((_, i) => (
              <GiftCardSkeleton key={i} />
            ))}
          </div>
        ) : null}

        {isEmpty ? (
          <p className="text-center text-sm text-muted-foreground">No gifts yet.</p>
        ) : null}

        {gifts && gifts.length > 0 ? (
          <div className={gridClassName}>
            {gifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex shrink-0 justify-center md:mt-8">
          <Link
            to={catalogUrl()}
            className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            View 150+ popular gifts →
          </Link>
        </div>
      </div>
    </section>
  );
}
