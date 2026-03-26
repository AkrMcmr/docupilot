import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://docupilot-alpha.vercel.app";
  const response = NextResponse.redirect(baseUrl);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
