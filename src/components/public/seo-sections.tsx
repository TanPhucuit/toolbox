import {
  ArrowRight,
  CheckCircle2,
  FileWarning,
  LinkIcon,
  ListChecks,
  Monitor,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import type { FaqItem, SeoLandingPage, SeoLink } from "@/lib/seo-content";
import { guideHref } from "@/lib/seo-content";

export function Breadcrumbs({ items }: { items: SeoLink[] }) {
  return (
    <nav className="mb-6 text-sm text-on-surface-variant" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span>/</span>
            <Link href={item.href} className="font-semibold text-on-surface hover:text-primary">
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SeoHero({ page }: { page: SeoLandingPage }) {
  return (
    <section className="border-b border-outline-variant bg-white py-12 md:py-16">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {page.badges.map((badge) => (
              <FeatureBadge key={badge}>{badge}</FeatureBadge>
            ))}
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-on-surface md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant">
            {page.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/lien-he"
              data-event="inquiry_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container"
            >
              Gửi yêu cầu tư vấn
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={guideHref(page.relatedGuides[0])}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/5"
            >
              Xem hướng dẫn
            </Link>
          </div>
        </div>
        <div className="stitch-card p-6">
          <p className="text-sm font-bold uppercase tracking-normal text-primary">{page.toolName}</p>
          <h2 className="mt-3 text-2xl font-bold">Tool Windows xử lý file hàng loạt</h2>
          <p className="mt-3 leading-7 text-on-surface-variant">
            Chạy trên máy bạn, hạn chế upload dữ liệu nhạy cảm và bám workflow người Việt.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-on-surface-variant">
            {page.secondaryKeywords.slice(0, 4).map((keyword) => (
              <span key={keyword} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold text-secondary">
      <CheckCircle2 className="h-4 w-4 text-primary" />
      {children}
    </span>
  );
}

export function PainPointSection({ items }: { items: string[] }) {
  return (
    <Section title="Vấn đề thường gặp" icon={<FileWarning className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="stitch-card p-5">
            <p className="leading-7 text-on-surface-variant">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ToolFeatureGrid({ items }: { items: string[] }) {
  return (
    <Section title="Bạn cần gì, tool xử lý thế nào" icon={<ListChecks className="h-5 w-5" />}>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="stitch-card p-5">
            <p className="leading-7 text-on-surface-variant">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorksSection({ steps }: { steps: string[] }) {
  return (
    <Section title="Cách làm nhanh" icon={<Monitor className="h-5 w-5" />}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <ol className="stitch-card space-y-4 p-6">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-1 leading-7 text-on-surface-variant">{step}</span>
            </li>
          ))}
        </ol>
        <div className="stitch-card flex min-h-64 flex-col items-center justify-center border-dashed p-6 text-center">
          <Monitor className="mb-4 h-12 w-12 text-primary" />
          <p className="text-lg font-bold">Placeholder ảnh/video hướng dẫn</p>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            Khu vực này sẵn sàng thay bằng screenshot giao diện thật khi có asset.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function UseCaseSection({ items }: { items: string[] }) {
  return (
    <Section title="Tình huống sử dụng thực tế" icon={<LinkIcon className="h-5 w-5" />}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="stitch-card p-5">
            <p className="leading-7 text-on-surface-variant">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function TrustSafetyBlock({ items }: { items: string[] }) {
  return (
    <Section title="An toàn dữ liệu và kiểm soát kết quả" icon={<ShieldCheck className="h-5 w-5" />}>
      <div className="stitch-card grid gap-4 p-6 md:grid-cols-2">
        {items.map((item) => (
          <p key={item} className="flex gap-3 leading-7 text-on-surface-variant">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
            {item}
          </p>
        ))}
      </div>
    </Section>
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <Section title="Câu hỏi thường gặp">
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="stitch-card p-5">
            <summary className="cursor-pointer font-semibold">{item.question}</summary>
            <p className="mt-3 leading-7 text-on-surface-variant">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function RelatedGuides({ guides }: { guides: SeoLink[] }) {
  return (
    <Section title="Hướng dẫn liên quan">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="stitch-card block p-5 hover:border-primary">
            <p className="font-bold">{guide.title}</p>
            <p className="mt-2 text-sm text-on-surface-variant">Đọc hướng dẫn từng bước</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function RelatedTools({ tools }: { tools: SeoLink[] }) {
  if (!tools.length) return null;
  return (
    <Section title="Tool liên quan">
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="stitch-card block p-5 hover:border-primary">
            <p className="font-bold">{tool.title}</p>
            <p className="mt-2 text-sm text-on-surface-variant">Xem workflow liên quan</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta({ title = "Cần chạy thử với dữ liệu thật?" }: { title?: string }) {
  return (
    <section className="rounded-2xl bg-primary px-6 py-10 text-center text-white md:px-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/90">
        Gửi nhu cầu xử lý file của bạn. ToolBox Việt sẽ tư vấn bản dùng thử hoặc hướng triển khai phù hợp, không tạo checkout hay tài khoản khách hàng trên website.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/lien-he"
          data-event="inquiry_click"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-primary"
        >
          Gửi yêu cầu tư vấn
        </Link>
        <Link
          href="/lien-he"
          data-event="zalo_click"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-6 py-3 font-semibold text-white"
        >
          Nhắn Zalo để nhận hỗ trợ
        </Link>
      </div>
    </section>
  );
}

export function Section({
  title,
  icon,
  children
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 md:py-10">
      <div className="mb-5 flex items-center gap-3">
        {icon ? <span className="text-primary">{icon}</span> : null}
        <h2 className="text-2xl font-bold text-on-surface md:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
