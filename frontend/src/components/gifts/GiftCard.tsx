import { ArrowUpRight, Heart, Loader2, ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { formatTagLabel } from "@/lib/format/formatTag";
import { resolveGiftImageUrl } from "@/lib/gifts/giftImages";
import { cn } from "@/lib/utils";
import type { GiftDto } from "@/types/gift";

type GiftCardProps = {
  gift: GiftDto;
  showAddToCart?: boolean;
  inCart?: boolean;
  onAddToCart?: (gift: GiftDto) => void;
  showWishlist?: boolean;
  inWishlist?: boolean;
  wishlistBusy?: boolean;
  onAddToWishlist?: (gift: GiftDto) => void;
  showRemove?: boolean;
  removing?: boolean;
  onRemove?: () => void;
};

export default function GiftCard({
  gift,
  showAddToCart = false,
  inCart = false,
  onAddToCart,
  showWishlist = false,
  inWishlist = false,
  wishlistBusy = false,
  onAddToWishlist,
  showRemove = false,
  removing = false,
  onRemove,
}: GiftCardProps) {
  const tag = gift.tags[0] ? formatTagLabel(gift.tags[0]) : undefined;
  const imageSrc = resolveGiftImageUrl(gift.primaryImageUrl ?? gift.photoUrl);

  function handleAddClick() {
    onAddToCart?.(gift);
  }

  function handleWishlistClick() {
    onAddToWishlist?.(gift);
  }

  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/50 bg-white/55 py-0 shadow-lg ring-0 backdrop-blur-md">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={gift.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        {showWishlist ? (
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            disabled={wishlistBusy}
            onClick={handleWishlistClick}
            className="absolute left-2 top-2 size-8 rounded-full bg-white/90 shadow-md hover:bg-white"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlistBusy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Heart
                className={cn(
                  "size-4",
                  inWishlist && "fill-brand-gold text-brand-gold",
                )}
                aria-hidden
              />
            )}
          </Button>
        ) : null}

        {showRemove ? (
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            disabled={removing}
            onClick={onRemove}
            className="absolute right-2 top-2 size-8 rounded-full bg-white/90 shadow-md hover:bg-white"
            aria-label="Remove from wishlist"
          >
            {removing ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <X className="size-4" aria-hidden />
            )}
          </Button>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4">
        <div className="flex-1 space-y-1 text-left">
          <CardTitle className="line-clamp-2 min-h-11 text-base font-semibold text-foreground">
            {gift.name}
          </CardTitle>
          <CardDescription
            className={`line-clamp-1 min-h-5 text-sm text-muted-foreground ${tag ? "" : "invisible"}`}
          >
            {tag ?? "\u00a0"}
          </CardDescription>
        </div>

        <p className="mt-auto text-base font-semibold text-foreground">
          {formatPriceUsd(gift.priceCents)}
        </p>

        {showAddToCart ? (
          <div className="mt-1 grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={inCart ? "secondary" : "default"}
              size="sm"
              onClick={handleAddClick}
              className="h-9 min-w-0 rounded-full px-3"
            >
              <ShoppingCart className="mr-1 size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{inCart ? "In cart" : "Add"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-9 min-w-0 rounded-full border-brand-gold/30 bg-linear-to-r from-brand-gold/20 to-brand-gold/10 px-3 text-foreground hover:bg-brand-gold/25"
            >
              <Link
                to={`/gift/${gift.id}`}
                className="inline-flex min-w-0 items-center justify-center gap-1"
              >
                <span className="truncate">Details</span>
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-1">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="h-9 w-full rounded-full border-brand-gold/30 bg-linear-to-r from-brand-gold/20 to-brand-gold/10 px-3 text-foreground hover:bg-brand-gold/25"
            >
              <Link
                to={`/gift/${gift.id}`}
                className="inline-flex items-center justify-center gap-1"
              >
                Choose this
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}