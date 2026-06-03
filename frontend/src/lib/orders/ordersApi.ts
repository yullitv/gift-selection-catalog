import { apiClient } from "@/lib/api";
import type { OrderDetailsDto, OrderSummaryDto } from "@/types/order";

/** Backend checkout uses the server cart only (no request body yet). */
export async function createOrder(): Promise<OrderDetailsDto> {
  const { data } = await apiClient.post<OrderDetailsDto>("/orders");
  return data;
}

export async function fetchOrders(): Promise<OrderSummaryDto[]> {
  const { data } = await apiClient.get<OrderSummaryDto[]>("/orders");
  return data;
}

export async function fetchOrderById(id: number): Promise<OrderDetailsDto> {
  const { data } = await apiClient.get<OrderDetailsDto>(`/orders/${id}`);
  return data;
}
