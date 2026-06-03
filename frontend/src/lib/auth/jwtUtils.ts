import type { UserRole } from "@/types/auth";

type JwtPayload = {
  role?: string;
  exp?: number;
  sub?: string;
};

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

function parseJwtPayload(token: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const json = decodeBase64Url(parts[1]);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRoleFromAccessToken(token: string | null): UserRole | null {
  if (!token) return null;

  const payload = parseJwtPayload(token);
  const role = payload?.role;

  if (role === "ADMIN" || role === "USER") {
    return role;
  }

  return null;
}

export function isAccessTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const payload = parseJwtPayload(token);
  if (!payload?.exp) return false;

  return Date.now() >= payload.exp * 1000;
}