import { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

import { addWishlistItem, fetchWishlist, removeWishlistItem } from "@/lib/wishlist/wishlistApi";
import { WISHLIST_CHANGE_EVENT } from "@/lib/wishlist/wishlistEvents";
import type { WishlistItemDto } from "@/types/wishlist";

type WishlistEntry = Pick<WishlistItemDto, "id" | "giftId">;

function toEntries(items: WishlistItemDto[]): WishlistEntry[] {
  return items.map((item) => ({ id: item.id, giftId: item.giftId }));
}

export function useWishlist(enabled: boolean) {
  const [entries, setEntries] = useState<WishlistEntry[]>([]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    async function loadWishlist() {
      try {
        const items = await fetchWishlist();
        if (!cancelled) {
          setEntries(toEntries(items));
        }
      } catch {
        if (!cancelled) {
          setEntries([]);
        }
      }
    }

    void loadWishlist();

    const sync = () => {
      void loadWishlist();
    };

    window.addEventListener(WISHLIST_CHANGE_EVENT, sync);
    window.addEventListener("auth-change", sync);

    return () => {
      cancelled = true;
      window.removeEventListener(WISHLIST_CHANGE_EVENT, sync);
      window.removeEventListener("auth-change", sync);
    };
  }, [enabled]);

  const count = useMemo(
    () => (enabled ? entries.length : 0),
    [enabled, entries.length],
  );

  const isInWishlist = useCallback(
    (giftId: number) => enabled && entries.some((entry) => entry.giftId === giftId),
    [enabled, entries],
  );

  const addToWishlist = useCallback(
    async (giftId: number) => {
      if (!enabled) {
        return;
      }

      try {
        const items = await addWishlistItem({ giftId });
        setEntries(toEntries(items));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          const items = await fetchWishlist();
          setEntries(toEntries(items));
          return;
        }
        throw error;
      }
    },
    [enabled],
  );

  const removeFromWishlist = useCallback(
    async (giftId: number) => {
      if (!enabled) {
        return;
      }

      const entry = entries.find((item) => item.giftId === giftId);
      if (!entry) {
        return;
      }

      const items = await removeWishlistItem(entry.id);
      setEntries(toEntries(items));
    },
    [enabled, entries],
  );

  return {
    count,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}
