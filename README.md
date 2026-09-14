# Convinced docs

Public documentation for the Convinced campaign API, managed voice-first widget, and JavaScript Widget SDK. The site is built with [Mintlify](https://mintlify.com) and deployed at [convinced.mintlify.app](https://convinced.mintlify.app).

## Local development

Install the Mintlify CLI:

```bash
npm i -g mint
```

From the repo root (where `docs.json` lives):

```bash
mint dev
```

Before submitting documentation changes, validate the build and internal links:

```bash
mint validate
mint broken-links
```

The preview runs at `http://localhost:3000` and reloads on file changes.

If the dev server misbehaves, run `mint update` to grab the latest CLI before filing an issue.

## Content structure

Navigation is defined in `docs.json`. Three top-level tabs:

- **Widget SDK** — overview, quickstart, voice, page actions, UI, administration and launch reference.
- **Guides** — campaign setup, API keys and MCP.
- **API reference** — pages under `api-reference/` plus `api-reference/openapi.json` (the spec drives the interactive endpoint pages).

Static assets (logos, favicon, screenshots) live in `logo/`, `favicon.svg`, and `images/`. Reusable MDX fragments live in `snippets/`.

## Deploys

The Mintlify GitHub app watches this repo. Pushing to the default branch (`main`) deploys to production automatically — no manual step.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Run `mint dev` locally before opening a PR to make sure pages render and links resolve.

## Issues / contact

- Found a bug or typo? Open an issue on this repo.
- Integration questions? Email [hi@getconvinced.ai](mailto:hi@getconvinced.ai).
- Dashboard: [app.getconvinced.ai](https://app.getconvinced.ai).

## SDK client entry point

Share [SDK overview](https://convinced.mintlify.app/guides/widget-sdk/overview). The SDK tab groups setup, voice and actions, interface and sessions, administration and operations, and reference. The implementation checklist is a launch reference, not the first page.

The guides target published npm `0.1.1-webmcp.2`. The overview records verified hosted availability, including missing private voice credentials and chat-tool protocol gaps. Prompt endpoints use authenticated organization ADMIN sessions; Campaign partner keys are a separate credential.

Downloadable examples in `examples/` contain the complete quickstart module, editor, WebMCP helpers, matching provider schemas and reviewed implementation instructions. Validate these against the pinned published SDK when changing examples. Do not include private backend source or credentials in public documentation.
