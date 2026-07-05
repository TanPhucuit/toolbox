"use client";

import { useMemo, useState } from "react";
import { Check, FileText, ImageIcon, Info, ListPlus, Monitor, Save, Sparkles } from "lucide-react";
import { saveService, saveTool } from "@/lib/admin/actions";
import type { Category, Service, Tool } from "@/types/database.types";

type TabKey = "basic" | "content" | "media" | "advanced";

const tabs: { key: TabKey; label: string; icon: typeof Info }[] = [
  { key: "basic", label: "Cơ bản", icon: Info },
  { key: "content", label: "Nội dung", icon: FileText },
  { key: "media", label: "Media", icon: ImageIcon },
  { key: "advanced", label: "Nâng cao", icon: Monitor }
];

export function ToolForm({ tool, categories }: { tool?: Partial<Tool>; categories: Category[] }) {
  const isEditing = Boolean(tool?.id);
  const [activeTab, setActiveTab] = useState<TabKey>("basic");
  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [form, setForm] = useState(() => ({
    name: tool?.name ?? "",
    slug: tool?.slug ?? "",
    short_description: tool?.short_description ?? "",
    price_type: tool?.price_type ?? "contact",
    price_vnd: tool?.price_vnd ? String(tool.price_vnd) : "",
    old_price_vnd: tool?.old_price_vnd ? String(tool.old_price_vnd) : "",
    price_label: tool?.price_label ?? "",
    primary_cta_type: tool?.primary_cta_type ?? "contact",
    primary_cta_label: tool?.primary_cta_label ?? "",
    primary_cta_url: tool?.primary_cta_url ?? "",
    badge: tool?.badge ?? "",
    category_id: tool?.category_id ?? "",
    cover_image_url: tool?.cover_image_url ?? "",
    icon_url: tool?.icon_url ?? "",
    tutorial_video_url: tool?.tutorial_video_url ?? "",
    demo_url: tool?.demo_url ?? "",
    description_markdown: tool?.description_markdown ?? "",
    features: jsonToLines(tool?.features),
    system_requirements: jsonToLines(tool?.system_requirements),
    changelog: jsonToLines(tool?.changelog),
    faq: jsonToLines(tool?.faq),
    version: tool?.version ?? "",
    license_text: tool?.license_text ?? "",
    file_size: tool?.file_size ?? "",
    compatibility: (tool?.compatibility ?? ["Windows 10", "Windows 11"]).join("\n"),
    language_support: (tool?.language_support ?? ["Tiếng Việt"]).join("\n"),
    seo_title: tool?.seo_title ?? "",
    seo_description: tool?.seo_description ?? "",
    sort_order: String(tool?.sort_order ?? 0),
    is_featured: Boolean(tool?.is_featured),
    is_published: Boolean(tool?.is_published)
  }));

  const priceText = useMemo(() => {
    if (form.price_type === "free") return "Miễn phí";
    if (form.price_type === "contact") return form.price_label || "Liên hệ báo giá";
    return form.price_vnd ? `${Number(form.price_vnd).toLocaleString("vi-VN")} ₫` : "Chưa nhập giá";
  }, [form.price_label, form.price_type, form.price_vnd]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateName(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: slugEdited ? current.slug : toSlug(value)
    }));
  }

  return (
    <form action={saveTool} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      {tool?.id ? <input type="hidden" name="id" value={tool.id} /> : null}
      <div className="rounded-lg border border-outline-variant bg-white">
        <div className="flex gap-2 overflow-x-auto border-b border-outline-variant p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold ${
                activeTab === tab.key ? "bg-secondary-container text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <Panel active={activeTab === "basic"}>
          <SectionIntro title="Thông tin bán hàng" description="Chỉ nhập những gì khách nhìn thấy đầu tiên trên website." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="name" label="Tên tool" value={form.name} onChange={(event) => updateName(event.target.value)} required />
            <Field
              name="slug"
              label="Slug"
              value={form.slug}
              onChange={(event) => {
                setSlugEdited(true);
                update("slug", event.target.value);
              }}
              required
            />
            <Select name="category_id" label="Danh mục" value={form.category_id} onChange={(event) => update("category_id", event.target.value)}>
              <option value="">Không chọn</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Field name="badge" label="Badge ngắn" value={form.badge} onChange={(event) => update("badge", event.target.value)} />
            <Area
              className="md:col-span-2"
              name="short_description"
              label="Mô tả ngắn"
              value={form.short_description}
              onChange={(event) => update("short_description", event.target.value)}
              required
              rows={3}
            />
            <Select name="price_type" label="Cách hiển thị giá" value={form.price_type} onChange={(event) => update("price_type", event.target.value as typeof form.price_type)}>
              <option value="contact">Liên hệ báo giá</option>
              <option value="fixed">Giá cố định</option>
              <option value="free">Miễn phí</option>
            </Select>
            {form.price_type === "fixed" ? (
              <>
                <Field name="price_vnd" label="Giá VND" type="number" value={form.price_vnd} onChange={(event) => update("price_vnd", event.target.value)} />
                <Field name="old_price_vnd" label="Giá cũ VND" type="number" value={form.old_price_vnd} onChange={(event) => update("old_price_vnd", event.target.value)} />
              </>
            ) : (
              <>
                <input type="hidden" name="price_vnd" value="" />
                <input type="hidden" name="old_price_vnd" value="" />
              </>
            )}
            {form.price_type !== "fixed" ? (
              <Field name="price_label" label="Nhãn giá tùy chỉnh" value={form.price_label} onChange={(event) => update("price_label", event.target.value)} />
            ) : (
              <input type="hidden" name="price_label" value="" />
            )}
            <Select
              name="primary_cta_type"
              label="Hành động nút chính"
              value={form.primary_cta_type}
              onChange={(event) => update("primary_cta_type", event.target.value as typeof form.primary_cta_type)}
            >
              <option value="contact">Mở form tư vấn</option>
              <option value="external">Mở URL ngoài</option>
              <option value="detail">Xem chi tiết</option>
            </Select>
            <Field name="primary_cta_label" label="Chữ trên nút" value={form.primary_cta_label} onChange={(event) => update("primary_cta_label", event.target.value)} />
            {form.primary_cta_type === "external" ? (
              <Field name="primary_cta_url" label="URL ngoài" value={form.primary_cta_url} onChange={(event) => update("primary_cta_url", event.target.value)} />
            ) : (
              <input type="hidden" name="primary_cta_url" value="" />
            )}
          </div>
        </Panel>

        <Panel active={activeTab === "content"}>
          <SectionIntro title="Nội dung trang chi tiết" description="Các danh sách có thể nhập mỗi dòng một ý, không cần sửa JSON." />
          <Area name="description_markdown" label="Mô tả dài / Markdown" value={form.description_markdown} onChange={(event) => update("description_markdown", event.target.value)} rows={8} />
          <TextList name="features" label="Tính năng nổi bật" value={form.features} onChange={(value) => update("features", value)} />
          <TextList name="system_requirements" label="Yêu cầu hệ thống" value={form.system_requirements} onChange={(value) => update("system_requirements", value)} />
          <TextList name="changelog" label="Changelog" value={form.changelog} onChange={(value) => update("changelog", value)} />
          <TextList name="faq" label="FAQ" value={form.faq} onChange={(value) => update("faq", value)} />
        </Panel>

        <Panel active={activeTab === "media"}>
          <SectionIntro title="Hình ảnh và liên kết" description="Upload ở khối phía trên trang, sau đó dán URL vào đúng ô cần dùng." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="cover_image_url" label="Cover image URL" value={form.cover_image_url} onChange={(event) => update("cover_image_url", event.target.value)} />
            <Field name="icon_url" label="Icon URL" value={form.icon_url} onChange={(event) => update("icon_url", event.target.value)} />
            <Field name="tutorial_video_url" label="URL video hướng dẫn" value={form.tutorial_video_url} onChange={(event) => update("tutorial_video_url", event.target.value)} />
            <Field name="demo_url" label="Demo URL" value={form.demo_url} onChange={(event) => update("demo_url", event.target.value)} />
          </div>
        </Panel>

        <Panel active={activeTab === "advanced"}>
          <SectionIntro title="Thông số nâng cao" description="Các trường này vẫn có đủ, nhưng được gom lại để tránh rối khi nhập nội dung cơ bản." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="version" label="Phiên bản" value={form.version} onChange={(event) => update("version", event.target.value)} />
            <Field name="license_text" label="License" value={form.license_text} onChange={(event) => update("license_text", event.target.value)} />
            <Field name="file_size" label="Dung lượng" value={form.file_size} onChange={(event) => update("file_size", event.target.value)} />
            <Field name="sort_order" label="Thứ tự" type="number" value={form.sort_order} onChange={(event) => update("sort_order", event.target.value)} />
            <Area name="compatibility" label="Tương thích, mỗi dòng một mục" value={form.compatibility} onChange={(event) => update("compatibility", event.target.value)} rows={4} />
            <Area name="language_support" label="Ngôn ngữ, mỗi dòng một mục" value={form.language_support} onChange={(event) => update("language_support", event.target.value)} rows={4} />
            <Field name="seo_title" label="SEO title" value={form.seo_title} onChange={(event) => update("seo_title", event.target.value)} />
            <Field name="seo_description" label="SEO description" value={form.seo_description} onChange={(event) => update("seo_description", event.target.value)} />
            <CheckField name="is_featured" label="Đánh dấu nổi bật" checked={form.is_featured} onChange={(checked) => update("is_featured", checked)} />
            <CheckField name="is_published" label="Xuất bản ngoài website" checked={form.is_published} onChange={(checked) => update("is_published", checked)} />
          </div>
        </Panel>
      </div>

      <aside className="h-fit rounded-lg border border-outline-variant bg-white p-5 xl:sticky xl:top-6">
        <p className="text-xs font-bold uppercase text-primary">Preview card</p>
        <div className="mt-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
          {form.badge ? <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-primary">{form.badge}</span> : null}
          <h2 className="mt-4 text-2xl font-bold">{form.name || "Tên tool"}</h2>
          <p className="mt-3 min-h-16 text-sm leading-6 text-on-surface-variant">{form.short_description || "Mô tả ngắn sẽ hiển thị tại đây."}</p>
          <p className="mt-4 text-xl font-bold text-primary">{priceText}</p>
          <button type="button" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white">
            {form.primary_cta_label || "Yêu cầu tư vấn"}
          </button>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-on-surface-variant">
          <StatusLine ok={Boolean(form.name && form.slug)} text="Tên và slug" />
          <StatusLine ok={Boolean(form.short_description.length >= 10)} text="Mô tả đủ rõ" />
          <StatusLine ok={form.price_type !== "fixed" || Boolean(form.price_vnd)} text="Giá hợp lệ" />
        </div>
        <button className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white">
          <Save className="h-4 w-4" />
          {isEditing ? "Lưu tool" : "Tạo tool"}
        </button>
      </aside>
    </form>
  );
}

export function ServiceForm({ service }: { service?: Partial<Service> }) {
  const isEditing = Boolean(service?.id);
  const [activeTab, setActiveTab] = useState<TabKey>("basic");
  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [form, setForm] = useState(() => ({
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    short_description: service?.short_description ?? "",
    description_markdown: service?.description_markdown ?? "",
    icon_name: service?.icon_name ?? "",
    cover_image_url: service?.cover_image_url ?? "",
    price_label: service?.price_label ?? "Liên hệ báo giá",
    primary_cta_label: service?.primary_cta_label ?? "Yêu cầu tư vấn",
    features: jsonToLines(service?.features),
    process_steps: jsonToLines(service?.process_steps),
    faq: jsonToLines(service?.faq),
    seo_title: service?.seo_title ?? "",
    seo_description: service?.seo_description ?? "",
    sort_order: String(service?.sort_order ?? 0),
    is_featured: Boolean(service?.is_featured),
    is_published: Boolean(service?.is_published)
  }));

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugEdited ? current.slug : toSlug(value)
    }));
  }

  return (
    <form action={saveService} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      {service?.id ? <input type="hidden" name="id" value={service.id} /> : null}
      <div className="rounded-lg border border-outline-variant bg-white">
        <div className="flex gap-2 overflow-x-auto border-b border-outline-variant p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold ${
                activeTab === tab.key ? "bg-secondary-container text-primary" : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <Panel active={activeTab === "basic"}>
          <SectionIntro title="Thông tin dịch vụ" description="Phần admin cần nhập thường xuyên nhất." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="title" label="Tên dịch vụ" value={form.title} onChange={(event) => updateTitle(event.target.value)} required />
            <Field
              name="slug"
              label="Slug"
              value={form.slug}
              onChange={(event) => {
                setSlugEdited(true);
                update("slug", event.target.value);
              }}
              required
            />
            <Area
              className="md:col-span-2"
              name="short_description"
              label="Mô tả ngắn"
              value={form.short_description}
              onChange={(event) => update("short_description", event.target.value)}
              required
              rows={3}
            />
            <Field name="price_label" label="Nhãn giá" value={form.price_label} onChange={(event) => update("price_label", event.target.value)} />
            <Field name="primary_cta_label" label="Chữ trên nút" value={form.primary_cta_label} onChange={(event) => update("primary_cta_label", event.target.value)} />
          </div>
        </Panel>
        <Panel active={activeTab === "content"}>
          <SectionIntro title="Nội dung triển khai" description="Nhập theo từng dòng để admin dễ thêm/xóa/sắp xếp." />
          <Area name="description_markdown" label="Mô tả dài / Markdown" value={form.description_markdown} onChange={(event) => update("description_markdown", event.target.value)} rows={8} />
          <TextList name="features" label="Lợi ích / tính năng" value={form.features} onChange={(value) => update("features", value)} />
          <TextList name="process_steps" label="Quy trình" value={form.process_steps} onChange={(value) => update("process_steps", value)} />
          <TextList name="faq" label="FAQ" value={form.faq} onChange={(value) => update("faq", value)} />
        </Panel>
        <Panel active={activeTab === "media"}>
          <SectionIntro title="Media" description="Dùng URL sau khi upload ảnh/video từ khối upload trên trang." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="icon_name" label="Tên icon Lucide" value={form.icon_name} onChange={(event) => update("icon_name", event.target.value)} />
            <Field name="cover_image_url" label="Cover image URL" value={form.cover_image_url} onChange={(event) => update("cover_image_url", event.target.value)} />
          </div>
        </Panel>
        <Panel active={activeTab === "advanced"}>
          <SectionIntro title="SEO và trạng thái" description="Chỉ cần chỉnh khi chuẩn bị publish hoặc tối ưu SEO." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field name="seo_title" label="SEO title" value={form.seo_title} onChange={(event) => update("seo_title", event.target.value)} />
            <Field name="seo_description" label="SEO description" value={form.seo_description} onChange={(event) => update("seo_description", event.target.value)} />
            <Field name="sort_order" label="Thứ tự" type="number" value={form.sort_order} onChange={(event) => update("sort_order", event.target.value)} />
            <CheckField name="is_featured" label="Đánh dấu nổi bật" checked={form.is_featured} onChange={(checked) => update("is_featured", checked)} />
            <CheckField name="is_published" label="Xuất bản ngoài website" checked={form.is_published} onChange={(checked) => update("is_published", checked)} />
          </div>
        </Panel>
      </div>
      <aside className="h-fit rounded-lg border border-outline-variant bg-white p-5 xl:sticky xl:top-6">
        <p className="text-xs font-bold uppercase text-primary">Preview dịch vụ</p>
        <div className="mt-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-2xl font-bold">{form.title || "Tên dịch vụ"}</h2>
          <p className="mt-3 min-h-16 text-sm leading-6 text-on-surface-variant">{form.short_description || "Mô tả ngắn sẽ hiển thị tại đây."}</p>
          <p className="mt-4 font-bold text-primary">{form.price_label}</p>
          <button type="button" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white">
            {form.primary_cta_label}
          </button>
        </div>
        <div className="mt-4 grid gap-2 text-sm text-on-surface-variant">
          <StatusLine ok={Boolean(form.title && form.slug)} text="Tên và slug" />
          <StatusLine ok={Boolean(form.short_description.length >= 10)} text="Mô tả đủ rõ" />
          <StatusLine ok={Boolean(form.features.trim())} text="Có danh sách lợi ích" />
        </div>
        <button className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white">
          <Save className="h-4 w-4" />
          {isEditing ? "Lưu dịch vụ" : "Tạo dịch vụ"}
        </button>
      </aside>
    </form>
  );
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={active ? "grid gap-5 p-5 md:p-6" : "hidden"}>{children}</div>;
}

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, className, ...rest } = props;
  return (
    <label className={className ?? "block"}>
      <span className="admin-label">{label}</span>
      <input className="admin-input" {...rest} />
    </label>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string }) {
  const { label, children, ...rest } = props;
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <select className="admin-input" {...rest}>
        {children}
      </select>
    </label>
  );
}

function Area(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  const { label, className, ...rest } = props;
  return (
    <label className={className ?? "block"}>
      <span className="admin-label">{label}</span>
      <textarea className="admin-input" {...rest} />
    </label>
  );
}

function TextList({ name, label, value, onChange }: { name: string; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="admin-label mb-0" htmlFor={name}>{label}</label>
        <button
          type="button"
          onClick={() => onChange(`${value}${value ? "\n" : ""}Mục mới`)}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-outline-variant px-3 text-xs font-semibold"
        >
          <ListPlus className="h-4 w-4" />
          Thêm dòng
        </button>
      </div>
      <textarea id={name} name={name} className="admin-input min-h-32" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function CheckField({ name, label, checked, onChange }: { name: string; label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-lg border border-outline-variant bg-white px-3 py-2">
      <input type="checkbox" name={name} checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
}

function StatusLine({ ok, text }: { ok: boolean; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Check className={`h-4 w-4 ${ok ? "text-primary" : "text-outline"}`} />
      {text}
    </span>
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

function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
