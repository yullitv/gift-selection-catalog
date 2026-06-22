import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { resolveGiftImageUrl } from "@/lib/gifts/giftImages";
import type { CartLineItem } from "@/types/cart";

type CartItemRowProps = {
  item: CartLineItem;
  onQuantityChange: (giftId: number, quantity: number) => void;
  onRemove: (giftId: number) => void;
};

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const lineTotalCents = item.priceCents * item.quantity;
  const imageSrc = resolveGiftImageUrl(item.imageUrl);

  return (
    <article className="flex gap-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm md:gap-6 md:p-5">
      <img
        src={imageSrc}
        alt={item.name}
        className="size-24 shrink-0 rounded-xl object-cover md:size-28"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground">{item.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatPriceUsd(item.priceCents)} each
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.giftId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-xl border border-border bg-white">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-l-xl"
              onClick={() => onQuantityChange(item.giftId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </Button>
            <span className="min-w-10 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-r-xl"
              onClick={() => onQuantityChange(item.giftId, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <p className="text-base font-semibold text-foreground">
            {formatPriceUsd(lineTotalCents)}
          </p>
        </div>
      </div>
    </article>
  );
}
