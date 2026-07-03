import { AdminShell } from "@/components/admin/admin-shell";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminUser } from "@/lib/auth/require-admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdminUser();
  if (!admin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-container-low p-4">
        <LoginForm />
      </main>
    );
  }
  const supabase = await createServerSupabaseClient();
  const [tools, services, inquiries, logs] = await Promise.all([
    supabase.from("tools").select("id,is_published"),
    supabase.from("services").select("id"),
    supabase.from("inquiries").select("id,status"),
    supabase.from("admin_activity_logs").select("*").order("created_at", { ascending: false }).limit(6)
  ]);
  const toolRows = tools.data ?? [];
  const inquiryRows = inquiries.data ?? [];
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tổng quan</h1>
        <p className="text-on-surface-variant">Xin chào {admin.display_name ?? admin.email ?? "admin"}.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Tổng số tool" value={toolRows.length} />
        <Stat label="Tool published" value={toolRows.filter((tool) => tool.is_published).length} />
        <Stat label="Dịch vụ" value={services.data?.length ?? 0} />
        <Stat label="Inquiry mới" value={inquiryRows.filter((item) => item.status === "new").length} />
      </div>
      <section className="mt-8 stitch-card p-6">
        <h2 className="mb-4 text-xl font-bold">Hoạt động gần đây</h2>
        <div className="space-y-3 text-sm text-on-surface-variant">
          {(logs.data ?? []).map((log) => (
            <p key={log.id}>{log.action} {log.entity_type} lúc {new Date(log.created_at).toLocaleString("vi-VN")}</p>
          ))}
          {!logs.data?.length ? <p>Chưa có hoạt động quản trị.</p> : null}
        </div>
      </section>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stitch-card p-6">
      <p className="text-sm font-semibold text-on-surface-variant">{label}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}
