import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-6">&#10003;</div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          You&apos;re all set!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Your DocuPilot subscription is active. Install the GitHub App to start
          auto-generating documentation on every push.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://github.com/apps/pushdocs"
            className="rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Install GitHub App
          </a>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
