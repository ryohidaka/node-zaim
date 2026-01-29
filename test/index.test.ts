import { describe, expect, test } from 'bun:test'
import { Zaim } from '../src'
import { MockOAuthClient } from './mocks'

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

	test('should accept custom OAuth client', () => {
		const mockOAuth = new MockOAuthClient()
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
			oauthClient: mockOAuth.asOAuth(),
		})
		expect(zaim).toBeDefined()
	})

	test('should get request token successfully', async () => {
		const mockOAuth = new MockOAuthClient()
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
			accessToken: 'token',
			accessTokenSecret: 'secret',
			oauthClient: mockOAuth.asOAuth(),
		})

		const { token, tokenSecret } = await zaim.getRequestToken()
		expect(token).toBe('mock_request_token')
		expect(tokenSecret).toBe('mock_request_token_secret')
	})

	test('should generate authorize URL', () => {
		const mockOAuth = new MockOAuthClient()
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
			accessToken: 'token',
			accessTokenSecret: 'secret',
			oauthClient: mockOAuth.asOAuth(),
		})
		const url = zaim.getAuthorizeUrl('test-token')
		expect(url).toBe('https://auth.zaim.net/users/auth?oauth_token=test-token')
	})

	test('should get access token successfully', async () => {
		const mockOAuth = new MockOAuthClient()
		const zaim = new Zaim({
			consumerKey: 'test-key',
			consumerSecret: 'test-secret',
			oauthClient: mockOAuth.asOAuth(),
		})

		const { accessToken, accessTokenSecret } = await zaim.getAccessToken(
			'request-token',
			'request-secret',
			'verifier',
		)

		expect(accessToken).toBe('mock_access_token')
		expect(accessTokenSecret).toBe('mock_access_token_secret')
	})
})
