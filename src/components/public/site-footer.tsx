import Link from "next/link";
import type { SiteSettings } from "@/types/database.types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="mt-auto border-t border-outline-variant bg-white">
      <div className="container-shell grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="mb-3 text-xl font-bold text-on-surface">
            {settings?.brand_name ?? "ToolBox Việt"}
          </p>
          <p className="text-sm leading-6 text-on-surface-variant">
            {settings?.copyright_text ??
              "Công cụ Windows và phần mềm tùy chỉnh cho doanh nghiệp Việt Nam."}
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-on-surface">Liên kết</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link href="/">Cửa hàng</Link></li>
            <li><Link href="/dich-vu">Dịch vụ</Link></li>
            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
            <li><Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-on-surface">Liên hệ</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {settings?.support_phone ? <li>{settings.support_phone}</li> : null}
            {settings?.support_email ? <li>{settings.support_email}</li> : null}
            {settings?.address ? <li>{settings.address}</li> : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
