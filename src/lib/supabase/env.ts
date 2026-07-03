export function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase public env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are required."
    );
  }
  return { url, key };
}

export function getSecretEnv() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing server env: SUPABASE_SECRET_KEY is required.");
  }
  return secret;
}

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitUrl) return normalizeSiteUrl(explicitUrl);

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) return normalizeSiteUrl(vercelProductionUrl);

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return normalizeSiteUrl(vercelUrl);

  return "http://localhost:3000";
}

function normalizeSiteUrl(url: string) {
  const withProtocol = url.startsWith("http") ? url : `https://${url}`;
  return withProtocol.replace(/\/$/, "");
}
