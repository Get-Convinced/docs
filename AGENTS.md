# Documentation project instructions

This repository publishes shared Convinced SDK and API documentation at https://convinced.mintlify.app. User instructions take precedence over these defaults.

## Audience and boundaries

Write for any developer integrating the supported product. A question about one customer's implementation can expose a general documentation gap; explain the reusable pattern without making that customer the public guide's subject.

Keep customer names, routes, agent IDs, saved prompts, repository/deployment details, acceptance reports and rollout instructions in the conversation or the customer's handoff material. Do not put private records here, including in unlisted pages: this repository is public. Publish a named case study only as an explicitly requested, separate case study.

Use fictional example data, reserved example domains and clearly identified placeholders. Preserve actual public API names, schemas, package names, service origins and defaults. Never replace a real contract with an invented generic one.

## Page purpose and structure

- Overview: explain the SDK and help the reader choose an integration.
- Quickstart: one complete path to a verifiable first result.
- How-to guide: one practical integration task with prerequisites.
- Reference: exact interfaces, defaults, limits, errors and compatibility.
- Migration or launch guide: reusable upgrade or acceptance steps.

Link between purposes; do not duplicate the same setup or turn every page into a release report. Improve existing pages before creating new navigation groups. Keep existing URLs and useful section anchors when possible.

Use second-person, active voice, sentence-case headings and concise language. Identify required application inputs and distinguish complete examples from fragments.

## Sources and versioning

Check SDK claims against the supported release's exports and behavior. Check hosted capabilities against the deployed backend, not just SDK types or unreleased code. Keep SDK availability, hosted availability and experimental browser support distinct. Retain known limitations until verified product changes resolve them.

Keep Campaign schemas in api-reference/openapi.json and link task guides to reference details. Use the SDK overview availability table as the shared starting point; link to it instead of copying release-audit narratives. Record technical evidence and related product changes in the PR.

## Change workflow

Follow CONTRIBUTING.md for the pinned tools and release checks. Preview changed pages, validate the build and links, and type-check changed complete examples against the documented SDK version. Check MDX component hrefs and links in OpenAPI, not only Markdown links.

After publication, verify the changed live pages and any changed downloads. A successful local build is not proof of deployed content or working samples. Use immutable public URLs for source downloads unsupported by the current Mintlify plan.

Do not create new approval steps or claim checks ran when they did not. Keep maintenance notes under maintainers/ and out of the site navigation. Research rationale is in maintainers/documentation-maintenance.md.
