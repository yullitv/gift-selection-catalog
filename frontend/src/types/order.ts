export type PaymentMethod = "CARD_ONLINE" | "CASH_ON_DELIVERY";

export type OrderItemDto = {
  giftId: number;
  giftName: string;
  photoUrl: string | null;
  quantity: number;
  priceCents: number;
  subtotalCents: number;
};

export type OrderSummaryDto = {
  id: number;
  createdAt: string;
  totalCents: number;
  status: string;
  statusLabel: string;
};

export type OrderDetailsDto = {
  id: number;
  createdAt: string;
  totalCents: number;
  status: string;
  statusLabel: string;
  items: OrderItemDto[];
};