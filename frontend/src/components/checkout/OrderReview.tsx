import { BRAND_PANEL_CLASS } from "@/constants/uiClasses";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { resolveGiftImageUrl } from "@/lib/gifts/giftImages";
import type { CartDto } from "@/types/cartApi";

type OrderReviewProps = {
  cart: CartDto;
};

export default function OrderReview({ cart }: OrderReviewProps) {
  return (
    <aside
      className={`${BRAND_PANEL_CLASS} bg-white/95 p-5 sm:p-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start`}
    >
      <h2 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
        Order review
      </h2>

      <ul className="mt-4 space-y-3">
        {cart.items.map((item) => (
          <li
            key={item.giftId}
            className="flex gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0 sm:pb-4"
          >
            <img
              src={resolveGiftImageUrl(item.photoUrl)}
              alt={item.name}
              className="size-12 shrink-0 rounded-lg object-cover sm:size-14"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-foreground sm:text-base">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Qty {item.quantity} · {formatPriceUsd(item.priceCents)} each
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold tabular-nums">
              {formatPriceUsd(item.subtotalCents)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-border/60 pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Items</dt>
          <dd>{cart.totalItems}</dd>
        </div>
        <div className="flex justify-between gap-4 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-semibold text-brand-gold">
            {formatPriceUsd(cart.totalPriceCents)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}