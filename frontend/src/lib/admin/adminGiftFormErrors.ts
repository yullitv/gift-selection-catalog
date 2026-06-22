import type { UseFormSetError } from "react-hook-form";

import { applyApiFormFieldErrors } from "@/lib/forms/apiFieldErrors";
import type { AdminGiftFormValues } from "@/schemas/adminGiftSchema";

const ADMIN_GIFT_FIELDS = [
  "name",
  "description",
  "photoUrl",
  "priceUsd",
  "stockQuantity",
  "minAge",
  "maxAge",
  "tags",
  "targetAudiences",
] as const;

export function applyAdminGiftFormErrors(
  error: unknown,
  setError: UseFormSetError<AdminGiftFormValues>,
): string | null {
  return applyApiFormFieldErrors({
    error,
    setError,
    allowedFields: ADMIN_GIFT_FIELDS,
    fieldMap: { priceCents: "priceUsd" },
    fallbackMessage: "Could not save gift. Please try again.",
  });
}
