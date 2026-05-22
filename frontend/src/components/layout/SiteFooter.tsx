import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

import { FOOTER_COPY } from "@/constants/footerCopy";

function SocialLink({
  href,
  label,
  iconSrc,
}: {
  href: string;
  label: string;
  iconSrc: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/80 transition-colors hover:border-brand-gold/40 hover:bg-white/60"
    >
      <img
        src={iconSrc}
        alt=""
        className="size-5 object-contain"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      {" "}
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex max-w-xs flex-col items-center gap-3 md:items-start">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src="/favicon.png"
                alt=""
                className="size-9 rounded-md object-cover"
              />
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                GIVHEART
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Curated gifts in Ukraine — find something they&apos;ll actually
              remember.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-medium text-foreground">Contact us</p>

            <a
              href={FOOTER_COPY.phoneHref}
              className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground md:justify-start"
            >
              <Phone className="size-4 shrink-0 text-brand-gold" aria-hidden />
              {FOOTER_COPY.phone}
            </a>

            <div className="inline-flex items-start justify-center gap-2 text-muted-foreground md:justify-start">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brand-gold"
                aria-hidden
              />
              <address className="not-italic leading-relaxed">
                <span className="block">{FOOTER_COPY.addressLine1}</span>
                <span className="block">{FOOTER_COPY.addressLine2}</span>
              </address>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-sm font-medium text-foreground">Follow us</p>
            <div className="flex items-center gap-3">
              {FOOTER_COPY.social.map((item) => (
                <SocialLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  iconSrc={item.iconSrc}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          {FOOTER_COPY.copyright}
        </p>
      </div>
    </footer>
  );
}
