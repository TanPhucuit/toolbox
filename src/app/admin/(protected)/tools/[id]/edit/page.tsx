import { notFound } from "next/navigation";
import { ToolForm } from "@/components/admin/tool-form";
import { StorageUpload } from "@/components/admin/storage-upload";
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
    <div>
      <h1 className="mb-6 text-3xl font-bold">Sửa tool</h1>
      <StorageUpload />
      <ToolForm tool={toolResult.data as Tool} categories={(categoryResult.data ?? []) as Category[]} />
    </div>
  );
}
