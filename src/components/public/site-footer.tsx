import Link from "next/link";
import type { SiteSettings } from "@/types/database.types";

const defaultBrand = "tool box giá rẻ";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const brandName = normalizeBrandName(settings?.brand_name);
  return (
    <footer className="mt-auto border-t border-outline-variant bg-white">
      <div className="container-shell grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="mb-3 text-xl font-bold text-on-surface">{brandName}</p>
          <p className="text-sm leading-6 text-on-surface-variant">
            {settings?.copyright_text ??
              "Tool Windows giá hợp lý và dịch vụ phần mềm tùy chỉnh cho shop, văn phòng, kế toán và content team."}
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-on-surface">Liên kết</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link href="/giai-phap">Giải pháp</Link></li>
            <li><Link href="/">Cửa hàng</Link></li>
            <li><Link href="/dich-vu">Dịch vụ</Link></li>
            <li><Link href="/giai-phap">Giải pháp cho doanh nghiệp</Link></li>
            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
            <li><Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-on-surface">Liên hệ</h2>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {settings?.support_phone ? <li>{settings.support_phone}</li> : null}
            {settings?.zalo_url ? <li><a href={settings.zalo_url} target="_blank" rel="noreferrer">Zalo: {settings.support_phone ?? "toolboxgr"}</a></li> : null}
            {settings?.support_email ? <li>{settings.support_email}</li> : null}
            {settings?.address ? <li>{settings.address}</li> : null}
            {!settings?.support_phone && !settings?.support_email && !settings?.address ? (
              <li><Link href="/lien-he">Gửi yêu cầu tư vấn</Link></li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function normalizeBrandName(value: string | null | undefined) {
  const text = value?.trim();
  if (!text) return defaultBrand;
  if (text.toLowerCase().startsWith("toolbox")) return defaultBrand;
  return text;
}
