import { Loader2, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import GiftCard from "@/components/gifts/GiftCard";
import GiftCardSkeleton from "@/components/gifts/GiftCardSkeleton";
import WishlistEmptyState from "@/components/wishlist/WishlistEmptyState";
import { Button } from "@/components/ui/button";
import { CATALOG_GRID_CLASS, CATALOG_SKELETON_COUNT } from "@/constants/catalog/layout";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import {
  fetchWishlist,
  removeWishlistItem,
} from "@/lib/wishlist/wishlistApi";
import {
  sortWishlistNewestFirst,
  wishlistItemToGiftDto,
} from "@/lib/wishlist/wishlistMappers";
import { notifyApiError, notifySuccess } from "@/lib/notify";
import type { WishlistItemDto } from "@/types/wishlist";

export default function WishlistPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { addGift, isInCart } = useCart();

  const [items, setItems] = useState<WishlistItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [movingAllToCart, setMovingAllToCart] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || isAdmin) {
      return;
    }

    let cancelled = false;

    async function loadInitialWishlist() {
      try {
        const data = await fetchWishlist();
        if (!cancelled) {
          setItems(sortWishlistNewestFirst(data));
        }
      } catch (err) {
        if (!cancelled) {
          notifyApiError(err, "Could not load wishlist");
          setError("Could not load wishlist.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialWishlist();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isAdmin]);

  async function loadWishlist() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWishlist();
      setItems(sortWishlistNewestFirst(data));
    } catch (err) {
      notifyApiError(err, "Could not load wishlist");
      setError("Could not load wishlist.");
    } finally {
      setLoading(false);
    }
  }

  const sortedItems = useMemo(() => sortWishlistNewestFirst(items), [items]);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.wishlist }} />;
  }

  if (isAdmin) {
    return <Navigate to={ROUTES.adminAccount} replace />;
  }

  async function handleRemove(wishlistItemId: number) {
    setRemovingId(wishlistItemId);
    try {
      const next = await removeWishlistItem(wishlistItemId);
      setItems(sortWishlistNewestFirst(next));
      notifySuccess("Removed from wishlist");
    } catch (err) {
      notifyApiError(err, "Could not remove item");
    } finally {
      setRemovingId(null);
    }
  }

  function handleAddToCart(item: WishlistItemDto) {
    addGift(wishlistItemToGiftDto(item));
    notifySuccess("Added to cart");
  }

  function handleMoveAllToCart() {
    setMovingAllToCart(true);
    try {
      let addedCount = 0;

      for (const item of sortedItems) {
        if (isInCart(item.giftId)) {
          continue;
        }
        addGift(wishlistItemToGiftDto(item));
        addedCount += 1;
      }

      if (addedCount === 0) {
        notifySuccess("All items are already in cart");
      } else {
        notifySuccess(
          addedCount === 1
            ? "Added 1 item to cart"
            : `Added ${addedCount} items to cart`,
        );
      }
    } finally {
      setMovingAllToCart(false);
    }
  }

  return (
    <div className="min-h-below-header bg-brand-cream">
      <section className="relative overflow-hidden border-b border-brand-gold/20 bg-white/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/images/home/backgrounds/popular-products-block-giveheart.jpg')",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground md:text-lg">
            All the gifts you love, in one beautiful place. Save now, shop anytime.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {loading ? (
          <div className={CATALOG_GRID_CLASS}>
            {Array.from({ length: CATALOG_SKELETON_COUNT }).map((_, index) => (
              <GiftCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border/60 bg-white/80 p-8 text-center">
            <p className="text-muted-foreground">{error}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => void loadWishlist()}
            >
              Try again
            </Button>
          </div>
        ) : sortedItems.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                All items ({sortedItems.length})
              </p>
              <Button
                type="button"
                variant="outline"
                disabled={movingAllToCart}
                onClick={handleMoveAllToCart}
                className="rounded-xl"
              >
                {movingAllToCart ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 size-4" aria-hidden />
                    Add all to cart
                  </>
                )}
              </Button>
            </div>
            <div className={CATALOG_GRID_CLASS}>
              {sortedItems.map((item) => (
                <GiftCard
                  key={item.id}
                  gift={wishlistItemToGiftDto(item)}
                  showAddToCart
                  inCart={isInCart(item.giftId)}
                  onAddToCart={() => handleAddToCart(item)}
                  showRemove
                  removing={removingId === item.id}
                  onRemove={() => void handleRemove(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}