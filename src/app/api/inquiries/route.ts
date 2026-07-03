import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 5;

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  if (Date.now() - parsed.data.form_started_at < 2500 || parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = getIp(request);
  const salt = process.env.INQUIRY_RATE_LIMIT_SALT;
  if (!salt) {
    return NextResponse.json({ error: "SERVER_NOT_CONFIGURED" }, { status: 500 });
  }
  const ipHash = createHash("sha256").update(`${salt}:${ip}`).digest("hex");
  const supabase = createAdminSupabaseClient();

  const { data: current } = await supabase
    .from("inquiry_rate_limits")
    .select("*")
    .eq("ip_hash", ipHash)
    .maybeSingle();

  const now = Date.now();
  if (current) {
    const started = new Date(current.window_started_at as string).getTime();
    if (now - started < WINDOW_MS && Number(current.request_count) >= LIMIT) {
      return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
    }
    await supabase.from("inquiry_rate_limits").upsert({
      ip_hash: ipHash,
      window_started_at: now - started >= WINDOW_MS ? new Date().toISOString() : current.window_started_at,
      request_count: now - started >= WINDOW_MS ? 1 : Number(current.request_count) + 1
    });
  } else {
    await supabase.from("inquiry_rate_limits").insert({ ip_hash: ipHash });
  }

  await supabase
    .from("inquiry_rate_limits")
    .delete()
    .lt("window_started_at", new Date(now - WINDOW_MS * 4).toISOString());

  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: parsed.data.inquiry_type,
    tool_id: parsed.data.tool_id ?? null,
    service_id: parsed.data.service_id ?? null,
    full_name: parsed.data.full_name.trim(),
    phone: parsed.data.phone.trim(),
    email: parsed.data.email || null,
    company: parsed.data.company || null,
    preferred_contact: parsed.data.preferred_contact || null,
    message: parsed.data.message.trim(),
    source_page: parsed.data.source_page || null,
    ip_hash: ipHash
  });

  if (error) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
