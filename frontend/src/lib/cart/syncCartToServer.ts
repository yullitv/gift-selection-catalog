import { isAxiosError } from "axios";

import {
  addCartItem,
  fetchCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart/cartApi";
import { getCartItems, replaceCartItems } from "@/lib/cart/cartStorage";
import { resolveGiftImageUrl } from "@/lib/gifts/giftImages";
import type { CartLineItem } from "@/types/cart";
import type { CartDto } from "@/types/cartApi";

let syncInFlight: Promise<CartDto> | null = null;

async function safeRemoveCartItem(giftId: number): Promise<CartDto> {
  try {
    return await removeCartItem(giftId);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return fetchCart();
    }
    throw error;
  }
}

async function executeSync(): Promise<CartDto> {
  const localItems = getCartItems();
  let serverCart = await fetchCart();

  for (const serverItem of [...serverCart.items]) {
    const localMatch = localItems.find((item) => item.giftId === serverItem.giftId);
    if (!localMatch) {
      serverCart = await safeRemoveCartItem(serverItem.giftId);
    }
  }

  for (const item of localItems) {
    const serverItem = serverCart.items.find((entry) => entry.giftId === item.giftId);

    if (!serverItem) {
      serverCart = await addCartItem({ giftId: item.giftId, quantity: item.quantity });
      continue;
    }

    if (serverItem.quantity !== item.quantity) {
      serverCart = await updateCartItemQuantity(item.giftId, item.quantity);
    }
  }

  return fetchCart();
}

/** Aligns server cart with localStorage (cart page source of truth). */
export function syncLocalCartToServer(): Promise<CartDto> {
  if (!syncInFlight) {
    syncInFlight = executeSync().finally(() => {
      syncInFlight = null;
    });
  }
  return syncInFlight;
}

function serverCartToLocalItems(cart: CartDto): CartLineItem[] {
  return cart.items.map((item) => ({
    giftId: item.giftId,
    name: item.name,
    priceCents: item.priceCents,
    quantity: item.quantity,
    imageUrl: resolveGiftImageUrl(item.photoUrl),
  }));
}

function mergeLocalAndServer(localItems: CartLineItem[], serverCart: CartDto): CartLineItem[] {
  const merged = new Map<number, CartLineItem>();

  for (const item of localItems) {
    merged.set(item.giftId, { ...item });
  }

  for (const item of serverCart.items) {
    const existing = merged.get(item.giftId);
    if (existing) {
      merged.set(item.giftId, {
        ...existing,
        quantity: Math.max(existing.quantity, item.quantity),
        priceCents: item.priceCents,
        imageUrl: existing.imageUrl ?? resolveGiftImageUrl(item.photoUrl),
      });
      continue;
    }

    merged.set(item.giftId, {
      giftId: item.giftId,
      name: item.name,
      priceCents: item.priceCents,
      quantity: item.quantity,
      imageUrl: resolveGiftImageUrl(item.photoUrl),
    });
  }

  return Array.from(merged.values());
}

/** After login: restore server cart or merge guest/local cart with server. */
export async function reconcileCartAfterLogin(): Promise<void> {
  const localItems = getCartItems();
  const serverCart = await fetchCart();

  if (localItems.length === 0 && serverCart.items.length === 0) {
    return;
  }

  if (localItems.length === 0) {
    replaceCartItems(serverCartToLocalItems(serverCart));
    return;
  }

  replaceCartItems(mergeLocalAndServer(localItems, serverCart));
  await syncLocalCartToServer();
}
