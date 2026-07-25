import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 30;

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
  const salt = getRateLimitSalt();
  const ipHash = createHash("sha256").update(`${salt}:${ip}`).digest("hex");
  const supabase = createAdminSupabaseClient();

  const now = Date.now();
  const rateLimit = await checkRateLimit(supabase, ipHash, now);
  if (!rateLimit.ok) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const linkedIds = await getExistingLinkedIds(
    supabase,
    parsed.data.tool_id ?? null,
    parsed.data.service_id ?? null
  );

  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: parsed.data.inquiry_type,
    tool_id: linkedIds.toolId,
    service_id: linkedIds.serviceId,
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

async function getExistingLinkedIds(
  supabase: ReturnType<typeof createAdminSupabaseClient>,
  toolId: string | null,
  serviceId: string | null
) {
  const result = { toolId: null as string | null, serviceId: null as string | null };

  try {
    if (toolId) {
      const { data, error } = await supabase.from("tools").select("id").eq("id", toolId).maybeSingle();
      if (!error && data?.id) result.toolId = data.id;
      if (error) console.error("Inquiry tool link lookup failed", error);
    }

    if (serviceId) {
      const { data, error } = await supabase.from("services").select("id").eq("id", serviceId).maybeSingle();
      if (!error && data?.id) result.serviceId = data.id;
      if (error) console.error("Inquiry service link lookup failed", error);
    }
  } catch (error) {
    console.error("Inquiry link lookup skipped", error);
  }

  return result;
}

function getRateLimitSalt() {
  return (
    process.env.INQUIRY_RATE_LIMIT_SALT ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "toolbox-inquiry-rate-limit"
  );
}

async function checkRateLimit(
  supabase: ReturnType<typeof createAdminSupabaseClient>,
  ipHash: string,
  now: number
) {
  try {
    const { data: current, error: readError } = await supabase
      .from("inquiry_rate_limits")
      .select("*")
      .eq("ip_hash", ipHash)
      .maybeSingle();

    if (readError) {
      console.error("Inquiry rate-limit read failed", readError);
      return { ok: true };
    }

    if (current) {
      const started = new Date(current.window_started_at as string).getTime();
      if (now - started < WINDOW_MS && Number(current.request_count) >= LIMIT) {
        return { ok: false };
      }
      const { error: upsertError } = await supabase.from("inquiry_rate_limits").upsert({
        ip_hash: ipHash,
        window_started_at: now - started >= WINDOW_MS ? new Date().toISOString() : current.window_started_at,
        request_count: now - started >= WINDOW_MS ? 1 : Number(current.request_count) + 1
      });
      if (upsertError) console.error("Inquiry rate-limit upsert failed", upsertError);
    } else {
      const { error: insertError } = await supabase.from("inquiry_rate_limits").insert({ ip_hash: ipHash });
      if (insertError) console.error("Inquiry rate-limit insert failed", insertError);
    }

    const { error: cleanupError } = await supabase
      .from("inquiry_rate_limits")
      .delete()
      .lt("window_started_at", new Date(now - WINDOW_MS * 4).toISOString());
    if (cleanupError) console.error("Inquiry rate-limit cleanup failed", cleanupError);
  } catch (error) {
    console.error("Inquiry rate-limit skipped", error);
  }

  return { ok: true };
}

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
