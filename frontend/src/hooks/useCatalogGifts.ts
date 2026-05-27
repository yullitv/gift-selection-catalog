import { useEffect, useState } from "react";

import { fetchGiftPage } from "@/lib/gifts/giftsApi";
import {
  parseCatalogSearchParams,
  toFetchGiftsParams,
} from "@/lib/catalog/catalogSearchParams";
import type { GiftDto } from "@/types/gift";

export function useCatalogGifts(searchParams: URLSearchParams) {
  const [gifts, setGifts] = useState<GiftDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const currentFilters = parseCatalogSearchParams(searchParams);

    async function load() {
      const isLoadMore = currentFilters.page > 0;
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      try {
        const page = await fetchGiftPage(toFetchGiftsParams(currentFilters));
        if (cancelled) return;

        setGifts((prev) =>
          isLoadMore ? [...prev, ...page.content] : page.content,
        );
        setHasMore(!page.last);
      } catch {
        if (!cancelled) {
          setError("Could not load gifts. Please try again.");
          if (!isLoadMore) setGifts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const showEmpty = !loading && !error && gifts.length === 0;

  return {
    gifts,
    loading,
    loadingMore,
    error,
    hasMore,
    showEmpty,
  };
}
