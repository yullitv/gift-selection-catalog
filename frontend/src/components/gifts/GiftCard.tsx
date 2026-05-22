import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatPriceUsd } from "@/lib/formatPrice";
import { formatTagLabel } from "@/lib/formatTag";
import type { GiftDto } from "@/types/gift";

type GiftCardProps = {
  gift: GiftDto;
};

export default function GiftCard({ gift }: GiftCardProps) {
  const tag = gift.tags[0] ? formatTagLabel(gift.tags[0]) : undefined;
  const imageSrc = gift.primaryImageUrl ?? gift.photoUrl ?? "/favicon.png";

  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/50 bg-white/55 py-0 shadow-lg ring-0 backdrop-blur-md">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={gift.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4">
        <div className="flex-1 space-y-1 text-left">
          <CardTitle className="line-clamp-2 min-h-11 text-base font-semibold text-foreground">
            {" "}
            {gift.name}
          </CardTitle>
          <CardDescription
            className={`line-clamp-1 min-h-5 text-sm text-muted-foreground ${tag ? "" : "invisible"}`}
          >
            {tag ?? "\u00a0"}
          </CardDescription>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-foreground">
            {formatPriceUsd(gift.priceCents)}
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="shrink-0 rounded-full border-brand-gold/30 bg-linear-to-r from-brand-gold/20 to-brand-gold/10 px-3 text-foreground hover:bg-brand-gold/25"
          >
            <Link
              to={`/gift/${gift.id}`}
              className="inline-flex items-center gap-1"
            >
              Choose this
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
