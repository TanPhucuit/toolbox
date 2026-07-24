import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Code2,
  DatabaseZap,
  FileWarning,
  Globe2,
  MessageCircle,
  MousePointerClick,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Table2,
  Wrench
} from "lucide-react";

export const metadata: Metadata = {
  title: "Giải pháp phần mềm theo yêu cầu - tool box giá rẻ",
  description: "Làm website, tool nhập liệu kế toán, tự động hóa báo cáo và phần mềm theo đúng quy trình thực tế."
};

const subscriptions = [
  { name: "Microsoft 365 Personal", price: "US$99,99/năm", use: "Office và lưu trữ cá nhân" },
  { name: "Adobe Acrobat Pro", price: "US$19,99/tháng", use: "Xử lý PDF chuyên sâu" },
  { name: "Adobe Premiere", price: "US$22,99/tháng", use: "Dựng video chuyên nghiệp" },
  { name: "Quizlet Plus Unlimited", price: "US$44,99/năm", use: "Flashcard và chế độ học" }
];

const pains = [
  {
    icon: Table2,
    title: "Kế toán vẫn copy từng dòng",
    text: "File đến từ nhiều mẫu, tên cột không giống nhau, một lỗi dán nhầm có thể kéo theo cả buổi đối soát.",
    solution: "Tool nhập liệu hàng loạt đọc file mẫu, chuẩn hóa dữ liệu, ghi log dòng lỗi và xuất đúng cấu trúc cần nhập."
  },
  {
    icon: RefreshCcw,
    title: "Báo cáo tháng nào cũng làm lại",
    text: "Tải dữ liệu, lọc, nối bảng, sửa mã, tạo pivot — quy trình lặp lại nhưng vẫn phụ thuộc vào một người nhớ từng bước.",
    solution: "Đóng quy tắc thành workflow có thể chạy lại, kiểm tra ngoại lệ và tạo báo cáo theo cùng một chuẩn."
  },
  {
    icon: Globe2,
    title: "Website đẹp nhưng không ra khách",
    text: "Khách không hiểu bạn bán gì trong 5 giây đầu, nút liên hệ bị giấu và giao diện điện thoại chỉ là bản desktop bị thu nhỏ.",
    solution: "Thiết kế lại thông điệp, luồng đọc và CTA trước; sau đó mới thêm hiệu ứng, form, tracking và tối ưu responsive."
  },
  {
    icon: FileWarning,
    title: "Tool thuê bao vẫn thiếu đúng một bước",
    text: "Phần mềm lớn có hàng trăm chức năng, nhưng bước đặt tên file, map cột hay xuất mẫu riêng của bạn vẫn phải làm tay.",
    solution: "Custom tool chỉ giữ đúng workflow của đội bạn: ít nút hơn, ít nhầm hơn và không phải uốn quy trình theo phần mềm."
  }
];

const services = [
  { icon: Globe2, title: "Website bán hàng & dịch vụ", text: "Landing page, website nhiều trang, form nhận khách, CMS và triển khai tên miền." },
  { icon: DatabaseZap, title: "Tự động hóa dữ liệu", text: "Gộp, làm sạch, map cột, đối soát và xuất báo cáo từ Excel, CSV hoặc PDF." },
  { icon: Table2, title: "Tool cho kế toán", text: "Nhập liệu hàng loạt, kiểm tra chứng từ, chuẩn hóa file và giảm thao tác copy–paste." },
  { icon: Wrench, title: "Custom tool theo nhu cầu", text: "Ứng dụng Windows hoặc web app bám đúng file mẫu, quy tắc và người dùng thực tế." }
];

export default function SolutionsLandingPage() {
  return (
    <main className="overflow-hidden bg-[#070816] text-white">
      <section className="solution-grid relative border-b border-white/10">
        <div className="solution-orb solution-orb-one" />
        <div className="solution-orb solution-orb-two" />
        <div className="container-shell relative z-10 grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="solution-reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-[#c7c9ff] backdrop-blur">
              <Sparkles className="h-4 w-4" /> Không thêm một phần mềm. Bỏ bớt một quy trình rườm rà.
            </div>
            <h1 className="solution-reveal solution-delay-1 mt-7 max-w-4xl text-5xl font-black leading-[1.05] tracking-[-0.04em] md:text-7xl">
              Trả tiền cho nhiều công cụ, công việc vẫn <span className="solution-gradient-text">chưa chạy thẳng.</span>
            </h1>
            <p className="solution-reveal solution-delay-2 mt-7 max-w-2xl text-lg leading-8 text-[#b7bdd7] md:text-xl">
              Chúng tôi làm website và custom tool theo đúng file, đúng bước, đúng người dùng của bạn — để phần mềm gánh việc lặp lại, không bắt bạn học thêm một hệ thống cồng kềnh.
            </p>
            <div className="solution-reveal solution-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#van-de" className="solution-button inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-7 font-bold !text-[#111226]">
                Xem vấn đề chúng tôi xử lý <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://zalo.me/0583790873" target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 font-bold backdrop-blur hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> Zalo 0583790873
              </a>
            </div>
          </div>

          <div className="solution-float relative">
            <div className="rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8adff]">Chi phí tham khảo</p><p className="mt-1 text-xl font-bold">Các gói phổ biến</p></div>
                <CircleDollarSign className="h-7 w-7 text-[#7c71ff]" />
              </div>
              <div className="grid gap-3">
                {subscriptions.map((item, index) => (
                  <div key={item.name} className="solution-price-row flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#111328]/85 p-4" style={{ animationDelay: `${index * 160}ms` }}>
                    <div><p className="font-bold">{item.name}</p><p className="mt-1 text-xs text-[#9299b8]">{item.use}</p></div>
                    <p className="shrink-0 text-sm font-bold text-[#c7c9ff]">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#5548ff] to-[#8b5cf6] p-5">
                <p className="text-sm font-bold text-white/75">Vấn đề không chỉ là giá thuê bao</p>
                <p className="mt-2 text-xl font-bold">Mà là thời gian vẫn mất ở những bước phần mềm không hiểu nghiệp vụ của bạn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0d1d] py-6">
        <div className="solution-marquee">
          <div className="solution-marquee-track">
            {["Website responsive", "Tool nhập liệu kế toán", "Xử lý PDF & Excel", "Tự động hóa báo cáo", "Custom Windows app", "Web app nội bộ", "Website responsive", "Tool nhập liệu kế toán", "Xử lý PDF & Excel", "Tự động hóa báo cáo", "Custom Windows app", "Web app nội bộ"].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[0.16em] text-[#9ba2c1]"><span className="h-1.5 w-1.5 rounded-full bg-[#7167ff]" />{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="van-de" className="container-shell py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8c84ff]">Bắt đầu từ chỗ đang tốn thời gian</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">Không bán “chuyển đổi số”. Chúng tôi sửa đúng đoạn đang làm bạn mệt.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {pains.map((item, index) => (
            <article key={item.title} className="solution-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101226] p-7 md:p-9">
              <span className="absolute right-7 top-6 font-mono text-5xl font-black text-white/[0.035]">0{index + 1}</span>
              <item.icon className="h-9 w-9 text-[#8278ff]" />
              <h3 className="mt-7 text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#9da4c0]">{item.text}</p>
              <div className="mt-7 rounded-2xl border border-[#7268ff]/25 bg-[#5b50ff]/10 p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a9a4ff]">Tool là giải pháp</p>
                <p className="leading-7 text-[#e8e9f4]">{item.solution}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#f6f7ff] py-20 text-[#111226] md:py-28">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#5548ff]">Dịch vụ</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-5xl">Một đội nhỏ, làm đúng thứ bạn cần.</h2>
              <p className="mt-5 leading-7 text-[#5d6278]">Không ép mua hệ thống lớn. Mỗi dự án bắt đầu bằng file mẫu, thao tác thật và tiêu chí nghiệm thu có thể kiểm tra.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((item) => (
                <article key={item.title} className="solution-light-card rounded-[1.5rem] border border-[#dfe2f2] bg-white p-7 shadow-[0_18px_60px_rgba(31,35,70,0.07)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeedff] text-[#5548ff]"><item.icon className="h-6 w-6" /></span>
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#666c82]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: MousePointerClick, label: "01", title: "Gửi workflow thật", text: "Một video quay màn hình, file mẫu hoặc danh sách thao tác đang làm tay." },
            { icon: Code2, label: "02", title: "Chốt bản nhỏ nhất có ích", text: "Phạm vi, đầu vào, đầu ra, ngoại lệ và cách xác nhận kết quả." },
            { icon: ShieldCheck, label: "03", title: "Test rồi mới bàn giao", text: "Chạy với dữ liệu thật, sửa điểm vướng và hướng dẫn người dùng." }
          ].map((step) => (
            <div key={step.label} className="solution-step rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center justify-between"><step.icon className="h-7 w-7 text-[#8c84ff]" /><span className="font-mono text-sm text-[#646b89]">{step.label}</span></div>
              <h3 className="mt-8 text-2xl font-bold">{step.title}</h3><p className="mt-3 leading-7 text-[#9da4c0]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20 md:pb-28">
        <div className="solution-cta relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#4c40ef] via-[#5d48f5] to-[#8b5cf6] p-8 md:p-14">
          <BarChart3 className="absolute -right-8 -top-12 h-64 w-64 text-white/[0.07]" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">Trao đổi thẳng vào công việc</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">Gửi một việc đang làm tay. Chúng tôi nói rõ có đáng làm tool hay không.</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://zalo.me/0583790873" target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-white px-7 font-bold !text-[#3226c9]"><MessageCircle className="h-4 w-4" /> Zalo 0583790873 (toolboxgr)</a>
              <Link href="/lien-he" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/30 px-7 font-bold text-white">Gửi form mô tả <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4 text-sm text-white/80">
              {["Không ép mua", "Nói rõ giới hạn", "Báo giá theo phạm vi"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4" />{item}</span>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
