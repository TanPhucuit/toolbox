import Link from "next/link";
import { toDateTime } from "@/lib/utils/format";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { InquiryStatus } from "@/types/database.types";

const statusLabels: Record<InquiryStatus, string> = {
  new: "Mới",
  reviewing: "Đang xem",
  contacted: "Đã phản hồi",
  completed: "Hoàn tất",
  spam: "Spam"
};

export default async function InquiriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("inquiries")
    .select("id,full_name,phone,email,inquiry_type,status,created_at,tools(name),services(title)")
    .order("created_at", { ascending: false })
    .limit(100);
  const rows = (data ?? []) as unknown as Array<{
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    inquiry_type: string;
    status: InquiryStatus;
    created_at: string;
    tools: { name: string } | null;
    services: { title: string } | null;
  }>;
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Yêu cầu tư vấn</h1>
      <div className="stitch-card overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr>
              <th className="p-3">Người gửi</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Loại</th>
              <th>Liên quan</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant">
                <td className="p-3 font-semibold">{item.full_name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.inquiry_type}</td>
                <td>{relatedName(item.tools, item.services)}</td>
                <td>
                  <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold">
                    {statusLabels[item.status] ?? item.status}
                  </span>
                </td>
                <td>{toDateTime(item.created_at)}</td>
                <td><Link className="rounded border px-3 py-2" href={`/admin/inquiries/${item.id}`}>Xem</Link></td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td className="p-6 text-center text-on-surface-variant" colSpan={8}>
                  Chưa có yêu cầu tư vấn.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function relatedName(
  tools: { name: string } | { name: string }[] | null,
  services: { title: string } | { title: string }[] | null
) {
  const tool = Array.isArray(tools) ? tools[0] : tools;
  const service = Array.isArray(services) ? services[0] : services;
  return tool?.name ?? service?.title ?? "-";
}
