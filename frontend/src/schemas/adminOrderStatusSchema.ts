import { z } from "zod";

export const adminOrderStatusSchema = z.object({
  orderId: z
    .string()
    .trim()
    .min(1, "Order ID is required")
    .refine((value) => /^\d+$/.test(value) && Number(value) > 0, {
      message: "Enter a valid order ID",
    }),
  status: z.enum(["PENDING_PAYMENT", "IN_TRANSIT", "COMPLETED", "CANCELLED"]),
});

export type AdminOrderStatusFormValues = z.infer<typeof adminOrderStatusSchema>;