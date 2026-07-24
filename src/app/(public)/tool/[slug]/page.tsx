import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ExternalLink, Info, Monitor, PlayCircle } from "lucide-react";
import type { CatalogTool } from "@/lib/catalog";
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
  const catalogTool = tool as CatalogTool;
  const cover = tool.cover_image_url!;

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
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{tool.categories?.name}</p>
          <h1 className="mb-4 text-3xl font-bold text-on-surface md:text-4xl">{tool.name}</h1>
          <p className="mb-6 text-base leading-7 text-on-surface-variant">{tool.short_description}</p>
          {catalogTool.availabilityNote ? <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">{catalogTool.availabilityNote}</p> : null}
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
          {tool.demo_url ? <a href={tool.demo_url} target="_blank" rel="noreferrer" className="mb-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary">Mở bản demo <ExternalLink className="h-4 w-4" /></a> : null}
          <a href="#contact-section" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container">
            {tool.primary_cta_label ?? "Yêu cầu tư vấn"}
          </a>
        </div>
      </section>

      <section className="mb-16 overflow-hidden rounded-2xl border border-outline-variant bg-white">
        <div className="grid gap-5 border-b border-outline-variant bg-surface-container-low p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">Tham khảo thị trường</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Nếu bạn đang cân nhắc các nền tảng khác</h2>
            <p className="mt-3 leading-7 text-on-surface-variant">
              Chúng tôi chỉ đặt các mức thuê bao bên dưới làm mốc tham khảo. Tính năng của các sản phẩm không hoàn toàn giống nhau.
            </p>
          </div>
          <div className="inline-flex max-w-sm items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span><strong>Không phải giá của {tool.name}.</strong> Giá sản phẩm đang xem là mức đã ghi ở đầu trang.</span>
          </div>
        </div>

        <div className="divide-y divide-outline-variant/70 px-6 md:px-8">
          {catalogTool.competitors.map((competitor, index) => (
            <div key={competitor.name} className="grid gap-3 py-5 md:grid-cols-[44px_1fr_210px] md:items-center md:gap-5">
              <span className="hidden font-mono text-xs text-outline md:block">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold text-on-surface">{competitor.name}</p>
                  <a href={competitor.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-on-surface-variant underline decoration-outline-variant underline-offset-4">
                    Xem nguồn
                  </a>
                </div>
                <p className="mt-1 text-sm leading-6 text-on-surface-variant">{competitor.note}</p>
              </div>
              <p className="text-sm text-on-surface-variant md:text-right">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-outline">Giá nền tảng khác</span>
                <span className="mt-1 block font-semibold">{competitor.price}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-outline-variant bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-sm text-on-surface-variant">Giá chính thức của sản phẩm này</p>
          <p className="text-xl font-bold text-primary">
            {formatPrice(tool.price_type, tool.price_vnd, tool.price_label)}
            {tool.price_type === "fixed" ? <span className="ml-2 text-sm font-semibold text-on-surface-variant">• mua một lần</span> : null}
          </p>
        </div>
      </section>

      <section className="mb-16 grid gap-8 rounded-2xl bg-[#15113f] p-7 text-white md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-sm font-bold uppercase text-[#bfc4ff]">Hướng dẫn nhanh</p><h2 className="mt-3 text-3xl font-bold">Từ lúc mở app đến lúc có kết quả</h2></div>
        <ol className="grid gap-4">
          {catalogTool.guideSteps.map((step, index) => <li key={step} className="flex gap-4 rounded-xl border border-white/15 bg-white/5 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#3928dc]">{index + 1}</span><span className="pt-1 leading-6 text-[#eef0ff]">{step}</span></li>)}
        </ol>
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
          <div className="mb-6 text-center"><a href="https://zalo.me/0583790873" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0068ff] px-6 font-bold text-white">Nhắn Zalo 0583790873 (toolboxgr)</a></div>
          <InquiryForm inquiryType="tool" sourcePage={`/tool/${tool.slug}`} />
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
