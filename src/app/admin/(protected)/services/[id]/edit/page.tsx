import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/tool-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { StorageUpload } from "@/components/admin/storage-upload";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Sửa dịch vụ</h1>
      <StorageUpload />
      <ServiceForm service={data} />
    </div>
  );
}
