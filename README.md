# DocuPilot

**Your docs, always up to date. Automatically.**

[![Try DocuPilot](https://img.shields.io/badge/Try%20it-Free-blue)](https://docupilot-alpha.vercel.app) [![Install GitHub App](https://img.shields.io/badge/GitHub%20App-Install-green)](https://github.com/apps/pushdocs/installations/select_target)

DocuPilot generates and updates your README, API documentation, and CHANGELOG every time you push to GitHub. Install the GitHub App, push your code, and get a pull request with updated docs — zero config required.

**[Get Started Free](https://docupilot-alpha.vercel.app)** — No credit card required.

## How It Works

1. **Install** — Add the [PushDocs GitHub App](https://github.com/apps/pushdocs) to your repositories
2. **Push** — Push code as you normally do
3. **Review** — DocuPilot opens a PR with updated documentation

DocuPilot reads your codebase, understands the changes, and generates accurate documentation using AI. You review and merge — that's it.

## Features

- **README generation** — Keeps your README in sync with your actual code
- **CHANGELOG updates** — Automatically documents what changed and why
- **API documentation** — Generates docs from your API endpoints and types
- **Zero config** — Works out of the box with sensible defaults
- **Customizable** — Fine-tune behavior with `.docupilot.yml`
- **Pull request workflow** — All changes come as reviewable PRs, never direct commits
- **Privacy Policy & Terms of Service** — Stripe-compliant legal pages at `/privacy` and `/terms`
- **Comparison pages** — Side-by-side comparisons with Mintlify, ReadMe, and Documentation.AI

## GitHub Action

Prefer CI/CD? Use the [DocuPilot Action](https://github.com/AkrMcmr/docupilot-action) — same AI doc generation, runs in your workflow:

```yaml
- uses: AkrMcmr/docupilot-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

The workflow also supports `workflow_dispatch` for manual triggering. See [`.github/workflows/docupilot.yml`](.github/workflows/docupilot.yml) for the full configuration, including the self-documentation workflow that keeps this README up to date.

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, pricing, and FAQ |
| `/dashboard` | User dashboard — subscription status and activity feed |
| `/setup` | One-click GitHub App creation via manifest flow |
| `/blog/auto-documentation-github` | Blog post: how DocuPilot works |
| `/compare/mintlify` | DocuPilot vs Mintlify comparison |
| `/compare/readme` | DocuPilot vs ReadMe comparison |
| `/compare/documentation-ai` | DocuPilot vs Documentation.AI comparison |
| `/privacy` | Privacy Policy (Stripe-compliant) |
| `/terms` | Terms of Service (Stripe-compliant) |
| `/checkout/success` | Post-payment confirmation |
| `/checkout/cancel` | Cancelled checkout landing |

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | GET | Initiates GitHub OAuth flow |
| `/api/auth/callback` | GET | GitHub OAuth callback; creates session |
| `/api/auth/logout` | GET | Clears session cookie |
| `/api/auth/me` | GET | Returns current authenticated user |
| `/api/webhook/github` | POST | Receives GitHub push/installation events |
| `/api/stripe/checkout` | POST | Creates a Stripe Checkout session |
| `/api/stripe/webhook` | POST | Handles Stripe billing events |
| `/api/user/subscription` | GET | Returns the authenticated user's subscription |
| `/api/user/activity` | GET | Returns recent activity for the user |
| `/api/health` | GET | Service health check (env vars + API connectivity) |
| `/api/stats` | GET | Aggregate user and repo counts |
| `/api/waitlist` | POST | Adds an email to the waitlist |
| `/api/setup/callback` | GET | Completes GitHub App manifest flow |

## Configuration

Create a `.docupilot.yml` in your repository root to customize behavior:

```yaml
# Which docs to generate (all true by default except api_docs)
generate:
  readme: true
  changelog: true
  api_docs: false

# Documentation language
language: en

# Files/patterns to exclude from analysis
ignore:
  - "**/*.test.ts"
  - "**/__snapshots__/**"
  - "node_modules/**"

# Auto-merge generated PRs (default: false)
auto_merge: false

# Additional instructions for the AI
custom_instructions: "Use concise language. Focus on usage examples."
```

If no config file is present, DocuPilot uses sensible defaults (README + CHANGELOG, English, no auto-merge).

## Pricing

| Plan | Price | Repos | Features |
|------|-------|-------|----------|
| **Free** | $0/mo | 1 | README, CHANGELOG |
| **Starter** | $9/mo | Up to 5 | README, CHANGELOG |
| **Pro** | $29/mo | Unlimited | All docs + API docs + custom templates |

Competitors like Mintlify charge $300+/mo. DocuPilot starts free. See our [comparison pages](/compare/mintlify) for a detailed breakdown.

## Tech Stack

- [Next.js 16](https://nextjs.org) — App framework (App Router)
- [React 19](https://react.dev) — UI library
- [Tailwind CSS 4](https://tailwindcss.com) — Styling
- [Vercel](https://vercel.com) — Hosting, deployment, and KV storage
- [GitHub App](https://docs.github.com/en/apps) — Repository integration via `pushdocs`
- [Claude API (Anthropic)](https://docs.anthropic.com) — AI documentation generation
- [Stripe](https://stripe.com) — Billing & subscriptions
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) — Session and OAuth token storage

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_APP_ID` | Yes | GitHub App ID |
| `GITHUB_APP_PRIVATE_KEY` | Yes | GitHub App private key (PEM) |
| `GITHUB_WEBHOOK_SECRET` | Yes | Webhook signature secret |
| `GITHUB_OAUTH_CLIENT_ID` | Yes | OAuth App client ID |
| `GITHUB_OAUTH_CLIENT_SECRET` | Yes | OAuth App client secret |
| `ANTHROPIC_API_KEY` | Yes | Claude API key |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_STARTER_PRICE_ID` | Yes | Stripe price ID for Starter plan |
| `STRIPE_PRO_PRICE_ID` | Yes | Stripe price ID for Pro plan |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `SESSION_SECRET` | Yes | Secret for signing session JWTs |
| `KV_REST_API_URL` | Yes | Vercel KV REST URL |
| `KV_REST_API_TOKEN` | Yes | Vercel KV REST token |
| `NEXT_PUBLIC_APP_URL` | No | Public base URL (defaults to `https://docupilot-alpha.vercel.app`) |

## Development

```bash
npm install
npm run dev
```

The health check endpoint at `/api/health` reports connectivity status for all external services and confirms all required environment variables are set.

## License

Proprietary. All rights reserved.
