import { StorageUpload } from "@/components/admin/storage-upload";
import { ToolForm } from "@/components/admin/tool-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database.types";

export default async function NewToolPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Tạo sản phẩm</p>
        <h1 className="mt-2 text-3xl font-bold">Thêm tool</h1>
        <p className="mt-2 text-on-surface-variant">Nhập theo từng nhóm thông tin, xem preview bên phải rồi lưu.</p>
      </header>
      <StorageUpload />
      <ToolForm categories={(data ?? []) as Category[]} />
    </div>
  );
}
