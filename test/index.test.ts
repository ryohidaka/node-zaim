import { describe, expect, test } from 'bun:test'
import { Zaim } from '../src'

describe('Zaim', () => {
	test('should initialize', () => {
		const zaim = new Zaim()
		expect(zaim).toBeDefined()
	})
})
