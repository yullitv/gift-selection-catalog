import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  BRAND_PRIMARY_BUTTON_FULL_CLASS,
  BRAND_PANEL_CLASS,
} from "@/constants/uiClasses";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import type { CartTotals } from "@/types/cart";

type CartOrderSummaryProps = {
  totals: CartTotals;
};

export default function CartOrderSummary({ totals }: CartOrderSummaryProps) {
  const shippingLabel = "Free";
  const totalCents = totals.subtotalCents;

  return (
    <aside className={`${BRAND_PANEL_CLASS} p-6 lg:sticky lg:top-24`}>
      <h2 className="font-serif text-xl font-semibold text-foreground">
        Order summary
      </h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{formatPriceUsd(totals.subtotalCents)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium">{shippingLabel}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border/60 pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-semibold text-brand-gold">
            {formatPriceUsd(totalCents)}
          </dd>
        </div>
      </dl>

      <Button
        asChild
        className={`mt-6 ${BRAND_PRIMARY_BUTTON_FULL_CLASS}`}
        disabled={totals.itemCount === 0}
      >
        <Link to={ROUTES.checkout}>Proceed to Checkout</Link>
      </Button>
    </aside>
  );
}