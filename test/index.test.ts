import { describe, expect, test } from 'bun:test'
import { Zaim } from '../src'

describe('Zaim', () => {
	test('should initialize with credentials', () => {
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
		})
		expect(zaim).toBeDefined()
	})

	test('should initialize with access tokens', () => {
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
			accessToken: 'token',
			accessTokenSecret: 'secret',
		})
		expect(zaim).toBeDefined()
	})

	test('should set access token', () => {
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
		})
		zaim.setAccessToken('new-token', 'new-secret')
	})
})
