import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { fetchGiftById, fetchGifts } from "@/lib/gifts/giftsApi";
import type { GiftDto } from "@/types/gift";

const RECOMMENDATIONS_SIZE = 4;

export function useGiftDetail(giftId: number) {
  const [gift, setGift] = useState<GiftDto | null>(null);
  const [recommendations, setRecommendations] = useState<GiftDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const detail = await fetchGiftById(giftId);
        if (cancelled) return;

        setGift(detail);

        const related = await fetchGifts({
          size: RECOMMENDATIONS_SIZE + 1,
          sort: "NEWEST",
          targetAudience:
            detail.targetAudiences.length > 0
              ? [detail.targetAudiences[0]]
              : undefined,
        });

        if (cancelled) return;

        setRecommendations(
          related.filter((g) => g.id !== detail.id).slice(0, RECOMMENDATIONS_SIZE),
        );
      } catch (e: unknown) {
        if (cancelled) return;
        setGift(null);
        setRecommendations([]);
        if (isAxiosError(e) && e.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("Could not load this gift. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [giftId]);

  return { gift, recommendations, loading, notFound, error };
}