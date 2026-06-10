import { apiClient } from "@/lib/api";
import type { CreateOrderRequest, OrderDetailsDto, OrderSummaryDto } from "@/types/order";

export async function createOrder(
  payload: CreateOrderRequest,
): Promise<OrderDetailsDto> {
  const { data } = await apiClient.post<OrderDetailsDto>("/orders", payload);
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
