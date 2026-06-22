import { z } from "zod";

const urlOrEmpty = z
  .string()
  .trim()
  .refine((value) => value === "" || /^https?:\/\/.+/i.test(value), {
    message: "Photo URL must start with http:// or https://",
  });

const nonNegativeIntString = z
  .string()
  .trim()
  .min(1, "Required")
  .refine((value) => /^\d+$/.test(value), {
    message: "Must be a whole number",
  });

const priceUsdString = z
  .string()
  .trim()
  .min(1, "Price is required")
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: "Enter a valid price (e.g. 29.99)",
  })
  .refine((value) => Number(value) >= 0, {
    message: "Price must be zero or greater",
  });

const optionalNonNegativeIntString = z
  .string()
  .trim()
  .refine((value) => value === "" || /^\d+$/.test(value), {
    message: "Must be a whole number",
  });

function parseOptionalAge(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function isAgeRangeValid(minAge: string, maxAge: string): boolean {
  const min = parseOptionalAge(minAge);
  const max = parseOptionalAge(maxAge);

  if (min == null || max == null) {
    return true;
  }

  return min <= max;
}

const adminGiftBaseSchema = z.object({
  name: z.string().trim().min(2, "Gift name is required").max(120, "Name is too long"),
  description: z.string().trim().max(500, "Description is too long"),
  photoUrl: urlOrEmpty,
  priceUsd: priceUsdString,
  stockQuantity: nonNegativeIntString,
  minAge: optionalNonNegativeIntString,
  maxAge: optionalNonNegativeIntString,
  tags: z.string().trim(),
  targetAudiences: z
    .array(z.enum(["MAN", "WOMAN", "COUPLE", "CHILD"]))
    .min(1, "Pick at least one audience"),
});

export const adminGiftSchema = adminGiftBaseSchema.refine(
  (values) => isAgeRangeValid(values.minAge, values.maxAge),
  {
    message: "Max age must be greater than or equal to min age",
    path: ["maxAge"],
  },
);

export type AdminGiftFormValues = z.infer<typeof adminGiftSchema>;