import Link from "next/link";
import { landingHref, seoLandingPages } from "@/lib/seo-content";

export default function PublicNotFound() {
  return (
    <main className="container-shell py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-normal text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold">Không tìm thấy trang</h1>
        <p className="mt-4 text-lg leading-8 text-on-surface-variant">
          Trang bạn đang mở có thể đã đổi địa chỉ. Bạn có thể quay về trang chủ hoặc chọn nhanh nhóm tool bên dưới.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white"
        >
          Về trang chủ
        </Link>
      </section>
      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {seoLandingPages.map((page) => (
          <Link key={page.slug} href={landingHref(page.slug)} className="stitch-card block p-5 hover:border-primary">
            <p className="font-bold">{page.primaryKeyword}</p>
            <p className="mt-2 text-sm text-on-surface-variant">{page.toolName}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
