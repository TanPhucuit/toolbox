import Link from "next/link";
import { FileText, Inbox, Layers3, LayoutDashboard, LogOut, MonitorPlay, Package, Settings, Tags } from "lucide-react";
import { logoutAdmin } from "@/lib/admin/actions";

const nav = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/preview", label: "Preview website", icon: MonitorPlay },
  { href: "/admin/tools", label: "Tools", icon: Package },
  { href: "/admin/services", label: "Dịch vụ", icon: Layers3 },
  { href: "/admin/categories", label: "Danh mục", icon: Tags },
  { href: "/admin/content", label: "Sửa nội dung", icon: FileText },
  { href: "/admin/inquiries", label: "Yêu cầu", icon: Inbox },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-low">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-outline-variant bg-white p-4 lg:block">
        <Link href="/admin" className="mb-6 block rounded-lg px-3 py-2 text-xl font-bold text-primary">
          ToolBox Admin
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAdmin} className="absolute bottom-4 left-4 right-4">
          <button className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-error hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </form>
      </aside>
      <div className="lg:pl-72">
        <div className="sticky top-0 z-30 border-b border-outline-variant bg-white p-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-outline-variant px-3 text-sm font-semibold"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
