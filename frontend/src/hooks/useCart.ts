import { useCallback, useEffect, useMemo, useState } from "react";

import {
  addCartItem,
  clearCart as clearCartStorage,
  getCartItems,
  removeCartItem,
  setCartItemQuantity,
} from "@/lib/cart/cartStorage";
import { calculateCartTotals } from "@/lib/cart/cartTotals";
import type { CartLineItem } from "@/types/cart";
import type { GiftDto } from "@/types/gift";

export function useCart() {
  const [items, setItems] = useState<CartLineItem[]>(() => getCartItems());

  useEffect(() => {
    const sync = () => setItems(getCartItems());
    window.addEventListener("cart-change", sync);
    return () => window.removeEventListener("cart-change", sync);
  }, []);

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const addGift = useCallback((gift: GiftDto, quantity = 1) => {
    addCartItem(
      {
        giftId: gift.id,
        name: gift.name,
        priceCents: gift.priceCents,
        imageUrl: gift.primaryImageUrl ?? gift.photoUrl,
      },
      quantity,
    );
  }, []);

  const setQuantity = useCallback((giftId: number, quantity: number) => {
    setCartItemQuantity(giftId, quantity);
  }, []);

  const removeItem = useCallback((giftId: number) => {
    removeCartItem(giftId);
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
  }, []);

  const isInCart = useCallback(
    (giftId: number) => items.some((i) => i.giftId === giftId),
    [items],
  );

  return {
    items,
    totals,
    addGift,
    setQuantity,
    removeItem,
    clearCart,
    isInCart,
  };
}
