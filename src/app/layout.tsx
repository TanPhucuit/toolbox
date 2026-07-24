import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/supabase/env";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "tool box giá rẻ",
  description: "Tool Windows giá hợp lý, tool EXE và dịch vụ phần mềm tùy chỉnh.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
