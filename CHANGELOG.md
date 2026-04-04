# Changelog

All notable changes to DocuPilot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- **GitHub Action support** (`AkrMcmr/docupilot-action@v1`) — DocuPilot can now run as a GitHub Actions workflow in addition to the GitHub App, giving teams full control over when and how documentation is generated.
- `workflow_dispatch` trigger on the DocuPilot workflow — allows manual documentation runs directly from the GitHub Actions UI without requiring a code push.
- SEO comparison pages: [DocuPilot vs Mintlify](/compare/mintlify) and [DocuPilot vs ReadMe](/compare/readme) — side-by-side feature and pricing breakdowns for developers evaluating alternatives.
- Blog post: ["I Built a Free GitHub App That Auto-Updates Your Docs on Every Push"](/blog/auto-documentation-github) — covers the motivation and architecture behind DocuPilot.
- Blog link added to landing page footer for improved content discoverability.
- GitHub Action cross-reference added to documentation, clarifying setup differences between the App and Action integration paths.

### Changed
- DocuPilot workflow (`docupilot.yml`) updated to include `workflow_dispatch` alongside the existing `push` to `main` trigger, enabling on-demand documentation generation.
