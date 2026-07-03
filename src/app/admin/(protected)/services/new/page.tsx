import { ServiceForm } from "@/components/admin/tool-form";
import { StorageUpload } from "@/components/admin/storage-upload";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Thêm dịch vụ</h1>
      <StorageUpload />
      <ServiceForm />
    </div>
  );
}
