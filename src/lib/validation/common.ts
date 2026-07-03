import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(90)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const nullableUrlSchema = z
  .string()
  .trim()
  .max(500)
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : null))
  .pipe(z.string().url().nullable());

export const textArraySchema = z
  .string()
  .optional()
  .transform((value) =>
    value
      ? value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : []
  );

export const jsonListSchema = z
  .string()
  .optional()
  .transform((value) =>
    value
      ? value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => ({ text: item }))
      : []
  );
