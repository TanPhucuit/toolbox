import { z } from "zod";
import { jsonListSchema, nullableUrlSchema, slugSchema } from "./common";

export const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(160),
  slug: slugSchema,
  short_description: z.string().trim().min(10).max(320),
  description_markdown: z.string().trim().max(8000).optional().default(""),
  icon_name: z.string().trim().max(80).optional().default(""),
  cover_image_url: nullableUrlSchema,
  price_label: z.string().trim().min(2).max(120).default("Liên hệ báo giá"),
  features: jsonListSchema,
  process_steps: jsonListSchema,
  faq: jsonListSchema,
  primary_cta_label: z.string().trim().min(2).max(80).default("Yêu cầu tư vấn"),
  seo_title: z.string().trim().max(140).optional().default(""),
  seo_description: z.string().trim().max(240).optional().default(""),
  is_featured: z.coerce.boolean().default(false),
  is_published: z.coerce.boolean().default(false),
  sort_order: z.coerce.number().int().default(0)
});

export type ServiceInput = z.infer<typeof serviceSchema>;
