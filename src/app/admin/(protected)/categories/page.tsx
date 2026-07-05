import { Plus, Save, Trash2 } from "lucide-react";
import { deleteCategory, saveCategory } from "@/lib/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  const categories = data ?? [];

  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-bold uppercase text-primary">Nhóm sản phẩm</p>
        <h1 className="mt-2 text-3xl font-bold">Danh mục</h1>
        <p className="mt-2 text-on-surface-variant">Quản lý nhóm lọc ngoài trang chủ. Mỗi danh mục có màu nhấn, icon và trạng thái hiển thị riêng.</p>
      </header>

      <details className="rounded-lg border border-outline-variant bg-white p-4" open>
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-bold">
          <Plus className="h-4 w-4 text-primary" />
          Thêm danh mục mới
        </summary>
        <form action={saveCategory} className="mt-4 grid gap-4 md:grid-cols-3">
          <Input name="name" label="Tên" required />
          <Input name="slug" label="Slug" required />
          <Input name="icon_name" label="Icon" />
          <Input name="accent_color" label="Màu nhấn" placeholder="#0058be" />
          <Input name="sort_order" label="Thứ tự" type="number" defaultValue="0" />
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-outline-variant px-3 text-sm font-semibold">
            <input name="is_published" type="checkbox" defaultChecked />
            Hiển thị
          </label>
          <label className="md:col-span-3">
            <span className="admin-label">Mô tả</span>
            <textarea className="admin-input" name="description" />
          </label>
          <button className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white">
            <Save className="h-4 w-4" />
            Thêm danh mục
          </button>
        </form>
      </details>

      <div className="grid gap-3">
        {categories.map((category) => (
          <form key={category.id} action={saveCategory} className="rounded-lg border border-outline-variant bg-white p-4">
            <input type="hidden" name="id" value={category.id} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <Input name="name" label="Tên" defaultValue={category.name} />
              <Input name="slug" label="Slug" defaultValue={category.slug} />
              <Input name="icon_name" label="Icon" defaultValue={category.icon_name ?? ""} />
              <Input name="accent_color" label="Màu" defaultValue={category.accent_color ?? ""} />
              <Input name="sort_order" label="Thứ tự" type="number" defaultValue={category.sort_order} />
              <label className="flex min-h-11 items-center gap-2 rounded-lg border border-outline-variant px-3 text-sm font-semibold xl:mt-6">
                <input name="is_published" type="checkbox" defaultChecked={category.is_published} />
                Hiển thị
              </label>
            </div>
            <label className="mt-4 block">
              <span className="admin-label">Mô tả</span>
              <textarea className="admin-input" name="description" defaultValue={category.description ?? ""} />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="admin-action-button">
                <Save className="h-4 w-4" />
                Lưu
              </button>
              <button formAction={deleteCategory} className="admin-action-button-danger">
                <Trash2 className="h-4 w-4" />
                Xóa
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label>
      <span className="admin-label">{label}</span>
      <input className="admin-input" {...rest} />
    </label>
  );
}
