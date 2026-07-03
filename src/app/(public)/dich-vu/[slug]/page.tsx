import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";
import { DynamicIcon } from "@/components/shared/icon";
import { getServiceBySlug } from "@/lib/public-data";
import { getSiteUrl } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const title = service.seo_title ?? `${service.title} - ToolBox Việt`;
  const description = service.seo_description ?? service.short_description;
  return {
    title,
    description,
    alternates: { canonical: `${getSiteUrl()}/dich-vu/${service.slug}` },
    openGraph: { title, description }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const features = toTextList(service.features);
  const steps = toTextList(service.process_steps);
  const faq = toFaq(service.faq);
  return (
    <main className="container-shell py-10">
      <section className="mb-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
            <DynamicIcon name={service.icon_name} className="h-9 w-9" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">{service.title}</h1>
          <p className="mb-6 text-lg leading-8 text-on-surface-variant">{service.short_description}</p>
          {service.description_markdown ? (
            <p className="whitespace-pre-line leading-7 text-on-surface-variant">{service.description_markdown}</p>
          ) : null}
        </div>
        <aside className="stitch-card h-fit p-6">
          <p className="text-sm font-semibold text-on-surface-variant">Chi phí</p>
          <p className="mt-1 text-2xl font-bold text-primary">{service.price_label}</p>
          <a href="#tu-van" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white">
            {service.primary_cta_label}
          </a>
        </aside>
      </section>

      <section className="mb-12 grid gap-6 md:grid-cols-2">
        <InfoBlock title="Phạm vi triển khai" items={features} />
        <InfoBlock title="Quy trình làm việc" items={steps} />
      </section>

      {faq.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Câu hỏi thường gặp</h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details key={item.question} className="stitch-card p-5">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-3 text-on-surface-variant">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section id="tu-van" className="mx-auto max-w-2xl rounded-2xl border border-outline-variant bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-center text-2xl font-bold">Yêu cầu tư vấn dịch vụ</h2>
        <p className="mb-8 text-center text-on-surface-variant">Mô tả nhu cầu để chúng tôi đề xuất hướng triển khai phù hợp.</p>
        <InquiryForm inquiryType="service" serviceId={service.id} sourcePage={`/dich-vu/${service.slug}`} />
      </section>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="stitch-card p-6">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <ul className="space-y-3 text-sm text-on-surface-variant">
        {items.map((item) => (
          <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>
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
  if (typeof value === "object" && value !== null && "text" in value) {
    return String(value.text);
  }
  return "";
}

function toFaq(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "object" && item !== null && "question" in item && "answer" in item) {
      return [{ question: String(item.question), answer: String(item.answer) }];
    }
    return [];
  });
}
