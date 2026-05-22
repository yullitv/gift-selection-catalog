import { Check } from "lucide-react";

import { ABOUT_COPY, type AboutStat } from "@/constants/aboutCopy";

function StatCard({ stat }: { stat: AboutStat }) {
  return (
    <div className="flex h-full min-h-44 flex-col rounded-[28px] bg-[#F9F7F5] px-4 pb-8 text-center shadow-[0_10px_28px_rgba(42,38,34,0.07)] ring-1 ring-black/4 sm:min-h-46 sm:px-5">
      <div className="flex h-14 w-full shrink-0 items-end justify-center pt-6">
        <Check
          className="size-6 shrink-0 stroke-[1.75] text-[#C5A373]"
          aria-hidden
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-1">
        <p className="max-w-42 text-[15px] font-medium leading-snug tracking-[-0.01em] text-[#2A2622]">
          {stat.lines.map((line, index) => (
            <span key={line} className={index > 0 ? "mt-1 block" : "block"}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="relative flex min-h-below-header flex-col overflow-hidden border-y border-border/40 bg-brand-cream">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-8 md:py-10">
        <div className="flex flex-1 flex-col items-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-12">
          <div className="w-full shrink-0 md:w-5/12 lg:w-1/2">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 md:rounded-3xl">
              <img
                src="/images/home/aboutUs/about-us-sector-home-page-givheart.png"
                alt="Woman wrapping a gift at home"
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover md:aspect-auto md:min-h-112 md:max-h-128"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 md:w-7/12 lg:w-1/2">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {ABOUT_COPY.title}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {ABOUT_COPY.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-stretch">
              {ABOUT_COPY.stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
