import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('AccountApi', () => {
	describe('list', () => {
		test('should get account list successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				accounts: [
					{
						id: 15497739,
						name: 'Credit card',
						modified: '2022-03-15 13:39:52',
						sort: 8,
						active: 1,
						local_id: 15497739,
						website_id: 0,
						parent_account_id: 0,
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/account',
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
			const result = await zaim.account.list()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(15497739)
			expect(result[0].name).toBe('Credit card')
			expect(result[0].modified).toEqual(new Date('2022-03-15 13:39:52'))
			expect(result[0].sort).toBe(8)
			expect(result[0].active).toBe(true)
			expect(result[0].localId).toBe(15497739)
			expect(result[0].websiteId).toBe(null)
			expect(result[0].parentAccountId).toBe(null)
		})
	})

	describe('default', () => {
		test('should get default account list successfully in Japanese (default)', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				accounts: [
					{
						id: 1,
						name: 'お財布',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/account?lang=ja',
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
			const result = await zaim.account.default()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(1)
			expect(result[0].name).toBe('お財布')
		})

		test('should get default account list successfully in English', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				accounts: [
					{
						id: 1,
						name: 'Wallet',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/account?lang=en',
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
			const result = await zaim.account.default('en')

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(1)
			expect(result[0].name).toBe('Wallet')
		})
	})
})
