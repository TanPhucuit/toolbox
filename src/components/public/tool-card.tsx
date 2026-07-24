import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/shared/icon";
import { formatPrice, formatVnd } from "@/lib/utils/format";
import type { Category, Tool } from "@/types/database.types";

export function ToolCard({
  tool
}: {
  tool: Tool & {
    categories?: Pick<Category, "name" | "slug">;
    tool_media?: { id: string; url: string; thumbnail_url: string | null; alt_text: string | null; media_type: string }[];
  };
}) {
  const images = tool.tool_media?.filter((item) => item.media_type === "image") ?? [];
  const primaryImage = images[0]?.url ?? tool.cover_image_url;
  const secondaryImage = images[1]?.url;
  return (
    <article className="stitch-card group relative flex min-h-[430px] flex-col overflow-hidden transition-shadow">
      {tool.badge ? (
        <span className="absolute right-4 top-4 rounded bg-tertiary-container px-2 py-1 text-xs font-bold text-on-tertiary">
          {tool.badge}
        </span>
      ) : null}
      <Link href={`/tool/${tool.slug}`} className="relative block aspect-video overflow-hidden bg-surface-container">
        {primaryImage ? (
          <Image src={primaryImage} alt={images[0]?.alt_text ?? tool.name} fill className="object-cover transition duration-500 group-hover:scale-[1.025]" />
        ) : (
          <DynamicIcon name={tool.categories?.slug === "tai-lieu-pdf" ? "FileText" : "Images"} className="m-auto h-16 w-16 text-primary" />
        )}
        {secondaryImage ? (
          <span className="absolute bottom-3 right-3 block aspect-video w-28 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg">
            <Image src={secondaryImage} alt="" fill className="object-cover" sizes="112px" />
          </span>
        ) : null}
        {images.length && tool.slug !== "mapping-image-to-excel" ? <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">Ảnh demo thực tế</span> : null}
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
