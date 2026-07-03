"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getPublicEnv } from "./env";

export function createClient() {
  const { url, key } = getPublicEnv();
  return createBrowserClient(url, key);
}
