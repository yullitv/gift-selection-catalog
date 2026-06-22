import type { GiftAudience, GiftDto } from "@/types/gift";
import type { OrderSummaryDto } from "@/types/order";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "CANCELLED";

export type GiftUpsertRequest = {
  name: string;
  description: string;
  priceCents: number;
  photoUrl: string;
  stockQuantity: number;
  minAge: number | null;
  maxAge: number | null;
  targetAudiences: GiftAudience[];
  tags: string[];
};

export type AdminGiftSaveResult = GiftDto;

export type UpdateOrderStatusRequest = {
  status: OrderStatus;
};

export type UpdateOrderStatusResult = OrderSummaryDto;