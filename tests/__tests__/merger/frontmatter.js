import { describe, expect, test } from '@jest/globals'
import Matter from '@11ty/gray-matter'
import TextSynth from '../index.js'

const mote = await TextSynth({ views: './tests/support/views' })
const document = (data, body = 'Body') => `---\n${data}\n---\n${body}`

describe('frontmatter compatibility', () => {
	test.each(['', 'Body', '----\nBody', '# Heading\n---\nBody'])('preserves ordinary content %p', input => {
		expect(Matter(input).content).toBe(input)
		expect(Matter(input).data).toEqual({})
	})

	test.each(['\n', '\r\n'])('handles BOM and line endings %p', newline => {
		const result = Matter(`\uFEFF---${newline}title: Book${newline}---${newline}Body`)
		expect(result.data).toEqual({ title: 'Book' })
		expect(result.content).toBe('Body')
	})

	test('retains dates, strings, booleans, nulls, arrays and nested values', () => {
		const result = Matter(document('date: 2026-10-06\ntitle: "[Adapted as a movie]"\nflag: yes\ntruth: true\nnothing: null\nitems: [one, two]\nnested:\n  value: 3'))
		expect(result.data).toEqual({ date: new Date('2026-10-06'), title: '[Adapted as a movie]', flag: 'yes', truth: true, nothing: null, items: ['one', 'two'], nested: { value: 3 } })
	})

	test('retains aliases, merge keys and multiline strings', () => {
		const result = Matter(document('defaults: &defaults\n  title: Book\npage:\n  <<: *defaults\nliteral: |\n  first\n  second\nfolded: >\n  first\n  second'))
		expect(result.data.page).toEqual({ title: 'Book' })
		expect(result.data.literal).toBe('first\nsecond\n')
		expect(result.data.folded).toBe('first second\n')
	})

	test('handles empty and comment-only frontmatter', () => {
		expect(Matter(document('# comment')).data).toEqual({})
		expect(Matter(document('')).content).toBe('Body')
	})

	test('keeps missing closing delimiter behavior', () => {
		const result = Matter('---\ntitle: Book')
		expect(result.data).toEqual({ title: 'Book' })
		expect(result.content).toBe('')
	})

	test('supports JSON frontmatter', () => {
		expect(mote.merge('---json\n{"title":"Book"}\n---\n[page.title]')).toBe('Book')
	})

	test.each(['name: one\nname: two', 'broken: [one', '\tname: Book'])('rejects malformed YAML %p', data => {
		expect(() => Matter(document(data), {})).toThrow()
	})

	test('defines YAML 4 number and binary semantics', () => {
		const result = Matter(document('decimal: 012\noctal: 0o12\ntime: 1:20\nraw: !!binary SGVsbG8='))
		expect(result.data.decimal).toBe(12)
		expect(result.data.octal).toBe(10)
		expect(result.data.time).toBe('1:20')
		expect(result.data.raw).toEqual(new Uint8Array([72, 101, 108, 108, 111]))
	})

	test('rejects JavaScript frontmatter', () => {
		expect(() => mote.merge('---javascript\n({title: "Book"})\n---\nBody')).toThrow(/JavaScript/)
	})

	test('renders frontmatter through layouts and blocks', () => {
		const template = document('block: body\ntitle: Book', '[page.title]')
		expect(mote.merge(template, { layout: '[block: "body"]Default[/block]' })).toBe('Book')
	})

	test('renders Markdown and allows frontmatter to disable it', () => {
		expect(mote.merge(document('md: true\ntitle: Book', '# [page.title]'))).toBe('<h1>Book</h1>\n')
		expect(mote.merge(document('md: false', '# Heading'), { _synth: { md: true } })).toBe('# Heading')
	})

	test('renders frontmatter from a file', () => {
		expect(mote.mergeFile('frontmatter.md')).toBe('<p>Book: one, two</p>\n')
	})

	test('selects a layout file and content block from frontmatter', () => {
		expect(mote.merge(document('layout: frontmatter-layout.lay\nblock: body\ntitle: Book', '[page.title]'))).toBe('<main>Book</main>\n')
	})
})
