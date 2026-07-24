import "server-only";

import { notFound } from "next/navigation";
import {
  catalogCategories,
  catalogServices,
  catalogTools,
  defaultSettings,
  findService,
  findTool,
  type CatalogService,
  type CatalogTool
} from "@/lib/catalog";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category, ContentBlock, Service, SiteSettings, Tool } from "@/types/database.types";

type QueryFilters = { q?: string; category?: string };
type ToolMedia = CatalogTool["gallery"][number];
type ToolRow = Tool & {
  categories?: { name: string; slug: string } | null;
  tool_media?: ToolMedia[];
};
type ServiceRow = Service & { gallery?: CatalogService["gallery"] };

const canonicalToolSlugs = new Set(catalogTools.map((item) => item.slug));
const canonicalServiceSlugs = new Set(catalogServices.map((item) => item.slug));

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
    const { data } = await supabase.from("content_blocks").select("*").eq("page_key", pageKey).eq("section_key", sectionKey).eq("is_published", true).maybeSingle();
    return data as ContentBlock | null;
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return null;
    throw error;
  }
}

export async function getCategories() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("categories").select("*").eq("is_published", true).order("sort_order");
    if (error) throw error;
    const rows = (data ?? []) as Category[];
    return rows.some((row) => catalogCategories.some((item) => item.slug === row.slug)) || await databaseCatalogIsActive("tools")
      ? rows
      : catalogCategories;
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return catalogCategories;
    throw error;
  }
}

export async function getTools(filters: QueryFilters = {}) {
  const source = await loadPublishedTools();
  const query = filters.q?.trim().toLocaleLowerCase("vi") ?? "";
  return source.filter((tool) => {
    const matchesQuery = !query || `${tool.name} ${tool.short_description}`.toLocaleLowerCase("vi").includes(query);
    const matchesCategory = !filters.category || tool.categories?.slug === filters.category;
    return matchesQuery && matchesCategory;
  });
}

export async function getToolBySlug(slug: string) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tools")
      .select("*,categories(name,slug),tool_media(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    if (data) return mergeTool(data as unknown as ToolRow);
    if (await databaseCatalogIsActive("tools")) notFound();
  } catch (error) {
    if (!isMissingSupabaseEnv(error)) throw error;
  }
  const fallback = findTool(slug);
  if (!fallback) notFound();
  return { ...fallback, tool_media: fallback.gallery };
}

export async function getServices() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("services").select("*").eq("is_published", true).order("sort_order");
    if (error) throw error;
    const rows = (data ?? []) as ServiceRow[];
    if (!rows.some((row) => canonicalServiceSlugs.has(row.slug))) return catalogServices;
    return rows.map((row) => mergeService(row));
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return catalogServices;
    throw error;
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const supabase = await createServerSupabaseClient();
    const [serviceResult, galleryResult] = await Promise.all([
      supabase.from("services").select("*").eq("slug", slug).eq("is_published", true).maybeSingle(),
      supabase.from("content_blocks").select("content").eq("page_key", "service-gallery").eq("section_key", slug).eq("is_published", true).maybeSingle()
    ]);
    const { data, error } = serviceResult;
    if (error) throw error;
    if (data) return mergeService(data as ServiceRow, readGalleryUrls(galleryResult.data?.content));
    if (await databaseCatalogIsActive("services")) notFound();
  } catch (error) {
    if (!isMissingSupabaseEnv(error)) throw error;
  }
  const fallback = findService(slug);
  if (!fallback) notFound();
  return fallback;
}

async function loadPublishedTools(): Promise<Array<CatalogTool & { tool_media: ToolMedia[] }>> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tools")
      .select("*,categories(name,slug),tool_media(*)")
      .eq("is_published", true)
      .order("sort_order");
    if (error) throw error;
    const rows = (data ?? []) as unknown as ToolRow[];
    if (!rows.some((row) => canonicalToolSlugs.has(row.slug))) {
      return catalogTools.map((tool) => ({ ...tool, tool_media: tool.gallery }));
    }
    return rows.map(mergeTool);
  } catch (error) {
    if (isMissingSupabaseEnv(error)) return catalogTools.map((tool) => ({ ...tool, tool_media: tool.gallery }));
    throw error;
  }
}

function mergeTool(row: ToolRow): CatalogTool & { tool_media: ToolMedia[] } {
  const editorial = findTool(row.slug);
  const dbMedia = [...(row.tool_media ?? [])].sort((a, b) => Number((a as ToolMedia & { sort_order?: number }).sort_order ?? 0) - Number((b as ToolMedia & { sort_order?: number }).sort_order ?? 0));
  const gallery = dbMedia.length ? dbMedia : editorial?.gallery ?? fallbackMedia(row);
  return {
    ...(editorial ?? emptyEditorialTool(row)),
    ...row,
    cover_image_url: row.cover_image_url || gallery[0]?.url || editorial?.cover_image_url || null,
    categories: row.categories ?? editorial?.categories ?? { name: "Khác", slug: "khac" },
    guideSteps: editorial?.guideSteps ?? toTextList(row.features),
    competitors: editorial?.competitors ?? [],
    gallery,
    tool_media: gallery
  };
}

function mergeService(row: ServiceRow, galleryUrls: string[] = []): CatalogService {
  const editorial = findService(row.slug);
  const cover = row.cover_image_url || editorial?.cover_image_url || "/services/custom-tool.png";
  return {
    ...(editorial ?? row),
    ...row,
    cover_image_url: cover,
    gallery: row.gallery?.length
      ? row.gallery
      : galleryUrls.length
        ? galleryUrls.map((url, index) => ({ id: `${row.slug}-${index}`, url, alt_text: `Ảnh minh họa ${index + 1} của ${row.title}` }))
        : editorial?.gallery ?? [{ id: `${row.slug}-cover`, url: cover, alt_text: `Minh họa ${row.title}` }]
  } as CatalogService;
}

function emptyEditorialTool(row: ToolRow): CatalogTool {
  const gallery = fallbackMedia(row);
  return {
    ...row,
    categories: row.categories ?? { name: "Khác", slug: "khac" },
    guideSteps: toTextList(row.features),
    competitors: [],
    gallery
  };
}

function fallbackMedia(row: ToolRow): ToolMedia[] {
  return row.cover_image_url
    ? [{ id: `${row.slug}-cover`, url: row.cover_image_url, thumbnail_url: null, alt_text: `Ảnh ${row.name}`, media_type: "image" }]
    : [];
}

async function databaseCatalogIsActive(table: "tools" | "services") {
  const supabase = await createServerSupabaseClient();
  const slugs = table === "tools" ? [...canonicalToolSlugs] : [...canonicalServiceSlugs];
  const { data } = await supabase.from(table).select("slug").in("slug", slugs).limit(1);
  return Boolean(data?.length);
}

function toTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) =>
    typeof item === "string" ? [item] : typeof item === "object" && item !== null && "text" in item ? [String(item.text)] : []
  );
}

function readGalleryUrls(value: unknown): string[] {
  if (typeof value !== "object" || value === null || !("urls" in value) || !Array.isArray(value.urls)) return [];
  return value.urls.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function isMissingSupabaseEnv(error: unknown) {
  return error instanceof Error && error.message.includes("Missing Supabase public env");
}
