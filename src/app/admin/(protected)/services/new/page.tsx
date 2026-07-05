import { StorageUpload } from "@/components/admin/storage-upload";
import { ServiceForm } from "@/components/admin/tool-form";

export default function NewServicePage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Tạo dịch vụ</p>
        <h1 className="mt-2 text-3xl font-bold">Thêm dịch vụ</h1>
        <p className="mt-2 text-on-surface-variant">Nhập nội dung theo từng nhóm, xem preview trước khi lưu.</p>
      </header>
      <StorageUpload />
      <ServiceForm />
    </div>
  );
}
