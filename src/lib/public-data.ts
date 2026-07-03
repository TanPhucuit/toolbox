import "server-only";

import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  Category,
  ContentBlock,
  Service,
  SiteSettings,
  Tool
} from "@/types/database.types";

type QueryFilters = {
  q?: string;
  category?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data as SiteSettings | null;
}

export async function getContentBlock(pageKey: string, sectionKey: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("content_blocks")
    .select("*")
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey)
    .eq("is_published", true)
    .maybeSingle();
  return data as ContentBlock | null;
}

export async function getCategories() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return (data ?? []) as Category[];
}

export async function getTools(filters: QueryFilters = {}) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("tools")
    .select("*, categories(name, slug)")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true });

  if (filters.q) {
    query = query.or(
      `name.ilike.%${filters.q}%,short_description.ilike.%${filters.q}%`
    );
  }

  if (filters.category) {
    const categories = await getCategories();
    const matched = categories.find((category) => category.slug === filters.category);
    if (!matched) return [];
    query = query.eq("category_id", matched.id);
  }

  const { data } = await query;
  return (data ?? []) as (Tool & { categories?: Pick<Category, "name" | "slug"> })[];
}

export async function getToolBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("tools")
    .select("*, categories(name, slug), tool_media(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!data) notFound();
  return data as Tool & {
    categories?: Pick<Category, "name" | "slug">;
    tool_media?: { id: string; url: string; thumbnail_url: string | null; alt_text: string | null; media_type: string }[];
  };
}

export async function getServices() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort_order");
  return (data ?? []) as Service[];
}

export async function getServiceBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!data) notFound();
  return data as Service;
}
