import Link from "next/link";
import { deleteService } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminServicesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("id,title,slug,is_published,is_featured,sort_order").order("sort_order");
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Quản lý dịch vụ</h1>
        <Link className="min-h-11 rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white" href="/admin/services/new">Thêm dịch vụ</Link>
      </div>
      <div className="stitch-card overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr><th className="p-3">Tên</th><th>Slug</th><th>Trạng thái</th><th>Featured</th><th>Sort</th><th>Thao tác</th></tr>
          </thead>
          <tbody>{(data ?? []).map((service) => (
            <tr key={service.id} className="border-b border-outline-variant">
              <td className="p-3 font-semibold">{service.title}</td><td>{service.slug}</td><td>{service.is_published ? "Published" : "Draft"}</td><td>{service.is_featured ? "Có" : "Không"}</td><td>{service.sort_order}</td>
              <td className="flex gap-2 p-3"><Link className="rounded border px-3 py-2" href={`/admin/services/${service.id}/edit`}>Sửa</Link><Link className="rounded border px-3 py-2" href={`/dich-vu/${service.slug}`}>Preview</Link><form action={deleteService}><input type="hidden" name="id" value={service.id} /><button className="rounded border border-red-200 px-3 py-2 text-error">Xóa</button></form></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
