import { z } from "zod";

const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'-]+$/;
const phoneRegex = /^$|^\+?[0-9]{10,15}$/;

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is required")
    .max(60, "First name is too long")
    .regex(nameRegex, "First name can only contain letters, hyphens and apostrophes"),
  lastName: z
    .string()
    .trim()
    .min(2, "Surname is required")
    .max(60, "Surname is too long")
    .regex(nameRegex, "Surname can only contain letters, hyphens and apostrophes"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Phone must contain 10-15 digits, optionally starting with +"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;