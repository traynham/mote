# Frontmatter Dependency Migration

Mote uses `@11ty/gray-matter` 2.x with js-yaml 4 instead of the unmaintained
`gray-matter` package. This removes the production dependency on `sprintf-js`.
The 2.x range is intentional: the fork's 3.x release changes date and merge-key
behavior through js-yaml 5.

YAML and JSON frontmatter, `layout`, `block`, `md`, `cache`, and `importJSON`
continue to work. Dates remain Date objects, and YAML aliases and merge keys
remain supported. Content extraction preserves BOM, CRLF, empty frontmatter,
and missing-closing-delimiter behavior.

Check these cases when updating an application:

- YAML indentation must use spaces. Tabs in template content remain valid.
- Leading-zero integers are decimal: `012` is now 12, formerly 10. Use `0o12`
  for octal 10, or quote numeric identifiers to keep them as strings.
- Sexagesimal values such as `1:20` are strings, formerly numeric 80.
- `!!binary` produces Uint8Array instead of Node Buffer.
- `---javascript` frontmatter is no longer supported. Convert it to YAML or
  `---json`; JavaScript inside template script elements is unaffected.

A comparison inspected 278 template files in Mote's examples/test/static
directories and the local Crypt and jessetraynham.com views. Of those, 239
contained frontmatter. The only real-template differences with the selected
2.x release were two Mote examples with invalid tab indentation, now corrected.
This comparison does not cover other applications or arbitrary future templates.

The browser engine in `src/dist/engine.js` does not parse frontmatter. Its bundle
does not import gray-matter and needs no rebuild for this dependency migration.
Jest's coverage tooling may still install `sprintf-js` as a development
dependency; check runtime dependencies with `npm audit --omit=dev`.
