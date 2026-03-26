import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import type { User } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://docupilot-alpha.vercel.app";
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("oauth_state")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${baseUrl}/?error=invalid_state`);
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!tokenData.access_token) {
    console.error("[DocuPilot] OAuth token exchange failed:", tokenData.error);
    return NextResponse.redirect(`${baseUrl}/?error=auth_failed`);
  }

  // Fetch user profile
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!userRes.ok) {
    console.error("[DocuPilot] GitHub user fetch failed:", userRes.status);
    return NextResponse.redirect(`${baseUrl}/?error=auth_failed`);
  }

  const ghUser = (await userRes.json()) as {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    email: string | null;
  };

  const user: User = {
    id: ghUser.id,
    login: ghUser.login,
    name: ghUser.name,
    avatar_url: ghUser.avatar_url,
    email: ghUser.email,
  };

  console.log(`[DocuPilot] User logged in: ${user.login} (${user.id})`);

  const sessionToken = createSessionToken(user, tokenData.access_token);
  const response = NextResponse.redirect(`${baseUrl}/dashboard`);

  response.cookies.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  response.cookies.delete("oauth_state");

  return response;
}
