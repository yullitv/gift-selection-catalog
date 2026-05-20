import { isAxiosError } from "axios";
import type { UseFormSetError } from "react-hook-form";

import type { LoginFormValues } from "@/schemas/loginSchema";
import type { RegisterFormValues } from "@/schemas/registerSchema";
import type {
  ApiErrorBody,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { apiClient } from "./api";

const REGISTER_API_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "password",
] as const;

type RegisterApiField = (typeof REGISTER_API_FIELDS)[number];

const LOGIN_API_FIELDS = ["email", "password"] as const;

type LoginApiField = (typeof LOGIN_API_FIELDS)[number];

function isRegisterApiField(key: string): key is RegisterApiField {
  return (REGISTER_API_FIELDS as readonly string[]).includes(key);
}

function isLoginApiField(key: string): key is LoginApiField {
  return (LOGIN_API_FIELDS as readonly string[]).includes(key);
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export function getApiErrorMessage(error: unknown): string | null {
  if (!isAxiosErrorWithBody(error)) return null;
  return error.response?.data?.message ?? null;
}

export function getApiFieldErrors(
  error: unknown,
): Record<string, string> | null {
  if (!isAxiosErrorWithBody(error)) return null;
  return error.response?.data?.details?.fields ?? null;
}

/**
 * Мапить помилки API на поля форми реєстрації.
 * null = помилки на формі, toast не потрібен.
 * string = текст для toast.error().
 */
export function applyRegisterFormErrors(
  error: unknown,
  setError: UseFormSetError<RegisterFormValues>,
): string | null {
  if (!isAxiosError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (!error.response) {
    return "Cannot reach server. Check your connection and try again.";
  }

  const status = error.response.status;
  const message = getApiErrorMessage(error);
  const fields = getApiFieldErrors(error);

  if (status === 400 && fields) {
    let applied = false;
    for (const [key, msg] of Object.entries(fields)) {
      if (isRegisterApiField(key)) {
        setError(key, { message: msg });
        applied = true;
      }
    }
    if (applied) return null;
  }

  if (status === 400 && message?.toLowerCase().includes("email")) {
    setError("email", { message: "This email is already registered." });
    return null;
  }

  if (status >= 500) {
    return "Server error. Please try again later.";
  }

  return message ?? "Registration failed. Please try again.";
}

/**
 * Мапить помилки API на поля форми логіну.
 * null = помилки на формі, toast не потрібен.
 * string = текст для toast.error().
 */
export function applyLoginFormErrors(
  error: unknown,
  setError: UseFormSetError<LoginFormValues>,
): string | null {
  if (!isAxiosError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (!error.response) {
    return "Cannot reach server. Check your connection and try again.";
  }

  const status = error.response.status;
  const message = getApiErrorMessage(error);
  const fields = getApiFieldErrors(error);

  if (status === 400 && fields) {
    let applied = false;
    for (const [key, msg] of Object.entries(fields)) {
      if (isLoginApiField(key)) {
        setError(key, { message: msg });
        applied = true;
      }
    }
    if (applied) return null;
  }

  if (status === 401) {
    return "Invalid email or password.";
  }

  if (status >= 500) {
    return "Server error. Please try again later.";
  }

  return message ?? "Sign in failed. Please try again.";
}

function isAxiosErrorWithBody(
  error: unknown,
): error is { response?: { status?: number; data?: ApiErrorBody } } {
  return typeof error === "object" && error !== null && "response" in error;
}