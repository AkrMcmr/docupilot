import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserActivity, getRecentActivity } from "@/lib/activity";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user-specific activity, fall back to global if none
  let events = await getUserActivity(session.user.login, 20);
  if (events.length === 0) {
    events = await getRecentActivity(20);
  }

  return NextResponse.json({ events });
}
