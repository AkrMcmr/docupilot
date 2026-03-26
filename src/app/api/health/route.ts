import { NextResponse } from "next/server";

interface CheckResult {
  status: "ok" | "fail" | "skip";
  message?: string;
}

async function checkAnthropic(): Promise<CheckResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { status: "skip", message: "ANTHROPIC_API_KEY not set" };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5,
        messages: [{ role: "user", content: "ping" }],
      }),
    });
    if (res.ok) return { status: "ok" };
    const data = await res.json().catch(() => null);
    return { status: "fail", message: `${res.status} ${data?.error?.message || ""}` };
  } catch (e: unknown) {
    return { status: "fail", message: e instanceof Error ? e.message : String(e) };
  }
}

async function checkStripe(): Promise<CheckResult> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { status: "skip", message: "STRIPE_SECRET_KEY not set" };
  try {
    const res = await fetch("https://api.stripe.com/v1/products?limit=1", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (res.ok) return { status: "ok" };
    return { status: "fail", message: `${res.status}` };
  } catch (e: unknown) {
    return { status: "fail", message: e instanceof Error ? e.message : String(e) };
  }
}

function checkEnvVars(): Record<string, boolean> {
  const vars = [
    "GITHUB_APP_ID",
    "GITHUB_APP_PRIVATE_KEY",
    "GITHUB_WEBHOOK_SECRET",
    "GITHUB_OAUTH_CLIENT_ID",
    "GITHUB_OAUTH_CLIENT_SECRET",
    "ANTHROPIC_API_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_STARTER_PRICE_ID",
    "STRIPE_PRO_PRICE_ID",
    "STRIPE_WEBHOOK_SECRET",
    "SESSION_SECRET",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
  ];
  const result: Record<string, boolean> = {};
  for (const v of vars) {
    result[v] = !!process.env[v];
  }
  return result;
}

export async function GET() {
  const [anthropic, stripe] = await Promise.all([
    checkAnthropic(),
    checkStripe(),
  ]);

  const envVars = checkEnvVars();
  const allEnvSet = Object.values(envVars).every(Boolean);
  const allApisOk = anthropic.status === "ok" && stripe.status === "ok";

  const overall = allEnvSet && allApisOk ? "healthy" : "degraded";

  return NextResponse.json({
    status: overall,
    timestamp: new Date().toISOString(),
    env: envVars,
    services: { anthropic, stripe },
  }, { status: overall === "healthy" ? 200 : 503 });
}
