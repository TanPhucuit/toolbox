import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import type { SiteSettings } from "@/types/database.types";

const logo =
  "https://lh3.googleusercontent.com/aida/AP1WRLuLJMd_E6_TejOQM6VJdENonxjzAaRlyUafPVTiTLrhwtbYYfEWXnUknk0c2pIS9TJ-RJpSa7eWgSYnFEveDzLsxtwlM8AYiLdBVDqVozJtr402tDbsDa57OgGSajiB-P1mRT8RwXr7S6096va7Si2Cm-j-tJw1LPex4RxKBWI9iKMJsmgCVovRol9rDry3AZzKF4R62eDNJdaNdJtfu1gzjgxlkP1VrNSDmPLJGxzpwt_MwJX_mcHxwA";

const defaultBrand = "toolbox giá rẻ";

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const brandName = normalizeBrandName(settings?.brand_name);
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface shadow-sm">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/landing" className="flex items-center gap-3">
          <Image
            src={settings?.logo_url ?? logo}
            alt={brandName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="text-xl font-bold text-primary">{brandName}</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex" aria-label="Điều hướng chính">
          <Link className="rounded-md px-3 py-2 text-sm font-semibold text-primary" href="/">
            Cửa hàng
          </Link>
          <Link
            className="rounded-md px-3 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
            href="/dich-vu"
          >
            Dịch vụ
          </Link>
          <Link
            className="rounded-md px-3 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
            href="/lien-he"
          >
            Liên hệ
          </Link>
        </nav>
        <form action="/" className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            name="q"
            className="h-11 w-64 rounded-full border border-outline-variant bg-white py-2 pl-10 pr-4 text-sm focus:border-primary"
            placeholder="Tìm kiếm tool, tính năng..."
          />
        </form>
      </div>
    </header>
  );
}

function normalizeBrandName(value: string | null | undefined) {
  const text = value?.trim();
  if (!text) return defaultBrand;
  if (text.toLowerCase().includes("toolbox vi") || text.includes("ToolBox")) return defaultBrand;
  return text;
}
