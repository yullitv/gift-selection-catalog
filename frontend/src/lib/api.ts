import axios from "axios";

function resolveApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (import.meta.env.DEV) return "/api";
  throw new Error("Set VITE_API_URL for production (see frontend/.env.example).");
}

export const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: { Accept: "application/json" },
});
