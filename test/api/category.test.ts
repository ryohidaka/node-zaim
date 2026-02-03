import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('CategoryApi', () => {
	describe('list', () => {
		test('should get category list successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				categories: [
					{
						id: 12093,
						name: 'Food',
						mode: 'payment',
						sort: 1,
						parent_category_id: 101,
						active: 1,
						modified: '2013-01-01 00:00:00',
					},
				],
				requested: 1321795825,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/category',
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
			const result = await zaim.category.list()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(12093)
			expect(result[0].name).toBe('Food')
			expect(result[0].mode).toBe('payment')
			expect(result[0].sort).toBe(1)
			expect(result[0].parentCategoryId).toBe(101)
			expect(result[0].active).toBe(true)
			expect(result[0].modified).toEqual(new Date('2013-01-01 00:00:00'))
		})
	})

	describe('default', () => {
		test('should get default category list successfully in Japanese (default)', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				categories: [
					{
						id: 101,
						mode: 'payment',
						name: '食料品',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/category?lang=ja',
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
			const result = await zaim.category.default()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(101)
			expect(result[0].mode).toBe('payment')
			expect(result[0].name).toBe('食料品')
		})

		test('should get default category list successfully in English', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				categories: [
					{
						id: 101,
						mode: 'payment',
						name: 'Food',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/category?lang=en',
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
			const result = await zaim.category.default('en')

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(101)
			expect(result[0].mode).toBe('payment')
			expect(result[0].name).toBe('Food')
		})
	})
})
