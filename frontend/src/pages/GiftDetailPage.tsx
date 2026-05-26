import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import GiftImageGallery from "@/components/gift-detail/GiftImageGallery";
import GiftRecommendations from "@/components/gift-detail/GiftRecommendations";
import GiftSpecsTable from "@/components/gift-detail/GiftSpecsTable";
import GiftCardSkeleton from "@/components/gifts/GiftCardSkeleton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  BRAND_PRIMARY_BUTTON_CLASS,
  PDP_ACTION_BUTTON_CLASS,
} from "@/constants/uiClasses";
import { useCart } from "@/hooks/useCart";
import { useGiftDetail } from "@/hooks/useGiftDetail";
import { formatAudienceList } from "@/lib/format/formatAudience";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { formatTagLabel } from "@/lib/format/formatTag";
import { getGiftImageUrls } from "@/lib/gifts/giftImages";
import { notifySuccess } from "@/lib/notify";
import { cn } from "@/lib/utils";
import type { GiftDto } from "@/types/gift";

function parseGiftId(raw: string | undefined): number | null {
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isNaN(n) ? null : n;
}

function buildSpecRows(gift: GiftDto) {
  const rows: { label: string; value: string }[] = [
    {
      label: "Availability",
      value:
        gift.stockQuantity > 0
          ? `In stock (${gift.stockQuantity} left)`
          : "Out of stock",
    },
  ];

  if (gift.minAge != null || gift.maxAge != null) {
    let ageValue: string;

    if (gift.minAge != null && gift.maxAge != null) {
      ageValue = `${gift.minAge}–${gift.maxAge}`;
    } else if (gift.minAge != null) {
      ageValue = `${gift.minAge}+`;
    } else {
      ageValue = `Up to ${gift.maxAge}`;
    }

    rows.push({ label: "Age", value: ageValue });
  }

  if (gift.targetAudiences.length > 0) {
    rows.push({
      label: "Categories",
      value: formatAudienceList(gift.targetAudiences),
    });
  }

  if (gift.tags.length > 0) {
    rows.push({
      label: "Tags",
      value: gift.tags.map(formatTagLabel).join(", "),
    });
  }

  return rows;
}

function GiftNotFoundMessage() {
  return (
    <div className="flex min-h-below-header flex-col items-center justify-center bg-brand-cream px-4 py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold">Gift not found</h1>
      <p className="mt-2 text-muted-foreground">
        This product may have been removed or the link is invalid.
      </p>
      <Button asChild className={`mt-6 ${BRAND_PRIMARY_BUTTON_CLASS} px-6`}>
        <Link to={ROUTES.catalog}>Back to Catalog</Link>
      </Button>
    </div>
  );
}

type GiftDetailContentProps = {
  giftId: number;
};

function GiftDetailContent({ giftId }: GiftDetailContentProps) {
  const { gift, recommendations, loading, notFound, error } =
    useGiftDetail(giftId);
  const { addGift, isInCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const inCart = isInCart(giftId);

  if (loading) {
    return (
      <div className="min-h-below-header bg-brand-cream px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="order-2 space-y-6 lg:order-1">
            <GiftCardSkeleton />
          </div>
          <div className="order-1 aspect-square animate-pulse rounded-2xl bg-muted lg:order-2" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return <GiftNotFoundMessage />;
  }

  if (error || !gift) {
    return (
      <div className="flex min-h-below-header flex-col items-center justify-center bg-brand-cream px-4 py-16 text-center">
        <p className="text-destructive">{error ?? "Something went wrong."}</p>
        <Button asChild className={`mt-6 ${BRAND_PRIMARY_BUTTON_CLASS} px-6`}>
          <Link to={ROUTES.catalog}>Back to Catalog</Link>
        </Button>
      </div>
    );
  }

  const images = getGiftImageUrls(gift);
  const inStock = gift.stockQuantity > 0;
  const specRows = buildSpecRows(gift);

  function handleAddToCart() {
    if (!gift) return;
    addGift(gift);
    notifySuccess("Added to cart");
  }

  function handleAddToWishlist() {
    setWishlisted(true);
    notifySuccess("Added to wishlist");
  }

  return (
    <div className="min-h-below-header bg-brand-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <p className="mb-6">
          <Link
            to={ROUTES.catalog}
            className="text-sm font-medium text-brand-gold hover:underline"
          >
            ← Back to catalog
          </Link>
        </p>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 flex min-w-0 flex-col gap-8 lg:order-1">
            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {gift.name}
              </h1>
              <p className="mt-4 text-3xl font-semibold text-brand-gold">
                {formatPriceUsd(gift.priceCents)}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${inStock ? "text-green-700" : "text-destructive"}`}
              >
                {inStock ? "In stock" : "Out of stock"}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <Button
                type="button"
                disabled={!inStock}
                onClick={handleAddToCart}
                className={cn(
                  PDP_ACTION_BUTTON_CLASS,
                  BRAND_PRIMARY_BUTTON_CLASS,
                )}
              >
                <ShoppingCart className="size-4 shrink-0" aria-hidden />
                {inCart ? "In Cart" : "Add to Cart"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddToWishlist}
                className={cn(
                  PDP_ACTION_BUTTON_CLASS,
                  "border-border bg-white/80 hover:bg-white",
                )}
              >
                <Heart
                  className={cn(
                    "size-4 shrink-0",
                    wishlisted && "fill-brand-gold text-brand-gold",
                  )}
                  aria-hidden
                />
                {wishlisted ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Description
              </h2>
              <p className="mt-3 whitespace-pre-wrap wrap-break-word leading-relaxed text-muted-foreground">
                {gift.description || "No description available."}
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Specifications
              </h2>
              <div className="mt-3">
                <GiftSpecsTable rows={specRows} />
              </div>
            </div>
          </div>

          <div className="order-1 lg:sticky lg:top-24 lg:order-2">
            <GiftImageGallery
              images={images}
              selectedIndex={selectedImageIndex}
              onSelect={setSelectedImageIndex}
              alt={gift.name}
            />
          </div>
        </div>

        <GiftRecommendations gifts={recommendations} />
      </div>
    </div>
  );
}

export default function GiftDetailPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const giftId = parseGiftId(idParam);

  if (giftId == null) {
    return <GiftNotFoundMessage />;
  }

  return <GiftDetailContent key={giftId} giftId={giftId} />;
}