import { ArrowRight, CheckCircle2, Filter, MessageCircle } from "lucide-react";
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
      <section className="border-b border-outline-variant bg-white py-14 md:py-20">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">Mua một lần, dùng lâu dài</p>
          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight text-on-surface md:text-6xl">
            {hero?.title ?? "Tool đúng việc, giá không làm bạn phải cân nhắc cả tuần."}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-8 text-on-surface-variant">
            {content?.description ??
              "Từ Word, PDF, clone giọng đến flashcard: chọn đúng công cụ, xem rõ giới hạn rồi mới mua. Không giấu phí gia hạn sau một mức giá mở đầu hấp dẫn."}
          </p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <a href="#san-pham" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-white">Xem sản phẩm <ArrowRight className="h-4 w-4" /></a>
            <a href="https://zalo.me/0583790873" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary px-6 font-bold text-primary"><MessageCircle className="h-4 w-4" /> Zalo 0583790873</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-secondary">
            {(content?.badges ?? ["Giá niêm yết rõ", "Nêu đúng giới hạn", "Hỗ trợ tiếng Việt", "Có bản demo khi sẵn sàng"]).map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
          </div>
          <div className="rounded-2xl bg-[#15113f] p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase text-[#bfc4ff]">Đừng mua theo lời quảng cáo</p>
            <p className="mt-4 text-2xl font-bold leading-9">Hãy xem tool làm được gì, chưa làm được gì và chi phí đối thủ trước.</p>
            <p className="mt-5 leading-7 text-[#d9dcff]">Mỗi trang sản phẩm đều có hướng dẫn, yêu cầu máy và phần so sánh với ít nhất hai nền tảng quen thuộc.</p>
          </div>
        </div>
      </section>

      <section className="container-shell py-10 md:py-16" id="san-pham">
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
