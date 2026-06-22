import { apiClient } from "@/lib/api";
import { notifyWishlistChange } from "@/lib/wishlist/wishlistEvents";
import type { AddWishlistItemRequest, WishlistItemDto } from "@/types/wishlist";

export async function fetchWishlist(): Promise<WishlistItemDto[]> {
  const { data } = await apiClient.get<WishlistItemDto[]>("/wishlist");
  return data;
}

export async function addWishlistItem(
  payload: AddWishlistItemRequest,
): Promise<WishlistItemDto[]> {
  const { data } = await apiClient.post<WishlistItemDto[]>("/wishlist", payload);
  notifyWishlistChange();
  return data;
}

export async function removeWishlistItem(
  wishlistItemId: number,
): Promise<WishlistItemDto[]> {
  const { data } = await apiClient.delete<WishlistItemDto[]>(
    `/wishlist/${wishlistItemId}`,
  );
  notifyWishlistChange();
  return data;
}