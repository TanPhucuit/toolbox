import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Monitor, PlayCircle, Star } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";
import { formatPrice, formatVnd } from "@/lib/utils/format";
import { getSiteUrl } from "@/lib/supabase/env";
import { getToolBySlug } from "@/lib/public-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  const title = tool.seo_title ?? `${tool.name} - ToolBox Việt`;
  const description = tool.seo_description ?? tool.short_description;
  return {
    title,
    description,
    alternates: { canonical: `${getSiteUrl()}/tool/${tool.slug}` },
    openGraph: { title, description, type: "website" }
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  const features = toTextList(tool.features);
  const requirements = toTextList(tool.system_requirements);
  const changelog = toTextList(tool.changelog);
  const faq = toFaq(tool.faq);
  const cover =
    tool.cover_image_url ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDdLAOrgPZg81SttZMbxPuO6xcZRZ0uRBa3lKyd2StUa9h0K7CMnFafBCYn9xfej14tqBSN_8LAKRsClkHvRsmXY51aG3E_bbMHz394CEpbh9HBL_EH3PkDBtHuzY12kOBtdDtXrpTeFVuZadQxZKbiZPkVBPgR_t06x7zmJOHM_WM3PYHuzINOIzxOdHDulyvZ4uc4SZ-bayLFb0VC-BV3zyqP6WZEDLotZP6hgJxggSgJwUyN0xWs";

  return (
    <main className="container-shell py-8">
      <section className="mb-16 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-outline-variant bg-surface-container shadow-sm">
            <Image src={cover} alt={`Ảnh giao diện ${tool.name}`} fill className="object-cover" priority />
            {tool.badge ? <span className="absolute left-4 top-4 rounded-full bg-error px-3 py-1 text-sm font-bold text-white">{tool.badge}</span> : null}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {(tool.tool_media?.length ? tool.tool_media : [{ id: "cover", url: cover, thumbnail_url: cover, alt_text: tool.name, media_type: "image" }]).slice(0, 4).map((media, index) => (
              <div key={media.id} className={`relative aspect-video overflow-hidden rounded-lg border ${index === 0 ? "border-2 border-primary" : "border-outline-variant opacity-80"}`}>
                {media.media_type === "video" ? (
                  <div className="flex h-full items-center justify-center bg-surface-container-high">
                    <PlayCircle className="h-8 w-8 text-primary" />
                  </div>
                ) : (
                  <Image src={media.thumbnail_url ?? media.url} alt={media.alt_text ?? tool.name} fill className="object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center gap-2 text-tertiary-container">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
            <span className="ml-2 text-sm text-on-surface-variant">(4.8/5 đánh giá)</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-on-surface md:text-4xl">{tool.name}</h1>
          <p className="mb-6 text-base leading-7 text-on-surface-variant">{tool.short_description}</p>
          <div className="mb-6 rounded-lg bg-surface-container-low p-4">
            <p className="text-sm font-semibold text-on-surface-variant">Giá</p>
            <div className="mt-1 flex items-end gap-3">
              {tool.old_price_vnd ? <span className="text-sm text-outline line-through">{formatVnd(tool.old_price_vnd)}</span> : null}
              <span className="text-2xl font-bold text-primary">{formatPrice(tool.price_type, tool.price_vnd, tool.price_label)}</span>
            </div>
          </div>
          <div className="mb-6 grid gap-3 text-sm text-on-surface-variant sm:grid-cols-2">
            <span className="inline-flex items-center gap-2"><Monitor className="h-4 w-4 text-primary" />{tool.compatibility.join(", ")}</span>
            {tool.version ? <span>Phiên bản: {tool.version}</span> : null}
            {tool.file_size ? <span>Dung lượng: {tool.file_size}</span> : null}
            {tool.license_text ? <span>{tool.license_text}</span> : null}
          </div>
          <a href="#contact-section" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container">
            {tool.primary_cta_label ?? "Yêu cầu tư vấn"}
          </a>
        </div>
      </section>

      <section className="mb-16 grid gap-6 lg:grid-cols-3">
        <InfoBlock title="Tính năng" items={features} />
        <InfoBlock title="Yêu cầu hệ thống" items={requirements} />
        <InfoBlock title="Cập nhật" items={changelog.length ? changelog : ["Đang cập nhật changelog."]} />
      </section>

      {tool.tutorial_video_url ? (
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Video hướng dẫn</h2>
          <div className="aspect-video overflow-hidden rounded-2xl border border-outline-variant bg-black">
            <iframe className="h-full w-full" src={tool.tutorial_video_url} title={`Video hướng dẫn ${tool.name}`} allowFullScreen loading="lazy" />
          </div>
        </section>
      ) : null}

      {faq.length ? (
        <section className="mb-16">
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

      <section id="contact-section" className="mb-16 rounded-2xl border border-outline-variant bg-white p-6 shadow-sm md:p-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 text-center text-2xl font-bold">Liên hệ tư vấn giải pháp</h2>
          <p className="mb-8 text-center text-on-surface-variant">Để lại thông tin, đội ngũ kỹ thuật sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
          <InquiryForm inquiryType="tool" toolId={tool.id} sourcePage={`/tool/${tool.slug}`} />
        </div>
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
  return value.map((item) => (typeof item === "string" ? item : item?.text)).filter(Boolean);
}

function toFaq(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item?.question && item?.answer);
}
