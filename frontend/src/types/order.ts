export type PaymentMethod = "CARD_ONLINE" | "CASH_ON_DELIVERY";

export type DeliveryType = "PICKUP_POINT" | "PARCEL_LOCKER" | "COURIER";

export type CreateOrderRequest = {
  recipientFullName: string;
  recipientPhone: string;
  recipientEmail: string;
  deliveryType: DeliveryType;
  courierAddress?: string;
  paymentMethod: PaymentMethod;
  rememberAddress?: boolean;
};

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