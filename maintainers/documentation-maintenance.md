# Maintaining shared SDK and API documentation

Research checked: 2026-09-15. Audience: documentation maintainers. This note separates published source guidance from recommended project practices; it does not assert that the recommended checks already exist.

**Keep the public audience broad and each page purposeful.**

Source guidance: Diátaxis organizes documentation around readers' needs: learning, completing work, looking up facts, and understanding concepts. Reference material should describe the product neutrally. [Diátaxis primer](https://diataxis.fr/start-here/)

Recommended practice: Write shared docs for any developer integrating the supported SDK or API. State prerequisites, intended reader, and outcome where they affect understanding. Keep account-specific rollout plans and private operational instructions in their own appropriate materials. A customer request can reveal a reusable documentation gap; it should not redefine the audience of the public site. Make generic workflows concrete without implying that one deployment's choices are required product behavior.

Use the four purposes to review individual pages:

| Purpose | What the page should deliver |
| --- | --- |
| Tutorial | A guided first success with a verifiable result. |
| How-to | Steps for an existing user to complete one task. |
| Reference | Exact signatures, fields, defaults, constraints, and errors. |
| Explanation | Reasons, concepts, and tradeoffs that support understanding. |

Link between these pages when readers need another kind of help. This applies the distinctions in the [Diátaxis primer](https://diataxis.fr/start-here/); it does not require four new navigation sections.

**Change illustrative values without changing the contract.**

Source guidance: Google's style guide recommends fictional names, descriptive example projects, reserved domains such as `example.com`, and explicit placeholders instead of real personal or account information. [Google: Example domains and names](https://developers.google.com/style/examples)

Recommended practice: Use a small, consistent fictional scenario. Explain which values readers replace, such as `API_KEY`, `RESOURCE_ID`, and a configurable application origin. Preserve real public package names, import paths, method names, endpoint paths, configuration keys, and response shapes. A product-owned API host is contract information when it identifies the supported service; a sample customer's website is illustrative data. Do not mechanically replace both. Removing customer branding must not produce invented interfaces or unusable requests.

**Connect claims to the released contract and its version.**

Source guidance: Mintlify recommends generating endpoint references from OpenAPI and keeping schemas and request/response examples together. Its maintenance guidance says deprecated features need notices and migration information while users still depend on them. [Mintlify: API documentation guide](https://www.mintlify.com/library/how-to-write-api-documentation), [Mintlify: Maintenance](https://www.mintlify.com/docs/guides/maintenance)

Recommended practice: Identify the authoritative schema or exported SDK declarations for each documented interface. Check prose against the supported release, and reconcile disagreements with its owner. Label version-dependent behavior and keep migration instructions explicit. Generate repetitive reference facts where practical; inspect the generated result. A schema can also be stale. Avoid duplicating signatures across guides when a reference link provides the answer.

**Validate examples as executable instructions.**

Source guidance: Mintlify recommends runnable samples with dependencies, imports, clearly explained placeholders, and representative responses. It calls for testing samples before publication and after API changes, while retaining real response nesting and data types. [Mintlify: API documentation guide](https://www.mintlify.com/library/how-to-write-api-documentation)

Recommended practice: Maintain tested example files and reuse their snippets where tooling permits. Run meaningful sample checks against supported versions with controlled fixtures or a test environment. Verify expected output and relevant failure behavior. Label intentionally incomplete fragments. Rendering successfully proves formatting, not that a sample calls a real method or produces its claimed result.

**Make documentation part of the product change.**

Source guidance: Write the Docs describes a workflow using version control, review, issue tracking, and automated tests. Mintlify recommends updating docs with the corresponding code change and making responsibility visible. [Write the Docs: Docs as Code](https://www.writethedocs.org/guide/docs-as-code/), [Mintlify: Maintenance](https://www.mintlify.com/docs/guides/maintenance)

Recommended practice: Each change to public behavior should identify affected reference pages, guides, examples, and migration notes. Include those edits in the same pull request where possible; otherwise link the coordinated documentation change and its release timing. Assign technical accuracy to the feature owner and consistency/navigation to a docs owner. Review frequently used setup pages and recurring support problems first. Use review dates to prompt inspection, not as evidence that content is correct.

**Check the build, links, and published result separately.**

Source guidance: `mint validate` performs strict build validation, including referenced OpenAPI specifications. `mint broken-links` checks internal Markdown/MDX links by default; anchors, external URLs, redirects, and snippet links have additional flags. It does not check links inside OpenAPI files. [Mintlify: CLI command reference](https://www.mintlify.com/docs/cli/commands)

Recommended practice: Use a pinned CLI version in the documented verification workflow. Run build and link checks before publishing; confirm supported flags with that version. Inspect changed pages in a preview for navigation, readable code, tabs, and expected links. After deployment, verify the intended revision, key public URLs, assets, and redirects on the served site. Record any unperformed check accurately. A successful local build does not establish that the correct content reached production.
