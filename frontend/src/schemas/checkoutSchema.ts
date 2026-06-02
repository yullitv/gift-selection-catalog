import { z } from "zod";

const fullNameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\-\s]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

export const checkoutSchema = z.object({
  recipientFullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name is too long")
    .regex(
      fullNameRegex,
      "Full name can only contain letters, spaces, hyphens and apostrophes",
    ),
  recipientPhone: z
    .string()
    .trim()
    .regex(phoneRegex, "Phone must contain 10-15 digits, optionally starting with +"),
  recipientEmail: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255),
  courierAddress: z
    .string()
    .trim()
    .min(1, "Delivery address is required"),
  paymentMethod: z.enum(["CARD_ONLINE", "CASH_ON_DELIVERY"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;