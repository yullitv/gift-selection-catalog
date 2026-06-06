import type { GiftDto } from "@/types/gift";
import type { WishlistItemDto } from "@/types/wishlist";

/** Maps wishlist API row to GiftCard's GiftDto (catalog card reuse). */
export function wishlistItemToGiftDto(item: WishlistItemDto): GiftDto {
  return {
    id: item.giftId,
    name: item.name,
    description: "",
    priceCents: item.priceCents,
    photoUrl: item.imageUrl,
    primaryImageUrl: item.imageUrl,
    imageUrls: item.imageUrl ? [item.imageUrl] : [],
    stockQuantity: 1,
    minAge: null,
    maxAge: null,
    targetAudiences: [],
    tags: [],
  };
}

export function sortWishlistNewestFirst(items: WishlistItemDto[]): WishlistItemDto[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}