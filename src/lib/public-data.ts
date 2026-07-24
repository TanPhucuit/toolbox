import "server-only";

import { notFound } from "next/navigation";
import {
  catalogCategories,
  catalogServices,
  catalogTools,
  defaultSettings,
  findService,
  findTool
} from "@/lib/catalog";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  ContentBlock,
  SiteSettings
} from "@/types/database.types";

type QueryFilters = {
  q?: string;
  category?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
    return data ? ({ ...defaultSettings, ...(data as SiteSettings) }) : defaultSettings;
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return defaultSettings;
    throw error;
  }
}

export async function getContentBlock(pageKey: string, sectionKey: string) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("content_blocks")
      .select("*")
      .eq("page_key", pageKey)
      .eq("section_key", sectionKey)
      .eq("is_published", true)
      .maybeSingle();
    return data as ContentBlock | null;
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return null;
    throw error;
  }
}

export async function getCategories() {
  return catalogCategories;
}

export async function getTools(filters: QueryFilters = {}) {
  const query = filters.q?.trim().toLocaleLowerCase("vi") ?? "";
  return catalogTools.filter((tool) => {
    const matchesQuery = !query || `${tool.name} ${tool.short_description}`.toLocaleLowerCase("vi").includes(query);
    const matchesCategory = !filters.category || tool.categories.slug === filters.category;
    return matchesQuery && matchesCategory;
  });
}

export async function getToolBySlug(slug: string) {
  const tool = findTool(slug);
  if (!tool) notFound();
  return { ...tool, tool_media: tool.gallery };
}

export async function getServices() {
  return catalogServices;
}

export async function getServiceBySlug(slug: string) {
  const service = findService(slug);
  if (!service) notFound();
  return service;
}

function isMissingSupabaseEnv(error: unknown) {
  return error instanceof Error && error.message.includes("Missing Supabase public env");
}
