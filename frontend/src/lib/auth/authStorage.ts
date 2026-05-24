const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  window.dispatchEvent(new Event("auth-change"));
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}