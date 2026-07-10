import { describe, expect, test } from '@jest/globals'
import TextSynth from '../index.js'

const textSynth = await TextSynth()

const payload = {
	name: 'Ada',
	empty: '',
	zero: 0,
	nope: false
}

// Turning off console.
console.log = () => {}

describe('coalesce merge', () => {
	test('uses the first truthy value', () => {
		const input = "[name || 'General User']"
		expect(textSynth.merge(input, payload)).toBe('Ada')
	})

	test('falls back on falsy payload values', () => {
		expect(textSynth.merge("[empty || 'General User']", payload)).toBe('General User')
		expect(textSynth.merge("[zero || 'General User']", payload)).toBe('General User')
		expect(textSynth.merge("[nope || 'General User']", payload)).toBe('General User')
	})

	test('supports chaining', () => {
		const input = "[missing || name || 'General User']"
		expect(textSynth.merge(input, payload)).toBe('Ada')
	})

	test('supports plugin calls in paths', () => {
		const input = "[name.uppercase() || 'General User']"
		expect(textSynth.merge(input, payload)).toBe('ADA')
	})

	test('returns the last value when all are falsy', () => {
		const input = "[missing || '' || 0]"
		expect(textSynth.merge(input, payload)).toBe('0')
	})
})
