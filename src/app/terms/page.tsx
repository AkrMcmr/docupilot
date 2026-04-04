import type { Metadata } from "next";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Terms of Service | DocuPilot",
  description: "DocuPilot Terms of Service — subscription terms, refund policy, and usage conditions.",
  alternates: {
    canonical: "https://docupilot-alpha.vercel.app/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: April 4, 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By accessing or using DocuPilot (&quot;the Service&quot;), you agree to be bound by these
              Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              DocuPilot is a SaaS tool that automatically generates and updates documentation
              (README, CHANGELOG, API docs) for your GitHub repositories on every code push.
              The Service requires installation of the DocuPilot GitHub App and authentication
              via GitHub OAuth.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Accounts and Authentication</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You must have a valid GitHub account to use DocuPilot. You are responsible for
              maintaining the security of your GitHub account and any access tokens associated
              with it. We are not liable for any loss resulting from unauthorized access to
              your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Subscription Plans and Billing</h2>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Free plan:</strong>{" "}
                1 repository, no credit card required. Available indefinitely.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Starter plan ($9/month):</strong>{" "}
                Up to 5 repositories with full documentation automation.
              </li>
              <li>
                <strong className="text-zinc-800 dark:text-zinc-200">Pro plan ($29/month):</strong>{" "}
                Unlimited repositories.
              </li>
            </ul>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Paid subscriptions are billed monthly in advance. All payments are processed
              securely by Stripe. Prices are in USD and may be subject to applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Cancellation Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You may cancel your subscription at any time from your dashboard. Upon cancellation,
              your plan will remain active until the end of the current billing period. You will
              not be charged for subsequent periods. After cancellation, your account reverts
              to the Free plan (1 repository).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Refund Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you are not satisfied with the Service, you may request a full refund within{" "}
              <strong>7 days</strong> of your initial payment or any renewal charge. Refund
              requests submitted after 7 days are evaluated on a case-by-case basis. To request
              a refund, contact us at{" "}
              <a href="mailto:machimura.akira@gmail.com"
                className="underline hover:text-zinc-900 dark:hover:text-white">
                machimura.akira@gmail.com
              </a>{" "}
              with your GitHub username and the date of the charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Acceptable Use</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You agree not to use the Service to:
            </p>
            <ul className="mt-2 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Attempt to reverse-engineer, disable, or interfere with the Service</li>
              <li>Use the Service to generate documentation for repositories you do not own
                or have authorization to modify</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You retain all ownership rights to your code and documentation. DocuPilot does
              not claim any intellectual property rights over content generated for your
              repositories. The DocuPilot platform, branding, and underlying technology are
              owned by DocuPilot and may not be copied or reused without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranty of any kind. We do not guarantee
              that the generated documentation will be accurate, complete, or suitable for any
              particular purpose. You are responsible for reviewing all pull requests created
              by DocuPilot before merging them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              To the maximum extent permitted by law, DocuPilot shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the Service.
              Our total liability for any claim shall not exceed the amount paid by you in the
              three months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate these
              Terms. You may terminate your account at any time by uninstalling the GitHub App
              and cancelling your subscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We may update these Terms from time to time. We will notify you of significant
              changes via email. Continued use of the Service after changes constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Contact</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              For questions about these Terms, please contact us at:{" "}
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
