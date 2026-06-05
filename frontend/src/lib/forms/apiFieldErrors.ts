import { isAxiosError } from "axios";
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

import {
  MSG_NETWORK,
  MSG_SERVER_ERROR,
  MSG_SOMETHING_WRONG,
} from "@/constants/messages";
import { getApiErrorMessage, isAxiosErrorWithBody } from "@/lib/apiErrors";

export function getApiFieldErrors(
  error: unknown,
): Record<string, string> | null {
  if (!isAxiosErrorWithBody(error)) return null;
  return error.response?.data?.details?.fields ?? null;
}

type ApplyApiFormFieldErrorsOptions<T extends FieldValues> = {
  error: unknown;
  setError: UseFormSetError<T>;
  allowedFields: readonly FieldPath<T>[];
  fallbackMessage: string;
  fieldMap?: Partial<Record<string, FieldPath<T>>>;
};

export function applyApiFormFieldErrors<T extends FieldValues>({
  error,
  setError,
  allowedFields,
  fallbackMessage,
  fieldMap,
}: ApplyApiFormFieldErrorsOptions<T>): string | null {
  if (!isAxiosError(error)) {
    return MSG_SOMETHING_WRONG;
  }

  if (!error.response) {
    return MSG_NETWORK;
  }

  const status = error.response.status;
  const message = getApiErrorMessage(error);
  const fields = getApiFieldErrors(error);

  if (status === 400 && fields) {
    let applied = false;
    const allowed = new Set(allowedFields as readonly string[]);

    for (const [key, msg] of Object.entries(fields)) {
      const target = (fieldMap?.[key] ?? key) as FieldPath<T>;
      if (allowed.has(target as string)) {
        setError(target, { message: msg });
        applied = true;
      }
    }

    if (applied) {
      return null;
    }
  }

  if (status >= 500) {
    return MSG_SERVER_ERROR;
  }

  return message ?? fallbackMessage;
}
