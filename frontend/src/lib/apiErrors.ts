import type { ApiErrorBody } from "@/types/auth";

export function isAxiosErrorWithBody(
  error: unknown,
): error is { response?: { status?: number; data?: ApiErrorBody } } {
  return typeof error === "object" && error !== null && "response" in error;
}

export function getApiErrorMessage(error: unknown): string | null {
  if (!isAxiosErrorWithBody(error)) return null;
  return error.response?.data?.message ?? null;
}