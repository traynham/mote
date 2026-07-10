import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

const payload = {
	name: 'Ada',
	count: 2,
	empty: '',
	zero: 0,
	flag: false
}

// Turning off console.
console.log = () => {}

describe('ternary merge', () => {
	test('uses the truthy branch', () => {
		const input = "[count > 0 ? 'Yes' : 'No']"
		expect(textSynth.merge(input, payload)).toBe('Yes')
	})

	test('uses the falsy branch', () => {
		const input = "[flag ? 'Yes' : 'No']"
		expect(textSynth.merge(input, payload)).toBe('No')
	})

	test('supports an omitted falsy branch', () => {
		const input = "[missing ? 'Yes']"
		expect(textSynth.merge(input, payload)).toBe('')
	})

	test('supports plugin calls in values', () => {
		const input = "[name ? name.uppercase() : 'Guest']"
		expect(textSynth.merge(input, payload)).toBe('ADA')
	})

	test('supports logical operators in the condition', () => {
		const input = "[missing || name ? 'Has Name' : 'No Name']"
		expect(textSynth.merge(input, payload)).toBe('Has Name')
	})
})
