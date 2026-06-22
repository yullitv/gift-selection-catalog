import { apiClient } from "@/lib/api";
import type {
  AdminGiftSaveResult,
  GiftUpsertRequest,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResult,
} from "@/types/admin";

export async function createAdminGift(
  payload: GiftUpsertRequest,
): Promise<AdminGiftSaveResult> {
  const { data } = await apiClient.post<AdminGiftSaveResult>("/admin/gifts", payload);
  return data;
}

export async function updateAdminGift(
  id: number,
  payload: GiftUpsertRequest,
): Promise<AdminGiftSaveResult> {
  const { data } = await apiClient.put<AdminGiftSaveResult>(`/admin/gifts/${id}`, payload);
  return data;
}

export async function deleteAdminGift(id: number): Promise<void> {
  await apiClient.delete(`/admin/gifts/${id}`);
}

export async function updateAdminOrderStatus(
  orderId: number,
  payload: UpdateOrderStatusRequest,
): Promise<UpdateOrderStatusResult> {
  const { data } = await apiClient.patch<UpdateOrderStatusResult>(
    `/admin/orders/${orderId}/status`,
    payload,
  );
  return data;
}