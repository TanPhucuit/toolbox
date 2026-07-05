import { notFound } from "next/navigation";
import { StorageUpload } from "@/components/admin/storage-upload";
import { ToolForm } from "@/components/admin/tool-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category, Tool } from "@/types/database.types";

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const [toolResult, categoryResult] = await Promise.all([
    supabase.from("tools").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("*").order("sort_order")
  ]);
  if (!toolResult.data) notFound();
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Sửa sản phẩm</p>
        <h1 className="mt-2 text-3xl font-bold">Sửa tool</h1>
        <p className="mt-2 text-on-surface-variant">Chỉnh phần cần sửa theo tab, preview bên phải sẽ cập nhật ngay.</p>
      </header>
      <StorageUpload />
      <ToolForm tool={toolResult.data as Tool} categories={(categoryResult.data ?? []) as Category[]} />
    </div>
  );
}
