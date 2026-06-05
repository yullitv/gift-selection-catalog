import { Heart, Shield, ShoppingCart, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import HeaderSearch from "@/components/layout/HeaderSearch";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { totals } = useCart();
  const { pathname } = useLocation();

  const showHeaderSearch = pathname !== ROUTES.catalog;
  const showCart = !isAdmin;
  const showWishlist = isAuthenticated && !isAdmin;
  const cartCount = totals.itemCount;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16 md:gap-4">
        <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2">
          <img
            src="/favicon.png"
            alt="GIVHEART Gift Catalog"
            className="h-8 w-8 rounded-md object-cover md:h-9 md:w-9"
          />
          <span className="hidden font-semibold tracking-tight sm:inline">
            GIVHEART
          </span>
        </Link>

        <Link
          to={ROUTES.catalog}
          className="shrink-0 text-sm font-medium text-foreground hover:text-primary"
        >
          Catalog
        </Link>

        {showHeaderSearch ? (
          <div className="min-w-0 flex-1">
            <HeaderSearch />
          </div>
        ) : (
          <div className="min-w-0 flex-1" aria-hidden />
        )}

        <div className="flex shrink-0 items-center gap-0.5">
          {showWishlist ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled
              aria-label="Wishlist - coming soon"
              title="Coming soon"
            >
              <Heart />
            </Button>
          ) : null}

          {showCart ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              asChild
              className="relative"
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}
            >
              <Link to={ROUTES.cart}>
                <ShoppingCart className={cn(cartCount > 0 && "text-brand-gold")} />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-semibold text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>
          ) : null}
        </div>

        {isAuthenticated ? (
          isAdmin ? (
            <Button variant="outline" size="sm" asChild className="shrink-0 rounded-xl">
              <Link to={ROUTES.adminAccount} className="inline-flex items-center gap-1.5">
                <Shield className="size-4" />
                Admin
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild className="shrink-0 rounded-xl">
              <Link to={ROUTES.account} className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" />
                Account
              </Link>
            </Button>
          )
        ) : (
          <Button variant="outline" size="sm" asChild className="shrink-0 rounded-xl">
            <Link to={ROUTES.login}>Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}