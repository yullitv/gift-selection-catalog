import { isAxiosError } from "axios";
import type { UseFormSetError } from "react-hook-form";

import {
  MSG_NETWORK,
  MSG_SERVER_ERROR,
  MSG_SOMETHING_WRONG,
} from "@/constants/messages";
import { getApiErrorMessage, isAxiosErrorWithBody } from "@/lib/apiErrors";
import type { LoginFormValues } from "@/schemas/loginSchema";
import type { RegisterFormValues } from "@/schemas/registerSchema";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import { apiClient } from "../api";

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

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
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

export function getApiFieldErrors(
  error: unknown,
): Record<string, string> | null {
  if (!isAxiosErrorWithBody(error)) return null;
  return error.response?.data?.details?.fields ?? null;
}

export function applyRegisterFormErrors(
  error: unknown,
  setError: UseFormSetError<RegisterFormValues>,
): string | null {
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
    return MSG_SERVER_ERROR;
  }

  return message ?? "Registration failed. Please try again.";
}

export function applyLoginFormErrors(
  error: unknown,
  setError: UseFormSetError<LoginFormValues>,
): string | null {
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
    return MSG_SERVER_ERROR;
  }

  return message ?? "Sign in failed. Please try again.";
}
