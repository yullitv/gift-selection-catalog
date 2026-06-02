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