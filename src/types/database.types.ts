export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PriceType = "fixed" | "contact" | "free";
export type CtaType = "contact" | "external" | "detail";
export type InquiryStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "completed"
  | "spam";
export type InquiryType = "general" | "tool" | "service" | "quote";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  accent_color: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string;
  description_markdown: string | null;
  price_type: PriceType;
  price_vnd: number | null;
  old_price_vnd: number | null;
  price_label: string | null;
  version: string | null;
  license_text: string | null;
  compatibility: string[];
  file_size: string | null;
  language_support: string[] | null;
  badge: string | null;
  icon_url: string | null;
  cover_image_url: string | null;
  tutorial_video_url: string | null;
  demo_url: string | null;
  primary_cta_label: string | null;
  primary_cta_type: CtaType;
  primary_cta_url: string | null;
  features: Json;
  system_requirements: Json;
  changelog: Json;
  faq: Json;
  seo_title: string | null;
  seo_description: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ToolMedia {
  id: string;
  tool_id: string;
  media_type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description_markdown: string | null;
  icon_name: string | null;
  cover_image_url: string | null;
  price_label: string;
  features: Json;
  process_steps: Json;
  faq: Json;
  primary_cta_label: string;
  seo_title: string | null;
  seo_description: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  inquiry_type: InquiryType;
  tool_id: string | null;
  service_id: string | null;
  full_name: string;
  phone: string;
  email: string | null;
  company: string | null;
  preferred_contact: string | null;
  message: string;
  status: InquiryStatus;
  admin_notes: string | null;
  source_page: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: 1;
  brand_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  support_phone: string | null;
  support_email: string | null;
  zalo_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  address: string | null;
  copyright_text: string | null;
  default_seo_title: string | null;
  default_seo_description: string | null;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  page_key: string;
  section_key: string;
  title: string | null;
  content: Json;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
