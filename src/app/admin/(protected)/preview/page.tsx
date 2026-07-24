import { SitePreview } from "@/components/admin/site-preview";
import { getServices, getTools } from "@/lib/public-data";

export default async function AdminPreviewPage() {
  const [tools, services] = await Promise.all([getTools(), getServices()]);
  const routes = [
    { label: "Trang chủ / Cửa hàng", path: "/" },
    { label: "Giải pháp", path: "/giai-phap" },
    { label: "Dịch vụ", path: "/dich-vu" },
    { label: "Liên hệ", path: "/lien-he" },
    ...tools.map((tool) => ({ label: `Tool: ${tool.name}`, path: `/tool/${tool.slug}` })),
    ...services.map((service) => ({ label: `Dịch vụ: ${service.title}`, path: `/dich-vu/${service.slug}` }))
  ];

  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Preview toàn website</p>
        <h1 className="mt-2 text-3xl font-bold">Kiểm tra trước khi công bố</h1>
        <p className="mt-2 max-w-3xl text-on-surface-variant">Chọn bất kỳ trang nào, đổi nhanh giữa desktop và mobile. Sau khi lưu nội dung hoặc ảnh, bấm “Tải lại” để kiểm tra đúng giao diện public.</p>
      </header>
      <SitePreview routes={routes} />
    </div>
  );
}
