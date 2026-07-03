import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getPublicEnv, getSecretEnv } from "./env";

export function createAdminSupabaseClient() {
  const { url } = getPublicEnv();
  return createClient(url, getSecretEnv(), {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
