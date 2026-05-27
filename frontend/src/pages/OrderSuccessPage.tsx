import { CircleCheck } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES, type OrderSuccessState } from "@/constants/routes";
import {
  BRAND_PANEL_CLASS,
  BRAND_PRIMARY_BUTTON_FULL_CLASS,
} from "@/constants/uiClasses";

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = (location.state as OrderSuccessState | null)?.orderId?.trim();

  if (!orderId) {
    return <Navigate to={ROUTES.catalog} replace />;
  }

  return (
    <div className="flex min-h-below-header flex-1 items-center justify-center bg-brand-cream px-4 py-16">
      <div className={`w-full max-w-md p-8 text-center ${BRAND_PANEL_CLASS}`}>
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-brand-gold/15">
          <CircleCheck
            className="size-10 text-brand-gold"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>

        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Thank you for your order!
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your order has been placed successfully.
        </p>

        <p className="mt-6 text-sm font-medium text-muted-foreground">
          Order ID
        </p>
        <p className="mt-1 font-serif text-xl font-semibold text-foreground">
          #{orderId}
        </p>

        <Button asChild className={`mt-8 ${BRAND_PRIMARY_BUTTON_FULL_CLASS}`}>
          <Link to={ROUTES.catalog}>Back to Catalog</Link>
        </Button>
      </div>
    </div>
  );
}