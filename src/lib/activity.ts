import { kv } from "@vercel/kv";

export interface ActivityEvent {
  id: string;
  type: "docs_generated" | "docs_failed" | "app_installed" | "app_uninstalled";
  repo: string;
  branch?: string;
  prUrl?: string;
  filesUpdated?: string[];
  error?: string;
  timestamp: number;
  userId?: string;
}

const ACTIVITY_KEY = "activity:global";
const USER_ACTIVITY_KEY = (userId: string) => `activity:user:${userId}`;
const MAX_EVENTS = 100;

export async function logActivity(event: Omit<ActivityEvent, "id" | "timestamp">) {
  const full: ActivityEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  };

  try {
    await kv.lpush(ACTIVITY_KEY, JSON.stringify(full));
    await kv.ltrim(ACTIVITY_KEY, 0, MAX_EVENTS - 1);

    if (event.userId) {
      const userKey = USER_ACTIVITY_KEY(event.userId);
      await kv.lpush(userKey, JSON.stringify(full));
      await kv.ltrim(userKey, 0, MAX_EVENTS - 1);
    }
  } catch (err) {
    console.error("[DocuPilot] Failed to log activity:", err);
  }

  return full;
}

export async function getRecentActivity(limit = 20): Promise<ActivityEvent[]> {
  try {
    const raw = await kv.lrange<string>(ACTIVITY_KEY, 0, limit - 1);
    return raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
  } catch {
    return [];
  }
}

export async function getUserActivity(userId: string, limit = 20): Promise<ActivityEvent[]> {
  try {
    const raw = await kv.lrange<string>(USER_ACTIVITY_KEY(userId), 0, limit - 1);
    return raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
  } catch {
    return [];
  }
}
