import { z } from "zod";
import { jsonListSchema, nullableUrlSchema, slugSchema, textArraySchema } from "./common";

export const toolSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(140),
  slug: slugSchema,
  category_id: z.string().uuid().nullable().optional(),
  short_description: z.string().trim().min(10).max(320),
  description_markdown: z.string().trim().max(8000).optional().default(""),
  price_type: z.enum(["fixed", "contact", "free"]),
  price_vnd: z.coerce.number().int().nonnegative().nullable().optional(),
  old_price_vnd: z.coerce.number().int().nonnegative().nullable().optional(),
  price_label: z.string().trim().max(80).optional().default(""),
  version: z.string().trim().max(40).optional().default(""),
  license_text: z.string().trim().max(160).optional().default(""),
  compatibility: textArraySchema,
  file_size: z.string().trim().max(40).optional().default(""),
  language_support: textArraySchema,
  badge: z.string().trim().max(40).optional().default(""),
  icon_url: nullableUrlSchema,
  cover_image_url: nullableUrlSchema,
  tutorial_video_url: nullableUrlSchema,
  demo_url: nullableUrlSchema,
  primary_cta_type: z.enum(["contact", "external", "detail"]),
  primary_cta_label: z.string().trim().max(80).optional().default(""),
  primary_cta_url: nullableUrlSchema,
  features: jsonListSchema,
  system_requirements: jsonListSchema,
  changelog: jsonListSchema,
  faq: jsonListSchema,
  seo_title: z.string().trim().max(140).optional().default(""),
  seo_description: z.string().trim().max(240).optional().default(""),
  is_featured: z.coerce.boolean().default(false),
  is_published: z.coerce.boolean().default(false),
  sort_order: z.coerce.number().int().default(0)
});

export type ToolInput = z.infer<typeof toolSchema>;
