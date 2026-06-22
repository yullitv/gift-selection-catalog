export type UserRole = "USER" | "ADMIN";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CurrentUserDto = {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
};

export type AuthResponse = {
  accessToken: string;
  user: CurrentUserDto;
};

export type ApiErrorBody = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: {
    fields?: Record<string, string>;
    exception?: string;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};