import { saveTool } from "@/lib/admin/actions";
import type { Category, Tool } from "@/types/database.types";

export function ToolForm({ tool, categories }: { tool?: Partial<Tool>; categories: Category[] }) {
  return (
    <form action={saveTool} className="grid gap-6">
      {tool?.id ? <input type="hidden" name="id" value={tool.id} /> : null}
      <Section title="Thông tin chính">
        <Input name="name" label="Tên tool" defaultValue={tool?.name} required />
        <Input name="slug" label="Slug" defaultValue={tool?.slug} required />
        <label className="block">
          <span className="admin-label">Danh mục</span>
          <select className="admin-input" name="category_id" defaultValue={tool?.category_id ?? ""}>
            <option value="">Không chọn</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <Textarea name="short_description" label="Mô tả ngắn" defaultValue={tool?.short_description} required />
        <Textarea name="description_markdown" label="Mô tả Markdown" defaultValue={tool?.description_markdown ?? ""} rows={6} />
      </Section>
      <Section title="Giá và CTA">
        <label className="block">
          <span className="admin-label">Loại giá</span>
          <select className="admin-input" name="price_type" defaultValue={tool?.price_type ?? "contact"}>
            <option value="fixed">Giá cố định</option>
            <option value="contact">Liên hệ báo giá</option>
            <option value="free">Miễn phí</option>
          </select>
        </label>
        <Input name="price_vnd" label="Giá VND" type="number" defaultValue={tool?.price_vnd ?? ""} />
        <Input name="old_price_vnd" label="Giá cũ VND" type="number" defaultValue={tool?.old_price_vnd ?? ""} />
        <Input name="price_label" label="Nhãn giá tùy chỉnh" defaultValue={tool?.price_label ?? ""} />
        <label className="block">
          <span className="admin-label">CTA type</span>
          <select className="admin-input" name="primary_cta_type" defaultValue={tool?.primary_cta_type ?? "contact"}>
            <option value="contact">Mở form tư vấn</option>
            <option value="external">External URL</option>
            <option value="detail">Detail</option>
          </select>
        </label>
        <Input name="primary_cta_label" label="CTA label" defaultValue={tool?.primary_cta_label ?? ""} />
        <Input name="primary_cta_url" label="CTA URL" defaultValue={tool?.primary_cta_url ?? ""} />
      </Section>
      <Section title="Media và thông số">
        <Input name="cover_image_url" label="Cover image URL" defaultValue={tool?.cover_image_url ?? ""} />
        <Input name="icon_url" label="Icon URL" defaultValue={tool?.icon_url ?? ""} />
        <Input name="tutorial_video_url" label="YouTube/video embed URL" defaultValue={tool?.tutorial_video_url ?? ""} />
        <Input name="demo_url" label="Demo URL" defaultValue={tool?.demo_url ?? ""} />
        <Input name="version" label="Phiên bản" defaultValue={tool?.version ?? ""} />
        <Input name="license_text" label="License" defaultValue={tool?.license_text ?? ""} />
        <Input name="file_size" label="Dung lượng" defaultValue={tool?.file_size ?? ""} />
        <Input name="badge" label="Badge" defaultValue={tool?.badge ?? ""} />
        <Textarea name="compatibility" label="Compatibility, mỗi dòng một mục" defaultValue={(tool?.compatibility ?? ["Windows 10", "Windows 11"]).join("\n")} />
        <Textarea name="language_support" label="Ngôn ngữ, mỗi dòng một mục" defaultValue={(tool?.language_support ?? ["Tiếng Việt"]).join("\n")} />
      </Section>
      <Section title="Danh sách nội dung">
        <Textarea name="features" label="Tính năng, mỗi dòng một mục" defaultValue={jsonToLines(tool?.features)} rows={5} />
        <Textarea name="system_requirements" label="Yêu cầu hệ thống, mỗi dòng một mục" defaultValue={jsonToLines(tool?.system_requirements)} rows={4} />
        <Textarea name="changelog" label="Changelog, mỗi dòng một mục" defaultValue={jsonToLines(tool?.changelog)} rows={4} />
        <Textarea name="faq" label="FAQ, mỗi dòng một mục" defaultValue={jsonToLines(tool?.faq)} rows={4} />
      </Section>
      <Section title="SEO và trạng thái">
        <Input name="seo_title" label="SEO title" defaultValue={tool?.seo_title ?? ""} />
        <Textarea name="seo_description" label="SEO description" defaultValue={tool?.seo_description ?? ""} />
        <Input name="sort_order" label="Sort order" type="number" defaultValue={tool?.sort_order ?? 0} />
        <Check name="is_featured" label="Featured" defaultChecked={Boolean(tool?.is_featured)} />
        <Check name="is_published" label="Published" defaultChecked={Boolean(tool?.is_published)} />
      </Section>
      <button className="min-h-11 w-fit rounded-lg bg-primary px-6 py-3 font-semibold text-white">Lưu tool</button>
    </form>
  );
}

export function ServiceForm({ service }: { service?: Record<string, unknown> }) {
  return (
    <form action={async (formData) => {
      "use server";
      const { saveService } = await import("@/lib/admin/actions");
      await saveService(formData);
    }} className="grid gap-6">
      {service?.id ? <input type="hidden" name="id" value={String(service.id)} /> : null}
      <Section title="Thông tin dịch vụ">
        <Input name="title" label="Tên dịch vụ" defaultValue={String(service?.title ?? "")} required />
        <Input name="slug" label="Slug" defaultValue={String(service?.slug ?? "")} required />
        <Textarea name="short_description" label="Mô tả ngắn" defaultValue={String(service?.short_description ?? "")} required />
        <Textarea name="description_markdown" label="Mô tả Markdown" defaultValue={String(service?.description_markdown ?? "")} rows={6} />
        <Input name="icon_name" label="Icon lucide name" defaultValue={String(service?.icon_name ?? "")} />
        <Input name="cover_image_url" label="Cover image URL" defaultValue={String(service?.cover_image_url ?? "")} />
        <Input name="price_label" label="Nhãn giá" defaultValue={String(service?.price_label ?? "Liên hệ báo giá")} />
        <Input name="primary_cta_label" label="CTA label" defaultValue={String(service?.primary_cta_label ?? "Yêu cầu tư vấn")} />
      </Section>
      <Section title="Nội dung">
        <Textarea name="features" label="Features, mỗi dòng một mục" defaultValue={jsonToLines(service?.features)} rows={5} />
        <Textarea name="process_steps" label="Quy trình, mỗi dòng một mục" defaultValue={jsonToLines(service?.process_steps)} rows={5} />
        <Textarea name="faq" label="FAQ, mỗi dòng một mục" defaultValue={jsonToLines(service?.faq)} rows={4} />
        <Input name="seo_title" label="SEO title" defaultValue={String(service?.seo_title ?? "")} />
        <Textarea name="seo_description" label="SEO description" defaultValue={String(service?.seo_description ?? "")} />
        <Input name="sort_order" label="Sort order" type="number" defaultValue={String(service?.sort_order ?? 0)} />
        <Check name="is_featured" label="Featured" defaultChecked={Boolean(service?.is_featured)} />
        <Check name="is_published" label="Published" defaultChecked={Boolean(service?.is_published)} />
      </Section>
      <button className="min-h-11 w-fit rounded-lg bg-primary px-6 py-3 font-semibold text-white">Lưu dịch vụ</button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="stitch-card grid gap-4 p-6 md:grid-cols-2">
      <h2 className="md:col-span-2 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <input className="admin-input" {...rest} />
    </label>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block md:col-span-2">
      <span className="admin-label">{label}</span>
      <textarea className="admin-input min-h-28" {...rest} />
    </label>
  );
}

function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-lg border border-outline-variant bg-white px-3 py-2">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
}

function jsonToLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (typeof item === "object" && item !== null && "text" in item) return String(item.text);
      if (typeof item === "object" && item !== null && "question" in item && "answer" in item) return `${String(item.question)} - ${String(item.answer)}`;
      return "";
    })
    .filter(Boolean)
    .join("\n");
}
