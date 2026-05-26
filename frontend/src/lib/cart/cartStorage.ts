import type { CartLineItem } from "@/types/cart";

const CART_STORAGE_KEY = "givheart-cart-v1";

function parseStoredItems(raw: string | null): CartLineItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartLineItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartLineItem).giftId === "number" &&
        typeof (item as CartLineItem).quantity === "number" &&
        (item as CartLineItem).quantity > 0 &&
        typeof (item as CartLineItem).name === "string" &&
        typeof (item as CartLineItem).priceCents === "number",
    );
  } catch {
    return [];
  }
}

export function getCartItems(): CartLineItem[] {
  return parseStoredItems(localStorage.getItem(CART_STORAGE_KEY));
}

function saveCartItems(items: CartLineItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-change"));
}

export function addCartItem(
  item: Omit<CartLineItem, "quantity">,
  quantity = 1,
): void {
  const items = getCartItems();
  const existing = items.find((i) => i.giftId === item.giftId);

  if (existing) {
    const next = items.map((i) =>
      i.giftId === item.giftId
        ? { ...i, quantity: i.quantity + quantity }
        : i,
    );
    saveCartItems(next);
    return;
  }

  saveCartItems([...items, { ...item, quantity }]);
}

export function setCartItemQuantity(giftId: number, quantity: number): void {
  if (quantity <= 0) {
    removeCartItem(giftId);
    return;
  }

  const next = getCartItems().map((i) =>
    i.giftId === giftId ? { ...i, quantity } : i,
  );
  saveCartItems(next);
}

export function removeCartItem(giftId: number): void {
  saveCartItems(getCartItems().filter((i) => i.giftId !== giftId));
}

export function clearCart(): void {
  saveCartItems([]);
}
