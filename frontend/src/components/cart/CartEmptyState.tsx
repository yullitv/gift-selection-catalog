import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { BRAND_PRIMARY_BUTTON_CLASS } from "@/constants/uiClasses";

export default function CartEmptyState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-white/80 shadow-lg">
        <ShoppingBag className="size-10 text-brand-gold" aria-hidden />
      </div>
      <h1 className="mt-6 font-serif text-2xl font-semibold text-foreground">
        Your cart feels a little empty
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Discover meaningful gifts made to brighten someone&apos;s day.
      </p>
      <Button asChild className={`mt-8 ${BRAND_PRIMARY_BUTTON_CLASS} px-8`}>
        <Link to={ROUTES.catalog}>Go Shopping</Link>
      </Button>
    </div>
  );
}
