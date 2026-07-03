import { saveContentBlock } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function ContentPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("content_blocks").select("*").order("page_key").order("sort_order");
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Nội dung website</h1>
      <div className="grid gap-6">
        {(data ?? []).map((block) => (
          <form key={block.id} action={saveContentBlock} className="stitch-card grid gap-4 p-6">
            <input type="hidden" name="id" value={block.id} />
            <div className="grid gap-4 md:grid-cols-4">
              <Input name="page_key" label="Page key" defaultValue={block.page_key} />
              <Input name="section_key" label="Section key" defaultValue={block.section_key} />
              <Input name="title" label="Title" defaultValue={block.title ?? ""} />
              <Input name="sort_order" label="Sort" type="number" defaultValue={block.sort_order} />
            </div>
            <label>
              <span className="admin-label">Nội dung chính</span>
              <textarea className="admin-input min-h-32" name="content_body" defaultValue={readContent(block.content, "body")} />
            </label>
            <label>
              <span className="admin-label">Mô tả ngắn</span>
              <textarea className="admin-input min-h-24" name="content_description" defaultValue={readContent(block.content, "description")} />
            </label>
            <label>
              <span className="admin-label">Badges / danh sách, mỗi dòng một mục</span>
              <textarea className="admin-input min-h-28" name="content_list" defaultValue={readList(block.content)} />
            </label>
            <label className="flex items-center gap-2"><input name="is_published" type="checkbox" defaultChecked={block.is_published} /> Published</label>
            <button className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-white">Lưu nội dung</button>
          </form>
        ))}
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return <label><span className="admin-label">{label}</span><input className="admin-input" {...rest} /></label>;
}

function readContent(content: unknown, key: "body" | "description") {
  if (typeof content === "object" && content !== null && key in content) {
    const record = content as Record<string, unknown>;
    return String(record[key] ?? "");
  }
  return "";
}

function readList(content: unknown) {
  if (typeof content !== "object" || content === null) return "";
  if ("badges" in content && Array.isArray(content.badges)) return content.badges.join("\n");
  if ("items" in content && Array.isArray(content.items)) return content.items.join("\n");
  return "";
}
