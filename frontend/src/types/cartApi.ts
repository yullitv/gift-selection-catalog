export type CartItemDto = {
  giftId: number;
  name: string;
  photoUrl: string | null;
  priceCents: number;
  quantity: number;
  subtotalCents: number;
};

export type CartDto = {
  items: CartItemDto[];
  totalItems: number;
  totalPriceCents: number;
};

export type AddCartItemPayload = {
  giftId: number;
  quantity: number;
};