import { CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/shared/icon";
import { InquiryForm } from "@/components/public/inquiry-form";
import { getContentBlock, getServices } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, hero] = await Promise.all([
    getServices(),
    getContentBlock("services", "hero")
  ]);
  const content = hero?.content as { description?: string; badges?: string[] } | undefined;
  return (
    <main>
      <section className="border-b border-outline-variant bg-white py-16">
        <div className="container-shell text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {hero?.title ?? "Dịch vụ & Giải pháp Tùy chỉnh"}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-7 text-on-surface-variant">
            {content?.description ??
              "Giải pháp tự động hóa tùy chỉnh và phát triển phần mềm chuyên biệt cho doanh nghiệp của bạn."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-secondary">
            {(content?.badges ?? ["Thiết kế theo yêu cầu", "Tối ưu quy trình", "Hỗ trợ tận tâm"]).map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="stitch-card flex flex-col p-6 text-center transition-shadow">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
                <DynamicIcon name={service.icon_name} className="h-9 w-9" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-on-surface">
                <Link href={`/dich-vu/${service.slug}`}>{service.title}</Link>
              </h2>
              <p className="mb-6 flex-grow text-sm leading-6 text-on-surface-variant">
                {service.short_description}
              </p>
              <Link
                href={`/dich-vu/${service.slug}#tu-van`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-6 py-2 text-sm font-semibold text-primary hover:bg-surface-container"
              >
                <Mail className="h-4 w-4" />
                {service.price_label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-outline-variant bg-white py-16" id="tu-van">
        <div className="container-shell max-w-2xl">
          <div className="stitch-card p-8">
            <h2 className="mb-2 text-center text-2xl font-bold">Để lại thông tin tư vấn</h2>
            <p className="mb-8 text-center text-sm text-on-surface-variant">
              Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
            </p>
            <InquiryForm inquiryType="service" sourcePage="/dich-vu" />
          </div>
        </div>
      </section>
    </main>
  );
}
