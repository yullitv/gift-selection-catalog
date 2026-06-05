import type { GiftDto } from "@/types/gift";

export const GIFT_FALLBACK_IMAGE = "/favicon.png";

export function resolveGiftImageUrl(url?: string | null): string {
  const trimmed = url?.trim() ?? "";
  if (!trimmed) {
    return GIFT_FALLBACK_IMAGE;
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return trimmed;
  }

  return GIFT_FALLBACK_IMAGE;
}

export function getGiftImageUrls(gift: GiftDto): string[] {
  const fromList = gift.imageUrls
    .map((url) => resolveGiftImageUrl(url))
    .filter((url, index, arr) => arr.indexOf(url) === index);

  if (fromList.length > 0) {
    return fromList;
  }

  const single = resolveGiftImageUrl(gift.primaryImageUrl ?? gift.photoUrl);
  return [single];
}