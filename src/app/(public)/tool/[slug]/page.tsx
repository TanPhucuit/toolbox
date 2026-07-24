import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ExternalLink, Monitor, PlayCircle } from "lucide-react";
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

      <section className="mb-16">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">So sánh trước khi mua</p>
          <h2 className="mt-2 text-3xl font-bold">Tính năng tương tự một phần, cách trả tiền thì khác</h2>
          <p className="mt-3 leading-7 text-on-surface-variant">Giá đối thủ được dẫn từ trang chính thức và có thể thay đổi theo khu vực, thuế hoặc chương trình khuyến mãi. Đây không phải bảng khẳng định hai sản phẩm giống hệt nhau.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-primary p-6 text-white shadow-lg">
            <p className="text-sm font-bold uppercase text-blue-100">tool box giá rẻ</p>
            <p className="mt-4 text-3xl font-bold">{formatPrice(tool.price_type, tool.price_vnd, tool.price_label)}</p>
            <p className="mt-3 text-sm leading-6 text-blue-50">{tool.price_type === "fixed" ? "Thanh toán một lần cho bản quyền vĩnh viễn." : "Không thu tiền phần mềm miễn phí hoặc sản phẩm chưa kiểm thử."}</p>
          </div>
          {catalogTool.competitors.map((competitor) => (
            <a key={competitor.name} href={competitor.sourceUrl} target="_blank" rel="noreferrer" className="stitch-card group block p-6 hover:border-primary">
              <div className="flex items-start justify-between gap-3"><p className="font-bold">{competitor.name}</p><ArrowUpRight className="h-4 w-4 text-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
              <p className="mt-4 text-xl font-bold text-primary">{competitor.price}</p>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{competitor.note}</p>
            </a>
          ))}
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
