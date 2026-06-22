import { isAxiosError } from "axios";
import { toast } from "sonner";

import { MSG_NETWORK, MSG_SERVER_ERROR, MSG_SOMETHING_WRONG } from "@/constants/messages";
import { getApiErrorMessage } from "@/lib/apiErrors";

export function notifySuccess(message: string): void {
  toast.success(message);
}

export function notifyError(message: string): void {
  toast.error(message);
}

export function notifyApiError(
  error: unknown,
  fallback = MSG_SOMETHING_WRONG,
): boolean {
  if (!isAxiosError(error)) {
    notifyError(fallback);
    return true;
  }

  if (!error.response) {
    notifyError(MSG_NETWORK);
    return true;
  }

  const status = error.response.status;
  const message = getApiErrorMessage(error);

  if (status >= 500) {
    notifyError(MSG_SERVER_ERROR);
    return true;
  }

  if (message) {
    notifyError(message);
    return true;
  }

  notifyError(fallback);
  return true;
}