export type WishlistItemDto = {
  id: number;
  giftId: number;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  createdAt: string;
};

export type AddWishlistItemRequest = {
  giftId: number;
};