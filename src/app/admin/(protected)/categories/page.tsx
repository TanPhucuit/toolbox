import { deleteCategory, saveCategory } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Quản lý danh mục</h1>
      <form action={saveCategory} className="stitch-card mb-6 grid gap-4 p-6 md:grid-cols-3">
        <Input name="name" label="Tên" required />
        <Input name="slug" label="Slug" required />
        <Input name="icon_name" label="Icon" />
        <Input name="accent_color" label="Accent color" />
        <Input name="sort_order" label="Sort" type="number" defaultValue="0" />
        <label className="flex min-h-11 items-center gap-2"><input name="is_published" type="checkbox" defaultChecked /> Published</label>
        <label className="md:col-span-3"><span className="admin-label">Mô tả</span><textarea className="admin-input" name="description" /></label>
        <button className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-white">Thêm danh mục</button>
      </form>
      <div className="grid gap-4">
        {(data ?? []).map((category) => (
          <form key={category.id} action={saveCategory} className="stitch-card grid gap-3 p-4 md:grid-cols-7">
            <input type="hidden" name="id" value={category.id} />
            <Input name="name" label="Tên" defaultValue={category.name} />
            <Input name="slug" label="Slug" defaultValue={category.slug} />
            <Input name="icon_name" label="Icon" defaultValue={category.icon_name ?? ""} />
            <Input name="accent_color" label="Màu" defaultValue={category.accent_color ?? ""} />
            <Input name="sort_order" label="Sort" type="number" defaultValue={category.sort_order} />
            <label className="flex items-center gap-2 pt-6"><input name="is_published" type="checkbox" defaultChecked={category.is_published} /> Published</label>
            <div className="flex items-end gap-2">
              <button className="rounded border px-3 py-2">Lưu</button>
              <button formAction={deleteCategory} className="rounded border border-red-200 px-3 py-2 text-error">Xóa</button>
            </div>
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
