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
- **Duplicate PR prevention** — Reuses existing open DocuPilot PRs instead of creating duplicates

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

## Comparisons

- [DocuPilot vs Mintlify](https://docupilot-alpha.vercel.app/compare/mintlify)
- [DocuPilot vs ReadMe](https://docupilot-alpha.vercel.app/compare/readme)
- [DocuPilot vs Documentation.AI](https://docupilot-alpha.vercel.app/compare/documentation-ai)

## Tech Stack

- [Next.js](https://nextjs.org) — App framework
- [Vercel](https://vercel.com) — Hosting & deployment
- [GitHub App](https://docs.github.com/en/apps) — Repository integration
- [Claude API](https://docs.anthropic.com) — AI documentation generation
- [Stripe](https://stripe.com) — Billing & subscriptions
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) — Session & token storage

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/login` | GET | Initiates GitHub OAuth flow |
| `/api/auth/callback` | GET | Handles OAuth callback, creates session |
| `/api/auth/logout` | GET | Clears session and redirects home |
| `/api/auth/me` | GET | Returns current authenticated user |
| `/api/webhook/github` | POST | Receives GitHub push/installation events |
| `/api/stripe/checkout` | POST | Creates a Stripe checkout session |
| `/api/stripe/webhook` | POST | Handles Stripe billing events |
| `/api/user/subscription` | GET | Returns current user's subscription status |
| `/api/user/activity` | GET | Returns recent documentation activity |
| `/api/health` | GET | Service health check (env vars + API connectivity) |
| `/api/stats` | GET | Returns aggregate user/repo counts |

## Development

```bash
npm install
npm run dev
```

Requires environment variables — see `.env.example` for the full list.

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_APP_ID` | GitHub App ID |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key (PEM) |
| `GITHUB_WEBHOOK_SECRET` | Webhook signature secret |
| `GITHUB_OAUTH_CLIENT_ID` | OAuth App client ID |
| `GITHUB_OAUTH_CLIENT_SECRET` | OAuth App client secret |
| `ANTHROPIC_API_KEY` | Claude API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_STARTER_PRICE_ID` | Stripe price ID for Starter plan |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro plan |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SESSION_SECRET` | Secret for signing session tokens |
| `KV_REST_API_URL` | Vercel KV REST URL |
| `KV_REST_API_TOKEN` | Vercel KV REST token |
| `NEXT_PUBLIC_APP_URL` | Public base URL (e.g. `https://docupilot-alpha.vercel.app`) |

## Legal

- [Privacy Policy](https://docupilot-alpha.vercel.app/privacy)
- [Terms of Service](https://docupilot-alpha.vercel.app/terms)
- [特定商取引法に基づく表記](https://docupilot-alpha.vercel.app/tokusho)

## License

Proprietary. All rights reserved.
