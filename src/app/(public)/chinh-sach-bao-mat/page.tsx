import { getContentBlock } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const block = await getContentBlock("privacy", "main");
  const content = block?.content as { body?: string } | undefined;
  return (
    <main className="container-shell max-w-3xl py-12">
      <h1 className="mb-6 text-4xl font-bold">{block?.title ?? "Chính sách bảo mật"}</h1>
      <p className="whitespace-pre-line text-lg leading-8 text-on-surface-variant">
        {content?.body ?? "Nội dung chính sách đang được cập nhật."}
      </p>
    </main>
  );
}
