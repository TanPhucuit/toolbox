import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";
import { getContentBlock, getServices } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, hero] = await Promise.all([getServices(), getContentBlock("services", "hero")]);
  const content = hero?.content as { description?: string; badges?: string[] } | undefined;

  return (
    <main>
      <section className="overflow-hidden border-b border-outline-variant bg-[#0b1534] py-16 text-white md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8fbaff]">Dịch vụ thiết kế riêng</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              {hero?.title ?? "Biến công việc lặp lại thành một quy trình gọn hơn"}
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-[#d4ddf6]">
              {content?.description ?? "Bắt đầu từ file mẫu và cách bạn đang làm thật. Chúng tôi thiết kế website hoặc công cụ vừa quy trình, có điểm kiểm tra và bàn giao để tự vận hành."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-white">
              {(content?.badges ?? ["Xem bản thử trước", "Tối ưu mobile & desktop", "Bàn giao có hướng dẫn"]).map((badge) => (
                <span key={badge} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-10 md:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Nhìn thấy cách giải pháp vận hành</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Hình dung giải pháp trước khi bắt đầu</h2>
          <p className="mt-3 leading-7 text-on-surface-variant">Mỗi dịch vụ được trình bày bằng tình huống, dữ liệu đầu vào và đầu ra để bạn dễ hình dung trước khi trao đổi.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <article key={service.id} className="group overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/dich-vu/${service.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
                  <Image
                    src={service.cover_image_url ?? "/services/custom-tool.png"}
                    alt={`Minh họa ${service.title}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">Minh họa quy trình</span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg transition group-hover:rotate-12">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-outline">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="mt-3 leading-7 text-on-surface-variant">{service.short_description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">Xem phạm vi & quy trình <ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-outline-variant bg-white py-14">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {["Gửi file mẫu và mô tả chỗ đang mất thời gian", "Nhận hướng giải quyết, phạm vi và bản thử", "Kiểm thử với dữ liệu thật rồi mới bàn giao"].map((item, index) => (
            <div key={item} className="flex gap-4 rounded-2xl bg-surface-container-low p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">{index + 1}</span>
              <p className="pt-1 font-semibold leading-6">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-16" id="tu-van">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl bg-[#15113f] p-7 text-white md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#bfc4ff]">Trao đổi miễn phí</p>
            <h2 className="mt-3 text-3xl font-bold">Mô tả đúng một việc đang làm thủ công</h2>
            <p className="mt-4 leading-7 text-[#d9daf5]">Chúng tôi sẽ hỏi thêm về đầu vào, đầu ra và ngoại lệ trước khi đề xuất. Không báo giá mơ hồ khi chưa hiểu quy trình.</p>
            <div className="mt-6 space-y-3 text-sm text-[#eef0ff]">
              {["Phản hồi qua Zalo 0583790873", "Có thể gửi kèm file mẫu", "Không cần chuẩn bị tài liệu kỹ thuật"].map((item) => (
                <p key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8fbaff]" />{item}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-on-surface md:p-8">
            <InquiryForm inquiryType="service" sourcePage="/dich-vu" />
          </div>
        </div>
      </section>
    </main>
  );
}
