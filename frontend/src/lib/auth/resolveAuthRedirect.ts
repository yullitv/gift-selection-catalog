import { ROUTES } from "@/constants/routes";
import type { UserRole } from "@/types/auth";

export function resolveAuthRedirect(
  role: UserRole,
  requestedFrom: string | null,
): string {
  const fallback = role === "ADMIN" ? ROUTES.adminAccount : ROUTES.home;

  if (!requestedFrom) {
    return fallback;
  }

  if (role === "ADMIN" && requestedFrom === ROUTES.account) {
    return fallback;
  }

  if (role === "USER" && requestedFrom === ROUTES.adminAccount) {
    return ROUTES.account;
  }

  return requestedFrom;
}