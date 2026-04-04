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
- **Privacy & compliance pages** — Built-in Privacy Policy and Terms of Service (Stripe-compliant)
- **GitHub Action support** — Run doc generation directly in your CI/CD workflow

## Try It Now

**[docupilot-demo](https://github.com/AkrMcmr/docupilot-demo)** — Fork the template repo, push a change, and see DocuPilot generate docs in 30 seconds.

See real auto-generated PRs:
- [docupilot#2](https://github.com/AkrMcmr/docupilot/pull/2) — README + CHANGELOG update (+57 lines)
- [docupilot-action#1](https://github.com/AkrMcmr/docupilot-action/pull/1) — README + CHANGELOG (+38 lines)

## GitHub Action

Prefer CI/CD? Use the [DocuPilot Action](https://github.com/AkrMcmr/docupilot-action) — same AI doc generation, runs in your workflow:

```yaml
- uses: AkrMcmr/docupilot-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

The action also supports a `workflow_dispatch` trigger, so you can run doc generation on demand from the GitHub Actions UI.

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

Competitors like Mintlify charge $300+/mo. DocuPilot starts free.

## Compare

- [DocuPilot vs Mintlify](https://docupilot-alpha.vercel.app/compare/mintlify)
- [DocuPilot vs ReadMe](https://docupilot-alpha.vercel.app/compare/readme)
- [DocuPilot vs Documentation.AI](https://docupilot-alpha.vercel.app/compare/documentation-ai)

## Privacy & Security

- DocuPilot reads only the **diff** of each push — not your full codebase
- Diffs are sent to the AI model to generate updates, then **immediately discarded**
- Your code is never stored
- Billing is handled entirely by Stripe; we never store card details
- Full details: [Privacy Policy](https://docupilot-alpha.vercel.app/privacy) · [Terms of Service](https://docupilot-alpha.vercel.app/terms)

## Tech Stack

- [Next.js 16](https://nextjs.org) — App framework
- [Vercel](https://vercel.com) — Hosting, deployment & KV storage
- [GitHub App](https://docs.github.com/en/apps) — Repository integration via webhooks
- [Claude API](https://docs.anthropic.com) (Anthropic) — AI documentation generation
- [Stripe](https://stripe.com) — Billing & subscriptions
- [Tailwind CSS v4](https://tailwindcss.com) — Styling

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/auth/login` | Initiate GitHub OAuth flow |
| `GET` | `/api/auth/callback` | GitHub OAuth callback handler |
| `GET` | `/api/auth/logout` | Clear session and redirect home |
| `GET` | `/api/auth/me` | Return current authenticated user |
| `POST` | `/api/webhook/github` | Receive GitHub push/installation webhooks |
| `POST` | `/api/stripe/checkout` | Create a Stripe Checkout session |
| `POST` | `/api/stripe/webhook` | Handle Stripe billing events |
| `GET` | `/api/user/subscription` | Get the current user's subscription status |
| `GET` | `/api/user/activity` | Get documentation activity feed |
| `GET` | `/api/health` | Service health check (env vars + API connectivity) |
| `GET` | `/api/stats` | Aggregate user and repo counts |
| `POST` | `/api/waitlist` | Add an email to the waitlist |

## Development

```bash
npm install
npm run dev
```

Requires environment variables — see `.env.example` for the full list. Key variables include:

| Variable | Description |
|----------|-------------|
| `GITHUB_APP_ID` | GitHub App ID |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key |
| `GITHUB_WEBHOOK_SECRET` | Webhook signature secret |
| `GITHUB_OAUTH_CLIENT_ID` | OAuth App client ID |
| `GITHUB_OAUTH_CLIENT_SECRET` | OAuth App client secret |
| `ANTHROPIC_API_KEY` | Claude API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_STARTER_PRICE_ID` | Stripe price ID for Starter plan |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro plan |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SESSION_SECRET` | Session token signing secret |
| `KV_REST_API_URL` | Vercel KV endpoint |
| `KV_REST_API_TOKEN` | Vercel KV auth token |
| `NEXT_PUBLIC_APP_URL` | Public base URL (e.g. `https://docupilot-alpha.vercel.app`) |

## License

Proprietary. All rights reserved.
