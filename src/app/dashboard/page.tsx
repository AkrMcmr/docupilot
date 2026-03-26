import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/login");
  }

  const { user } = session;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <a href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
          DocuPilot
        </a>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              {user.login}
            </span>
          </div>
          <a
            href="/api/auth/logout"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Sign out
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-zinc-500 mb-10">
          Manage your repositories and subscription.
        </p>

        {/* Subscription Status */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Subscription
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-500">Current plan</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
                  Free Trial
                </div>
                <div className="text-sm text-zinc-500 mt-1">
                  Install the GitHub App and upgrade to start generating docs automatically.
                </div>
              </div>
              <a
                href="/#pricing"
                className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                Upgrade
              </a>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Get Started
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400">
                1
              </div>
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Install the PushDocs GitHub App
                </div>
                <p className="text-sm text-zinc-500 mt-1">
                  Select which repositories DocuPilot should monitor.
                </p>
                <a
                  href="https://github.com/apps/pushdocs/installations/select_target"
                  className="inline-block mt-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Install GitHub App
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400">
                2
              </div>
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Push code to your repository
                </div>
                <p className="text-sm text-zinc-500 mt-1">
                  DocuPilot will automatically create a PR with updated docs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-400">
                3
              </div>
              <div>
                <div className="font-medium text-zinc-900 dark:text-white">
                  Review and merge the PR
                </div>
                <p className="text-sm text-zinc-500 mt-1">
                  Your documentation stays fresh with every code change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity (placeholder) */}
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center text-zinc-500">
            No documentation updates yet. Push code to a monitored repository to get started.
          </div>
        </section>
      </main>
    </div>
  );
}
