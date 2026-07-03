import { ToolForm } from "@/components/admin/tool-form";
import { StorageUpload } from "@/components/admin/storage-upload";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database.types";

export default async function NewToolPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Thêm tool</h1>
      <StorageUpload />
      <ToolForm categories={(data ?? []) as Category[]} />
    </div>
  );
}
