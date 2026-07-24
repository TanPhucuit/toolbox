import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";
import { formatPrice, formatVnd } from "@/lib/utils/format";
import type { Category, Tool } from "@/types/database.types";

export function ToolCard({
  tool
}: {
  tool: Tool & { categories?: Pick<Category, "name" | "slug"> };
}) {
  return (
    <article className="stitch-card group relative flex min-h-[430px] flex-col overflow-hidden transition-shadow">
      {tool.badge ? (
        <span className="absolute right-4 top-4 rounded bg-tertiary-container px-2 py-1 text-xs font-bold text-on-tertiary">
          {tool.badge}
        </span>
      ) : null}
      <Link href={`/tool/${tool.slug}`} className="relative block aspect-video overflow-hidden bg-surface-container">
        {tool.cover_image_url ? (
          <Image src={tool.cover_image_url} alt={tool.name} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" />
        ) : (
          <DynamicIcon name={tool.categories?.slug === "tai-lieu-pdf" ? "FileText" : "Images"} className="m-auto h-16 w-16 text-primary" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">{tool.categories?.name}</p>
      <h2 className="mb-3 text-xl font-bold text-on-surface">
        <Link href={`/tool/${tool.slug}`}>{tool.name}</Link>
      </h2>
      <p className="mb-8 flex-grow text-base leading-6 text-on-surface-variant">
        {tool.short_description}
      </p>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-outline-variant/50 pt-5">
        <div>
          {tool.old_price_vnd ? (
            <span className="mb-0.5 block text-sm text-outline line-through">
              {formatVnd(tool.old_price_vnd)}
            </span>
          ) : null}
          <span className={tool.price_type === "contact" ? "text-xl font-bold text-on-surface" : "text-2xl font-bold text-primary"}>
            {formatPrice(tool.price_type, tool.price_vnd, tool.price_label)}
          </span>
        </div>
        <Link
          href={`/tool/${tool.slug}`}
          data-event="product_detail_click"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          Xem chi tiết
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      </div>
    </article>
  );
}
