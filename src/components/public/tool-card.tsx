import Link from "next/link";
import { MessageCircle, Download, ShoppingBag } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";
import { formatPrice, formatVnd } from "@/lib/utils/format";
import type { Category, Tool } from "@/types/database.types";

export function ToolCard({
  tool
}: {
  tool: Tool & { categories?: Pick<Category, "name" | "slug"> };
}) {
  const isContact = tool.price_type === "contact";
  const isFree = tool.price_type === "free";
  return (
    <article className="stitch-card group relative flex min-h-[330px] flex-col p-8 transition-shadow">
      {tool.badge ? (
        <span className="absolute right-4 top-4 rounded bg-tertiary-container px-2 py-1 text-xs font-bold text-on-tertiary">
          {tool.badge}
        </span>
      ) : null}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
        <DynamicIcon name={tool.categories?.slug === "pdf-tai-lieu" ? "FileText" : "Images"} className="h-8 w-8" />
      </div>
      <h2 className="mb-3 text-2xl font-bold text-on-surface">
        <Link href={`/tool/${tool.slug}`}>{tool.name}</Link>
      </h2>
      <p className="mb-8 flex-grow text-base leading-6 text-on-surface-variant">
        {tool.short_description}
      </p>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-outline-variant/50 pt-6">
        <div>
          {tool.old_price_vnd ? (
            <span className="mb-0.5 block text-sm text-outline line-through">
              {formatVnd(tool.old_price_vnd)}
            </span>
          ) : null}
          <span className={isContact ? "text-xl font-bold text-on-surface" : "text-2xl font-bold text-primary"}>
            {formatPrice(tool.price_type, tool.price_vnd, tool.price_label)}
          </span>
        </div>
        <Link
          href={tool.primary_cta_type === "external" && tool.primary_cta_url ? tool.primary_cta_url : `/tool/${tool.slug}#contact-section`}
          rel={tool.primary_cta_type === "external" ? "noopener noreferrer" : undefined}
          className={isContact ? "inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5" : "inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-container"}
        >
          {isFree ? <Download className="h-4 w-4" /> : isContact ? <MessageCircle className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {isFree ? "Tải về" : isContact ? "Tư vấn" : "Mua"}
        </Link>
      </div>
    </article>
  );
}
