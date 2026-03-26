import { getUser } from "@/lib/auth";

export async function Header() {
  const user = await getUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <a href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
        DocuPilot
      </a>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <a
              href="/dashboard"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a href="/dashboard" className="flex items-center gap-2">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 rounded-full"
              />
            </a>
          </>
        ) : (
          <>
            <a
              href="/api/auth/login"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://github.com/apps/pushdocs"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </a>
          </>
        )}
      </div>
    </header>
  );
}
