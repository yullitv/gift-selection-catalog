import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import HeaderSearch from "@/components/layout/HeaderSearch";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16 md:gap-4">
        {/* 3.2 Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/favicon.png"
            alt="GIVHEART Gift Catalog"
            className="h-8 w-8 rounded-md object-cover md:h-9 md:w-9"
          />
          <span className="hidden font-semibold tracking-tight sm:inline">GIVHEART</span>
        </Link>

        {/* 3.3 Catalog */}
        <Link
          to="/catalog"
          className="shrink-0 text-sm font-medium text-foreground hover:text-primary"
        >
          Catalog
        </Link>

        {/* 3.4 Search */}
        <div className="min-w-0 flex-1">
          <HeaderSearch />
        </div>

        {/* 3.5 Wishlist + Cart */}
        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            aria-label="Wishlist — coming soon"
            title="Coming soon"
          >
            <Heart />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            aria-label="Cart — coming soon"
            title="Coming soon"
          >
            <ShoppingCart />
          </Button>
        </div>

        {/* 3.6 Log in */}
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </header>
  );
}