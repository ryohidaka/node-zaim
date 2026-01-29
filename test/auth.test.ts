import { describe, expect, test } from 'bun:test'
import { OAuth } from 'oauth'
import { ZaimAuth } from '../src/auth'
import { MockOAuthClient } from './mocks'

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

	test('should ZaimAuth be an OAuth client', () => {
		const auth = new ZaimAuth('test-key', 'test-secret', '', '')
		expect(auth.getOAuthClient() instanceof OAuth).toBe(true)
	})

	test('should accept custom OAuth client', () => {
		const mockOAuth = new MockOAuthClient()
		const auth = new ZaimAuth(
			'test-key',
			'test-secret',
			'',
			'',
			mockOAuth.asOAuth(),
		)
		expect(auth.getOAuthClient()).toBe(mockOAuth.asOAuth())
	})

	test('should get request token successfully with default callback', async () => {
		const mockOAuth = new MockOAuthClient()
		const auth = new ZaimAuth(
			'test-key',
			'test-secret',
			'',
			'',
			mockOAuth.asOAuth(),
		)

		const { token, tokenSecret } = await auth.getRequestToken()
		expect(token).toBe('mock_request_token')
		expect(tokenSecret).toBe('mock_request_token_secret')
	})

	test('should get request token successfully with custom callback', async () => {
		const mockOAuth = new MockOAuthClient()
		const auth = new ZaimAuth(
			'test-key',
			'test-secret',
			'',
			'',
			mockOAuth.asOAuth(),
		)

		const { token, tokenSecret } = await auth.getRequestToken(
			'https://example.com/callback',
		)
		expect(token).toBe('mock_request_token')
		expect(tokenSecret).toBe('mock_request_token_secret')
	})

	test('should throw error on request token failure', async () => {
		const mockOAuth = new MockOAuthClient()
		mockOAuth.setShouldFail(true, { statusCode: 401 })
		const auth = new ZaimAuth(
			'test-key',
			'test-secret',
			'',
			'',
			mockOAuth.asOAuth(),
		)

		await expect(auth.getRequestToken()).rejects.toThrow(
			'Failed to get request token',
		)
	})

	test('should generate authorize URL', () => {
		const auth = new ZaimAuth('test-key', 'test-secret')
		const url = auth.getAuthorizeUrl('test-token')
		expect(url).toBe('https://auth.zaim.net/users/auth?oauth_token=test-token')
	})
})
