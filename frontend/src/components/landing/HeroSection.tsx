import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { catalogUrl } from "@/lib/catalog/catalogUrl";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-below-header flex-col overflow-hidden">
      <img
        src="/images/home/backgrounds/main-home-page-hero-image-givheart.png"
        alt="Person opening a beautifully wrapped gift box"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-[75%_center]"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-black/65 via-black/40 to-black/10"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-12 md:py-16">
        <div className="max-w-xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Forget the stress of choosing.{" "}
              <span className="whitespace-nowrap">
                Find the gift they&apos;ll
              </span>
              <span className="block text-brand-gold">actually remember.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              A curated catalog of gifts in Ukraine. From &quot;I have no
              idea&quot; to &quot;This is perfect&quot; in 3 clicks.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <Button size="lg" asChild className="glass-pill px-8">
              <Link to={catalogUrl()}>Find the perfect gift</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}