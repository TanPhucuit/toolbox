import { Save } from "lucide-react";
import { StorageUpload } from "@/components/admin/storage-upload";
import { saveSettings } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return (
    <div className="grid max-w-5xl gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Cài đặt chung</p>
        <h1 className="mt-2 text-3xl font-bold">Thông tin website</h1>
        <p className="mt-2 text-on-surface-variant">Logo, liên hệ, mạng xã hội và SEO mặc định cho toàn website.</p>
      </header>
      <StorageUpload />
      <form action={saveSettings} className="rounded-lg border border-outline-variant bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="brand_name" label="Tên thương hiệu" defaultValue={data?.brand_name ?? "ToolBox Việt"} />
          <Input name="support_phone" label="Số điện thoại" defaultValue={data?.support_phone ?? ""} />
          <Input name="support_email" label="Email hỗ trợ" defaultValue={data?.support_email ?? ""} />
          <Input name="logo_url" label="Logo URL" defaultValue={data?.logo_url ?? ""} />
          <Input name="favicon_url" label="Favicon URL" defaultValue={data?.favicon_url ?? ""} />
          <Input name="zalo_url" label="Zalo URL" defaultValue={data?.zalo_url ?? ""} />
          <Input name="facebook_url" label="Facebook URL" defaultValue={data?.facebook_url ?? ""} />
          <Input name="youtube_url" label="YouTube URL" defaultValue={data?.youtube_url ?? ""} />
          <label className="md:col-span-2">
            <span className="admin-label">Địa chỉ</span>
            <textarea className="admin-input" name="address" defaultValue={data?.address ?? ""} />
          </label>
          <label className="md:col-span-2">
            <span className="admin-label">Copyright</span>
            <textarea className="admin-input" name="copyright_text" defaultValue={data?.copyright_text ?? ""} />
          </label>
          <Input name="default_seo_title" label="Default SEO title" defaultValue={data?.default_seo_title ?? ""} />
          <Input name="default_seo_description" label="Default SEO description" defaultValue={data?.default_seo_description ?? ""} />
        </div>
        <button className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white">
          <Save className="h-4 w-4" />
          Lưu cài đặt
        </button>
      </form>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label>
      <span className="admin-label">{label}</span>
      <input className="admin-input" {...rest} />
    </label>
  );
}
