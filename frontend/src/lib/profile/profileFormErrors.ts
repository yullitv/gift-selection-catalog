import type { UseFormSetError } from "react-hook-form";

import { applyApiFormFieldErrors } from "@/lib/forms/apiFieldErrors";
import type { ProfileFormValues } from "@/schemas/profileSchema";

const PROFILE_FIELDS = ["firstName", "lastName", "phone"] as const;

export function applyProfileFormErrors(
  error: unknown,
  setError: UseFormSetError<ProfileFormValues>,
): string | null {
  return applyApiFormFieldErrors({
    error,
    setError,
    allowedFields: PROFILE_FIELDS,
    fallbackMessage: "Could not save profile. Please try again.",
  });
}
