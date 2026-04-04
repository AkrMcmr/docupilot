import type { Metadata } from "next";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Privacy Policy | DocuPilot",
  description: "DocuPilot Privacy Policy — how we collect, use, and protect your data.",
  alternates: {
    canonical: "https://docupilot-alpha.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: April 4, 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              DocuPilot (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a service that automatically generates and updates
              documentation for your GitHub repositories on every push. This Privacy Policy explains
              what data we collect, how we use it, and how we protect it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">GitHub account information:</strong>{" "}
                When you sign in with GitHub, we receive your GitHub user ID, username, avatar, and email address
                (if public). This is used to identify your account.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Repository diffs:</strong>{" "}
                When you push code, GitHub sends us the diff of that push (not your full codebase).
                This diff is passed to an AI model to generate documentation updates, then{" "}
                <strong>immediately discarded</strong>. We do not store your code.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Subscription and payment data:</strong>{" "}
                Billing is handled entirely by Stripe. We store only your Stripe customer ID and
                subscription status. We never see or store your full credit card number.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Usage data:</strong>{" "}
                We collect aggregate usage metrics (e.g., number of documentation PRs generated)
                to monitor service health and improve the product.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>To provide and operate the DocuPilot service</li>
              <li>To generate documentation pull requests on your behalf</li>
              <li>To manage your subscription and process payments via Stripe</li>
              <li>To send transactional notifications related to your account</li>
              <li>To monitor service health and fix issues</li>
            </ul>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We do not sell your data to third parties. We do not use your code for training AI models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">GitHub:</strong>{" "}
                We use GitHub OAuth for authentication and the GitHub API to read repository diffs
                and create pull requests. GitHub&apos;s{" "}
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                  className="underline hover:text-zinc-900 dark:hover:text-white" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                applies to data processed by GitHub.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Anthropic (Claude API):</strong>{" "}
                Repository diffs are sent to Anthropic&apos;s Claude API to generate documentation.
                Data is not retained by Anthropic for training purposes under our API agreement.
                Anthropic&apos;s{" "}
                <a href="https://www.anthropic.com/privacy" className="underline hover:text-zinc-900 dark:hover:text-white"
                  target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                applies.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Stripe:</strong>{" "}
                Payment processing is handled by Stripe. Your payment information is collected and
                stored directly by Stripe. Stripe&apos;s{" "}
                <a href="https://stripe.com/privacy" className="underline hover:text-zinc-900 dark:hover:text-white"
                  target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                applies.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Vercel:</strong>{" "}
                DocuPilot is hosted on Vercel. Vercel may collect standard server logs (IP address,
                request metadata) as part of hosting. Vercel&apos;s{" "}
                <a href="https://vercel.com/legal/privacy-policy" className="underline hover:text-zinc-900 dark:hover:text-white"
                  target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                applies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your GitHub account information and subscription status are retained for as long as
              your account is active. Repository diffs are never stored — they are processed in
              memory and discarded immediately after documentation is generated. You can request
              deletion of your account data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Security</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We use AES-256-GCM encrypted session cookies for authentication. All data is
              transmitted over HTTPS. We follow security best practices and limit access to
              personal data to only what is necessary to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You may request access to, correction of, or deletion of your personal data at any
              time by contacting us at the address below. You can revoke DocuPilot&apos;s access to
              your GitHub account at any time via{" "}
              <a href="https://github.com/settings/applications" className="underline hover:text-zinc-900 dark:hover:text-white"
                target="_blank" rel="noopener noreferrer">
                GitHub Settings → Applications
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of
              significant changes via email or a notice on the site. Continued use of the service
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For privacy-related questions or data requests, please contact us at:{" "}
              <a href="mailto:machimura.akira@gmail.com"
                className="underline hover:text-zinc-900 dark:hover:text-white">
                machimura.akira@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
