import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  FaqSection,
  FinalCta,
  HowItWorksSection,
  PainPointSection,
  RelatedGuides,
  RelatedTools,
  SeoHero,
  ToolFeatureGrid,
  TrustSafetyBlock,
  UseCaseSection
} from "@/components/public/seo-sections";
import {
  getGuideBySlug,
  getLandingBySlug,
  guideHref,
  landingHref,
  seoLandingPages
} from "@/lib/seo-content";
import { getSiteUrl } from "@/lib/supabase/env";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingBySlug(slug);
  if (!page) return {};
  const url = `${getSiteUrl()}${landingHref(page.slug)}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description
    }
  };
}

export default async function SeoLandingRoute({ params }: Props) {
  const { slug } = await params;
  const page = getLandingBySlug(slug);
  if (!page) notFound();

  const relatedGuides = page.relatedGuides
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide))
    .map((guide) => ({ title: guide.title.replace(" - ToolBox Việt", ""), href: guideHref(guide.slug) }));
  const base = getSiteUrl();
  const currentUrl = `${base}${landingHref(page.slug)}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.toolName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows",
    url: currentUrl,
    description: page.description,
    offers: { "@type": "Offer", priceCurrency: "VND", availability: "https://schema.org/InStock" }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: page.h1, item: currentUrl }
    ]
  };

  return (
    <main>
      <SeoHero page={page} />
      <div className="container-shell py-8">
        <Breadcrumbs items={[{ title: page.primaryKeyword, href: landingHref(page.slug) }]} />
        <PainPointSection items={page.painPoints} />
        <ToolFeatureGrid items={page.featureMappings} />
        <HowItWorksSection steps={page.steps} />
        <div className="py-6">
          <FinalCta title={`Muốn dùng thử ${page.toolName} với file thật?`} />
        </div>
        <UseCaseSection items={page.useCases} />
        <TrustSafetyBlock items={page.trustItems} />
        <FaqSection items={page.faqs} />
        <RelatedGuides guides={relatedGuides} />
        <RelatedTools tools={page.relatedTools} />
        <div className="py-8">
          <FinalCta />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareJsonLd, faqJsonLd, breadcrumbJsonLd]) }}
      />
    </main>
  );
}
