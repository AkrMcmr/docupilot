"use client";

import { useEffect, useState } from "react";

interface SubscriptionData {
  plan: "free" | "starter" | "pro";
  status: "active" | "past_due" | "canceled" | "none";
  currentPeriodEnd: string | null;
  repoLimit: number;
}

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  starter: "Starter ($9/mo)",
  pro: "Pro ($29/mo)",
};

const STATUS_LABELS: Record<string, { text: string; color: string }> = {
  active: { text: "Active", color: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" },
  past_due: { text: "Past Due", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400" },
  canceled: { text: "Canceled", color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" },
  none: { text: "No subscription", color: "text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400" },
};

export function SubscriptionCard() {
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/subscription")
      .then((r) => r.json())
      .then((data) => setSub(data))
      .catch(() => setSub({ plan: "free", status: "none", currentPeriodEnd: null, repoLimit: 1 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mb-3" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-40" />
      </div>
    );
  }

  if (!sub) return null;

  const statusInfo = STATUS_LABELS[sub.status] || STATUS_LABELS.none;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-500">Current plan</div>
          <div className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
            {PLAN_LABELS[sub.plan] || "Free"}
          </div>
          {sub.status !== "none" && (
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
              {sub.currentPeriodEnd && (
                <span className="text-xs text-zinc-400">
                  Renews {new Date(sub.currentPeriodEnd).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
          <div className="text-sm text-zinc-500 mt-2">
            {sub.plan === "free"
              ? "Install the GitHub App and upgrade to start generating docs automatically."
              : `Up to ${sub.repoLimit === 999 ? "unlimited" : sub.repoLimit} repositories.`}
          </div>
        </div>
        {sub.plan === "free" ? (
          <a
            href="/#pricing"
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Upgrade
          </a>
        ) : (
          <a
            href="/#pricing"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            Change Plan
          </a>
        )}
      </div>
    </div>
  );
}
