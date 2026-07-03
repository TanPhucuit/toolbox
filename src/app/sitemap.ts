import type { MetadataRoute } from "next";
import { getServices, getTools } from "@/lib/public-data";
import { getSiteUrl } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, services] = await Promise.all([getTools(), getServices()]);
  const base = getSiteUrl();
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/dich-vu`, lastModified: new Date() },
    { url: `${base}/lien-he`, lastModified: new Date() },
    { url: `${base}/chinh-sach-bao-mat`, lastModified: new Date() },
    { url: `${base}/dieu-khoan-su-dung`, lastModified: new Date() },
    ...tools.map((tool) => ({ url: `${base}/tool/${tool.slug}`, lastModified: new Date(tool.updated_at) })),
    ...services.map((service) => ({ url: `${base}/dich-vu/${service.slug}`, lastModified: new Date(service.updated_at) }))
  ];
}
