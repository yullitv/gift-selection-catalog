import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
import GiftCard from "@/components/gifts/GiftCard";
import GiftCardSkeleton from "@/components/gifts/GiftCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  CATALOG_GRID_CLASS,
  CATALOG_SKELETON_COUNT,
} from "@/constants/catalog/layout";
import { useCart } from "@/hooks/useCart";
import { notifySuccess } from "@/lib/notify";
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
  const { addGift, isInCart } = useCart();

  function handleAddToCart(gift: GiftDto) {
    const alreadyInCart = isInCart(gift.id);
    addGift(gift, 1);
    notifySuccess(alreadyInCart ? "Already in cart" : "Added to cart");
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
              showAddToCart
              inCart={isInCart(gift.id)}
              onAddToCart={handleAddToCart}
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