# Changelog

All notable changes to DocuPilot are documented here.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.2.0] - 2026-04-04

### Added
- **Documentation.AI comparison page** (`/compare/documentation-ai`) — side-by-side feature and pricing breakdown with cross-link footers and structured JSON-LD metadata.
- **Privacy Policy page** (`/privacy`) — Stripe-compliant privacy policy detailing data collection, usage, retention, and user rights. Last updated April 4, 2026.
- **Terms of Service page** (`/terms`) — Stripe-compliant terms covering acceptable use, subscriptions, refunds, and liability. Required for Stripe live-mode activation.
- **DocuPilot GitHub Action workflow** (`.github/workflows/docupilot.yml`) — self-documentation workflow that runs on push and supports `workflow_dispatch` for manual triggering.
- **`workflow_dispatch` trigger** added to the DocuPilot Action workflow, enabling on-demand documentation runs from the GitHub Actions UI.
- `/privacy` and `/terms` entries added to `sitemap.ts` (priority 0.3, yearly change frequency).
- `/compare/documentation-ai` entry added to `sitemap.ts` (priority 0.8, monthly change frequency).

### Changed
- **Mintlify comparison page** (`/compare/mintlify`) — updated with cross-link footer referencing the new Documentation.AI and ReadMe comparison pages.
- **ReadMe comparison page** (`/compare/readme`) — updated with cross-link footer referencing the new Documentation.AI and Mintlify comparison pages.
- **Home page** (`/`) — updated footer and internal links to include Privacy Policy, Terms of Service, and the new comparison page.
- **Sitemap** (`sitemap.ts`) — now includes all comparison pages, legal pages, and the blog post with appropriate priorities and change frequencies.

### Fixed
- Cross-link footers were missing from comparison pages; all three comparison pages now link to each other for improved internal SEO.

## [0.1.0] - 2026-03-31

### Added
- Initial release of DocuPilot.
- GitHub App integration via `pushdocs` — listens for `push`, `installation`, and `installation_repositories` events.
- AI-powered documentation generation using the Anthropic Claude API (README, CHANGELOG, API docs).
- Pull request workflow — all generated documentation changes are opened as reviewable PRs, never direct commits.
- GitHub OAuth authentication with session management via signed JWTs and Vercel KV.
- Stripe billing integration — Free ($0), Starter ($9/mo), and Pro ($29/mo) plans with Checkout Sessions and webhook handling.
- User dashboard (`/dashboard`) with subscription status card and activity feed.
- `.docupilot.yml` configuration file support for customizing doc generation, ignore patterns, language, and auto-merge.
- Health check endpoint (`/api/health`) reporting connectivity for Anthropic and Stripe APIs plus environment variable status.
- OpenGraph image generation (`/opengraph-image.tsx`).
- Blog post: "I Built a Free GitHub App That Auto-Updates Your Docs on Every Push" (`/blog/auto-documentation-github`).
- Comparison pages for Mintlify (`/compare/mintlify`) and ReadMe (`/compare/readme`).
- Waitlist API endpoint (`/api/waitlist`) backed by Vercel KV.
- Stats API endpoint (`/api/stats`) for aggregate user and repo counts.
- One-click GitHub App setup via manifest flow (`/setup` + `/api/setup/callback`).
- Robots.txt — disallows `/api/`, `/dashboard/`, and `/checkout/` from crawlers.
- Sitemap (`/sitemap.xml`) covering all public-facing routes.
- Vercel Analytics integration.
- [DocuPilot GitHub Action](https://github.com/AkrMcmr/docupilot-action) (`AkrMcmr/docupilot-action@v1`) for CI/CD-based doc generation.
