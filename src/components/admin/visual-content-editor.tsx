"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus, Save, Trash2, Eye, Pencil, ListPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteContentBlock, saveContentBlockInline } from "@/lib/admin/actions";
import type { ContentBlock } from "@/types/database.types";

type EditableBlock = Pick<
  ContentBlock,
  "id" | "page_key" | "section_key" | "title" | "content" | "is_published" | "sort_order"
>;

type Draft = {
  id?: string;
  page_key: string;
  section_key: string;
  title: string;
  body: string;
  description: string;
  list: string;
  is_published: boolean;
  sort_order: number;
};

const pageLabels: Record<string, string> = {
  home: "Trang chủ",
  services: "Dịch vụ",
  contact: "Liên hệ",
  footer: "Footer",
  privacy: "Chính sách",
  terms: "Điều khoản"
};

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  trust: "Lý do tin chọn",
  copy: "Nội dung liên hệ",
  links: "Liên kết footer",
  main: "Nội dung chính"
};

export function VisualContentEditor({ blocks }: { blocks: EditableBlock[] }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(blocks[0]?.id ?? "new");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const drafts = useMemo(() => {
    const mapped = blocks.map(toDraft);
    return [
      ...mapped,
      {
        page_key: "home",
        section_key: "new-section",
        title: "Section mới",
        body: "",
        description: "",
        list: "",
        is_published: true,
        sort_order: nextSort(blocks)
      }
    ];
  }, [blocks]);

  const active = drafts.find((draft) => (draft.id ?? "new") === activeId) ?? drafts[0];

  function submit(formData: FormData) {
    setMessage("");
    startTransition(async () => {
      const result = await saveContentBlockInline(formData);
      setMessage(result.message);
      router.refresh();
    });
  }

  function remove(formData: FormData) {
    setMessage("");
    startTransition(async () => {
      const result = await deleteContentBlock(formData);
      setMessage(result.message);
      setActiveId(blocks[0]?.id ?? "new");
      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_420px]">
      <aside className="rounded-lg border border-outline-variant bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase text-on-surface-variant">Vùng nội dung</h2>
          <button
            type="button"
            onClick={() => setActiveId("new")}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Thêm
          </button>
        </div>
        <div className="grid gap-2">
          {drafts.map((draft) => {
            const id = draft.id ?? "new";
            const isActive = id === activeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveId(id)}
                className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                  isActive
                    ? "border-primary bg-secondary-container text-on-surface"
                    : "border-outline-variant bg-white hover:border-primary"
                }`}
              >
                <span className="block font-bold">{draft.title || "Chưa đặt tiêu đề"}</span>
                <span className="mt-1 block text-xs text-on-surface-variant">
                  {labelFor(draft.page_key, pageLabels)} / {labelFor(draft.section_key, sectionLabels)}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="min-h-[680px] rounded-lg border border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
          <div>
            <p className="text-xs font-bold uppercase text-primary">Preview web</p>
            <h2 className="text-lg font-bold">Click trực tiếp vào vùng cần sửa</h2>
          </div>
          <Eye className="h-5 w-5 text-on-surface-variant" />
        </div>
        <div className="p-4 md:p-6">
          <PreviewBlock draft={active} onEdit={() => setActiveId(active.id ?? "new")} />
        </div>
      </section>

      <section className="rounded-lg border border-outline-variant bg-white p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-primary">Bảng sửa nhanh</p>
            <h2 className="text-xl font-bold">{active.id ? "Sửa nội dung" : "Thêm nội dung"}</h2>
          </div>
          {active.id ? (
            <form action={remove}>
              <input type="hidden" name="id" value={active.id} />
              <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-semibold text-error">
                <Trash2 className="h-4 w-4" />
                Xóa
              </button>
            </form>
          ) : null}
        </div>

        <form key={active.id ?? "new"} action={submit} className="grid gap-4">
          {active.id ? <input type="hidden" name="id" value={active.id} /> : null}
          <div className="grid grid-cols-2 gap-3">
            <Field name="page_key" label="Trang" defaultValue={active.page_key} />
            <Field name="section_key" label="Section" defaultValue={active.section_key} />
          </div>
          <Field name="title" label="Tiêu đề" defaultValue={active.title} />
          <Area name="content_description" label="Mô tả ngắn" defaultValue={active.description} rows={4} />
          <Area name="content_body" label="Nội dung chính" defaultValue={active.body} rows={6} />
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="admin-label mb-0" htmlFor="content_list">Danh sách / badge</label>
              <button
                type="button"
                onClick={() => {
                  const textarea = document.getElementById("content_list") as HTMLTextAreaElement | null;
                  if (textarea) textarea.value = `${textarea.value}${textarea.value ? "\n" : ""}Mục mới`;
                }}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-outline-variant px-3 text-xs font-semibold"
              >
                <ListPlus className="h-4 w-4" />
                Thêm dòng
              </button>
            </div>
            <textarea id="content_list" className="admin-input min-h-32" name="content_list" defaultValue={active.list} />
          </div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <Field name="sort_order" label="Thứ tự" type="number" defaultValue={String(active.sort_order)} />
            <label className="flex min-h-11 items-center gap-2 rounded-lg border border-outline-variant px-3 text-sm font-semibold">
              <input name="is_published" type="checkbox" defaultChecked={active.is_published} />
              Hiển thị
            </label>
          </div>
          <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white disabled:opacity-60" disabled={isPending}>
            <Save className="h-4 w-4" />
            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          {message ? <p className="rounded-lg bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant">{message}</p> : null}
        </form>
      </section>
    </div>
  );
}

function PreviewBlock({ draft, onEdit }: { draft: Draft; onEdit: () => void }) {
  const items = draft.list.split("\n").map((item) => item.trim()).filter(Boolean);
  return (
    <button
      type="button"
      onClick={onEdit}
      className="group block w-full rounded-lg border border-dashed border-outline-variant bg-white p-0 text-left transition hover:border-primary hover:shadow-lg"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="border-b border-outline-variant bg-surface-container-low px-4 py-2 text-xs font-bold uppercase text-on-surface-variant">
          {labelFor(draft.page_key, pageLabels)} / {labelFor(draft.section_key, sectionLabels)}
        </div>
        <div className="p-6 md:p-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline-variant px-3 py-1 text-xs font-bold text-primary">
            <Pencil className="h-3.5 w-3.5" />
            Click để sửa
          </span>
          <h1 className="max-w-3xl text-3xl font-bold text-on-surface md:text-5xl">
            {draft.title || "Tiêu đề đang trống"}
          </h1>
          {draft.description ? (
            <p className="mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">{draft.description}</p>
          ) : null}
          {draft.body ? (
            <p className="mt-5 max-w-3xl whitespace-pre-line rounded-lg bg-surface-container-low p-4 leading-7 text-on-surface">{draft.body}</p>
          ) : null}
          {items.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {items.map((item) => (
                <span key={item} className="rounded-full border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-secondary">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <input className="admin-input" {...rest} />
    </label>
  );
}

function Area(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <textarea className="admin-input" {...rest} />
    </label>
  );
}

function toDraft(block: EditableBlock): Draft {
  const content = asRecord(block.content);
  return {
    id: block.id,
    page_key: block.page_key,
    section_key: block.section_key,
    title: block.title ?? "",
    body: readString(content.body),
    description: readString(content.description),
    list: readList(content),
    is_published: block.is_published,
    sort_order: block.sort_order
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readList(content: Record<string, unknown>) {
  const candidate = Array.isArray(content.badges) ? content.badges : Array.isArray(content.items) ? content.items : [];
  return candidate.map((item) => String(item)).join("\n");
}

function labelFor(value: string, labels: Record<string, string>) {
  return labels[value] ?? value;
}

function nextSort(blocks: EditableBlock[]) {
  return blocks.reduce((max, block) => Math.max(max, block.sort_order), 0) + 10;
}
