"use client";

import { useState } from "react";

export function PricingSection() {
  const [loading, setLoading] = useState<"starter" | "pro" | null>(null);
  async function handleCheckout(plan: "starter" | "pro") {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (res.status === 401) {
        window.location.href = "/api/auth/login";
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Failed to start checkout");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section className="mt-32 w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-16">
        Simple pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-left">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Starter
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            For solo developers and small open-source projects
          </p>
          <div className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white">
            $9<span className="text-lg font-normal text-zinc-500">/mo</span>
          </div>
          <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
            <li>Up to 5 repositories</li>
            <li>README + CHANGELOG auto-update</li>
            <li>Community support</li>
          </ul>
          <button
            onClick={() => handleCheckout("starter")}
            disabled={loading !== null}
            className="mt-8 w-full rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50"
          >
            {loading === "starter" ? "Redirecting..." : "Get Started"}
          </button>
        </div>
        <div className="rounded-2xl border-2 border-zinc-900 dark:border-white p-8 text-left">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Pro
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            For teams and professionals managing multiple repositories
          </p>
          <div className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white">
            $29
            <span className="text-lg font-normal text-zinc-500">/mo</span>
          </div>
          <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
            <li>Unlimited repositories</li>
            <li>README + CHANGELOG + API docs</li>
            <li>Custom templates</li>
            <li>Priority support</li>
          </ul>
          <button
            onClick={() => handleCheckout("pro")}
            disabled={loading !== null}
            className="mt-8 w-full rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading === "pro" ? "Redirecting..." : "Get Pro"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
        Free to try — install the GitHub App first, subscribe when you&apos;re ready.
      </p>
    </section>
  );
}
