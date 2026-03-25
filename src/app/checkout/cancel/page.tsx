import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Checkout cancelled
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          No worries — you can subscribe anytime. Your documentation awaits.
        </p>
        <Link
          href="/"
          className="rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors inline-block"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
