import { notFound } from "next/navigation";
import { updateInquiry } from "@/lib/admin/actions";
import { toDateTime } from "@/lib/utils/format";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("inquiries").select("*,tools(name),services(title)").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Chi tiết yêu cầu</h1>
      <section className="stitch-card mb-6 space-y-3 p-6">
        <p><strong>Người gửi:</strong> {data.full_name}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Email:</strong> {data.email ?? "-"}</p>
        <p><strong>Công ty/Zalo:</strong> {data.company ?? "-"}</p>
        <p><strong>Loại:</strong> {data.inquiry_type}</p>
        <p><strong>Liên quan:</strong> {data.tools?.name ?? data.services?.title ?? "-"}</p>
        <p><strong>Nguồn:</strong> {data.source_page ?? "-"}</p>
        <p><strong>Ngày gửi:</strong> {toDateTime(data.created_at)}</p>
        <p><strong>Nội dung:</strong></p>
        <p className="whitespace-pre-line rounded-lg bg-surface-container-low p-4">{data.message}</p>
      </section>
      <form action={updateInquiry} className="stitch-card space-y-4 p-6">
        <input type="hidden" name="id" value={data.id} />
        <label><span className="admin-label">Status</span><select className="admin-input" name="status" defaultValue={data.status}><option value="new">new</option><option value="reviewing">reviewing</option><option value="contacted">contacted</option><option value="completed">completed</option><option value="spam">spam</option></select></label>
        <label><span className="admin-label">Ghi chú nội bộ</span><textarea className="admin-input min-h-32" name="admin_notes" defaultValue={data.admin_notes ?? ""} /></label>
        <button className="rounded-lg bg-primary px-5 py-3 font-semibold text-white">Cập nhật</button>
      </form>
    </div>
  );
}
