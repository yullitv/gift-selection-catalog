import { apiClient } from "@/lib/api";
import type { CreateOrderRequest, OrderDetailsDto } from "@/types/order";

export async function createOrder(
  payload: CreateOrderRequest,
): Promise<OrderDetailsDto> {
  const { data } = await apiClient.post<OrderDetailsDto>("/orders", payload);
  return data;
}