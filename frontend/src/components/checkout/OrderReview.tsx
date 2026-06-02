import { BRAND_PANEL_CLASS } from "@/constants/uiClasses";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import type { CartDto } from "@/types/cartApi";

type OrderReviewProps = {
  cart: CartDto;
};

export default function OrderReview({ cart }: OrderReviewProps) {
  return (
    <aside className={`${BRAND_PANEL_CLASS} p-6 lg:sticky lg:top-24`}>
      <h2 className="font-serif text-xl font-semibold text-foreground">
        Order review
      </h2>

      <ul className="mt-4 space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.giftId}
            className="flex gap-3 border-b border-border/50 pb-4 last:border-0 last:pb-0"
          >
            <img
              src={item.photoUrl ?? "/favicon.png"}
              alt={item.name}
              className="size-16 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty {item.quantity} · {formatPriceUsd(item.priceCents)} each
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold">
              {formatPriceUsd(item.subtotalCents)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
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