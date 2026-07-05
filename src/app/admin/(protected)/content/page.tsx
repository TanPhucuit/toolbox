import { VisualContentEditor } from "@/components/admin/visual-content-editor";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ContentBlock } from "@/types/database.types";

export default async function ContentPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("content_blocks")
    .select("*")
    .order("page_key")
    .order("sort_order");

  return (
    <div className="grid gap-6">
      <header className="max-w-4xl">
        <p className="text-sm font-bold uppercase text-primary">CMS trực quan</p>
        <h1 className="mt-2 text-3xl font-bold">Chỉnh sửa nội dung website</h1>
        <p className="mt-3 text-on-surface-variant">
          Chọn một vùng nội dung bên trái, xem ngay trong preview, click vào preview để sửa nhanh. Các thay đổi vẫn được
          lưu vào Supabase và hiển thị ngoài website sau khi publish.
        </p>
      </header>
      <VisualContentEditor blocks={(data ?? []) as ContentBlock[]} />
    </div>
  );
}
