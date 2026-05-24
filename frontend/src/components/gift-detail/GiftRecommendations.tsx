import GiftCard from "@/components/gifts/GiftCard";
import { CATALOG_GRID_CLASS } from "@/constants/catalog/layout";
import type { GiftDto } from "@/types/gift";

type GiftRecommendationsProps = {
  gifts: GiftDto[];
};

export default function GiftRecommendations({ gifts }: GiftRecommendationsProps) {
  if (gifts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border/60 pt-12">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
        You might also like
      </h2>
      <div className={`mt-8 ${CATALOG_GRID_CLASS}`}>
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </section>
  );
}