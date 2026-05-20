import { z } from "zod";

const NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'-]+$/;

const nameField = (fieldLabel: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldLabel} is required`)
    .min(2, `${fieldLabel} must be at least 2 characters`)
    .regex(
      NAME_REGEX,
      `${fieldLabel} can only contain letters, hyphens and apostrophes`,
    );

export const registerSchema = z
  .object({
    firstName: nameField("First name"),
    lastName: nameField("Last name"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;