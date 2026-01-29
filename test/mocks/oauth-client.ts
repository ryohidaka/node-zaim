import type { OAuth } from 'oauth'

export class MockOAuthClient {
	private mockResponses: Map<string, Record<string, unknown>> = new Map()
	private shouldFail = false
	private failureError: { statusCode: number; data?: string } = {
		statusCode: 500,
		data: 'Mock error',
	}

	setMockResponse(url: string, response: Record<string, unknown>): void {
		this.mockResponses.set(url, response)
	}

	setShouldFail(
		shouldFail: boolean,
		error?: { statusCode: number; data?: string },
	): void {
		this.shouldFail = shouldFail
		if (error) {
			this.failureError = error
		}
	}

	getOAuthRequestToken(
		paramsOrCallback:
			| { oauth_callback: string }
			| ((
					error: { statusCode: number; data?: string } | null,
					token: string,
					tokenSecret: string,
					results: unknown,
			  ) => void),
		callback?: (
			error: { statusCode: number; data?: string } | null,
			token: string,
			tokenSecret: string,
			results: unknown,
		) => void,
	): void {
		// Handle both signatures:
		// 1. getOAuthRequestToken(callback)
		// 2. getOAuthRequestToken({ oauth_callback: 'oob' }, callback)
		const actualCallback =
			typeof paramsOrCallback === 'function' ? paramsOrCallback : callback

		if (!actualCallback) {
			throw new Error('Callback is required')
		}

		if (this.shouldFail) {
			actualCallback(this.failureError, '', '', undefined)
		} else {
			actualCallback(
				null,
				'mock_request_token',
				'mock_request_token_secret',
				{},
			)
		}
	}

	// Helper method to cast to OAuth type
	asOAuth(): OAuth {
		return this as unknown as OAuth
	}
}
