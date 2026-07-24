import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Code2,
  FileWarning,
  Globe2,
  MessageCircle,
  MousePointerClick,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Table2
} from "lucide-react";
import { LandingPointerGlow, PremiumTilt } from "@/components/public/landing-effects";

export const metadata: Metadata = {
  title: "Giải pháp phần mềm theo yêu cầu - tool box giá rẻ",
  description: "Làm website, tool nhập liệu kế toán, tự động hóa báo cáo và phần mềm theo đúng quy trình thực tế."
};

const subscriptions = [
  { name: "Microsoft 365 Personal", price: "US$99,99/năm" },
  { name: "Adobe Acrobat Pro", price: "US$19,99/tháng" },
  { name: "Adobe Premiere", price: "US$22,99/tháng" },
  { name: "Quizlet Plus Unlimited", price: "US$44,99/năm" }
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
  { image: "/services/website-design.png", title: "Website bán hàng & dịch vụ", text: "Landing page, website nhiều trang, form nhận khách, CMS và triển khai tên miền." },
  { image: "/services/report-automation.png", title: "Tự động hóa dữ liệu", text: "Gộp, làm sạch, map cột, đối soát và xuất báo cáo từ Excel, CSV hoặc PDF." },
  { image: "/services/accounting-automation.png", title: "Tool cho kế toán", text: "Nhập liệu hàng loạt, kiểm tra chứng từ, chuẩn hóa file và giảm thao tác copy–paste." },
  { image: "/services/custom-tool.png", title: "Custom tool theo nhu cầu", text: "Ứng dụng Windows hoặc web app bám đúng file mẫu, quy tắc và người dùng thực tế." }
];

export default function SolutionsLandingPage() {
  return (
    <main className="relative overflow-hidden bg-[#070816] text-white">
      <LandingPointerGlow />
      <section className="solution-grid landing-hero-shell relative border-b border-white/10">
        <div className="landing-noise" aria-hidden="true" />
        <div className="landing-beam landing-beam-one" aria-hidden="true" />
        <div className="landing-beam landing-beam-two" aria-hidden="true" />
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

          <div className="solution-float landing-hologram relative">
            <div className="landing-orbit landing-orbit-one" aria-hidden="true" />
            <div className="landing-orbit landing-orbit-two" aria-hidden="true" />
            <div className="landing-data-chip landing-data-chip-one">INPUT 07</div>
            <div className="landing-data-chip landing-data-chip-two">VALIDATED</div>
            <div className="landing-scan overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8adff]">Một quy trình thường gặp</p>
                    <p className="mt-2 text-2xl font-bold">Dữ liệu đi qua nhiều chặng</p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">
                    <span className="landing-live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Workflow live
                  </span>
                </div>
                <div className="landing-pipeline mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-sm font-bold">
                  <span className="landing-pipeline-node rounded-xl border border-white/10 bg-[#111328]/85 px-3 py-4">File đầu vào</span>
                  <span className="landing-flow-line"><ArrowRight className="h-4 w-4 text-[#777e9d]" /></span>
                  <span className="landing-pipeline-node rounded-xl border border-white/10 bg-[#111328]/85 px-3 py-4">Chuẩn hóa</span>
                  <span className="landing-flow-line landing-flow-delay"><ArrowRight className="h-4 w-4 text-[#777e9d]" /></span>
                  <span className="landing-pipeline-node rounded-xl border border-white/10 bg-[#111328]/85 px-3 py-4">Đầu ra</span>
                </div>
              </div>

              <div className="grid gap-3 p-6 md:grid-cols-2 md:p-7">
                {[
                  ["Copy – paste lặp lại", "Dễ lệch cột hoặc sai định dạng"],
                  ["Phụ thuộc một người", "Khó bàn giao khi quy trình chỉ nằm trong trí nhớ"],
                  ["Nhiều file trung gian", "Mất dấu phiên bản nào là bản cuối"],
                  ["Đã mua phần mềm", "Vẫn thiếu đúng bước nghiệp vụ riêng"]
                ].map(([title, text], index) => (
                  <div key={title} className="solution-price-row rounded-xl border border-white/10 bg-[#111328]/65 p-4" style={{ animationDelay: `${index * 120}ms` }}>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#9299b8]">{text}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 bg-[#0d0f21]/80 px-6 py-4 md:px-7">
                <div className="flex items-start gap-3">
                  <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-[#777e9d]" />
                  <div className="text-[11px] leading-5 text-[#777e9d]">
                    <p className="font-bold uppercase tracking-[0.14em]">Giá tham khảo của nền tảng khác — không phải báo giá dịch vụ của chúng tôi</p>
                    <p className="mt-1">
                      {subscriptions.map((item) => `${item.name}: ${item.price}`).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-shell relative z-10 -mt-6 pb-10">
          <div className="landing-command-dock grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl sm:grid-cols-3">
            {[
              ["01 / INPUT", "File mẫu, quy tắc, ngoại lệ"],
              ["02 / LOGIC", "Đóng gói thành luồng kiểm tra được"],
              ["03 / OUTPUT", "Đúng mẫu, có log, dễ bàn giao"]
            ].map(([label, text]) => (
              <div key={label} className="bg-[#0c0e21]/90 px-5 py-4">
                <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#8278ff]">{label}</p>
                <p className="mt-1 text-sm font-semibold text-[#dfe1f2]">{text}</p>
              </div>
            ))}
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

      <section className="border-b border-white/10 bg-[#090a19]">
        <div className="container-shell grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            ["01", "Workflow thật"],
            ["100%", "Responsive"],
            ["Local", "Ưu tiên dữ liệu"],
            ["Rõ", "Phạm vi & giới hạn"]
          ].map(([value, label]) => (
            <div key={label} className="landing-stat px-4 py-8 text-center md:py-10">
              <p className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">{value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#777e9d]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="van-de" className="container-shell py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8c84ff]">Bắt đầu từ chỗ đang tốn thời gian</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">Không bán “chuyển đổi số”. Chúng tôi sửa đúng đoạn đang làm bạn mệt.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {pains.map((item, index) => (
            <article key={item.title} className="solution-card landing-scroll-reveal group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101226] p-7 md:p-9">
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
              {services.map((item, index) => (
                <PremiumTilt key={item.title} className={index % 2 ? "sm:translate-y-8" : ""}>
                  <article className="solution-light-card h-full overflow-hidden rounded-[1.5rem] border border-[#dfe2f2] bg-white shadow-[0_18px_60px_rgba(31,35,70,0.07)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.image} alt={`Minh họa ${item.title}`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 640px) 100vw, 35vw" />
                      <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">0{index + 1} / Service</span>
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 leading-7 text-[#666c82]">{item.text}</p>
                    </div>
                  </article>
                </PremiumTilt>
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
