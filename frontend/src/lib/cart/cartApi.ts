import { apiClient } from "@/lib/api";
import type { AddCartItemPayload, CartDto } from "@/types/cartApi";

export async function fetchCart(): Promise<CartDto> {
  const { data } = await apiClient.get<CartDto>("/cart");
  return data;
}

export async function addCartItem(
  payload: AddCartItemPayload,
): Promise<CartDto> {
  const { data } = await apiClient.post<CartDto>("/cart/items", payload);
  return data;
}

export async function updateCartItemQuantity(
  giftId: number,
  quantity: number,
): Promise<CartDto> {
  const { data } = await apiClient.put<CartDto>(`/cart/items/${giftId}`, { quantity });
  return data;
}

export async function removeCartItem(giftId: number): Promise<CartDto> {
  const { data } = await apiClient.delete<CartDto>(`/cart/items/${giftId}`);
  return data;
}