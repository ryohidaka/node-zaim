import type { OAuth } from 'oauth'

export class MockOAuthClient {
	// Helper method to cast to OAuth type
	asOAuth(): OAuth {
		return this as unknown as OAuth
	}
}
