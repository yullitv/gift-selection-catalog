import GiftCard from "@/components/gifts/GiftCard";
import GiftCardSkeleton from "@/components/gifts/GiftCardSkeleton";
import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
import { Button } from "@/components/ui/button";
import {
  CATALOG_GRID_CLASS,
  CATALOG_SKELETON_COUNT,
} from "@/constants/catalogLayout";
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
            <GiftCard gift={gift} />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      ) : null}
    </>
  );
}