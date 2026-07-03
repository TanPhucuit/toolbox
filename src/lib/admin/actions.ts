"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { toolSchema } from "@/lib/validation/tool";
import { serviceSchema } from "@/lib/validation/service";
import { slugSchema } from "@/lib/validation/common";

type ActionState = { ok: boolean; message: string };

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" ? item : "";
}

function checkbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

async function log(action: string, entityType: string, entityId?: string | null, afterData?: unknown) {
  const admin = await requireAdmin();
  const supabase = await createServerSupabaseClient();
  await supabase.from("admin_activity_logs").insert({
    actor_user_id: admin.user_id,
    action,
    entity_type: entityType,
    entity_id: entityId ?? null,
    after_data: afterData ?? null
  });
}

export async function loginAdmin(_: ActionState, formData: FormData): Promise<ActionState> {
  const login = value(formData, "email").trim();
  const email = login.includes("@") ? login : `${login}@toolboxviet.local`;
  const password = value(formData, "password");
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { ok: false, message: "Tên đăng nhập hoặc mật khẩu không đúng." };

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, message: "Tài khoản này không có quyền quản trị." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin");
}

export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const payload = {
    name: value(formData, "name").trim(),
    slug: value(formData, "slug").trim(),
    description: value(formData, "description").trim() || null,
    icon_name: value(formData, "icon_name").trim() || null,
    accent_color: value(formData, "accent_color").trim() || null,
    sort_order: Number(value(formData, "sort_order") || 0),
    is_published: checkbox(formData, "is_published")
  };
  slugSchema.parse(payload.slug);
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  const result = id
    ? await supabase.from("categories").update(payload).eq("id", id).select("id").single()
    : await supabase.from("categories").insert(payload).select("id").single();
  if (result.error) throw new Error("Không lưu được danh mục.");
  await log(id ? "update" : "create", "category", result.data.id, payload);
  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  await supabase.from("tools").update({ category_id: null }).eq("category_id", id);
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error("Không xóa được danh mục.");
  await log("delete", "category", id);
  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function saveTool(formData: FormData) {
  await requireAdmin();
  const parsed = toolSchema.parse({
    id: value(formData, "id") || undefined,
    name: value(formData, "name"),
    slug: value(formData, "slug"),
    category_id: value(formData, "category_id") || null,
    short_description: value(formData, "short_description"),
    description_markdown: value(formData, "description_markdown"),
    price_type: value(formData, "price_type"),
    price_vnd: value(formData, "price_vnd") ? Number(value(formData, "price_vnd")) : null,
    old_price_vnd: value(formData, "old_price_vnd") ? Number(value(formData, "old_price_vnd")) : null,
    price_label: value(formData, "price_label"),
    version: value(formData, "version"),
    license_text: value(formData, "license_text"),
    compatibility: value(formData, "compatibility"),
    file_size: value(formData, "file_size"),
    language_support: value(formData, "language_support"),
    badge: value(formData, "badge"),
    icon_url: value(formData, "icon_url"),
    cover_image_url: value(formData, "cover_image_url"),
    tutorial_video_url: value(formData, "tutorial_video_url"),
    demo_url: value(formData, "demo_url"),
    primary_cta_type: value(formData, "primary_cta_type"),
    primary_cta_label: value(formData, "primary_cta_label"),
    primary_cta_url: value(formData, "primary_cta_url"),
    features: value(formData, "features"),
    system_requirements: value(formData, "system_requirements"),
    changelog: value(formData, "changelog"),
    faq: value(formData, "faq"),
    seo_title: value(formData, "seo_title"),
    seo_description: value(formData, "seo_description"),
    is_featured: checkbox(formData, "is_featured"),
    is_published: checkbox(formData, "is_published"),
    sort_order: Number(value(formData, "sort_order") || 0)
  });
  const id = value(formData, "id");
  const row = {
    ...parsed,
    category_id: parsed.category_id ?? null,
    description_markdown: parsed.description_markdown || null,
    price_label: parsed.price_label || null,
    published_at: parsed.is_published ? new Date().toISOString() : null
  };
  const supabase = await createServerSupabaseClient();
  const result = id
    ? await supabase.from("tools").update(row).eq("id", id).select("id,slug").single()
    : await supabase.from("tools").insert(row).select("id,slug").single();
  if (result.error) throw new Error("Không lưu được tool.");
  await log(id ? "update" : "create", "tool", result.data.id, row);
  revalidatePath("/");
  revalidatePath(`/tool/${result.data.slug}`);
  revalidatePath("/admin/tools");
  redirect("/admin/tools");
}

export async function deleteTool(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("tools").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("tools").delete().eq("id", id);
  if (error) throw new Error("Không xóa được tool.");
  await log("delete", "tool", id);
  revalidatePath("/");
  if (data?.slug) revalidatePath(`/tool/${data.slug}`);
  revalidatePath("/admin/tools");
}

export async function duplicateTool(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("tools").select("*").eq("id", id).single();
  if (error || !data) throw new Error("Không tìm thấy tool.");
  const clone = {
    ...data,
    id: undefined,
    name: `${data.name} Copy`,
    slug: `${data.slug}-copy-${Date.now()}`,
    is_published: false,
    published_at: null
  };
  const { data: inserted, error: insertError } = await supabase.from("tools").insert(clone).select("id").single();
  if (insertError) throw new Error("Không duplicate được tool.");
  await log("create", "tool", inserted.id, clone);
  revalidatePath("/admin/tools");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  const parsed = serviceSchema.parse({
    id: value(formData, "id") || undefined,
    title: value(formData, "title"),
    slug: value(formData, "slug"),
    short_description: value(formData, "short_description"),
    description_markdown: value(formData, "description_markdown"),
    icon_name: value(formData, "icon_name"),
    cover_image_url: value(formData, "cover_image_url"),
    price_label: value(formData, "price_label") || "Liên hệ báo giá",
    features: value(formData, "features"),
    process_steps: value(formData, "process_steps"),
    faq: value(formData, "faq"),
    primary_cta_label: value(formData, "primary_cta_label") || "Yêu cầu tư vấn",
    seo_title: value(formData, "seo_title"),
    seo_description: value(formData, "seo_description"),
    is_featured: checkbox(formData, "is_featured"),
    is_published: checkbox(formData, "is_published"),
    sort_order: Number(value(formData, "sort_order") || 0)
  });
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  const result = id
    ? await supabase.from("services").update(parsed).eq("id", id).select("id,slug").single()
    : await supabase.from("services").insert(parsed).select("id,slug").single();
  if (result.error) throw new Error("Không lưu được dịch vụ.");
  await log(id ? "update" : "create", "service", result.data.id, parsed);
  revalidatePath("/dich-vu");
  revalidatePath(`/dich-vu/${result.data.slug}`);
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error("Không xóa được dịch vụ.");
  await log("delete", "service", id);
  revalidatePath("/dich-vu");
  if (data?.slug) revalidatePath(`/dich-vu/${data.slug}`);
}

export async function saveContentBlock(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const body = value(formData, "content_body");
  const description = value(formData, "content_description");
  const list = value(formData, "content_list")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const content =
    list.length > 0
      ? { body, description, badges: list, items: list }
      : { body, description };
  const row = {
    page_key: value(formData, "page_key"),
    section_key: value(formData, "section_key"),
    title: value(formData, "title") || null,
    content,
    is_published: checkbox(formData, "is_published"),
    sort_order: Number(value(formData, "sort_order") || 0)
  };
  const supabase = await createServerSupabaseClient();
  const result = id
    ? await supabase.from("content_blocks").update(row).eq("id", id).select("id").single()
    : await supabase.from("content_blocks").insert(row).select("id").single();
  if (result.error) throw new Error("Không lưu được nội dung.");
  await log(id ? "update" : "create", "content_block", result.data.id, row);
  revalidatePath("/");
  revalidatePath("/dich-vu");
  revalidatePath("/lien-he");
  redirect("/admin/content");
}

export async function updateInquiry(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const status = value(formData, "status");
  const admin_notes = value(formData, "admin_notes") || null;
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("inquiries").update({ status, admin_notes }).eq("id", id);
  if (error) throw new Error("Không cập nhật được inquiry.");
  await log("inquiry_status_change", "inquiry", id, { status });
  revalidatePath("/admin/inquiries");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const row = {
    brand_name: value(formData, "brand_name"),
    logo_url: value(formData, "logo_url") || null,
    favicon_url: value(formData, "favicon_url") || null,
    support_phone: value(formData, "support_phone") || null,
    support_email: value(formData, "support_email") || null,
    zalo_url: value(formData, "zalo_url") || null,
    facebook_url: value(formData, "facebook_url") || null,
    youtube_url: value(formData, "youtube_url") || null,
    address: value(formData, "address") || null,
    copyright_text: value(formData, "copyright_text") || null,
    default_seo_title: value(formData, "default_seo_title") || null,
    default_seo_description: value(formData, "default_seo_description") || null
  };
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("site_settings").update(row).eq("id", 1);
  if (error) throw new Error("Không lưu được settings.");
  await log("update", "site_settings", null, row);
  revalidatePath("/");
  redirect("/admin/settings");
}
