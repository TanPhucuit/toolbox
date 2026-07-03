import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  FaqSection,
  FinalCta,
  RelatedTools,
  Section
} from "@/components/public/seo-sections";
import {
  getGuideBySlug,
  getLandingBySlug,
  guideHref,
  guidePages,
  landingHref
} from "@/lib/seo-content";
import { getSiteUrl } from "@/lib/supabase/env";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${getSiteUrl()}${guideHref(guide.slug)}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description
    }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const landing = getLandingBySlug(guide.landingSlug);
  const relatedTools = guide.relatedToolSlugs
    .map((toolSlug) => {
      const page = getLandingBySlug(toolSlug);
      if (page) return { title: page.toolName, href: landingHref(page.slug) };
      if (toolSlug.startsWith("dich-vu/")) return { title: "Dịch vụ phần mềm tùy chỉnh", href: `/${toolSlug}` };
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const base = getSiteUrl();
  const currentUrl = `${base}${guideHref(guide.slug)}`;
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.h1,
    description: guide.description,
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step
    }))
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    mainEntityOfPage: currentUrl,
    publisher: { "@type": "Organization", name: "ToolBox Việt" }
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <main className="container-shell py-10">
      <Breadcrumbs
        items={[
          { title: "Hướng dẫn", href: guideHref(guide.slug) },
          { title: guide.h1, href: guideHref(guide.slug) }
        ]}
      />
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-normal text-primary">Hướng dẫn ToolBox Việt</p>
          <h1 className="text-4xl font-bold tracking-normal text-on-surface md:text-5xl">{guide.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-on-surface-variant">{guide.description}</p>
          {landing ? (
            <Link
              href={landingHref(landing.slug)}
              data-event="pricing_view"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container"
            >
              Xem {landing.toolName}
            </Link>
          ) : null}
        </header>

        <Section title="Vấn đề">
          <div className="stitch-card p-6">
            <p className="leading-8 text-on-surface-variant">{guide.problem}</p>
          </div>
        </Section>

        <Section title="Cách làm nhanh">
          <div className="stitch-card p-6">
            <p className="leading-8 text-on-surface-variant">{guide.quickAnswer}</p>
          </div>
        </Section>

        <Section title="Các bước cụ thể">
          <ol className="stitch-card space-y-4 p-6">
            {guide.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 leading-7 text-on-surface-variant">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Ảnh hoặc video minh họa">
          <div className="stitch-card flex min-h-64 flex-col items-center justify-center border-dashed p-6 text-center">
            <p className="text-lg font-bold">Placeholder screenshot/video</p>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Khi có ảnh giao diện thật, đặt asset tại đây với alt mô tả đúng thao tác trong bài.
            </p>
          </div>
        </Section>

        {landing ? (
          <div className="py-8">
            <FinalCta title={`Cần xử lý bằng ${landing.toolName}?`} />
          </div>
        ) : null}

        <RelatedTools tools={relatedTools} />
        <FaqSection items={guide.faqs} />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, howToJsonLd, faqJsonLd]) }}
      />
    </main>
  );
}
