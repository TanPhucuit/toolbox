import Link from "next/link";
import { Copy, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteTool, duplicateTool } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminToolsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("tools")
    .select("id,name,slug,short_description,is_published,is_featured,sort_order,price_type")
    .order("sort_order");
  const tools = data ?? [];

  return (
    <div className="grid gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-primary">Quản lý sản phẩm</p>
          <h1 className="mt-2 text-3xl font-bold">Tools</h1>
          <p className="mt-2 text-on-surface-variant">Sửa nhanh nội dung bán hàng, preview public page và nhân bản tool khi cần.</p>
        </div>
        <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white" href="/admin/tools/new">
          <Plus className="h-4 w-4" />
          Thêm tool
        </Link>
      </header>

      <div className="grid gap-3">
        {tools.map((tool) => (
          <article key={tool.id} className="rounded-lg border border-outline-variant bg-white p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{tool.name}</h2>
                  <StatusBadge published={tool.is_published} />
                  {tool.is_featured ? <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-primary">Featured</span> : null}
                </div>
                <p className="mt-1 break-all text-sm text-on-surface-variant">/{tool.slug}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-on-surface-variant">{tool.short_description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                <Link className="admin-action-button" href={`/admin/tools/${tool.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Sửa
                </Link>
                <Link className="admin-action-button" href={`/tool/${tool.slug}`} target="_blank">
                  <Eye className="h-4 w-4" />
                  Preview
                </Link>
                <form action={duplicateTool}>
                  <input type="hidden" name="id" value={tool.id} />
                  <button className="admin-action-button w-full">
                    <Copy className="h-4 w-4" />
                    Nhân bản
                  </button>
                </form>
                <form action={deleteTool}>
                  <input type="hidden" name="id" value={tool.id} />
                  <button className="admin-action-button-danger w-full">
                    <Trash2 className="h-4 w-4" />
                    Xóa
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
        {!tools.length ? (
          <div className="rounded-lg border border-dashed border-outline-variant bg-white p-8 text-center">
            <h2 className="text-xl font-bold">Chưa có tool nào</h2>
            <p className="mt-2 text-on-surface-variant">Bấm “Thêm tool” để tạo sản phẩm đầu tiên.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${published ? "bg-green-50 text-green-700" : "bg-surface-container-low text-on-surface-variant"}`}>
      {published ? "Đang public" : "Bản nháp"}
    </span>
  );
}
