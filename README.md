# Convinced docs

Public documentation for the Convinced campaign API, managed widget, and JavaScript Widget SDK. The site is built with [Mintlify](https://mintlify.com) and deployed at [convinced.mintlify.app](https://convinced.mintlify.app).

## Local development

Install the Mintlify CLI:

```bash
npm i -g mint@4.2.893
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

Use the pinned CLI version above for repeatable checks. Update it deliberately and rerun validation before changing the documented version.

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

## SDK entry point

Share [SDK overview](https://convinced.mintlify.app/guides/widget-sdk/overview). The SDK tab groups setup, voice and actions, interface and sessions, administration and operations, and reference. The implementation checklist is a launch reference, not the first page.

The guides target SDK `0.1.6`. The headless client owns the Convinced session. Optional `gpt-live-1` handles greetings and conversational clarifications directly, and delegates grounded organization, page, slide, and tool requests to `gpt-6-luna`. Completed Live-native user/assistant pairs enter the shared client history, so both typed and delegated Luna requests can use them as context. SDK 0.1.6 bounds Live speech excerpts and splits page context updates to address append-size errors; the full grounded answer remains in the client. Prompt endpoints require an authenticated organization ADMIN session or an authenticated same-origin management proxy; Campaign partner keys are a separate credential.

Downloadable examples in `examples/` contain the complete quickstart module, editor, WebMCP agent prompt, and reviewed implementation instructions. Validate these against the pinned published SDK when changing examples. Do not include private backend source or credentials in public documentation.

Mintlify serves the JSON tool catalogs directly. TypeScript and text downloads link to immutable commits in this public repository because those extensions are not served by the current Mintlify plan. Check the deployed download URLs as well as `mint broken-links`.

## Maintenance standard

Keep public guides reusable across customers. Put customer implementation records in the customer handoff, not this public repository. Follow [CONTRIBUTING.md](CONTRIBUTING.md) for audience, source ownership, versioning, example validation and deployed-link checks. The cited rationale lives in [maintainers/documentation-maintenance.md](maintainers/documentation-maintenance.md), which is excluded from the documentation site.
