# Convinced docs

Public documentation for the Convinced campaign API, managed voice-first widget, and JavaScript Widget SDK. The site is built with [Mintlify](https://mintlify.com) and deployed at [docs.getconvinced.ai](https://docs.getconvinced.ai).

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

Navigation is defined in `docs.json`. Two top-level tabs:

- **Guides** — campaign, Widget SDK, managed iframe, voice, MCP, security, and migration pages.
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

## SDK client handoff

The Widget SDK guides cover the published 0.1.0 baseline and the unpublished `0.1.1-webmcp.2` handoff. The latter includes WebMCP and authenticated management of the actual ElevenLabs system prompt and first message. Start at `guides/widget-sdk/overview.mdx`, then `client-handoff.mdx`; study links are included there. Management endpoint pages are deliberately separate from the Campaign OpenAPI because they use authenticated ADMIN sessions, not Campaign partner keys.

The customer must receive the matching SDK tarball/backend patch and have the backend deployed with the exact agent ownership binding. Publishing docs alone does not enable the API. Campaign/MCP examples use a named public-host placeholder: supply the customer deployment origin during onboarding; never use a Railway internal hostname from an external client.
