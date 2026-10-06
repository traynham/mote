# Changelog

## 1.0.0-beta.4

- Replace gray-matter with the maintained `@11ty/gray-matter` 2.x fork using
  YAML 4, removing `sprintf-js` from production dependencies.
- Add frontmatter regression tests for data types, aliases, content extraction,
  JSON, file rendering, layouts, blocks, and Markdown.
- Require Node.js 24 or newer; verify on 24.21.0 and upgrade Jest to 30.5.2.
- Include frontmatter migration documentation in the npm package.
- Update Mote metadata and the repository URL; correct the documented file API.
- Restrict shipped browser artifacts to the engine, parser, plugins, and bundle.
- Add an isolated npm tarball smoke test for Node and Express consumers.

Compatibility changes: YAML indentation requires spaces; leading-zero integers
are decimal, sexagesimal numbers become strings, binary data uses Uint8Array,
and JavaScript frontmatter is no longer supported. See
[migration notes](docs/frontmatter-migration.md).

The production audit is clean. Jest's development dependency chain still
contains unpatched `sprintf-js`; it is not installed by production consumers.
