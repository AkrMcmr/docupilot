import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET() {
  try {
    // Count unique users who have OAuth tokens stored
    const keys = await kv.keys("oauth:*");
    const userCount = keys.length;

    // Count repos being tracked
    const repoKeys = await kv.keys("repo:*");
    const repoCount = repoKeys.length;

    return NextResponse.json({
      users: userCount,
      repos: repoCount,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
