import { z } from "zod";

export const inquirySchema = z.object({
  inquiry_type: z.enum(["general", "tool", "service", "quote"]).default("general"),
  tool_id: z.string().uuid().nullable().optional(),
  service_id: z.string().uuid().nullable().optional(),
  full_name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(24),
  email: z.string().trim().email().max(180).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  preferred_contact: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  source_page: z.string().trim().max(300).optional().or(z.literal("")),
  website: z.string().max(0).optional(),
  form_started_at: z.coerce.number().int().positive()
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryFormValues = z.input<typeof inquirySchema>;
