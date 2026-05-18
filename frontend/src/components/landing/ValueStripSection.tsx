import {
  VALUE_STRIP_ITEMS,
  type ValueStripItem,
} from "@/constants/valueStripItems";

function ValueStripCard({ item }: { item: ValueStripItem }) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative z-10 -mb-10 flex justify-center md:-mb-12">
        <img
          src={item.iconSrc}
          alt={item.iconAlt}
          loading="lazy"
          decoding="async"
          className="h-24 w-24 object-contain drop-shadow-md md:h-28 md:w-28"
        />
      </div>

      <div className="flex w-full flex-col rounded-2xl border border-white/40 bg-white/45 px-5 pb-8 pt-14 shadow-lg backdrop-blur-md md:rounded-3xl md:px-6 md:pt-16">
        <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function ValueStripSection() {
  return (
    <section className="relative flex min-h-below-header flex-col overflow-hidden border-y border-border/40">
      <img
        src="/images/home/whyUs/why-us-background-giveheart.jpg"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-white/25"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-10 md:py-12">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {VALUE_STRIP_ITEMS.map((item) => (
            <ValueStripCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
