import type { GiftDto } from "@/types/gift";

const FALLBACK_IMAGE = "/favicon.png";

export function getGiftImageUrls(gift: GiftDto): string[] {
  const fromList = [...new Set(gift.imageUrls.filter(Boolean))];
  if (fromList.length > 0) return fromList;

  const single = gift.primaryImageUrl ?? gift.photoUrl;
  if (single) return [single];

  return [FALLBACK_IMAGE];
}