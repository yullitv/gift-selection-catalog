import { addCartItem } from "@/lib/cart/cartApi";
import { getCartItems } from "@/lib/cart/cartStorage";

export async function syncLocalCartToServer(): Promise<void> {
  const localItems = getCartItems();
  if (localItems.length === 0) return;

  for (const item of localItems) {
    await addCartItem({ giftId: item.giftId, quantity: item.quantity });
  }
}