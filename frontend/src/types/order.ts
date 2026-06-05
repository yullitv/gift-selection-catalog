export type DeliveryType = "PICKUP_POINT" | "PARCEL_LOCKER" | "COURIER";

export type PaymentMethod = "CARD_ONLINE" | "CASH_ON_DELIVERY";

export type CreateOrderRequest = {
  recipientFullName: string;
  recipientPhone: string;
  recipientEmail: string;
  deliveryType: DeliveryType;
  npCityRef?: string | null;
  npCityName?: string | null;
  npWarehouseRef?: string | null;
  npWarehouseName?: string | null;
  courierAddress?: string | null;
  paymentMethod: PaymentMethod;
  rememberAddress?: boolean | null;
};

export type OrderItemDto = {
  giftId: number;
  name: string;
  photoUrl: string | null;
  quantity: number;
  priceCents: number;
  subtotalCents: number;
};

export type OrderDetailsDto = {
  id: number;
  createdAt: string;
  totalCents: number;
  status: string;
  statusLabel: string;
  items: OrderItemDto[];
};