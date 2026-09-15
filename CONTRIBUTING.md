# Contribute to the documentation

These are shared Convinced product docs for developers integrating the SDK and APIs. Every public guide should make sense without knowledge of a particular customer or sales engagement.

## Choose what belongs here

Use customer questions to identify general concepts or missing tasks. Keep customer architecture, saved prompts, account configuration and acceptance reports in that customer's implementation material. This source repository is public; hiding a page from navigation does not make it private.

Use a consistent fictional example and clearly marked replacement values. Keep exact public contracts, including method names, endpoint paths, package names and service origins. A sample name can change; a supported API identifier cannot be generalized arbitrarily.

## Give the page one purpose

| Page | Reader outcome |
| --- | --- |
| SDK overview | Understand the product and choose a supported integration |
| Quickstart | Complete one working setup and verify the result |
| How-to guide | Complete a specific task in an existing application |
| API or SDK reference | Look up exact fields, methods, defaults, errors and constraints |
| Explanation | Understand responsibilities and tradeoffs |
| Migration or launch checklist | Upgrade or validate an integration |

Keep the current navigation unless a user need justifies changing it. Link to deeper explanations from a quickstart. Preserve useful page URLs and anchors when reorganizing content.

## Maintain the source of truth

| Content | Authority | Update trigger |
| --- | --- | --- |
| SDK interfaces and defaults | Published package, declarations and corresponding tagged source | SDK release or changed public behavior |
| Hosted capability and authentication | Deployed service contract and verified route behavior | Backend release or provisioning change |
| Campaign request/response reference | api-reference/openapi.json, checked against service behavior | Schema or endpoint change |
| External provider/browser integration | Provider's official documentation and tested compatible versions | Provider or browser change |
| Examples | Reviewed example files with pinned dependencies and expected outcomes | Any dependent contract change |

The implementing engineer is responsible for technical accuracy; the documentation maintainer is responsible for audience, consistency and navigation. Identify those responsibilities in the related work without assuming a particular employee or team exists.

Product changes should include documentation updates. When code and docs live in separate repositories, link the PRs and coordinate their release. Record the supported version and required backend features. Do not describe an SDK method as a deployed endpoint solely because its type exists.

## Preview and check

Use Node.js 22.14 or newer. Install the tested Mintlify CLI version once:

```bash
npm install --global mint@4.2.893
```

Run from the documentation root:

```bash
mint dev
```

Inspect the changed page and its navigation, code blocks and mobile layout where relevant. Before merging, run these checks sequentially:

```bash
mint validate
mint broken-links
```

Also check what those commands cannot establish:

- Type-check changed complete examples against the documented SDK package; run changed behavior with controlled fixtures or a suitable test environment. Label incomplete fragments and untested behavior.
- Check both Markdown links and component `href` attributes. Test changed external URLs and downloads; the internal link check is not a deployment or provider check.
- Validate links inside OpenAPI separately. Keep response nesting and data types intact when changing illustrative values.
- Review customer-specific details, duplicated contracts and release-history material before publishing a shared guide.

Do not run concurrent package installations against the same npm cache. A tooling installation error is not a content-validation result; use the installed pinned CLI or resolve the installation before reporting checks.

## Publish and verify

Open a PR describing the reader's problem, source/version used and validation performed. The Mintlify integration deploys main after merge. Verify the changed content on the live site, including downloads and redirects; record anything not verified.

The current site serves JSON tool catalogs directly. TypeScript and text downloads use immutable public repository URLs because the current hosting plan does not serve those extensions. After changing a downloadable example, publish its reviewed source commit, update every Markdown and component link to it, and verify the returned bytes match.

## Keep the docs current

Review affected docs with each product release. Use recurring support questions, unsuccessful searches and reader feedback to prioritize targeted corrections. Periodically review the quickstart, authentication, capability matrix and migration guidance. A review date prompts inspection; it does not prove correctness.

The research behind these conventions is in [Maintaining shared SDK and API documentation](maintainers/documentation-maintenance.md). These are maintenance responsibilities, not a claim that a scheduled audit or additional CI job is already configured.
