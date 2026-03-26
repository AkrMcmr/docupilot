"use client";

import { useEffect, useState } from "react";

interface ActivityEvent {
  id: string;
  type: "docs_generated" | "docs_failed" | "app_installed" | "app_uninstalled";
  repo: string;
  branch?: string;
  prUrl?: string;
  filesUpdated?: string[];
  error?: string;
  timestamp: number;
}

const TYPE_CONFIG = {
  docs_generated: { label: "Docs updated", color: "bg-green-500" },
  docs_failed: { label: "Generation failed", color: "bg-red-500" },
  app_installed: { label: "App installed", color: "bg-blue-500" },
  app_uninstalled: { label: "App removed", color: "bg-zinc-400" },
} as const;

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/activity")
      .then((res) => (res.ok ? res.json() : { events: [] }))
      .then((data) => setEvents(data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center text-zinc-500">
        No documentation updates yet. Push code to a monitored repository to get started.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
      {events.map((event) => {
        const config = TYPE_CONFIG[event.type];
        return (
          <div key={event.id} className="flex items-start gap-3 px-4 py-3">
            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${config.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-zinc-900 dark:text-white truncate">
                  {event.repo}
                </span>
                {event.branch && (
                  <span className="text-zinc-400 text-xs">
                    {event.branch}
                  </span>
                )}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">
                {config.label}
                {event.filesUpdated && event.filesUpdated.length > 0 && (
                  <span> &middot; {event.filesUpdated.join(", ")}</span>
                )}
                {event.prUrl && (
                  <span>
                    {" "}&middot;{" "}
                    <a
                      href={event.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View PR
                    </a>
                  </span>
                )}
                {event.error && (
                  <span className="text-red-500"> &middot; {event.error}</span>
                )}
              </div>
            </div>
            <span className="text-xs text-zinc-400 flex-shrink-0">
              {timeAgo(event.timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
