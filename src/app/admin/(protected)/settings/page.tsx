import { saveSettings } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { StorageUpload } from "@/components/admin/storage-upload";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Cài đặt website</h1>
      <StorageUpload />
      <form action={saveSettings} className="stitch-card grid gap-4 p-6 md:grid-cols-2">
        <Input name="brand_name" label="Brand name" defaultValue={data?.brand_name ?? "ToolBox Việt"} />
        <Input name="logo_url" label="Logo URL" defaultValue={data?.logo_url ?? ""} />
        <Input name="favicon_url" label="Favicon URL" defaultValue={data?.favicon_url ?? ""} />
        <Input name="support_phone" label="Phone" defaultValue={data?.support_phone ?? ""} />
        <Input name="support_email" label="Email" defaultValue={data?.support_email ?? ""} />
        <Input name="zalo_url" label="Zalo URL" defaultValue={data?.zalo_url ?? ""} />
        <Input name="facebook_url" label="Facebook URL" defaultValue={data?.facebook_url ?? ""} />
        <Input name="youtube_url" label="YouTube URL" defaultValue={data?.youtube_url ?? ""} />
        <label className="md:col-span-2"><span className="admin-label">Địa chỉ</span><textarea className="admin-input" name="address" defaultValue={data?.address ?? ""} /></label>
        <label className="md:col-span-2"><span className="admin-label">Copyright</span><textarea className="admin-input" name="copyright_text" defaultValue={data?.copyright_text ?? ""} /></label>
        <Input name="default_seo_title" label="Default SEO title" defaultValue={data?.default_seo_title ?? ""} />
        <Input name="default_seo_description" label="Default SEO description" defaultValue={data?.default_seo_description ?? ""} />
        <button className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-white">Lưu cài đặt</button>
      </form>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return <label><span className="admin-label">{label}</span><input className="admin-input" {...rest} /></label>;
}
