import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Images,
  MonitorCog,
  ShieldCheck,
  Table2,
  Tags,
  Video,
  WandSparkles
} from "lucide-react";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4G6tBHvQSfhu4Mo1VOtlUm2xNCHYligCCKd2Gwmh85WEPQZzeYV3yMJ9UPZSg4YzoaviCcz2ljvs9QQPzsqSSUpMzuSzB-W48ad3GyI3EcTSDOrJi0b5JbLjWAU7Z05S44Y6bb-1_I8Uv0JmzgrhIQxteOp-sRj6AjhbbwkU9dNXh4T0L6FNN9EFjLQP9XNN_dn9dvUQELQ5fxMB8u0c7Qhx_cJeYy6izBWIkNob7A4zK2smT9x1N";

const toolGroups = [
  {
    icon: Images,
    title: "Batch Image Studio",
    text: "Resize ảnh hàng loạt, crop theo chuẩn sàn, chuyển WebP và thêm watermark cho shop online.",
    href: "/tool/batch-image-studio"
  },
  {
    icon: FileText,
    title: "PDF Workflow Pro",
    text: "Gộp, tách, xoay, khóa/mở khóa PDF và trích xuất text hoặc bảng cơ bản ngay trên Windows.",
    href: "/tool/pdf-workflow-pro"
  },
  {
    icon: Table2,
    title: "Excel & CSV Tools",
    text: "Làm sạch CSV tiếng Việt, gộp nhiều file Excel/CSV, chuẩn hóa header và xuất báo cáo lỗi.",
    href: "/?category=excel-du-lieu"
  },
  {
    icon: Video,
    title: "Subtitle Studio",
    text: "Shift phụ đề SRT/VTT theo milliseconds, chuyển định dạng và kiểm tra overlap trước khi xuất.",
    href: "/tool/subtitle-studio"
  },
  {
    icon: WandSparkles,
    title: "File Renamer Pro",
    text: "Đổi tên file hàng loạt có preview, regex, numbering, kiểm tra trùng tên và hỗ trợ undo batch.",
    href: "/tool/file-renamer-pro"
  },
  {
    icon: MonitorCog,
    title: "Dịch vụ tool riêng",
    text: "Làm tool EXE hoặc workflow tự động hóa theo đúng dữ liệu, file mẫu và cách vận hành của bạn.",
    href: "/dich-vu"
  }
];

const reasons = [
  "Giá hợp lý cho shop, văn phòng nhỏ và đội vận hành cần xử lý file đều đặn.",
  "Chạy local trên Windows, hạn chế upload dữ liệu nhạy cảm lên dịch vụ lạ.",
  "Có log, manifest, dry-run hoặc report lỗi ở các tool phù hợp để dễ đối soát.",
  "Có thể tư vấn làm riêng khi tool có sẵn chưa khớp hoàn toàn workflow của bạn."
];

export const metadata: Metadata = {
  title: "toolbox giá rẻ - Tool Windows xử lý file hàng loạt",
  description:
    "toolbox giá rẻ cung cấp tool Windows xử lý ảnh, PDF, CSV, Excel, phụ đề và dịch vụ phát triển tool EXE theo yêu cầu."
};

export default function LandingPage() {
  return (
    <main className="bg-[#f8f9fa]">
      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="container-shell grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#d9dff5] bg-[#f3f6ff] px-3 py-2 text-sm font-bold uppercase text-primary">
              <Tags className="h-4 w-4" />
              Tool Windows giá hợp lý
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#111827] md:text-5xl">
              toolbox giá rẻ cho xử lý file, dữ liệu và công việc lặp lại trên Windows
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
              Bộ công cụ dành cho shop online, văn phòng, kế toán và content team: xử lý ảnh, PDF, CSV, Excel, phụ đề
              và đổi tên file hàng loạt. Khi workflow phức tạp hơn, bạn có thể gửi yêu cầu làm tool riêng.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-bold text-white"
              >
                Xem cửa hàng
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#e5e7eb] bg-white px-6 font-bold text-[#111827]"
              >
                Nhận tư vấn
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#4b5563] sm:grid-cols-2">
              {["Không cần tài khoản khách hàng", "Tập trung tool EXE Windows", "Dữ liệu demo rõ ràng", "Có dịch vụ tùy chỉnh"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]">
            <Image
              src={heroImage}
              alt="Dashboard phần mềm xử lý dữ liệu trên laptop"
              width={960}
              height={640}
              priority
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="container-shell py-14 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase text-primary">Nhóm công cụ chính</p>
          <h2 className="mt-3 text-3xl font-bold text-[#111827]">Các tool xử lý chuyên sâu nhưng dễ dùng</h2>
          <p className="mt-4 leading-7 text-[#4b5563]">
            Nội dung được chỉnh lại từ mẫu landing theo định hướng hiện tại: bán và giới thiệu tool Windows giá hợp lý,
            không thêm trang đội ngũ, quy trình hay bảo hành riêng.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {toolGroups.map((group) => (
            <Link
              key={group.title}
              href={group.href}
              className="rounded-lg border border-[#e5e7eb] bg-white p-6 transition hover:border-primary hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]"
            >
              <group.icon className="mb-5 h-9 w-9 text-primary" />
              <h3 className="text-xl font-bold text-[#111827]">{group.title}</h3>
              <p className="mt-3 leading-7 text-[#4b5563]">{group.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5e7eb] bg-white py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Phù hợp với ý tưởng toolbox giá rẻ</p>
            <h2 className="mt-3 text-3xl font-bold text-[#111827]">Tập trung vào giá trị thực tế thay vì phô diễn</h2>
            <p className="mt-4 leading-7 text-[#4b5563]">
              Landing page này bỏ các phần đội ngũ, quy trình và bảo hành uy tín trong mẫu để tránh làm sai trọng tâm.
              Website vẫn giữ các trang hiện tại: cửa hàng, dịch vụ và liên hệ.
            </p>
          </div>
          <div className="grid gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="flex gap-3 rounded-lg border border-[#e5e7eb] bg-[#f8f9fa] p-4">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <p className="leading-7 text-[#374151]">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14 md:py-20">
        <div className="rounded-lg border border-[#e5e7eb] bg-[#111827] p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Bạn cần tool rẻ, gọn, chạy đúng việc?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#d1d5db]">
                Xem cửa hàng để chọn tool có sẵn, hoặc gửi yêu cầu nếu bạn cần một tool EXE riêng cho file mẫu và quy
                trình nội bộ.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 font-bold text-[#111827]" href="/">
                Cửa hàng
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 font-bold text-white" href="/lien-he">
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
