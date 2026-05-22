import { Link } from "react-router-dom";
import { catalogUrl } from "@/lib/catalogUrl";

import { Button } from "@/components/ui/button";
import {
  LANDING_CATEGORIES,
  type LandingCategory,
} from "@/constants/landingCategories";

function CategoryCard({ category }: { category: LandingCategory }) {
  return (
    <Link
      to={catalogUrl({ targetAudience: category.targetAudience })}
      className="group relative flex h-full min-h-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      <img
        src={category.imageSrc}
        alt={`Gifts for ${category.title} — GIVHEART catalog`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-4 md:p-5">
        <p className="font-serif text-xl font-medium uppercase tracking-wide text-brand-gold md:text-2xl">
          {category.heading}
        </p>
        <p className="mt-0.5 max-w-56 text-xs leading-relaxed text-white/90 md:text-sm">
          {category.description}
        </p>
        <span className="glass-pill mt-2 w-fit px-3 py-1.5 text-xs md:mt-3 md:px-4 md:py-2 md:text-sm">
          {category.cta} →
        </span>
      </div>
    </Link>
  );
}

export default function CategoryGridSection() {
  return (
    <section
      id="categories"
      className="flex min-h-below-header flex-col bg-brand-cream"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 py-6 md:py-8">
        <div className="mx-auto mb-4 max-w-2xl shrink-0 text-center md:mb-5">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Shop by occasion
          </h2>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm">
            Not sure what to give? Start here. We&apos;ve curated the best gift
            ideas for everyone.
          </p>
        </div>

        <div className="mx-auto grid min-h-0 w-full max-w-5xl flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {LANDING_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-4 flex shrink-0 justify-center md:mt-5">
          <Button
            variant="outline"
            size="default"
            asChild
            className="rounded-full border-foreground/20 bg-white px-6 shadow-sm hover:bg-white/90 md:px-8"
          >
            <Link to={catalogUrl()}>Go to catalogue →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
