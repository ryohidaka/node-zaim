import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('CurrencyApi', () => {
	describe('list', () => {
		test('should get currency list successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				currencies: [
					{
						currency_code: 'AUD',
						unit: '$',
						name: 'Australian dollar',
						point: 2,
					},
				],
				requested: 1321796963,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/currency',
				mockResponse,
			)

			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			// Act
			const result = await zaim.currency.list()

			// Assert - Check all fields are properly transformed
			expect(result[0].currencyCode).toBe('AUD')
			expect(result[0].unit).toBe('$')
			expect(result[0].name).toBe('Australian dollar')
			expect(result[0].point).toBe(2)
		})
	})
})
