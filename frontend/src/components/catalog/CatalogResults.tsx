import { useState } from "react";

import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
import GiftCard from "@/components/gifts/GiftCard";
import GiftCardSkeleton from "@/components/gifts/GiftCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  CATALOG_GRID_CLASS,
  CATALOG_SKELETON_COUNT,
} from "@/constants/catalog/layout";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { notifyApiError, notifySuccess } from "@/lib/notify";
import type { GiftDto } from "@/types/gift";

type CatalogResultsProps = {
  gifts: GiftDto[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  showEmpty: boolean;
  onLoadMore: () => void;
};

export default function CatalogResults({
  gifts,
  loading,
  loadingMore,
  error,
  hasMore,
  showEmpty,
  onLoadMore,
}: CatalogResultsProps) {
  const { isAuthenticated, isAdmin } = useAuth();
  const { addGift, isInCart } = useCart();
  const showAddToCart = !isAdmin;
  const showWishlist = isAuthenticated && !isAdmin;
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(showWishlist);
  const [wishlistBusyId, setWishlistBusyId] = useState<number | null>(null);

  function handleAddToCart(gift: GiftDto) {
    const alreadyInCart = isInCart(gift.id);
    addGift(gift, 1);
    notifySuccess(alreadyInCart ? "Already in cart" : "Added to cart");
  }

  async function handleWishlistToggle(gift: GiftDto) {
    setWishlistBusyId(gift.id);
    try {
      if (isInWishlist(gift.id)) {
        await removeFromWishlist(gift.id);
        notifySuccess("Removed from wishlist");
      } else {
        await addToWishlist(gift.id);
        notifySuccess("Added to wishlist");
      }
    } catch (error) {
      notifyApiError(error, "Could not update wishlist");
    } finally {
      setWishlistBusyId(null);
    }
  }

  if (loading) {
    return (
      <ul className={CATALOG_GRID_CLASS}>
        {Array.from({ length: CATALOG_SKELETON_COUNT }).map((_, i) => (
          <li key={i} className="h-full">
            <GiftCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <p className="text-destructive" role="alert">
        {error}
      </p>
    );
  }

  if (showEmpty) {
    return <CatalogEmptyState />;
  }

  return (
    <>
      <ul className={CATALOG_GRID_CLASS}>
        {gifts.map((gift) => (
          <li key={gift.id} className="h-full">
            <GiftCard
              gift={gift}
              showAddToCart={showAddToCart}
              inCart={showAddToCart && isInCart(gift.id)}
              onAddToCart={showAddToCart ? handleAddToCart : undefined}
              showWishlist={showWishlist}
              inWishlist={showWishlist && isInWishlist(gift.id)}
              wishlistBusy={wishlistBusyId === gift.id}
              onAddToWishlist={showWishlist ? handleWishlistToggle : undefined}
            />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
      ) : null}
    </>
  );
}