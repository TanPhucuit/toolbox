import { CheckCircle2, Filter } from "lucide-react";
import Link from "next/link";
import { ToolCard } from "@/components/public/tool-card";
import { getCategories, getContentBlock, getTools } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const [tools, categories, hero] = await Promise.all([
    getTools(params),
    getCategories(),
    getContentBlock("home", "hero")
  ]);
  const content = hero?.content as { description?: string; badges?: string[] } | undefined;

  return (
    <main>
      <section className="border-b border-outline-variant bg-white py-16">
        <div className="container-shell text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-normal text-on-surface md:text-5xl">
            {hero?.title ?? "Cửa hàng phần mềm"}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-7 text-on-surface-variant">
            {content?.description ??
              "Các công cụ Windows giúp tự động hóa công việc, xử lý dữ liệu và tiết kiệm thời gian."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-secondary">
            {(content?.badges ?? ["Phần mềm chính chủ", "Cập nhật miễn phí", "Hỗ trợ tiếng Việt", "Tư vấn triển khai"]).map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="mb-8 stitch-card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            <Filter className="h-4 w-4" />
            Lọc danh mục
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
              Tất cả
            </Link>
            {categories.map((category) => (
              <Link
                href={`/?category=${category.slug}`}
                key={category.id}
                className="rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        {tools.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard tool={tool} key={tool.id} />
            ))}
          </div>
        ) : (
          <div className="stitch-card p-10 text-center">
            <h2 className="text-xl font-bold">Không tìm thấy tool phù hợp</h2>
            <p className="mt-2 text-on-surface-variant">Thử đổi từ khóa hoặc chọn danh mục khác.</p>
          </div>
        )}
      </section>
    </main>
  );
}
