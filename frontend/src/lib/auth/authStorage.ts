import { getRoleFromAccessToken, isAccessTokenExpired } from "@/lib/auth/jwtUtils";
import type { CurrentUserDto, UserRole } from "@/types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const CURRENT_USER_KEY = "currentUser";

type AuthStorageOptions = {
  notify?: boolean;
};

function dispatchAuthChange(): void {
  window.dispatchEvent(new Event("auth-change"));
}

function notifyAuthChange(shouldNotify = true): void {
  if (shouldNotify) {
    dispatchAuthChange();
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  dispatchAuthChange();
}

export function getAccessToken(): string | null {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;

  if (isAccessTokenExpired(token)) {
    clearAuthSession();
    return null;
  }

  return token;
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  dispatchAuthChange();
}

export function clearAccessToken(options?: AuthStorageOptions): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  notifyAuthChange(options?.notify !== false);
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

/** Role from JWT is the source of truth for UI gating. */
export function getAuthRole(): UserRole | null {
  return getRoleFromAccessToken(getAccessToken());
}

export function getCurrentUser(): CurrentUserDto | null {
  const token = getAccessToken();
  if (!token) return null;

  const roleFromToken = getRoleFromAccessToken(token);
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as CurrentUserDto;
    if (roleFromToken) {
      return { ...user, role: roleFromToken };
    }
    return user;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: CurrentUserDto): void {
  const token = getAccessToken();
  const roleFromToken = getRoleFromAccessToken(token);

  const toStore: CurrentUserDto = roleFromToken
    ? { ...user, role: roleFromToken }
    : user;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(toStore));
  dispatchAuthChange();
}

export function clearCurrentUser(options?: AuthStorageOptions): void {
  localStorage.removeItem(CURRENT_USER_KEY);
  notifyAuthChange(options?.notify !== false);
}