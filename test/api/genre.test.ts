import { describe, expect, test } from 'bun:test'
import { Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('GenreApi', () => {
	describe('list', () => {
		test('should get genre list successfully', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				genres: [
					{
						id: 12093,
						name: 'Geocery',
						sort: 1,
						active: 1,
						category_id: 101,
						parent_genre_id: 10101,
						modified: '2013-01-01 00:00:00',
					},
				],
				requested: 1321795825,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/genre',
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
			const result = await zaim.genre.list()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(12093)
			expect(result[0].name).toBe('Geocery')
			expect(result[0].sort).toBe(1)
			expect(result[0].active).toBe(true)
			expect(result[0].categoryId).toBe(101)
			expect(result[0].parentGenreId).toBe(10101)
			expect(result[0].modified).toEqual(new Date('2013-01-01 00:00:00'))
		})
	})

	describe('default', () => {
		test('should get default genre list successfully in Japanese (default)', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				genres: [
					{
						id: 10101,
						category_id: 101,
						name: '食料品',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/genre?lang=ja',
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
			const result = await zaim.genre.default()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(10101)
			expect(result[0].categoryId).toBe(101)
			expect(result[0].name).toBe('食料品')
		})

		test('should get default category list successfully in English', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				genres: [
					{
						id: 10101,
						category_id: 101,
						name: 'Grocery',
					},
				],
				requested: 1669618091,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/genre?lang=en',
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
			const result = await zaim.genre.default('en')

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(10101)
			expect(result[0].categoryId).toBe(101)
			expect(result[0].name).toBe('Grocery')
		})
	})
})
