# Changelog

All notable changes to DocuPilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- 特定商取引法に基づく表記 (Specified Commercial Transactions Act) page at `/tokusho`
- Comparison page for DocuPilot vs Documentation.AI (`/compare/documentation-ai`) with cross-link footers
- `/tokusho` route added to sitemap
- `/compare/documentation-ai` route added to sitemap
- Demo repository link (`docupilot-demo`) and real PR examples added to README

### Fixed
- **Duplicate PR prevention**: DocuPilot now checks for an existing open PR on the `docupilot/*` branch before creating a new one. If an open PR already exists, it is reused and updated rather than creating a duplicate (`findOpenDocuPilotPR`, `updateBranchRef` added to `src/lib/github.ts`; webhook handler in `src/app/api/webhook/github/route.ts` updated accordingly)
- Stripe integration: resolved two missing requirements to bring the Stripe configuration into full compliance

### Changed
- `src/lib/github.ts`: exported two new helper functions — `findOpenDocuPilotPR` (searches for an open PR opened by the DocuPilot bot on the target branch) and `updateBranchRef` (force-updates a branch reference to a new SHA)
- `src/app/api/webhook/github/route.ts`: updated `processDocGeneration` flow to call `findOpenDocuPilotPR` before `createPullRequest`; if an existing PR is found its branch is updated in place instead of opening a second PR
