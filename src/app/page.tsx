import { PricingSection } from "@/components/pricing";
import { Header } from "@/components/header";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "DocuPilot",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "url": "https://docupilot-alpha.vercel.app",
      "description": "GitHub App that automatically generates and updates README, CHANGELOG, and API docs on every push.",
      "offers": [
        { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free" },
        { "@type": "Offer", "price": "9", "priceCurrency": "USD", "name": "Starter" },
        { "@type": "Offer", "price": "29", "priceCurrency": "USD", "name": "Pro" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is my code sent to a third party?", "acceptedAnswer": { "@type": "Answer", "text": "DocuPilot reads only the diff of each push — not your full codebase. The diff is sent to the AI model to generate doc updates, then immediately discarded. Your code is never stored." } },
        { "@type": "Question", "name": "What languages and frameworks are supported?", "acceptedAnswer": { "@type": "Answer", "text": "Any language that lives in a Git repo. DocuPilot analyzes code changes contextually, so it works with JavaScript, Python, Go, Rust, Java, and more — no configuration needed." } },
        { "@type": "Question", "name": "Can I customize the generated docs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Add a .docupilot.yml file to your repo to control which docs are generated, the writing style, and sections to include or exclude." } },
        { "@type": "Question", "name": "What if I don't like a generated update?", "acceptedAnswer": { "@type": "Answer", "text": "Every update comes as a pull request. You review it, request changes, or close it — just like any other PR. Nothing is merged without your approval." } },
        { "@type": "Question", "name": "How is this different from Copilot or ChatGPT?", "acceptedAnswer": { "@type": "Answer", "text": "Those tools require you to prompt and edit manually. DocuPilot runs automatically on every push and opens a PR — zero effort after setup." } },
        { "@type": "Question", "name": "Can I try it before paying?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The Free plan gives you 1 repo with full functionality, forever. No credit card required." } },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          Free for 1 repo &middot; No credit card required
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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Code never stored
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Changes come as PRs you review
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z" /></svg>
            Open source
          </span>
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

        {/* See it in action */}
        <section className="mt-32 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
            See it in action
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            You push code. DocuPilot opens a PR with updated docs. Here&apos;s a real example:
          </p>

          {/* Before/After visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden text-left">
              <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                Before — your README.md
              </div>
              <div className="p-4 font-mono text-sm text-zinc-500 dark:text-zinc-500 space-y-1">
                <p># my-project</p>
                <p className="text-zinc-400 dark:text-zinc-600">TODO: Add description</p>
                <p className="text-zinc-400 dark:text-zinc-600 mt-2">## Installation</p>
                <p className="text-zinc-400 dark:text-zinc-600">TODO</p>
                <p className="text-zinc-300 dark:text-zinc-700 mt-2 italic">Last updated: 6 months ago</p>
              </div>
            </div>
            <div className="rounded-xl border border-green-200 dark:border-green-800 overflow-hidden text-left">
              <div className="bg-green-50 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 border-b border-green-200 dark:border-green-800">
                After — DocuPilot&apos;s PR
              </div>
              <div className="p-4 font-mono text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                <p className="text-green-700 dark:text-green-400">+ # my-project</p>
                <p className="text-green-700 dark:text-green-400">+ A CLI tool for managing cloud deployments with zero-config setup.</p>
                <p className="text-green-700 dark:text-green-400 mt-2">+ ## Installation</p>
                <p className="text-green-700 dark:text-green-400">+ npm install -g my-project</p>
                <p className="text-green-700 dark:text-green-400 mt-2">+ ## Usage</p>
                <p className="text-green-700 dark:text-green-400">+ my-project deploy --env production</p>
              </div>
            </div>
          </div>

          {/* Real PR link */}
          <a
            href="https://github.com/AkrMcmr/docupilot-test/pull/3"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
              </svg>
              <span className="font-semibold text-zinc-900 dark:text-white">
                DocuPilot: Update documentation
              </span>
              <span className="text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5">
                +147 lines
              </span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <span>README.md</span>
              <span>CHANGELOG.md</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              View the real pull request on GitHub &rarr;
            </p>
          </a>

          {/* CTA after demo */}
          <div className="mt-8">
            <a
              href="https://github.com/apps/pushdocs"
              className="inline-flex rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Try it on your repo — free
            </a>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <section className="mt-32 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                q: "Is my code sent to a third party?",
                a: "DocuPilot reads only the diff of each push — not your full codebase. The diff is sent to the AI model to generate doc updates, then immediately discarded. Your code is never stored.",
              },
              {
                q: "What languages and frameworks are supported?",
                a: "Any language that lives in a Git repo. DocuPilot analyzes code changes contextually, so it works with JavaScript, Python, Go, Rust, Java, and more — no configuration needed.",
              },
              {
                q: "Can I customize the generated docs?",
                a: "Yes. Add a .docupilot.yml file to your repo to control which docs are generated, the writing style, and sections to include or exclude.",
              },
              {
                q: "What if I don't like a generated update?",
                a: "Every update comes as a pull request. You review it, request changes, or close it — just like any other PR. Nothing is merged without your approval.",
              },
              {
                q: "How is this different from Copilot or ChatGPT?",
                a: "Those tools require you to prompt and edit manually. DocuPilot runs automatically on every push and opens a PR — zero effort after setup.",
              },
              {
                q: "Can I try it before paying?",
                a: "Absolutely. The Free plan gives you 1 repo with full functionality, forever. No credit card required.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-8 text-sm text-zinc-500">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span>&copy; 2026 DocuPilot. Built for developers who ship.</span>
            <a href="mailto:machimura.akira@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              machimura.akira@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/AkrMcmr/docupilot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/AkrMcmr/docupilot/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Community
            </a>
            <a
              href="/blog/auto-documentation-github"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="/compare/mintlify"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              vs Mintlify
            </a>
            <a
              href="/compare/readme"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              vs ReadMe
            </a>
            <a
              href="/compare/documentation-ai"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              vs Documentation.AI
            </a>
            <a
              href="/privacy"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="/tokusho"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              特定商取引法
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
