import Link from "next/link";
import { MessageCircle, Search, Wrench } from "lucide-react";
import type { SiteSettings } from "@/types/database.types";

const defaultBrand = "tool box giá rẻ";

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const brandName = normalizeBrandName(settings?.brand_name);
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface shadow-sm">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white"><Wrench className="h-5 w-5" /></span>
          <span className="truncate text-lg font-bold text-primary sm:text-xl">{brandName}</span>
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
            href="/giai-phap"
          >
            Giải pháp
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
        <a href={settings?.zalo_url ?? "https://zalo.me/0583790873"} target="_blank" rel="noreferrer" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" /><span className="hidden lg:inline">Zalo</span>
        </a>
      </div>
    </header>
  );
}

function normalizeBrandName(value: string | null | undefined) {
  const text = value?.trim();
  if (!text) return defaultBrand;
  if (text.toLowerCase().startsWith("toolbox")) return defaultBrand;
  return text;
}
