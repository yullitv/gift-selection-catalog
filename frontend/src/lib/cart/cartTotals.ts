import type { CartLineItem, CartTotals } from "@/types/cart";

export function calculateCartTotals(items: CartLineItem[]): CartTotals {
  return items.reduce(
    (acc, item) => ({
      subtotalCents: acc.subtotalCents + item.priceCents * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { subtotalCents: 0, itemCount: 0 },
  );
}