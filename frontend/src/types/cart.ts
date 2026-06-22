export type CartLineItem = {
  giftId: number;
  quantity: number;
  name: string;
  priceCents: number;
  imageUrl: string | null;
};

export type CartTotals = {
  subtotalCents: number;
  itemCount: number;
};
