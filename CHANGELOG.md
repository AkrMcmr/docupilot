# Changelog

All notable changes to DocuPilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- **Privacy Policy page** (`/privacy`) — Stripe-compliant privacy policy covering data collection, usage, retention, and user rights
- **Terms of Service page** (`/terms`) — Stripe-compliant terms of service for subscription and usage
- **Documentation.AI comparison page** (`/compare/documentation-ai`) — Side-by-side feature and pricing comparison with cross-link footers
- **Sitemap updates** — New pages included in `sitemap.xml` for improved SEO discoverability
- **Demo repository link** — Added [docupilot-demo](https://github.com/AkrMcmr/docupilot-demo) to README for quick onboarding
- **Real PR examples** — Linked live auto-generated PRs ([#2](https://github.com/AkrMcmr/docupilot/pull/2), [docupilot-action#1](https://github.com/AkrMcmr/docupilot-action/pull/1)) in README
- **DocuPilot self-documentation workflow** — Added GitHub Actions workflow (`.github/workflows/docupilot.yml`) so DocuPilot documents itself on every push
- **`workflow_dispatch` trigger** — DocuPilot Action workflow can now be triggered manually from the GitHub Actions UI
- **Cross-link footers** — Compare pages now link to each other for improved navigation and SEO

### Changed
- README updated with demo repo, real PR examples, compare page links, privacy/terms links, and full API endpoint reference table
