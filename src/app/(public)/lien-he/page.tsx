import { InquiryForm } from "@/components/public/inquiry-form";
import { getContentBlock, getSiteSettings } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [settings, block] = await Promise.all([
    getSiteSettings(),
    getContentBlock("contact", "copy")
  ]);
  const content = block?.content as { description?: string } | undefined;
  return (
    <main className="container-shell py-12">
      <section className="grid gap-8 lg:grid-cols-[1fr_640px]">
        <div>
          <h1 className="mb-4 text-4xl font-bold">{block?.title ?? "Liên hệ tư vấn"}</h1>
          <p className="mb-8 text-lg leading-8 text-on-surface-variant">
            {content?.description ?? "Để lại nhu cầu của bạn, đội ngũ kỹ thuật sẽ phản hồi với hướng triển khai phù hợp."}
          </p>
          <div className="stitch-card space-y-3 p-6 text-on-surface-variant">
            {settings?.support_phone ? <p>Điện thoại: {settings.support_phone}</p> : null}
            {settings?.support_email ? <p>Email: {settings.support_email}</p> : null}
            {settings?.address ? <p>Địa chỉ: {settings.address}</p> : null}
          </div>
        </div>
        <div className="stitch-card p-8">
          <InquiryForm inquiryType="general" sourcePage="/lien-he" />
        </div>
      </section>
    </main>
  );
}
