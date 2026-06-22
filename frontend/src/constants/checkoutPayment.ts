import type { PaymentMethod } from "@/types/order";

export type CheckoutPaymentOption = {
  value: PaymentMethod;
  label: string;
  description: string;
};

export const CHECKOUT_PAYMENT_OPTIONS: CheckoutPaymentOption[] = [
  {
    value: "CARD_ONLINE",
    label: "Pay now",
    description: "Card online. Order stays Pending payment until confirmed.",
  },
  {
    value: "CASH_ON_DELIVERY",
    label: "Pay on delivery",
    description: "Cash to the courier when your order arrives.",
  },
];
