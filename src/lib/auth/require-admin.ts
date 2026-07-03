import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminAccessError } from "./errors";

export { AdminAccessError };

export async function getAdminUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id,email,display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !data) return null;
  return { ...data, authUser: user };
}

export async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new AdminAccessError();
  return admin;
}

export async function requireAdminPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin?denied=1");
  return admin;
}
