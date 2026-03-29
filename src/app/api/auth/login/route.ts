import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "GitHub OAuth not configured" }, { status: 500 });
  }

  const state = crypto.randomBytes(16).toString("hex");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://docupilot-alpha.vercel.app";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/auth/callback`,
    scope: "read:user user:email repo",
    state,
  });

  const response = NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  return response;
}
