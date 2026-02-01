import { describe, expect, test } from 'bun:test'
import { type MoneyQueryParams, Zaim } from '../../src'
import { MockOAuthClient } from '../mocks'

describe('MoneyApi', () => {
	describe('list', () => {
		test('should get money list successfully without parameters', async () => {
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				money: [
					{
						id: 381,
						mode: 'income',
						user_id: 1,
						date: '2011-11-07',
						category_id: 11,
						genre_id: 0,
						to_account_id: 34555,
						from_account_id: 0,
						amount: 10000,
						comment: '',
						active: 1,
						name: '',
						receipt_id: 0,
						place: 'xxx',
						place_uid: 'yh-xxx',
						created: '2011-11-07 01:10:50',
						currency_code: 'JPY',
					},
				],
				requested: 1321782829,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/money?mapping=1',
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
			const result = await zaim.money.list()

			// Assert - Check all fields are properly transformed
			expect(result[0].id).toBe(381)
			expect(result[0].mode).toBe('income')
			expect(result[0].userId).toBe(1)
			expect(result[0].date).toBe('2011-11-07')
			expect(result[0].categoryId).toBe(11)
			expect(result[0].genreId).toBe(0)
			expect(result[0].toAccountId).toBe(34555)
			expect(result[0].fromAccountId).toBe(null)
			expect(result[0].amount).toBe(10000)
			expect(result[0].comment).toBe(null)
			expect(result[0].active).toBe(true)
			expect(result[0].name).toBe('')
			expect(result[0].receiptId).toBe(0)
			expect(result[0].place).toBe('xxx')
			expect(result[0].placeUid).toBe('yh-xxx')
			expect(result[0].created).toEqual(new Date('2011-11-07 01:10:50'))
			expect(result[0].currencyCode).toBe('JPY')
		})

		test('should get money list with query parameters', async () => {
			// Arrange
			const mockOAuth = new MockOAuthClient()
			const mockResponse = {
				money: [
					{
						id: 382,
						mode: 'payment',
						user_id: 1,
						date: '2024-01-15',
						category_id: 101,
						genre_id: 10101,
						to_account_id: 0,
						from_account_id: 34555,
						amount: 5000,
						comment: 'Test payment',
						active: 1,
						name: 'Product',
						receipt_id: 100,
						place: '',
						place_uid: '',
						created: '2024-01-15 10:00:00',
						currency_code: 'JPY',
					},
				],
				requested: 1705305600,
			}

			mockOAuth.setMockResponse(
				'https://api.zaim.net/v2/home/money?mapping=1&mode=payment&start_date=2024-01-01&end_date=2024-01-31&page=1&limit=50',
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
			const params: MoneyQueryParams = {
				mode: 'payment',
				startDate: '2024-01-01',
				endDate: '2024-01-31',
				limit: 50,
				page: 1,
			}
			const result = await zaim.money.list(params)

			// Assert
			expect(result[0].id).toBe(382)
			expect(result[0].mode).toBe('payment')
			expect(result[0].fromAccountId).toBe(34555)
			expect(result[0].toAccountId).toBe(null)
			expect(result[0].comment).toBe('Test payment')
			expect(result[0].place).toBe(null)
			expect(result[0].placeUid).toBe(null)
		})

		test('should throw error when limit is less than 1', async () => {
			// Arrange
			const mockOAuth = new MockOAuthClient()
			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			// Act & Assert
			await expect(zaim.money.list({ limit: 0 })).rejects.toThrow(
				'limit must be between 1 and 100',
			)
		})

		test('should throw error when limit is greater than 100', async () => {
			// Arrange
			const mockOAuth = new MockOAuthClient()
			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			// Act & Assert
			await expect(zaim.money.list({ limit: 101 })).rejects.toThrow(
				'limit must be between 1 and 100',
			)
		})

		test('should throw error when page is not positive', async () => {
			// Arrange
			const mockOAuth = new MockOAuthClient()
			const zaim = new Zaim({
				consumerKey: 'test-key',
				consumerSecret: 'test-secret',
				accessToken: 'test-token',
				accessTokenSecret: 'test-secret',
				oauthClient: mockOAuth.asOAuth(),
			})

			// Act & Assert
			await expect(zaim.money.list({ page: 0 })).rejects.toThrow(
				'page must be a positive number',
			)
		})
	})
})
