import type { Metadata } from "next";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "I Built a Free GitHub App That Auto-Updates Your Docs on Every Push | DocuPilot",
  description:
    "How I built DocuPilot, a GitHub App that automatically generates README, CHANGELOG, and API docs on every push using AI. Free for 1 repo.",
  keywords: [
    "auto generate readme",
    "github documentation automation",
    "ai documentation generator",
    "automatic changelog",
    "github app documentation",
    "readme generator",
    "developer tools",
  ],
  openGraph: {
    title: "I Built a Free GitHub App That Auto-Updates Your Docs on Every Push",
    description:
      "DocuPilot automatically generates README, CHANGELOG, and API docs every time you push code. Free for 1 repo.",
    type: "article",
    publishedTime: "2026-03-31T00:00:00Z",
  },
  alternates: {
    canonical: "https://docupilot-alpha.vercel.app/blog/auto-documentation-github",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "I Built a Free GitHub App That Auto-Updates Your Docs on Every Push",
  description:
    "How I built DocuPilot, a GitHub App that automatically generates README, CHANGELOG, and API docs on every push using AI.",
  datePublished: "2026-03-31T00:00:00Z",
  author: { "@type": "Person", name: "DocuPilot Team" },
  publisher: { "@type": "Organization", name: "DocuPilot" },
  mainEntityOfPage: "https://docupilot-alpha.vercel.app/blog/auto-documentation-github",
};

export default function BlogPost() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <article className="flex-1 max-w-2xl mx-auto px-6 py-16">
        <header className="mb-12">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            March 31, 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            I Built a Free GitHub App That Auto-Updates Your Docs on Every Push
          </h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Your README hasn&apos;t been updated in months. Your CHANGELOG doesn&apos;t exist.
            Your API docs say &quot;TODO.&quot; Sound familiar?
          </p>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>The Problem</h2>
          <p>
            As developers, we&apos;re great at shipping features but terrible at keeping docs
            up to date. It&apos;s not that we don&apos;t care &mdash; it&apos;s that there&apos;s
            always something more urgent.
          </p>
          <p>
            The result? Users struggle to use our projects. Contributors can&apos;t onboard.
            And we spend hours before every release frantically updating docs.
          </p>

          <h2>The Solution</h2>
          <p>
            I built <strong>DocuPilot</strong> &mdash; a GitHub App that automatically generates
            and updates your documentation every time you push code.{" "}
            <strong>Install once, never think about docs again.</strong>
          </p>
          <ol>
            <li>
              Install the{" "}
              <a href="https://github.com/apps/pushdocs" className="text-zinc-900 dark:text-white underline">
                PushDocs
              </a>{" "}
              GitHub App on your repo
            </li>
            <li>Push code as you normally would</li>
            <li>DocuPilot analyzes your changes using AI (Claude API)</li>
            <li>You get a Pull Request with updated documentation</li>
          </ol>
          <p>
            No config files. No CLI tools. No CI/CD pipeline changes.
          </p>

          <h2>What It Generates</h2>
          <ul>
            <li>
              <strong>README updates</strong> &mdash; Feature descriptions, usage examples,
              installation instructions
            </li>
            <li>
              <strong>CHANGELOG entries</strong> &mdash; Automatically categorized (Added,
              Changed, Fixed, etc.)
            </li>
            <li>
              <strong>API documentation</strong> &mdash; Endpoint descriptions, parameters,
              response types
            </li>
          </ul>
          <p>
            All changes come as PRs, so you stay in full control. Review, edit, merge &mdash;
            just like any other PR.
          </p>

          <h2>Why Not Use an Existing Tool?</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Price</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mintlify</td>
                  <td>$300+/mo</td>
                  <td>Enterprise teams</td>
                </tr>
                <tr>
                  <td>ReadMe</td>
                  <td>Enterprise pricing</td>
                  <td>Large companies</td>
                </tr>
                <tr>
                  <td>Redocly</td>
                  <td>Varies</td>
                  <td>API-only docs</td>
                </tr>
                <tr className="font-semibold">
                  <td>DocuPilot</td>
                  <td>Free &mdash; $29/mo</td>
                  <td>Individual devs &amp; small teams</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Most documentation tools are built for companies with dedicated technical writers.
            DocuPilot is built for the solo developer who wants their docs to just... stay
            updated.
          </p>

          <h2>Pricing</h2>
          <ul>
            <li>
              <strong>Free</strong>: $0/mo &mdash; 1 repo, README + CHANGELOG
            </li>
            <li>
              <strong>Starter</strong>: $9/mo &mdash; 5 repos, README + CHANGELOG
            </li>
            <li>
              <strong>Pro</strong>: $29/mo &mdash; Unlimited repos, API docs, custom templates
            </li>
          </ul>
          <p>
            The free tier is free forever. No trial period. No credit card required.
          </p>

          <h2>Tech Stack</h2>
          <p>For the curious builders:</p>
          <ul>
            <li>
              <strong>Frontend/Backend</strong>: Next.js on Vercel
            </li>
            <li>
              <strong>AI</strong>: Claude API (Anthropic) for code analysis and doc generation
            </li>
            <li>
              <strong>Auth</strong>: GitHub OAuth
            </li>
            <li>
              <strong>Payments</strong>: Stripe
            </li>
            <li>
              <strong>State</strong>: Vercel KV (Redis)
            </li>
            <li>
              <strong>Integration</strong>: GitHub App with webhook on push events
            </li>
          </ul>

          <h2>See It in Action</h2>
          <p>
            Check out a{" "}
            <a
              href="https://github.com/AkrMcmr/docupilot-test/pull/3"
              className="text-zinc-900 dark:text-white underline"
            >
              real example PR
            </a>{" "}
            generated by DocuPilot. It analyzed code changes and produced comprehensive
            documentation updates &mdash; automatically.
          </p>

          <h2>Try It</h2>
          <ol>
            <li>
              Go to{" "}
              <a
                href="https://docupilot-alpha.vercel.app?utm_source=blog&utm_medium=content&utm_campaign=launch"
                className="text-zinc-900 dark:text-white underline"
              >
                docupilot-alpha.vercel.app
              </a>
            </li>
            <li>Sign in with GitHub</li>
            <li>Install the PushDocs app on a repo</li>
            <li>Push some code and watch the magic happen</li>
          </ol>
          <p>
            Or install directly:{" "}
            <a
              href="https://github.com/apps/pushdocs"
              className="text-zinc-900 dark:text-white underline"
            >
              github.com/apps/pushdocs
            </a>
          </p>

          <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-center">
            <p className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              Ready to automate your docs?
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Free for 1 repo. No credit card required.
            </p>
            <a
              href="https://github.com/apps/pushdocs"
              className="inline-block rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </article>

      <footer className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
        <a href="/" className="hover:text-zinc-600 dark:hover:text-zinc-400">
          DocuPilot
        </a>{" "}
        &mdash; AI-powered documentation for your code
      </footer>
    </div>
  );
}
