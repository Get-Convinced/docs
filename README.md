# Convinced docs

Public documentation for the Convinced campaign API and personalized sales widget. The site is built with [Mintlify](https://mintlify.com) and deployed at [docs.getconvinced.ai](https://docs.getconvinced.ai).

## Local development

Install the Mintlify CLI:

```bash
npm i -g mint
```

From the repo root (where `docs.json` lives):

```bash
mint dev
```

The preview runs at `http://localhost:3000` and reloads on file changes.

If the dev server misbehaves, run `mint update` to grab the latest CLI before filing an issue.

## Content structure

Navigation is defined in `docs.json`. Two top-level tabs:

- **Guides** — `index.mdx`, `quickstart.mdx`, and pages under `guides/campaigns/`.
- **API reference** — pages under `api-reference/` plus `api-reference/openapi.json` (the spec drives the interactive endpoint pages).

Static assets (logos, favicon, screenshots) live in `logo/`, `favicon.svg`, and `images/`. Reusable MDX fragments live in `snippets/`.

## Deploys

The Mintlify GitHub app watches this repo. Pushing to the default branch (`master`) deploys to production automatically — no manual step.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Run `mint dev` locally before opening a PR to make sure pages render and links resolve.

## Issues / contact

- Found a bug or typo? Open an issue on this repo.
- Integration questions? Email [hi@getconvinced.ai](mailto:hi@getconvinced.ai).
- Dashboard: [app.getconvinced.ai](https://app.getconvinced.ai).
