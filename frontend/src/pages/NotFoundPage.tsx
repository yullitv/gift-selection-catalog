import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { BRAND_PRIMARY_BUTTON_CLASS } from "@/constants/uiClasses";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-below-header flex-col overflow-hidden">
      <img
        src="/images/not-found-page.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-brand-cream/75 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-brand-gold/30 bg-white/80 shadow-lg">
          <Gift className="size-8 text-brand-gold" aria-hidden />
        </div>

        <p
          className="font-serif text-8xl font-semibold leading-none tracking-tight text-foreground md:text-9xl"
          aria-hidden
        >
          404
        </p>

        <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 max-w-md text-muted-foreground">
          We couldn&apos;t find this page. It may have been moved, or the link
          might be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className={`px-6 ${BRAND_PRIMARY_BUTTON_CLASS}`}
          >
            <Link to={ROUTES.catalog}>Back to Catalog</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-border bg-white/80"
          >
            <Link to={ROUTES.home}>Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}