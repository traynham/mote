import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

const payload = {
	text: '   this is MY text   ',
	empty_text: '',
	number: 123,
	test: {bob: 'meh'}
}

// Turning off console.
console.log = () => {}

describe("merge", () => {

	test("should return same template if no payload", () => {
		const template = 'test template'
		expect(textSynth.merge(template)).toBe(template)
	})

	test("should set views if no views in payload", () => {
		const template = 'test template'
		const payload = { _synth: {} }
		textSynth.options.paths.views = 'test views'
		textSynth.merge(template, payload)
		expect(payload._synth.views).toBe('test views')
	})

	test("should set flush_comments if in payload", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: true } }
		textSynth.merge(template, payload)
		expect(textSynth.options.flush_comments).toBe(true)
	})

	test("should remove comments if flush_comments is true", () => {
		const template = 'test template \n //comment \n /* comment */ <!-- comment -->'
		const payload = { _synth: { flush_comments: false } }
		expect(textSynth.merge(template, payload).trim()).toBe('test template \n //comment \n /* comment */ <!-- comment -->')
	})

	test("should remove leading tabs if removeTabs is true", () => {
		const template = '\ttest template'
		const payload = { _synth: {} }
		textSynth.options.removeTabs = true
		expect(textSynth.merge(template, payload)).toBe('test template')
	})

	test("preserves bracketed text that is not a tag", () => {
		const template = 'A recent title [Adapted as a movie] should render.'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves multiple bracketed prose notes", () => {
		const template = '[Book note] Title [Adapted as a movie]'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves bracketed text that does not start with a tag-like name", () => {
		const template = 'Edition [2026] and rating [*****]'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("still renders known merge tags outside raw code", () => {
		const template = 'Before [text] after'
		expect(textSynth.merge(template, payload)).toBe('Before    this is MY text    after')
	})

	test("preserves css attribute selectors", () => {
		const template = 'a[href^="https://"] { color: rebeccapurple; }'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves multiple css bracket selectors", () => {
		const template = 'input[type="checkbox"]:checked + label[for="done"] { font-weight: bold; }'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves bracketed text in css string values", () => {
		const template = '.book::after { content: "[Adapted as a movie]"; }'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves css bracket selectors while rendering tags", () => {
		const template = '<style>[data-title="[Adapted as a movie]"] { display: block; }</style><p>[uppercase: text]</p>'
		const expected = '<style>[data-title="[Adapted as a movie]"] { display: block; }</style><p>   THIS IS MY TEXT   </p>'
		expect(textSynth.merge(template, payload)).toBe(expected)
	})

	test("preserves style tags with attributes as raw code", () => {
		const template = '<style media="screen and (min-width: 40rem)">[data-count="1"] { --label: "[text]"; }</style>'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves javascript arrays in script tags", () => {
		const template = '<script>const values = [text, number, "literal"];</script>'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves script tags with attributes as raw code", () => {
		const template = '<script type="module">const template = `[text]`; const values = [1, 2, 3];</script>'
		expect(textSynth.merge(template, payload)).toBe(template)
	})

	test("preserves javascript bracket syntax while rendering tags outside scripts", () => {
		const template = '<script>const [first] = items; const label = data["[Adapted as a movie]"];</script><p>[uppercase: text]</p>'
		const expected = '<script>const [first] = items; const label = data["[Adapted as a movie]"];</script><p>   THIS IS MY TEXT   </p>'
		expect(textSynth.merge(template, payload)).toBe(expected)
	})

	test("preserves javascript array literals that look like merge tags in scripts", () => {
		const template = '<script>const selected = [text]; const keys = ["[text]", "[Adapted as a movie]"];</script>'
		expect(textSynth.merge(template, payload)).toBe(template)
	})
	
	// test("show bogus tags", () => {
	// 	textSynth.showUndefinedTags = true
	// 	const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
	// 	let result = textSynth.merge(template, payload)
	// 	expect(result).toBe("THIS is a [bogus \"random\"] TAG.")
	// })
	
	// test("hide bogus tags", () => {
	// 	textSynth.showUndefinedTags = false
	// 	const template = '[upper: "this"] is a [bogus "random"] [upper: "tag"].'
	// 	let result = textSynth.merge(template, payload)
	// 	expect(result).toBe('THIS is a  TAG.')
	// })
	
	test("set as markdown", () => {
		let payload = { _synth: { md: true}}
		const template = '# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('<h1>My Great Title.</h1>')
	})
	
	test("set markdown to false if page opt is false.", () => {
		let payload = { _synth: { md: true}}
		const template = '---\nmd: false\n---\n\n# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('# My Great Title.')
	})
	
	test("don't remove tabs", async () => {
		let textSynth = await TextSynth({removeTabs: false})
		const template = '	Template with a tab.'
		let result = textSynth.merge(template, payload)
		expect(result).toBe('	Template with a tab.')
	})
	
	test("set to use cache", () => {
		let payload = { _synth: { md: true}}
		const template = '---\ncache: true\n---\n# My Great Title.'
		let result = textSynth.merge(template, payload).trim()
		expect(result).toBe('<h1>My Great Title.</h1>')
	})
	
})
