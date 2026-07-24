export type FaqItem = { question: string; answer: string };
export type SeoLink = { title: string; href: string };
export type SeoLandingPage = {
  slug: string;
  toolName: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  subheadline: string;
  badges: string[];
  painPoints: string[];
  featureMappings: string[];
  steps: string[];
  useCases: string[];
  trustItems: string[];
  faqs: FaqItem[];
  relatedGuides: string[];
  relatedTools: SeoLink[];
};
export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  problem: string;
  quickAnswer: string;
  steps: string[];
  landingSlug: string;
  relatedToolSlugs: string[];
  faqs: FaqItem[];
};

// Các landing mock cũ đã được gỡ. Nội dung sản phẩm thật nằm trong catalog.ts.
export const seoLandingPages: SeoLandingPage[] = [];
export const guidePages: GuidePage[] = [];
export function getLandingBySlug(slug: string) { return seoLandingPages.find((page) => page.slug === slug); }
export function getGuideBySlug(slug: string) { return guidePages.find((page) => page.slug === slug); }
export function landingHref(slug: string) { return `/${slug}`; }
export function guideHref(slug: string) { return `/huong-dan/${slug}`; }
