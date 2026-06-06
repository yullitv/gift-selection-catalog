import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { BRAND_PRIMARY_BUTTON_CLASS } from "@/constants/uiClasses";

export default function WishlistEmptyState() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-white/80 shadow-lg">
        <Heart className="size-10 text-brand-gold" aria-hidden />
      </div>
      <h2 className="mt-6 font-serif text-2xl font-semibold text-foreground">
        Your wishlist is empty
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Save gifts you love while browsing — they will appear here.
      </p>
      <Button asChild className={`mt-8 ${BRAND_PRIMARY_BUTTON_CLASS} px-8`}>
        <Link to={ROUTES.catalog}>Browse catalog</Link>
      </Button>
    </div>
  );
}