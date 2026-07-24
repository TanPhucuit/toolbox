import { notFound } from "next/navigation";
import { StorageUpload } from "@/components/admin/storage-upload";
import { ServiceForm } from "@/components/admin/tool-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Service } from "@/types/database.types";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const { data: galleryBlock } = await supabase
    .from("content_blocks")
    .select("content")
    .eq("page_key", "service-gallery")
    .eq("section_key", data.slug)
    .maybeSingle();
  const content = galleryBlock?.content as { urls?: unknown } | null;
  const galleryUrls = Array.isArray(content?.urls) ? content.urls.filter((item): item is string => typeof item === "string") : [];
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Sửa dịch vụ</p>
        <h1 className="mt-2 text-3xl font-bold">Sửa dịch vụ</h1>
        <p className="mt-2 text-on-surface-variant">Chỉnh nội dung theo từng nhóm, preview bên phải sẽ cập nhật ngay.</p>
      </header>
      <StorageUpload />
      <ServiceForm service={data as Service} galleryUrls={galleryUrls} />
    </div>
  );
}
