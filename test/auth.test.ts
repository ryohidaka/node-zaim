import { describe, expect, test } from 'bun:test'
import { ZaimAuth } from '../src/auth'

describe('ZaimAuth', () => {
	test('should initialize with credentials', () => {
		const auth = new ZaimAuth('test-key', 'test-secret')
		expect(auth).toBeDefined()
		expect(auth.getAccessToken()).toBe('')
		expect(auth.getAccessTokenSecret()).toBe('')
	})

	test('should initialize with access tokens', () => {
		const auth = new ZaimAuth('test-key', 'test-secret', 'token', 'secret')
		expect(auth.getAccessToken()).toBe('token')
		expect(auth.getAccessTokenSecret()).toBe('secret')
	})

	test('should set access token', () => {
		const auth = new ZaimAuth('test-key', 'test-secret')
		auth.setAccessToken('new-token', 'new-secret')
		expect(auth.getAccessToken()).toBe('new-token')
		expect(auth.getAccessTokenSecret()).toBe('new-secret')
	})
})
