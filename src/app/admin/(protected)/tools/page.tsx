import Link from "next/link";
import { deleteTool, duplicateTool } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminToolsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("tools").select("id,name,slug,is_published,is_featured,sort_order,price_type").order("sort_order");
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Quản lý tool</h1>
        <Link className="min-h-11 rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white" href="/admin/tools/new">Thêm tool</Link>
      </div>
      <div className="stitch-card overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr><th className="p-3">Tên</th><th>Slug</th><th>Trạng thái</th><th>Featured</th><th>Sort</th><th>Thao tác</th></tr>
          </thead>
          <tbody>
            {(data ?? []).map((tool) => (
              <tr key={tool.id} className="border-b border-outline-variant">
                <td className="p-3 font-semibold">{tool.name}</td>
                <td>{tool.slug}</td>
                <td>{tool.is_published ? "Published" : "Draft"}</td>
                <td>{tool.is_featured ? "Có" : "Không"}</td>
                <td>{tool.sort_order}</td>
                <td className="flex gap-2 p-3">
                  <Link className="rounded border px-3 py-2" href={`/admin/tools/${tool.id}/edit`}>Sửa</Link>
                  <Link className="rounded border px-3 py-2" href={`/tool/${tool.slug}`}>Preview</Link>
                  <form action={duplicateTool}><input type="hidden" name="id" value={tool.id} /><button className="rounded border px-3 py-2">Duplicate</button></form>
                  <form action={deleteTool}><input type="hidden" name="id" value={tool.id} /><button className="rounded border border-red-200 px-3 py-2 text-error">Xóa</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
