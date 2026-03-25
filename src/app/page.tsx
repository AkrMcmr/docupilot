import { PricingSection } from "@/components/pricing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-xl font-bold text-zinc-900 dark:text-white">
          DocuPilot
        </div>
        <a
          href="https://github.com/apps/pushdocs"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
        >
          Install GitHub App
        </a>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          Starting at $9/month
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-tight">
          Your docs, always up to date.
          <br />
          <span className="text-zinc-400">Automatically.</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
          DocuPilot generates and updates your README, API documentation, and
          CHANGELOG every time you push. Install the GitHub App and never write
          docs manually again.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="https://github.com/apps/pushdocs"
            className="rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-8 py-3 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            How It Works
          </a>
        </div>

        {/* How it works */}
        <section id="how-it-works" className="mt-32 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-16">
            Three steps. Zero config.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Install",
                desc: "Add the DocuPilot GitHub App to your repositories.",
              },
              {
                step: "2",
                title: "Push",
                desc: "Push code as you normally do. DocuPilot watches for changes.",
              },
              {
                step: "3",
                title: "Done",
                desc: "README, CHANGELOG, and API docs are updated via pull request.",
              },
            ].map((item) => (
              <div key={item.step} className="text-left">
                <div className="text-4xl font-bold text-zinc-200 dark:text-zinc-700 mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
        &copy; 2026 DocuPilot. Built for developers who ship.
      </footer>
    </div>
  );
}
