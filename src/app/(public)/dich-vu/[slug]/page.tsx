import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";
import type { CatalogService } from "@/lib/catalog";
import { getServiceBySlug } from "@/lib/public-data";
import { getSiteUrl } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const title = service.seo_title ?? `${service.title} - tool box giá rẻ`;
  const description = service.seo_description ?? service.short_description;
  return { title, description, alternates: { canonical: `${getSiteUrl()}/dich-vu/${service.slug}` }, openGraph: { title, description } };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = (await getServiceBySlug(slug)) as CatalogService;
  const features = toTextList(service.features);
  const steps = toTextList(service.process_steps);
  const faq = toFaq(service.faq);
  const gallery = service.gallery?.length
    ? service.gallery
    : [{ id: "cover", url: service.cover_image_url ?? "/services/custom-tool.png", alt_text: `Minh họa ${service.title}` }];

  return (
    <main>
      <section className="container-shell py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Thiết kế theo quy trình thật</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-on-surface-variant">{service.short_description}</p>
            {service.description_markdown && service.description_markdown.trim() !== service.short_description.trim() ? (
              <p className="mt-5 whitespace-pre-line leading-7 text-on-surface-variant">{service.description_markdown}</p>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#tu-van" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 font-semibold text-white">{service.primary_cta_label}</a>
              <a href="#quy-trinh" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-outline-variant px-6 font-semibold text-primary">Xem cách triển khai <ArrowDown className="h-4 w-4" /></a>
            </div>
            <div className="mt-6 rounded-2xl border border-outline-variant bg-surface-container-low p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-outline">Chi phí dịch vụ</p>
              <p className="mt-1 text-xl font-bold text-primary">{service.price_label}</p>
              <p className="mt-1 text-sm text-on-surface-variant">Báo theo phạm vi sau khi xem workflow và dữ liệu mẫu.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface-container shadow-xl">
              <Image src={gallery[0].url} alt={gallery[0].alt_text} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 58vw" />
              <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">Ảnh minh họa quy trình</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell pb-12">
        <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-72 overflow-hidden rounded-2xl">
            <Image src={gallery[1]?.url ?? gallery[0].url} alt={gallery[1]?.alt_text ?? gallery[0].alt_text} fill className="object-cover" sizes="(max-width: 768px) 100vw, 65vw" />
          </div>
          <div className="flex min-h-72 flex-col justify-end rounded-2xl bg-[#0b1534] p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8fbaff]">Đầu ra cần rõ</p>
            <h2 className="mt-3 text-3xl font-bold">Có bản thử, tiêu chí kiểm tra và hướng dẫn bàn giao</h2>
            <p className="mt-4 leading-7 text-[#d4ddf6]">Hình minh họa giúp hình dung luồng xử lý; giao diện thật sẽ được thiết kế theo dữ liệu và cách làm của bạn.</p>
          </div>
        </div>
      </section>

      <section id="quy-trinh" className="border-y border-outline-variant bg-white py-14">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <InfoBlock eyebrow="Phạm vi triển khai" title="Giải quyết đúng phần đang vướng" items={features} />
          <InfoBlock eyebrow="Quy trình làm việc" title="Từng bước đều có điểm kiểm tra" items={steps} numbered />
        </div>
      </section>

      {faq.length ? (
        <section className="container-shell py-14">
          <h2 className="mb-6 text-3xl font-bold">Câu hỏi thường gặp</h2>
          <div className="grid gap-3">
            {faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-outline-variant bg-white p-5">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-3 leading-7 text-on-surface-variant">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section id="tu-van" className="container-shell pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-outline-variant bg-white p-7 shadow-sm md:p-10">
          <p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-primary">Gửi nhu cầu</p>
          <h2 className="mt-2 text-center text-3xl font-bold">Cho chúng tôi xem một ví dụ thật</h2>
          <p className="mx-auto mb-8 mt-3 max-w-xl text-center leading-7 text-on-surface-variant">Mô tả việc đang làm, file đầu vào và kết quả mong muốn. Thông tin càng thực tế, đề xuất càng sát.</p>
          <InquiryForm inquiryType="service" serviceId={service.id} sourcePage={`/dich-vu/${service.slug}`} />
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ eyebrow, title, items, numbered = false }: { eyebrow: string; title: string; items: string[]; numbered?: boolean }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={item} className="flex gap-4 rounded-2xl bg-surface-container-low p-4">
            {numbered ? <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">{index + 1}</span> : <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />}
            <span className="pt-1 leading-6 text-on-surface-variant">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function toTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item : readText(item))).filter(Boolean);
}

function readText(value: unknown) {
  return typeof value === "object" && value !== null && "text" in value ? String(value.text) : "";
}

function toFaq(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) =>
    typeof item === "object" && item !== null && "question" in item && "answer" in item
      ? [{ question: String(item.question), answer: String(item.answer) }]
      : []
  );
}
